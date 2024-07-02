// CREATE OR RETURN A USER
// GET INFORMATION ABOUT USER

import { api } from "../config/axios";

interface CreateOrRetrieveUser {
  (input: {
    email: string;
    fistName: string;
    lastName: string;
    app: string;
  }): Promise<string>;
}

const createOrRetrieveUser: CreateOrRetrieveUser = async (input) => {
  const { data } = await api.get(`?user=${input.email}`, {
    headers: {
      app: input.app,
      action: "LIST",
    },
  });
  return "";

  // console.log("[data]", data);
};

export const usersService = {
  createUser: createOrRetrieveUser,
};
