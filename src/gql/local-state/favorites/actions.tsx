import { favoritesVar } from "./models";

export const toggleFavoritedSymbol = (newSymbol: string) => {
  favoritesVar().includes(newSymbol)
    ? favoritesVar(favoritesVar().filter((symbol: any) => symbol !== newSymbol))
    : favoritesVar([...favoritesVar(), newSymbol]);
  localStorage.setItem("favorites", JSON.stringify(favoritesVar()));
};
