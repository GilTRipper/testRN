export type Category =
  | "mmorpg"
  | "shooter"
  | "strategy"
  | "action"
  | "racing"
  | "sports"
  | "mmo"
  | "survival"
  | "social";

export type Platform = "pc" | "browser" | "all";

export type SortType =
  | "release-date"
  | "popularity"
  | "alphabetical"
  | "relevance";

export type GameListRequestParams = {
  platform?: Platform;
  category?: Category | string;
  "sort-by"?: SortType;
};

export type GameType = {
  developer: string;
  freetogame_profile_url: string;
  game_url: string;
  genre: string;
  id: number;
  platform: string;
  publisher: string;
  release_date: string;
  short_description: string;
  thumbnail: string;
  title: string;
};
