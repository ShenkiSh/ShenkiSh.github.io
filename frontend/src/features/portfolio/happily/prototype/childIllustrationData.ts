// Original Figma image-fill transforms; source PNGs retain their transparency.
export const childIllustrations = {
  "bear-awarded": { crop: [0.18975002, 0.47333333, 0.36675003, 0.23199999], rotation: 0, widthRatio: 1, heightRatio: 1 },
  "bear-orange": { crop: [0.2105615, 0.4976368, 0.36868718, 0.26143092], rotation: 0.000000, widthRatio: 1.00000000, heightRatio: 1.00000000 },
  "raccoon": { crop: [0.15902133, 0.32183525, 0.08585803, 0.36984116], rotation: 0.000000, widthRatio: 1.00000000, heightRatio: 1.00000000 },
  "mushroom": { crop: [0.19346446, 0.39503857, 0.17153558, 0.11789701], rotation: 0.000000, widthRatio: 1.00000000, heightRatio: 1.00000000 },
  "frog": { crop: [0.185, 0.44361916, 0.40500003, 0.28038082], rotation: 0.000000, widthRatio: 1.00000000, heightRatio: 1.00000000 },
  "bear-purple": { crop: [0.13233437, 0.30667984, 0.2645098, 0.23456186], rotation: 0.000000, widthRatio: 1.00000000, heightRatio: 1.00000000 },
  "bear-cream": { crop: [0.12852906, 0.30566666, 0.26447096, 0.23683333], rotation: 0.000000, widthRatio: 1.00000000, heightRatio: 1.00000000 },
  "bear-brown": { crop: [0.12852906, 0.30566666, 0.26447096, 0.23683333], rotation: 0.000000, widthRatio: 1.00000000, heightRatio: 1.00000000 },
  "bear-green": { crop: [0.13052906, 0.30566666, 0.26447096, 0.23683333], rotation: 0.000000, widthRatio: 1.00000000, heightRatio: 1.00000000 },
  "accessory-overalls": { crop: [0.13800001, 0.23763686, 0.4325, 0.414], rotation: 0.000000, widthRatio: 1.00000000, heightRatio: 1.00000000 },
  "accessory-hat": { crop: [0.25300002, 0.16266666, 0.32575002, 0.14933333], rotation: 0.000000, widthRatio: 1.00000000, heightRatio: 1.00000000 },
  "accessory-moustache": { crop: [0.07780614, 0.04778483, 0.43969384, 0.26785481], rotation: 0.000000, widthRatio: 1.00000000, heightRatio: 1.00000000 },
  "accessory-glasses": { crop: [0.14, 0.10168571, 0.09875, 0.11731429], rotation: 9.479637, widthRatio: 0.92931441, heightRatio: 0.77598652 },
  "accessory-skirt": { crop: [0.171, 0.15200001, 0.17675, 0.32066667], rotation: 0.000000, widthRatio: 1.00000000, heightRatio: 1.00000000 },
  "accessory-scarf": { crop: [0.12446693, 0.10770573, 0.49453312, 0.49780419], rotation: -6.098765, widthRatio: 0.94047549, heightRatio: 0.86352671 },
} as const;

export type ChildIllustrationId = keyof typeof childIllustrations;
