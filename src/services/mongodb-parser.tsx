import { IndicatorValue, Strategy, thresholdTypes } from "../gql/local-state";

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
        key: "stats.marketCap",
        value: value,
      };
    case "trailingPE":
      return {
        key: "stats.trailingPE",
        value: value,
      };
    case "forwardPE":
      return {
        key: "stats.forwardPE",
        value: value,
      };
    case "pegRatio":
      return {
        key: "stats.pegRatio",
        value: value,
      };
    case "priceToSales":
      return {
        key: "stats.priceToSales",
        value: value,
      };
    case "priceToBook":
      return {
        key: "stats.priceToBook",
        value: value,
      };
    case "eps":
      return {
        key: "stats.eps",
        value: value,
      };
    case "enterpriseValue":
      return {
        key: "stats.enterpriseValue",
        value: value,
      };
    case "beta5YMonthly":
      return {
        key: "stats.beta5YMonthly",
        value: value,
      };
    case "enterPriseValueToRevenue":
      return {
        key: "stats.enterPriseValueToRevenue",
        value: value,
      };
    case "enterPriseValueToEbitda":
      return {
        key: "stats.enterPriseValueToEbitda",
        value: value,
      };
    case "avgVol3Month":
      return {
        key: "stats.avgVol3Month",
        value: value,
      };
    case "avgVol10Day":
      return {
        key: "stats.avgVol10Day",
        value: value,
      };
    case "avgVolume":
      return {
        key: "stats.avgVolume",
        value: value,
      };
    case "sharesOutstanding":
      return {
        key: "stats.sharesOutstanding",
        value: value,
      };
    case "float":
      return {
        key: "stats.float",
        value: value,
      };
    case "percentageHeldbyInsiders":
      return {
        key: "stats.percentageHeldbyInsiders",
        value: value,
      };
    case "percentageHeldByInstitutions":
      return {
        key: "stats.percentageHeldByInstitutions",
        value: value,
      };
    case "sharesShort":
      return {
        key: "stats.sharesShort",
        value: value,
      };
    case "shortRatio":
      return {
        key: "stats.shortRatio",
        value: value,
      };
    case "shortPercentageOfFloat":
      return {
        key: "stats.shortPercentageOfFloat",
        value: value,
      };
    case "shortPercentageOfSharesOutstanding":
      return {
        key: "stats.shortPercentageOfSharesOutstanding",
        value: value,
      };
    case "forwardAnnualDividendRate":
      return {
        key: "stats.forwardAnnualDividendRate",
        value: value,
      };
    case "forwardAnnualDividendYield":
      return {
        key: "stats.forwardAnnualDividendYield",
        value: value,
      };
    case "trailingAnnualDividendRate":
      return {
        key: "stats.trailingAnnualDividendRate",
        value: value,
      };
    case "trailingAnnualDividendYield":
      return {
        key: "stats.trailingAnnualDividendYield",
        value: value,
      };
    case "5YearAverageDividendYield":
      return {
        key: "stats.5YearAverageDividendYield",
        value: value,
      };
    case "payOutRatio":
      return {
        key: "stats.payOutRatio",
        value: value,
      };
    case "profitMargin":
      return {
        key: "stats.profitMargin",
        value: value,
      };
    case "operatingMargin":
      return {
        key: "stats.operatingMargin",
        value: value,
      };
    case "returnOnAssets":
      return {
        key: "stats.returnOnAssets",
        value: value,
      };
    case "returnOnEquity":
      return {
        key: "stats.returnOnEquity",
        value: value,
      };
    case "revenue":
      return {
        key: "stats.revenue",
        value: value,
      };
    case "revenuePerShare":
      return {
        key: "stats.revenuePerShare",
        value: value,
      };
    case "quarterlyRevenueGrowth":
      return {
        key: "stats.quarterlyRevenueGrowth",
        value: value,
      };
    case "grossProfit":
      return {
        key: "stats.grossProfit",
        value: value,
      };
    case "ebitda":
      return {
        key: "stats.ebitda",
        value: value,
      };
    case "netIncomeAviToCommon":
      return {
        key: "stats.netIncomeAviToCommon",
        value: value,
      };
    case "dilutedEps":
      return {
        key: "stats.dilutedEps",
        value: value,
      };
    case "quarterlyEarningsGrowth":
      return {
        key: "stats.quarterlyEarningsGrowth",
        value: value,
      };
    case "totalCash":
      return {
        key: "stats.totalCash",
        value: value,
      };
    case "totalCashPerShare":
      return {
        key: "stats.totalCashPerShare",
        value: value,
      };
    case "totalDebt":
      return {
        key: "stats.totalDebt",
        value: value,
      };
    case "totalDebtPerEquity":
      return {
        key: "stats.totalDebtPerEquity",
        value: value,
      };
    case "currentRatio":
      return {
        key: "stats.currentRatio",
        value: value,
      };
    case "bookValuePerShare":
      return {
        key: "stats.bookValuePerShare",
        value: value,
      };
    case "operatingCashFlow":
      return {
        key: "stats.operatingCashFlow",
        value: value,
      };
    case "leveredFreeCashFlow":
      return {
        key: "stats.leveredFreeCashFlow",
        value: value,
      };
    default:
      return {
        key: "",
        value: 0,
      };
  }
};
