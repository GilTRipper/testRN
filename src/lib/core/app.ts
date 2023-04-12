import { createClient } from "../api";
import { createGames } from "./games";

export const createApp = () => {
  const api = createClient();
  const games = createGames(api);

  return {
    games,
  };
};

export type AppType = ReturnType<typeof createApp>;
