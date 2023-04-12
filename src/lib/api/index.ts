import axios, { AxiosResponse } from "axios";
import { API_URL } from "@env";
import type { GameListRequestParams, GameType } from "./types";

export const createClient = () => {
  const client = axios.create({
    baseURL: API_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const get =
    <PT = unknown, RT = void>(path: string) =>
    (params?: PT): Promise<AxiosResponse<RT>> =>
      client.get(path, { params });

  return {
    games: {
      getList: get<GameListRequestParams, GameType[]>("/api/games"),
    },
  };
};

export type ApiType = ReturnType<typeof createClient>;
