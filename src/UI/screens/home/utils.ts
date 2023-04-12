import type { Platform, Category, SortType } from "../../../lib/api/types";

type OptionType<T extends string> = {
  key: T;
  value: Capitalize<T> | Uppercase<T>;
};

export const platforms: OptionType<Platform>[] = [
  { key: "pc", value: "PC" },
  { key: "browser", value: "Browser" },
  { key: "all", value: "All" },
];

export const categories: OptionType<Category>[] = [
  { key: "action", value: "Action" },
  { key: "mmo", value: "MMO" },
  { key: "mmorpg", value: "MMORPG" },
  { key: "racing", value: "Racing" },
  { key: "shooter", value: "Shooter" },
  { key: "social", value: "SOCIAL" },
  { key: "sports", value: "Sports" },
  { key: "strategy", value: "Strategy" },
  { key: "survival", value: "Survival" },
];

export const sortBy: OptionType<SortType>[] = [
  { key: "alphabetical", value: "Alphabetical" },
  { key: "popularity", value: "Popularity" },
  { key: "release-date", value: "Release-date" },
  { key: "relevance", value: "Relevance" },
];
