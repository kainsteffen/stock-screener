import { gql, InMemoryCache } from "@apollo/client";
import {
  dashboardElementsVar,
  favoritesVar,
  strategiesVar,
} from "./local-state";

export const localTypeDefs = gql`
  extend type Query {
    favorites: [String!]!
    strategies: [Strategy!]!
    dashboardElements: [DashboardElement!]!
  }
`;

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        manyFundamentals: {
          keyArgs: ["filter"],
          merge(existing = [], incoming: any[], { args }) {
            // Deduplicate by symbol
            return [...existing, ...incoming].filter(
              (i, index, arr) =>
                index === arr.findIndex((j) => i.symbol === j.symbol)
            );
          },
          read(existing = [], { args }) {
            return existing;
          },
        },
        // Current unused local fields since we're using useReactiveVar hook
        favorites: {
          read() {
            return favoritesVar();
          },
        },
        strategies: {
          read() {
            return strategiesVar();
          },
        },
        dashboardElements: {
          read() {
            return dashboardElementsVar();
          },
        },
      },
    },
  },
});
