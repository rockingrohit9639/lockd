import { defineSound } from "@web-kits/audio";

export const sfx = {
  pickup: defineSound({
    source: { type: "sine", frequency: { start: 500, end: 900 } },
    envelope: { attack: 0.01, decay: 0.15 },
    gain: 0.3,
  }),

  interact: defineSound({
    source: { type: "sine", frequency: { start: 600, end: 400 } },
    envelope: { attack: 0.005, decay: 0.06 },
    gain: 0.2,
  }),

  win: defineSound({
    layers: [
      {
        source: { type: "sine", frequency: { start: 400, end: 600 } },
        envelope: { attack: 0.01, decay: 0.3 },
        gain: 0.25,
      },
      {
        source: { type: "sine", frequency: { start: 500, end: 800 } },
        envelope: { attack: 0.05, decay: 0.4 },
        gain: 0.2,
      },
      {
        source: { type: "triangle", frequency: { start: 600, end: 1000 } },
        envelope: { attack: 0.1, decay: 0.5 },
        gain: 0.15,
      },
    ],
  }),

  fail: defineSound({
    layers: [
      {
        source: { type: "sawtooth", frequency: { start: 250, end: 100 } },
        envelope: { attack: 0.01, decay: 0.3 },
        gain: 0.2,
      },
      {
        source: { type: "square", frequency: { start: 180, end: 60 } },
        envelope: { attack: 0.02, decay: 0.25 },
        gain: 0.1,
      },
    ],
  }),

  footstep: defineSound({
    source: { type: "noise" },
    envelope: { attack: 0.005, decay: 0.04 },
    gain: 0.08,
    filter: { type: "highpass", frequency: 800 },
  }),
};
