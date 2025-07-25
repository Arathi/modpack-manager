type CategorySlug =
  | "adventure"
  | "cursed"
  | "decoration"
  | "economy"
  | "equipment"
  | "food"
  | "game-mechanics"
  | "library"
  | "magic"
  | "management"
  | "minigame"
  | "mobs"
  | "optimization"
  | "social"
  | "storage"
  | "technology"
  | "transportation"
  | "utility"
  | "worldgen"
  | string;

export const CategoryNames: Record<CategorySlug, string> = {
  adventure: "Adventure",
  cursed: "Cursed",
  decoration: "Decoration",
  economy: "Economy",
  equipment: "Equipment",
  food: "Food",
  "game-mechanics": "Game Mechanics",
  library: "Library",
  magic: "Magic",
  management: "Management",
  minigame: "Minigame",
  mobs: "Mobs",
  optimization: "Optimization",
  social: "Social",
  storage: "Storage",
  technology: "Technology",
  transportation: "Transportation",
  utility: "Utility",
  worldgen: "World Generation",
};
