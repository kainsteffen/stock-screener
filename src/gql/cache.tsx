import { gql, InMemoryCache, makeVar } from "@apollo/client";

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

// Strategies
export interface Strategies {
  ids: number[];
  entities: { [id: number]: Strategy };
}

export interface Strategy {
  id: number;
  name: string;
  description: string;
  indicators: IndicatorValue[];
}

export interface IndicatorValue {
  key: string;
  type: string;
  name: string;
  description: string;
  investopediaUrl: string;
  valueType: string;
  values: Values;
}

export interface Values {
  min: number;
  max: number;
  thresholdType: string;
}

export const thresholdTypes: ThresholdType[] = [
  {
    key: "above",
    name: "Above",
    mdbSelector: (values) => ({
      $gt: values.min,
    }),
  },
  {
    key: "aboveOrEqual",
    name: "Above or Equal",
    mdbSelector: (values) => ({
      $gte: values.min,
    }),
  },
  {
    key: "below",
    name: "Below",
    mdbSelector: (values) => ({
      $lt: values.min,
    }),
  },
  {
    key: "belowOrEqual",
    name: "Below or Equal",
    mdbSelector: (values) => ({
      $lte: values.min,
    }),
  },
  {
    key: "equal",
    name: "Equal",
    mdbSelector: (values) => ({
      $eq: values.min,
    }),
  },
  {
    key: "notEqual",
    name: "Not Equal",
    mdbSelector: (values) => ({
      $ne: values.min,
    }),
  },
  {
    key: "between",
    name: "Between",
    mdbSelector: (values) => ({
      $gt: values.min,
      $lt: values.max,
    }),
  },
  {
    key: "outside",
    name: "Outside",
    mdbSelector: (values) => ({
      $not: {
        $gt: values.min,
        $lt: values.max,
      },
    }),
  },
];

export interface ThresholdType {
  key: string;
  name: string;
  mdbSelector: (values: Values) => Object;
}

export const strategiesVar = makeVar<Strategies>(initStrategies());

function initStrategies(): Strategies {
  const stored = localStorage.getItem("strategies");
  if (stored) {
    return JSON.parse(stored);
  } else {
    return {
      ids: [],
      entities: {},
    };
  }
}

export const getNewStrategyId = () => {
  const mostRecent = strategiesVar().ids?.sort((a, b) => b - a)[0];
  const id = mostRecent != null ? mostRecent + 1 : 0;
  return id;
};

export const saveStrategy = (newStrategy: Strategy) => {
  const newStrategies: Strategies = {
    ids: [
      ...strategiesVar().ids.filter((id) => id !== newStrategy.id),
      newStrategy.id,
    ],
    entities: {
      ...strategiesVar().entities,
      [newStrategy.id]: newStrategy,
    },
  };
  strategiesVar(newStrategies);
  localStorage.setItem("strategies", JSON.stringify(strategiesVar()));
};

export const deleteStrategy = (id: Number) => {
  const newStrategies: Strategies = {
    ids: strategiesVar().ids.filter((i) => i !== id),
    entities: Object.fromEntries(
      Object.entries(strategiesVar().entities).filter(
        ([key, val]) => key !== id.toString()
      )
    ),
  };

  strategiesVar(newStrategies);
  localStorage.setItem("strategies", JSON.stringify(strategiesVar()));
};

// Favorites
export const favoritesVar = makeVar<string[]>(
  JSON.parse(localStorage.getItem("favorites") ?? "[]")
);

export const toggleFavoritedSymbol = (newSymbol: string) => {
  favoritesVar().includes(newSymbol)
    ? favoritesVar(favoritesVar().filter((symbol: any) => symbol !== newSymbol))
    : favoritesVar([...favoritesVar(), newSymbol]);
  localStorage.setItem("favorites", JSON.stringify(favoritesVar()));
};
