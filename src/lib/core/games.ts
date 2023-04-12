import { AxiosError } from "axios";
import { ApiType } from "../api";
import { GameListRequestParams } from "../api/types";

export const createGames = (api: ApiType) => {
  const getAll = async (params?: GameListRequestParams) => {
    try {
      const response = await api.games.getList(params);
      return response.data;
    } catch (error) {
      const e = error as AxiosError<{ status_message: string }>;
      throw new Error(e.response?.data.status_message);
    }
  };

  return {
    getAll,
  };
};
