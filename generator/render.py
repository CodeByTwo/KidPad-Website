#!/usr/bin/env python3
"""KidPad social content renderer.

Usage:  python3 generator/render.py posts/2026-11-27/spec.json

Reads a spec (see generator/SPEC.md) and writes into the spec's folder:
  feed-1.png ... feed-N.png   1080x1350 feed post / carousel slides
  story-1.png ...             1080x1920 Instagram Story frames
  reel.mp4 + reel-cover.png   1080x1920 Reel (optional)

Pure local rendering: headless Chrome (Playwright) for layout, ffmpeg for video.
"""
import base64, html, json, os, shutil, subprocess, sys, tempfile
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / "assets"
CHROME = os.environ.get("CHROME", "/usr/bin/google-chrome")

COLORS = {
    "blue": ("#3DA5F4", "#2E86D8"), "coral": ("#FF6B6B", "#EE5765"),
    "yellow": ("#FFC23C", "#F2A91E"), "green": ("#3FD08A", "#2FB675"),
    "purple": ("#9B7BE8", "#7E5DDB"), "pink": ("#FF8FB1", "#F2709A"),
    "orange": ("#FF9F45", "#F2862A"), "teal": ("#3FD0C8", "#2DB8B0"),
}
# Activity -> (screenshot, accent colour, label) — matches src/config/modes.ts in the app
ACTIVITIES = {
    "home": ("home", "yellow", "KidPad"), "camera": ("camera", "blue", "Camera"),
    "phone": ("phone", "teal", "Phone"), "clock": ("clock", "pink", "Clock"),
    "calculator": ("calculator", "green", "Calculator"), "timer": ("timer", "teal", "Timer"),
    "drawing": ("drawing", "purple", "Drawing"), "transport": ("tickets", "blue", "Trains & Buses"),
    "rescue": ("rescue", "coral", "Rescue"), "restaurant": ("restaurant", "orange", "Restaurant"),
}
TABLET = {"home", "clock", "drawing", "restaurant"}
FOOT_STORY = 270  # Stories/Reels: footer sits above IG's reply bar / caption area


def data_uri(path: Path, mime: str) -> str:
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode()


_cache = {}
def img(path: Path) -> str:
    if path not in _cache:
        _cache[path] = data_uri(path, "image/png")
    return _cache[path]


def screen_src(activity: str, tablet=False) -> str:
    shot = ACTIVITIES.get(activity, ACTIVITIES["home"])[0]
    p = ASSETS / "screens" / ("tablet" if tablet else "") / f"{shot}.png"
    if not p.exists():
        p = ASSETS / "screens" / f"{shot}.png"
    return img(p)


def esc(s) -> str:
    return html.escape(str(s or "")).replace("\n", "<br>")


CSS = """
@font-face{font-family:Baloo;src:url(%(baloo)s);font-weight:400 800}
@font-face{font-family:Nunito;src:url(%(nunito)s);font-weight:200 1000}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:%(w)dpx;height:%(h)dpx;overflow:hidden}
body{background:#FFF6E5;font-family:Nunito,sans-serif;color:#3A2E2A;position:relative;-webkit-font-smoothing:antialiased}
.bg{position:absolute;inset:0;overflow:hidden}
.blob{position:absolute;border-radius:50%%;opacity:.9}
.stage{position:absolute;inset:0;display:flex;flex-direction:column;z-index:3}
.band{position:absolute;left:0;right:0;bottom:0;height:%(band)dpx;z-index:4}
.eyebrow{align-self:flex-start;background:var(--a);color:#fff;font:800 34px Baloo;padding:6px 28px 2px;border-radius:999px;letter-spacing:.5px}
.headline{font:800 96px/1.02 Baloo;letter-spacing:-1px;margin-top:22px}
.headline em{font-style:normal;color:var(--ad)}
.body{font:700 38px/1.35 Nunito;color:#7A6E66;margin-top:18px;max-width:900px}
.foot{position:absolute;z-index:5;left:%(pad)dpx;right:%(pad)dpx;bottom:%(footb)dpx;display:flex;align-items:center;gap:20px;font:800 30px Nunito;color:#7A6E66}
.foot img{width:76px;height:76px;border-radius:20px;box-shadow:0 3px 8px rgba(58,46,42,.15)}
.foot b{font:800 40px Baloo;color:#3A2E2A;display:block;line-height:1}
.foot .pill{margin-left:auto;background:#fff;border-radius:999px;padding:12px 26px;box-shadow:0 2px 6px rgba(58,46,42,.10);color:#3A2E2A}
.phone{position:absolute;z-index:2;width:var(--pw);aspect-ratio:720/1500;border-radius:calc(var(--pw)*.13);background:#2A221F;padding:calc(var(--pw)*.035);box-shadow:0 18px 40px rgba(58,46,42,.25)}
.phone .scr{width:100%%;height:100%%;border-radius:calc(var(--pw)*.1);overflow:hidden;background:#FFF6E5}
.phone .scr img{width:100%%;display:block;margin-top:-10%%}
.tablet{position:absolute;z-index:2;width:var(--tw);aspect-ratio:2360/1640;border-radius:calc(var(--tw)*.045);background:#2A221F;padding:calc(var(--tw)*.022);box-shadow:0 18px 40px rgba(58,46,42,.25)}
.tablet .scr{width:100%%;height:100%%;border-radius:calc(var(--tw)*.028);overflow:hidden}
.tablet .scr img{width:100%%;display:block;margin-top:-2.6%%}
.ticks{list-style:none;margin-top:34px;display:flex;flex-direction:column;gap:24px}
.ticks li{display:flex;align-items:center;gap:24px;font:800 46px/1.15 Baloo}
.ticks li i{flex:none;width:64px;height:64px;border-radius:50%%;background:var(--a);color:#fff;display:grid;place-items:center;font:900 38px Nunito;font-style:normal;box-shadow:0 3px 8px rgba(58,46,42,.15)}
.card{background:#fff;border-radius:48px;padding:56px;box-shadow:0 4px 12px rgba(58,46,42,.10)}
.emoji{font-size:150px;line-height:1;z-index:3}
.big{font:800 250px/0.9 Baloo;color:var(--ad);letter-spacing:-6px}
.cta{align-self:flex-start;background:var(--a);color:#fff;font:800 44px Baloo;padding:16px 44px 10px;border-radius:999px;box-shadow:0 4px 10px rgba(58,46,42,.18)}
.swipe{position:absolute;z-index:5;right:%(pad)dpx;bottom:calc(%(footb)dpx + 110px);font:800 30px Nunito;color:#fff;background:var(--ad);padding:10px 24px;border-radius:999px;box-shadow:0 3px 8px rgba(58,46,42,.18)}
/* reel animation primitives (scrubbed frame-by-frame, never played live) */
.a-up{animation:up .55s cubic-bezier(.2,.8,.2,1) both}
.a-pop{animation:pop .6s cubic-bezier(.3,1.5,.5,1) both}
.a-fade{animation:fade .5s ease both}
.a-float{animation:float 3s ease-in-out infinite alternate}
.a-drift{animation:drift 12s linear both}
@keyframes up{from{opacity:0;transform:translateY(60px)}to{opacity:1;transform:none}}
@keyframes pop{from{opacity:0;transform:scale(.6) rotate(var(--rot,0deg))}to{opacity:1;transform:scale(1) rotate(var(--rot,0deg))}}
@keyframes fade{from{opacity:0}to{opacity:1}}
@keyframes float{from{translate:0 0}to{translate:0 -18px}}
@keyframes drift{from{transform:scale(1)}to{transform:scale(1.12) translate(-20px,10px)}}
"""

FIT_JS = """
document.querySelectorAll('[data-fit]').forEach(el=>{
  const max=+el.dataset.fit; let fs=parseFloat(getComputedStyle(el).fontSize);
  while(el.scrollHeight>max && fs>30){fs-=3; el.style.fontSize=fs+'px';}
});
"""


def blobs(acc, w, h, seed=0):
    a = COLORS[acc][0]
    others = [c for k, (c, _) in COLORS.items() if k != acc]
    o1, o2 = others[seed % len(others)], others[(seed * 3 + 2) % len(others)]
    return (f'<div class="bg a-drift">'
            f'<div class="blob" style="width:{w*.75}px;height:{w*.75}px;right:-{w*.28}px;top:-{w*.22}px;background:{a};opacity:.22"></div>'
            f'<div class="blob" style="width:{w*.42}px;height:{w*.42}px;left:-{w*.16}px;bottom:{h*.18}px;background:{o1};opacity:.18"></div>'
            f'<div class="blob" style="width:{w*.16}px;height:{w*.16}px;right:{w*.1}px;bottom:{h*.30}px;background:{o2};opacity:.35"></div>'
            f'</div>')


def foot(fmt, anim=False, swipe=False, light=False):
    pill = "Link in bio" if fmt == "story" else "£2.99 · No ads · Offline"
    band = "transparent" if light else "linear-gradient(to bottom, rgba(255,246,229,0), #FFF6E5 38%)"
    col = "color:#fff;" if light else ""
    a = " a-up" if anim else ""
    s = '<div class="swipe">Swipe for more →</div>' if swipe else ""
    return (f'<div class="band" style="background:{band}"></div>'
            f'<div class="foot{a}" style="{col}animation-delay:.6s"><img src="{img(ASSETS/"icon.png")}"><div><b style="{col}">KidPad</b>Have Fun and Learn</div>'
            f'<div class="pill">{pill}</div></div>{s}')


def slide_html(s: dict, fmt: str, anim=False, swipe=False, seed=0) -> str:
    """One frame. fmt: feed (1080x1350) | story (1080x1920, Stories and Reels)."""
    W, H = 1080, (1350 if fmt == "feed" else 1920)
    tall = fmt != "feed"
    act = s.get("activity", "home")
    acc = s.get("accent") or ACTIVITIES.get(act, ACTIVITIES["home"])[1]
    a, ad = COLORS[acc]
    VARS[0] = f"--a:{a};--ad:{ad}"
    lay = s.get("layout", "spotlight")
    pad, top = 80, (250 if tall else 80)          # Stories: keep clear of IG's top bar
    floor = H - (FOOT_STORY + 140 if tall else 190)  # y where the footer band starts

    def el(cls, kind, i, style="", content="", tag="div"):
        k = f" a-{kind}" if anim and kind else ""
        delay = f"animation-delay:{0.12*i:.2f}s;" if anim else ""
        return f'<{tag} class="{cls}{k}" style="{delay}{style}">{content}</{tag}>'

    def phone(act_, pw, left=None, right=None, ptop=0, rot=0, i=3):
        pos = f"left:{left}px;" if left is not None else f"right:{right}px;"
        return el("phone", "pop", i, f"--pw:{pw}px;--rot:{rot}deg;{pos}top:{ptop}px;transform:rotate({rot}deg)",
                  f'<div class="scr"><img src="{screen_src(act_)}"></div>')

    eyebrow = el("eyebrow", "up", 0, content=esc(s["eyebrow"])) if s.get("eyebrow") else ""
    hl = lambda fs=96, mx=330, style="": el("headline", "up", 1, f"font-size:{fs}px;{style}", s.get("headline", "")).replace('class="headline', f'data-fit="{mx}" class="headline')
    body = el("body", "up", 2, content=esc(s.get("body"))) if s.get("body") else ""
    light = False
    bg = blobs(acc, W, H, seed)
    extra = ""

    if lay == "spotlight":
        pw = 500 if not tall else 640
        ptop = 560 if not tall else 860
        inner = eyebrow + hl(96 if not tall else 104, 330 if not tall else 360) + body
        extra = phone(act, pw, left=(W - pw) // 2 + 60, ptop=ptop, rot=-6)
        if s.get("emoji"):
            extra += el("emoji", "pop", 4, f"position:absolute;left:{pad}px;top:{ptop+140}px;--rot:-10deg;transform:rotate(-10deg)", s["emoji"])
    elif lay == "tablet":
        act_t = act if act in TABLET else "home"
        tw = 900 if not tall else 960
        ttop = 560 if not tall else 860
        inner = eyebrow + hl(96, 300) + body
        extra = el("tablet", "pop", 3, f"--tw:{tw}px;left:{W-tw-40}px;top:{ttop}px;transform:rotate(-4deg);--rot:-4deg",
                   f'<div class="scr"><img src="{screen_src(act_t, tablet=True)}"></div>')
    elif lay == "checklist":
        items = "".join(el("", "up", 2 + i, "", f"<i>✓</i>{esc(t)}", "li") for i, t in enumerate(s.get("bullets", [])[:6]))
        inner = eyebrow + hl(96 if not tall else 104, 330) + f'<ul class="ticks" style="max-width:{600 if not tall else 960}px">{items}</ul>'
        if s.get("show_phone", True):
            pw = 420 if not tall else 520
            extra = phone(act, pw, right=pad - 40, ptop=(600 if not tall else 1080), rot=7)
    elif lay == "tip":
        card = (f'<div class="emoji">{s.get("emoji","💡")}</div>'
                f'<div class="headline" data-fit="{360 if not tall else 480}" style="font-size:84px">{s.get("headline","")}</div>'
                f'<div class="body">{esc(s.get("body"))}</div>')
        inner = eyebrow + (f'<div style="flex:1;display:flex;align-items:center;padding-bottom:{0 if tall else 150}px">' if not tall else "<div>") + el("card", "pop", 1, f"margin-top:{0 if not tall else 60}px", card) + "</div>"
        if tall:
            extra = phone(act, 440, right=pad - 20, ptop=1060, rot=-5, i=4)
    elif lay == "question":
        light = True
        bg = (f'<div class="bg" style="background:{a}"><div class="blob" style="width:900px;height:900px;right:-300px;top:-300px;background:#fff;opacity:.14"></div>'
              f'<div class="blob" style="width:500px;height:500px;left:-200px;bottom:-120px;background:{ad};opacity:.5"></div></div>')
        inner = (f'<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:30px;padding-bottom:{H-floor}px">'
                 + el("emoji", "pop", 0, "font-size:180px", s.get("emoji", "🤔"))
                 + hl(110, 600 if tall else 520, "color:#fff")
                 + el("body", "up", 2, "color:rgba(255,255,255,.95)", esc(s.get("body") or "Tell us in the comments 👇")) + "</div>")
    elif lay == "price":
        bl = s.get("bullets") or ["No subscription", "No ads", "No in-app purchases"]
        items = "".join(el("", "up", 3 + i, "", f"<i>✓</i>{esc(t)}", "li") for i, t in enumerate(bl[:4]))
        inner = eyebrow + el("big", "pop", 1, "margin-top:30px", "£2.99") + hl(96, 230) + f'<ul class="ticks">{items}</ul>'
        pw = 330 if not tall else 420
        extra = phone(act, pw, right=pad - 30, ptop=(top + 120 if not tall else top + 200), rot=8)
    elif lay == "endcard":
        inner = (f'<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:26px;padding-bottom:{H-floor}px">'
                 + el("", "pop", 0, "width:300px;height:300px;border-radius:70px;box-shadow:0 10px 26px rgba(58,46,42,.22);background:url(" + img(ASSETS / "icon.png") + ") center/cover")
                 + el("headline", "up", 1, "font-size:120px", s.get("headline", "KidPad"))
                 + el("body", "up", 2, "text-align:center", esc(s.get("body") or "£2.99 once. No ads. Works offline."))
                 + el("cta", "up", 3, "align-self:center", esc(s.get("cta") or "App Store & Google Play")) + "</div>")
        return page(W, H, bg + f'<div class="stage" style="--a:{a};--ad:{ad};padding:{top}px {pad}px">{inner}</div>', fmt)
    else:
        raise ValueError(f"unknown layout {lay}")

    if s.get("cta"):
        extra += el("cta", "up", 5, f"position:absolute;z-index:6;left:{pad}px;top:{floor-(110 if tall else 60)}px", esc(s["cta"]))
    return page(W, H, bg + extra + f'<div class="stage" style="--a:{a};--ad:{ad};padding:{top}px {pad}px">{inner}</div>'
                + foot(fmt, anim, swipe, light), fmt)


VARS = [""]
def page(W, H, body, fmt):
    css = CSS % dict(w=W, h=H, pad=80, footb=(70 if fmt == "feed" else FOOT_STORY),
                     band=(230 if fmt == "feed" else FOOT_STORY + 170),
                     baloo=_font("Baloo2"), nunito=_font("Nunito"))
    return f"<!doctype html><html><head><meta charset=utf-8><style>{css}</style></head><body style='{VARS[0]}'>{body}<script>{FIT_JS}</script></body></html>"


_fonts = {}
def _font(n):
    if n not in _fonts:
        _fonts[n] = data_uri(ROOT / "fonts" / f"{n}.ttf", "font/ttf")
    return _fonts[n]


def shoot(pg, markup, out: Path, W, H):
    pg.set_viewport_size({"width": W, "height": H})
    pg.set_content(markup, wait_until="load")
    pg.evaluate("document.fonts.ready")
    pg.evaluate(FIT_JS)
    pg.screenshot(path=str(out), type="png")


def render_reel(pg, scenes, out_dir: Path, fps=30):
    tmp = Path(tempfile.mkdtemp())
    frame = 0
    cuts = []
    for si, sc in enumerate(scenes):
        dur = float(sc.get("duration", 3.0))
        markup = slide_html(sc, "story", anim=True, seed=si)
        pg.set_viewport_size({"width": 1080, "height": 1920})
        pg.set_content(markup, wait_until="load")
        pg.evaluate("document.fonts.ready")
        pg.evaluate(FIT_JS)
        pg.evaluate("document.getAnimations().forEach(a=>a.pause())")
        cuts.append(frame / fps)
        for f in range(int(dur * fps)):
            t = f / fps * 1000
            pg.evaluate(f"document.getAnimations().forEach(a=>a.currentTime={t})")
            pg.screenshot(path=str(tmp / f"f{frame:05d}.jpg"), type="jpeg", quality=92)
            if si == 0 and f == int(1.2 * fps):
                shutil.copy(tmp / f"f{frame:05d}.jpg", out_dir / "reel-cover.jpg")
            frame += 1
    total = frame / fps
    # audio: whoosh on every cut, pop as content lands, chime on the end card
    snd = ASSETS / "sounds"
    inputs = []
    for i, c in enumerate(cuts):
        inputs += ["-i", str(snd / "whoosh.wav"), "-i", str(snd / ("chime.wav" if i == len(cuts) - 1 else "pop.wav"))]
    parts, idx = [], 1
    for i, c in enumerate(cuts):
        parts.append(f"[{idx}:a]adelay={int(c*1000)}|{int(c*1000)},volume=0.5[w{i}]")
        parts.append(f"[{idx+1}:a]adelay={int(c*1000+350)}|{int(c*1000+350)},volume=0.6[p{i}]")
        idx += 2
    mix = "".join(f"[w{i}][p{i}]" for i in range(len(cuts)))
    fc = ";".join(parts) + f";{mix}amix=inputs={2*len(cuts)}:normalize=0,apad,atrim=0:{total:.3f}[aout]"
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(fps), "-i", str(tmp / "f%05d.jpg"), *inputs,
           "-filter_complex", fc, "-map", "0:v", "-map", "[aout]",
           "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", "-r", str(fps),
           "-c:a", "aac", "-b:a", "128k", "-ar", "44100", "-movflags", "+faststart", "-shortest", str(out_dir / "reel.mp4")]
    subprocess.run(cmd, check=True)
    shutil.rmtree(tmp)


def main(spec_path):
    spec_path = Path(spec_path)
    spec = json.loads(spec_path.read_text())
    out = spec_path.parent
    made = []
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=CHROME, args=["--no-sandbox", "--disable-gpu"])
        pg = b.new_page()
        feed = spec.get("feed", {}).get("slides", [])
        for i, s in enumerate(feed, 1):
            f = out / f"feed-{i}.png"
            shoot(pg, slide_html(s, "feed", swipe=(len(feed) > 1 and i == 1), seed=i), f, 1080, 1350); made.append(f.name)
        for i, s in enumerate(spec.get("story", {}).get("slides", []), 1):
            f = out / f"story-{i}.png"
            shoot(pg, slide_html(s, "story", seed=i + 3), f, 1080, 1920); made.append(f.name)
        if spec.get("reel", {}).get("scenes"):
            render_reel(pg, spec["reel"]["scenes"], out); made += ["reel.mp4", "reel-cover.jpg"]
        b.close()
    print("\n".join(made))


if __name__ == "__main__":
    main(sys.argv[1])
