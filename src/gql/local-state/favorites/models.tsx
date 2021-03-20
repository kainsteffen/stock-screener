import { makeVar } from "@apollo/client";

export const favoritesVar = makeVar<string[]>(
  JSON.parse(localStorage.getItem("favorites") ?? "[]")
);
