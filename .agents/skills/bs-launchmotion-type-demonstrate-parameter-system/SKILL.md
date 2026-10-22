---
name: bs-launchmotion-type-demonstrate-parameter-system
description: "A highlight walks down a list of six motion settings while a large circular dot grid acts out each one, ending fully tinted blue under a short closing line. Rewrite every line for your product, keep the clean light LaunchMotion look with blue accents, and render a 11.5-second 1080p or 4K MP4 on your own machine."
---

# Dot Grid Moods

A highlight walks down a list of six motion settings while a large circular dot grid acts out each one, ending fully tinted blue under a short closing line. One editable HyperFrames project, 11.5 s, 1920×1080 canvas, renders at 1080p (default) or 4K, 30 fps, light scene.

## Inputs

All visible text is in named slots. Defaults live in `references/defaults.json`; keep each value within its character limit.

| Slot | Default | Max chars |
| --- | --- | --- |
| `headline` | One grid. Six moods. | 24 | last two words render in the blue gradient span
| `panel-title` | Motion settings | 20 |
| `mode-1` | Pulse | 12 |
| `mode-2` | Weight | 12 |
| `mode-3` | Space | 12 |
| `mode-4` | Bounce | 12 |
| `mode-5` | Contrast | 12 |
| `mode-6` | Color | 12 |
| `desc-1` | Waves ripple out from the center. | 38 |
| `desc-2` | A heavy band rises and falls. | 38 |
| `desc-3` | Focus gathers inside open space. | 38 |
| `desc-4` | One ring pops with a spring. | 38 |
| `desc-5` | Big meets small across a line. | 38 |
| `desc-6` | Every dot picks up a shade of blue. | 38 |
| `outro` | Tune the feel. Not the code. | 32 | last three words render in the blue gradient span

## Create

```bash
node scripts/create.mjs --out ./launch-scene --set "headline=Your line here"
npx hyperframes preview ./launch-scene
npx hyperframes render ./launch-scene --output ./launch-scene.mp4 --fps 30 --quality high --resolution 1080p
# 4K: --resolution 4k
```

`--set key=value` can repeat. `--data content.json` accepts an object of slot values. For an image or video slot, pass a local file path as the value; it is copied into the project.

## Resolution

Before rendering, ask the user whether they want 1080p or 4K. If they do not say, render 1080p. For 4K add `--resolution 4k` (3840×2160): the scene and its timing stay the same, Chrome renders it at twice the pixel density, and the render takes longer.

## Style rules

- Blue is the only accent color (`#2F6BFF` family). Do not introduce other accent hues.
- Light scene: soft light background, white surfaces, quiet shadows.
- Logos come from the LobeHub icon set in their original colors. Never recolor a logo. When the user features their own product, replace the default logo file and label with theirs.
- Keep the timeline intact; change words, not timings.

## Check

Inspect the frames at the start, the middle and the final hold. Fix any clipped or wrapping line by shortening the text, then render again.
