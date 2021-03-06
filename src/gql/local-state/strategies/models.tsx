import { makeVar } from "@apollo/client";

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
