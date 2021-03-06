import { IndicatorValue, Strategy, thresholdTypes } from "../gql/cache";

export const strategyToMdbQuery = (strategy: Strategy): string => {
  if (strategy) {
    const parsedInds = strategy.indicators.map((indicator) =>
      indicatorToMdbOperator(indicator)
    );
    const query = parsedInds.reduce(
      (final, indicator) =>
        Object.assign(final, { [indicator.key]: indicator.value }),
      {}
    );
    return JSON.stringify(query);
  } else {
    return "";
  }
};

const indicatorToMdbOperator = (indicator: IndicatorValue) => {
  const value = thresholdTypes
    .find((type) => type.key === indicator.values.thresholdType)
    ?.mdbSelector(indicator.values);
  switch (indicator.key) {
    case "marketCap":
      return {
        key: "quote_table.marketCap",
        value: value,
      };
    case "trailingPe":
      return {
        key: "stats.trailingPE",
        value: value,
      };
    default:
      return {
        key: "",
        value: 0,
      };
  }
};
