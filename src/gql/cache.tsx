import { gql, InMemoryCache } from "@apollo/client";
import { favoritesVar, strategiesVar } from "./local-state";

export const localTypeDefs = gql`
  extend type Query {
    favorites: [String!]!
    strategies: [Strategy!]!
  }
`;

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
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
      },
    },
  },
});
