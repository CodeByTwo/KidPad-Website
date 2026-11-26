# KidPad Instagram playbook

The daily scheduled task follows this file. Edit it to change what gets posted. The next run picks up your changes.

## Weekly rhythm (UK time)

| Day | 12:30 Story | 19:30 Feed |
|---|---|---|
| Mon | Story | **Reel** |
| Tue | Story | Carousel (3–5 slides) |
| Wed | Story | **Reel** |
| Thu | Story | Single image |
| Fri | Story | **Reel** |
| Sat | Story | Carousel (3–5 slides) |
| Sun | Story | Single image (often a `question`) |

Stories are 1–2 frames. Use 2 when there's a mini-sequence, e.g. a question then the answer.

## Content pillars (rotate, don't repeat the same pillar two feed posts running)

1. **Activity spotlight**: one of the nine activities, what kids do in it.
2. **Play idea / parent tip**: a real-world way to use an activity (Timer for tidy-up or turn-taking, Clock for learning the time, Restaurant for counting coins, Trains & Buses for a pretend day out).
3. **Peace of mind**: offline, no ads, no in-app purchases, no accounts, no data collection, PIN-locked settings, Guided Access / App Pinning guides at kidpad.app.
4. **One price**: £2.99 once, no subscription.
5. **Conversation starter**: a question to parents (which vehicle first, favourite pretend-play food, etc.).
6. **Seasonal / moment**: tie to the calendar (school holidays, rainy days, long car journeys, Christmas, half term) without being cheesy.

## Facts you may use (never invent others)

- Pretend-play learning app for children aged about 2–6. iPhone, iPad, Android phones and tablets. Activities expand to fill tablet screens.
- £2.99 one-off (local currency outside UK). No subscription, no ads, no in-app purchases, no accounts.
- Fully offline. No personal data collection, analytics or tracking. Creations stay on the device.
- Nine activities:
  - **Drawing**: finger-painting, no mess
  - **Camera**: photos stay in KidPad's own gallery, not the camera roll
  - **Restaurant**: take orders, count, take turns. Menu has snacks, drinks and fruit with £1–£3 prices.
  - **Trains & Buses**: print pretend tickets, e.g. to the Seaside or the Zoo
  - **Rescue**: send ambulances, fire engines and police cars. Callouts like "A lost puppy at Biscuit Hill", with lights and siren buttons.
  - **Phone**: pretend calls, no real numbers
  - **Clock**: clock face and digital time side by side
  - **Timer**: a visual timer kids set themselves
  - **Calculator**: tapping, counting, early numbers
- Parents get PIN-locked settings to choose which activities show and to mute all sound.
- Taglines: "Have Fun and Learn", "Made with care for little hands".
- Links: kidpad.app. In feed captions say "link in bio". Stories get a real link sticker.

**Never** invent reviews, quotes, awards, download numbers, stats or developmental claims, and never show or describe real children.

## Voice

UK English. Warm, playful, reassuring, written for parents. Plain and human, not salesy or AI-polished. Avoid "unlock", "elevate", "game-changer", "dive in", "look no further" and "in today's world". Use 0–2 emojis in captions.

- **Captions:** 40–120 words. Hook in the first line, short paragraphs, light call to action at the end.
- **Hashtags:** in `first_comment`, not the caption. Use 8–12 tags, mixing broad (#toddleractivities #preschoollearning #kidsapps #parentingtips) with niche (#pretendplay #learningthroughplay #screentimedoneright #ukparents #toddlermum #playbasedlearning). Rotate them.
- **On-image text:** headlines of 3–9 words max and bodies of one short sentence. Wrap the punchline in `<em>` for the accent colour.

## Spec format (`posts/YYYY-MM-DD/spec.json`)

```json
{
  "id": "2026-11-27",
  "pillar": "activity spotlight",
  "feed": {
    "kind": "reel | carousel | single",
    "slides": [ SLIDE, ... ],          // carousel / single (omit for reel)
    "caption": "...",
    "first_comment": "#hashtags ...",
    "alt": ["alt text per slide", "..."]
  },
  "reel": { "scenes": [ SLIDE + {"duration": 2.5}, ... ] },   // reel days only; 3–5 scenes, 9–15s total, last scene layout "endcard"
  "story": { "slides": [ SLIDE, ... ], "alt": ["..."] }
}
```

**SLIDE** fields: `layout`, `activity`, optional `accent`, `eyebrow`, `headline` (HTML, `<em>` allowed), `body`, `emoji`, `bullets` (list), `cta`.

- `activity` is one of: home, camera, phone, clock, calculator, timer, drawing, transport, rescue, restaurant. It picks the screenshot and accent colour.
- `accent` overrides the colour: blue, coral, yellow, green, purple, pink, orange, teal.

**Layouts:**

| Layout | Use | Needs |
|---|---|---|
| `spotlight` | headline + phone mockup | headline, body, optional emoji |
| `tablet` | iPad mockup | only home, clock, drawing, restaurant have tablet shots |
| `checklist` | ticks + phone | bullets (3–5 short) |
| `tip` | card with big emoji | emoji, headline, body |
| `question` | full-colour question card | emoji, headline, optional body |
| `price` | £2.99 hero | bullets |
| `endcard` | logo close (Reels only) | optional headline/body/cta |

Carousels should open with a hook slide and end with a `checklist` or `price` slide. Reels open with a hook (`question` or a bold `spotlight`) in the first scene.

## Render

```
python3 generator/render.py posts/YYYY-MM-DD/spec.json
```

This writes `feed-N.png`, `story-N.png`, and on Reel days `reel.mp4` + `reel-cover.jpg`. Public URL pattern:

`https://raw.githubusercontent.com/CodeByTwo/kidpad-website/social-content/posts/YYYY-MM-DD/<file>`
