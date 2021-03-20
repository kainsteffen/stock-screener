import { makeVar } from "@apollo/client";

export const defaultStrategies: { [key: string]: Strategy } = {
  growth: {
    id: 0,
    name: "Growth",
    description:
      "This strategy focuses on companies with rapid and significant growth in their business.\n\nGrowth investing is an investment style and strategy that is focused on increasing an investor's capital. Growth investors typically invest in growth stocks—that is, young or small companies whose earnings are expected to increase at an above-average rate compared to their industry sector or the overall market.\n\nGrowth investing is highly attractive to many investors because buying stock in emerging companies can provide impressive returns if the companies are successful. However, such companies are untried, and thus often pose a fairly high risk.",
    indicators: [
      {
        key: "beta5YMonthly",
        type: "threshold",
        name: "Beta (5Y Monthly)",
        description:
          "Beta is a measure of the volatility—or systematic risk—of a security or portfolio compared to the market as a whole. Beta is used in the capital asset pricing model (CAPM), which describes the relationship between systematic risk and expected return for assets (usually stocks). CAPM is widely used as a method for pricing risky securities and for generating estimates of the expected returns of assets, considering both the risk of those assets and the cost of capital.",
        investopediaUrl: "https://www.investopedia.com/terms/b/beta.asp",
        valueType: "number",
        values: {
          min: 1.2,
          max: 1,
          thresholdType: "above",
        },
      },
      {
        key: "priceToSales",
        type: "threshold",
        name: "Price/Sales",
        description:
          "The price-to-sales (P/S) ratio is a valuation ratio that compares a company’s stock price to its revenues. It is an indicator of the value that financial markets have placed on each dollar of a company’s sales or revenues.\n\nThe P/S ratio can be calculated either by dividing the company’s market capitalization by its total sales over a designated period (usually twelve months) or on a per-share basis by dividing the stock price by sales per share. The P/S ratio is also known as a sales multiple or revenue multiple.",
        investopediaUrl:
          "https://www.investopedia.com/terms/p/price-to-salesratio.asp",
        valueType: "number",
        values: {
          min: 45,
          max: 1,
          thresholdType: "below",
        },
      },
      {
        key: "quarterlyRevenueGrowth",
        type: "threshold",
        name: "Quarterly Revenue Growth",
        description:
          "Quarterly revenue growth is an increase in a company's sales in one quarter compared to sales of a different quarter. The current quarter's sales figure can be compared on a year-over-year basis (e.g., 3Q sales of Year 1 compared with 3Q sales of Year 2) or sequentially (3Q sales of Year 1 compared with 4Q sales of Year 1). This gives analysts, investors, and additional stakeholders an idea of how much a company's sales are increasing over time.",
        investopediaUrl:
          "https://www.investopedia.com/terms/q/quarterlyrevenuegrowth.asp",
        valueType: "percentage",
        values: {
          min: 0.4,
          max: 1.0000000000000001e-20,
          thresholdType: "above",
        },
      },
      {
        key: "marketCap",
        type: "threshold",
        name: "Market Cap",
        description:
          "Market capitalization refers to the total dollar market value of a company's outstanding shares of stock. Commonly referred to as \"market cap,\" it is calculated by multiplying the total number of a company's outstanding shares by the current market price of one share.\n\nAs an example, a company with 10 million shares selling for $100 each would have a market cap of $1 billion. The investment community uses this figure to determine a company's size, as opposed to using sales or total asset figures. In an acquisition, the market cap is used to determine whether a takeover candidate represents a good value or not to the acquirer.",
        investopediaUrl:
          "https://www.investopedia.com/terms/m/marketcapitalization.asp",
        valueType: "bigNumber",
        values: {
          min: 10000000000,
          max: 1,
          thresholdType: "above",
        },
      },
    ],
  },
  value: {
    id: 1,
    name: "Value",
    description:
      "This strategy focuses companies with low prices relative to their fundamentals.\n\nValue investing is an investment strategy that involves picking stocks that appear to be trading for less than their intrinsic or book value. Value investors actively ferret out stocks they think the stock market is underestimating. They believe the market overreacts to good and bad news, resulting in stock price movements that do not correspond to a company's long-term fundamentals. The overreaction offers an opportunity to profit by buying stocks at discounted prices—on sale.",
    indicators: [
      {
        key: "marketCap",
        type: "threshold",
        name: "Market Cap",
        description:
          "Market capitalization refers to the total dollar market value of a company's outstanding shares of stock. Commonly referred to as \"market cap,\" it is calculated by multiplying the total number of a company's outstanding shares by the current market price of one share.\n\nAs an example, a company with 10 million shares selling for $100 each would have a market cap of $1 billion. The investment community uses this figure to determine a company's size, as opposed to using sales or total asset figures. In an acquisition, the market cap is used to determine whether a takeover candidate represents a good value or not to the acquirer.",
        investopediaUrl:
          "https://www.investopedia.com/terms/m/marketcapitalization.asp",
        valueType: "bigNumber",
        values: {
          min: 10000000000,
          max: 1,
          thresholdType: "above",
        },
      },
      {
        key: "trailingPE",
        type: "threshold",
        name: "Trailing PE Ratio",
        description:
          "The price-to-earnings ratio (P/E ratio) is the ratio for valuing a company that measures its current share price relative to its per-share earnings (EPS). The price-to-earnings ratio is also sometimes known as the price multiple or the earnings multiple.\n\nP/E ratios are used by investors and analysts to determine the relative value of a company's shares in an apples-to-apples comparison. It can also be used to compare a company against its own historical record or to compare aggregate markets against one another or over time.",
        investopediaUrl:
          "https://www.investopedia.com/terms/p/price-earningsratio.asp",
        valueType: "number",
        values: {
          min: 20,
          max: 1,
          thresholdType: "below",
        },
      },
      {
        key: "priceToSales",
        type: "threshold",
        name: "Price/Sales",
        description:
          "The price-to-sales (P/S) ratio is a valuation ratio that compares a company’s stock price to its revenues. It is an indicator of the value that financial markets have placed on each dollar of a company’s sales or revenues.\n\nThe P/S ratio can be calculated either by dividing the company’s market capitalization by its total sales over a designated period (usually twelve months) or on a per-share basis by dividing the stock price by sales per share. The P/S ratio is also known as a sales multiple or revenue multiple.",
        investopediaUrl:
          "https://www.investopedia.com/terms/p/price-to-salesratio.asp",
        valueType: "number",
        values: {
          min: 10,
          max: 1,
          thresholdType: "below",
        },
      },
      {
        key: "profitMargin",
        type: "threshold",
        name: "Profit Margin",
        description:
          "Profit margin is one of the commonly used profitability ratios to gauge the degree to which a company or a business activity makes money. It represents what percentage of sales has turned into profits. Simply put, the percentage figure indicates how many cents of profit the business has generated for each dollar of sale. For instance, if a business reports that it achieved a 35% profit margin during the last quarter, it means that it had a net income of $0.35 for each dollar of sales generated.",
        investopediaUrl:
          "https://www.investopedia.com/terms/p/profitmargin.asp",
        valueType: "percentage",
        values: {
          min: 0.05,
          max: 0.01,
          thresholdType: "above",
        },
      },
    ],
  },
  dividends: {
    id: 2,
    name: "Dividends",
    description:
      "This strategy focuses on companies that regularly and reliably pay sizable dividends.\n\nA stock dividend is a dividend payment to shareholders that is made in shares rather than as cash. The stock dividend has the advantage of rewarding shareholders without reducing the company's cash balance, although it can dilute earnings per share.\n\nThese stock distributions are generally made as fractions paid per existing share. For example, a company might issue a stock dividend of 5%, which will require it to issue 0.05 shares for every share owned by existing shareholders, so the owner of 100 shares would receive five additional shares.",
    indicators: [
      {
        key: "marketCap",
        type: "threshold",
        name: "Market Cap",
        description:
          "Market capitalization refers to the total dollar market value of a company's outstanding shares of stock. Commonly referred to as \"market cap,\" it is calculated by multiplying the total number of a company's outstanding shares by the current market price of one share.\n\nAs an example, a company with 10 million shares selling for $100 each would have a market cap of $1 billion. The investment community uses this figure to determine a company's size, as opposed to using sales or total asset figures. In an acquisition, the market cap is used to determine whether a takeover candidate represents a good value or not to the acquirer.",
        investopediaUrl:
          "https://www.investopedia.com/terms/m/marketcapitalization.asp",
        valueType: "bigNumber",
        values: {
          min: 10000000000,
          max: 1,
          thresholdType: "above",
        },
      },
      {
        key: "forwardAnnualDividendYield",
        type: "threshold",
        name: "Forward Annual Dividend Yield",
        description:
          "A forward dividend yield is an estimation of a year's dividend expressed as a percentage of the current stock price. The year's projected dividend is measured by taking a stock's most recent actual dividend payment and annualizing it. The forward dividend yield is calculated by dividing a year's worth of future dividend payments by a stock's current share price.",
        investopediaUrl:
          "https://www.investopedia.com/terms/f/forward-dividend-yield.asp",
        valueType: "percentage",
        values: {
          min: 0.03,
          max: 0.0001,
          thresholdType: "above",
        },
      },
      {
        key: "trailingAnnualDividendYield",
        type: "threshold",
        name: "Trailing Annual Dividend Yield",
        description:
          "The opposite of a forward dividend yield is a trailing dividend yield, which shows a company's actual dividend payments relative to its share price over the previous 12 months. When future dividend payments are not predictable, the trailing dividend yield can be one way to measure value. When future dividend payments are predictable or have been announced, the forward dividend yield is a more accurate tool.",
        investopediaUrl:
          "https://www.investopedia.com/terms/f/forward-dividend-yield.asp",
        valueType: "percentage",
        values: {
          min: 0.03,
          max: 0.0001,
          thresholdType: "above",
        },
      },
      {
        key: "currentRatio",
        type: "threshold",
        name: "Current Ratio",
        description:
          "The current ratio is a liquidity ratio that measures a company's ability to pay short-term obligations or those due within one year. It tells investors and analysts how a company can maximize the current assets on its balance sheet to satisfy its current debt and other payables.",
        investopediaUrl:
          "https://www.investopedia.com/terms/c/currentratio.asp",
        valueType: "number",
        values: {
          min: 1,
          max: 1,
          thresholdType: "above",
        },
      },
      {
        key: "payOutRatio",
        type: "threshold",
        name: "Payout Ratio",
        description:
          "The payout ratio is a financial metric showing the proportion of earnings a company pays shareholders in the form of dividends, expressed as a percentage of the company's total earnings. On some occasions, the payout ratio refers to the dividends paid out as a percentage of a company's cash flow. The payout ratio is also known as the dividend payout ratio.",
        investopediaUrl: "https://www.investopedia.com/terms/p/payoutratio.asp",
        valueType: "percentage",
        values: {
          min: 0,
          max: 1,
          thresholdType: "above",
        },
      },
      {
        key: "5YearAverageDividendYield",
        type: "threshold",
        name: "5 Year Average Dividend Yield",
        description:
          "A dividend is the distribution of some of a company's earnings to a class of its shareholders, as determined by the company's board of directors. Common shareholders of dividend-paying companies are typically eligible as long as they own the stock before the ex-dividend date. Dividends may be paid out as cash or in the form of additional stock.",
        investopediaUrl: "https://www.investopedia.com/terms/d/dividend.asp",
        valueType: "number",
        values: {
          min: 3,
          max: 1,
          thresholdType: "above",
        },
      },
    ],
  },
  lowVolatility: {
    id: 3,
    name: "Low Volatility",
    description:
      'This strategy focuses on stocks with low price swings but reliable growth.\n\nVolatility is a statistical measure of the dispersion of returns for a given security or market index. In most cases, the higher the volatility, the riskier the security. Volatility is often measured as either the standard deviation or variance between returns from that same security or market index.\n\nIn the securities markets, volatility is often associated with big swings in either direction. For example, when the stock market rises and falls more than one percent over a sustained period of time, it is called a "volatile" market. An asset\'s volatility is a key factor when pricing options contracts.',
    indicators: [
      {
        key: "quarterlyEarningsGrowth",
        type: "threshold",
        name: "Quarterly Earnings Growth",
        description:
          "Quarterly revenue growth is an increase in a company's sales in one quarter compared to sales of a different quarter. The current quarter's sales figure can be compared on a year-over-year basis (e.g., 3Q sales of Year 1 compared with 3Q sales of Year 2) or sequentially (3Q sales of Year 1 compared with 4Q sales of Year 1). This gives analysts, investors, and additional stakeholders an idea of how much a company's sales are increasing over time.",
        investopediaUrl:
          "https://www.investopedia.com/terms/q/quarterlyrevenuegrowth.asp",
        valueType: "percentage",
        values: {
          min: 0.02,
          max: 0.15,
          thresholdType: "between",
        },
      },
      {
        key: "marketCap",
        type: "threshold",
        name: "Market Cap",
        description:
          "Market capitalization refers to the total dollar market value of a company's outstanding shares of stock. Commonly referred to as \"market cap,\" it is calculated by multiplying the total number of a company's outstanding shares by the current market price of one share.\n\nAs an example, a company with 10 million shares selling for $100 each would have a market cap of $1 billion. The investment community uses this figure to determine a company's size, as opposed to using sales or total asset figures. In an acquisition, the market cap is used to determine whether a takeover candidate represents a good value or not to the acquirer.",
        investopediaUrl:
          "https://www.investopedia.com/terms/m/marketcapitalization.asp",
        valueType: "bigNumber",
        values: {
          min: 10000000000,
          max: 1,
          thresholdType: "above",
        },
      },
      {
        key: "profitMargin",
        type: "threshold",
        name: "Profit Margin",
        description:
          "Profit margin is one of the commonly used profitability ratios to gauge the degree to which a company or a business activity makes money. It represents what percentage of sales has turned into profits. Simply put, the percentage figure indicates how many cents of profit the business has generated for each dollar of sale. For instance, if a business reports that it achieved a 35% profit margin during the last quarter, it means that it had a net income of $0.35 for each dollar of sales generated.",
        investopediaUrl:
          "https://www.investopedia.com/terms/p/profitmargin.asp",
        valueType: "percentage",
        values: {
          min: 0.02,
          max: 1,
          thresholdType: "above",
        },
      },
      {
        key: "forwardAnnualDividendYield",
        type: "threshold",
        name: "Forward Annual Dividend Yield",
        description:
          "A forward dividend yield is an estimation of a year's dividend expressed as a percentage of the current stock price. The year's projected dividend is measured by taking a stock's most recent actual dividend payment and annualizing it. The forward dividend yield is calculated by dividing a year's worth of future dividend payments by a stock's current share price.",
        investopediaUrl:
          "https://www.investopedia.com/terms/f/forward-dividend-yield.asp",
        valueType: "percentage",
        values: {
          min: 0.02,
          max: 1,
          thresholdType: "above",
        },
      },
      {
        key: "currentRatio",
        type: "threshold",
        name: "Current Ratio",
        description:
          "The current ratio is a liquidity ratio that measures a company's ability to pay short-term obligations or those due within one year. It tells investors and analysts how a company can maximize the current assets on its balance sheet to satisfy its current debt and other payables.",
        investopediaUrl:
          "https://www.investopedia.com/terms/c/currentratio.asp",
        valueType: "number",
        values: {
          min: 0.1,
          max: 1,
          thresholdType: "above",
        },
      },
    ],
  },
  quality: {
    id: 5,
    name: "Quality",
    description:
      "This strategy focuses on stable companies with strong balance sheets and assets.",
    indicators: [
      {
        key: "marketCap",
        type: "threshold",
        name: "Market Cap",
        description:
          "Market capitalization refers to the total dollar market value of a company's outstanding shares of stock. Commonly referred to as \"market cap,\" it is calculated by multiplying the total number of a company's outstanding shares by the current market price of one share.\n\nAs an example, a company with 10 million shares selling for $100 each would have a market cap of $1 billion. The investment community uses this figure to determine a company's size, as opposed to using sales or total asset figures. In an acquisition, the market cap is used to determine whether a takeover candidate represents a good value or not to the acquirer.",
        investopediaUrl:
          "https://www.investopedia.com/terms/m/marketcapitalization.asp",
        valueType: "bigNumber",
        values: {
          min: 20000000000,
          max: 1,
          thresholdType: "above",
        },
      },
      {
        key: "forwardPE",
        type: "threshold",
        name: "Forward PE Ratio",
        description:
          "The price-to-earnings ratio (P/E ratio) is the ratio for valuing a company that measures its current share price relative to its per-share earnings (EPS). The price-to-earnings ratio is also sometimes known as the price multiple or the earnings multiple.\n\nP/E ratios are used by investors and analysts to determine the relative value of a company's shares in an apples-to-apples comparison. It can also be used to compare a company against its own historical record or to compare aggregate markets against one another or over time.",
        investopediaUrl:
          "https://www.investopedia.com/terms/p/price-earningsratio.asp",
        valueType: "number",
        values: {
          min: 25,
          max: 1,
          thresholdType: "below",
        },
      },
      {
        key: "priceToSales",
        type: "threshold",
        name: "Price/Sales",
        description:
          "The price-to-sales (P/S) ratio is a valuation ratio that compares a company’s stock price to its revenues. It is an indicator of the value that financial markets have placed on each dollar of a company’s sales or revenues.\n\nThe P/S ratio can be calculated either by dividing the company’s market capitalization by its total sales over a designated period (usually twelve months) or on a per-share basis by dividing the stock price by sales per share. The P/S ratio is also known as a sales multiple or revenue multiple.",
        investopediaUrl:
          "https://www.investopedia.com/terms/p/price-to-salesratio.asp",
        valueType: "number",
        values: {
          min: 15,
          max: 1,
          thresholdType: "below",
        },
      },
      {
        key: "currentRatio",
        type: "threshold",
        name: "Current Ratio",
        description:
          "The current ratio is a liquidity ratio that measures a company's ability to pay short-term obligations or those due within one year. It tells investors and analysts how a company can maximize the current assets on its balance sheet to satisfy its current debt and other payables.",
        investopediaUrl:
          "https://www.investopedia.com/terms/c/currentratio.asp",
        valueType: "number",
        values: {
          min: 1,
          max: 1,
          thresholdType: "above",
        },
      },
      {
        key: "bookValuePerShare",
        type: "threshold",
        name: "Book Value Per Share",
        description:
          "Book value per share (BVPS) is the ratio of equity available to common shareholders divided by the number of outstanding shares. This figure represents the minimum value of a company's equity and measures the book value of a firm on a per-share basis.",
        investopediaUrl: "https://www.investopedia.com/terms/b/bvps.asp",
        valueType: "number",
        values: {
          min: 10,
          max: 1,
          thresholdType: "above",
        },
      },
      {
        key: "revenuePerShare",
        type: "threshold",
        name: "Revenue Per Share",
        description:
          "Sales per share is a ratio that computes the total revenue earned per share over a designated period, whether quarterly, semi-annually, annually, or trailing twelve months (TTM). It is calculated by dividing total revenue by average total shares outstanding. It is also known as revenue per share.",
        investopediaUrl:
          "https://www.investopedia.com/terms/s/salespershare.asp",
        valueType: "number",
        values: {
          min: 10,
          max: 1,
          thresholdType: "above",
        },
      },
    ],
  },
  smallSize: {
    id: 6,
    name: "Small Size",
    description:
      "This strategy focuses on companies with a low market capitalization.\n\nThe meanings of big-cap and small-cap are generally understood by their names, which indicate how valuable they are in terms of market capitalization. Big-cap stocks—also referred to as large-cap stocks—are shares of larger companies. Small-cap stocks, on the other hand, are shares of smaller companies.\n\nLabels like these can often be misleading because many people run under the assumption that they can only make money by investing in large-cap stocks. And that can't be further from the truth—especially nowadays. If you don't realize how big small-cap stocks have become, you'll miss some good investment opportunities.\n\nSmall-cap stocks are considered good investments due to their low valuations and potential to grow into big-cap stocks, but the definition of a small-cap has changed over time. What was considered a big cap stock in 1980 is now a small-cap stock today. This article will define the caps and provide additional information to help investors understand terms that are often taken for granted.",
    indicators: [
      {
        key: "marketCap",
        type: "threshold",
        name: "Market Cap",
        description:
          "Market capitalization refers to the total dollar market value of a company's outstanding shares of stock. Commonly referred to as \"market cap,\" it is calculated by multiplying the total number of a company's outstanding shares by the current market price of one share.\n\nAs an example, a company with 10 million shares selling for $100 each would have a market cap of $1 billion. The investment community uses this figure to determine a company's size, as opposed to using sales or total asset figures. In an acquisition, the market cap is used to determine whether a takeover candidate represents a good value or not to the acquirer.",
        investopediaUrl:
          "https://www.investopedia.com/terms/m/marketcapitalization.asp",
        valueType: "bigNumber",
        values: {
          min: 10000000000,
          max: 1,
          thresholdType: "below",
        },
      },
      {
        key: "priceToSales",
        type: "threshold",
        name: "Price/Sales",
        description:
          "The price-to-sales (P/S) ratio is a valuation ratio that compares a company’s stock price to its revenues. It is an indicator of the value that financial markets have placed on each dollar of a company’s sales or revenues.\n\nThe P/S ratio can be calculated either by dividing the company’s market capitalization by its total sales over a designated period (usually twelve months) or on a per-share basis by dividing the stock price by sales per share. The P/S ratio is also known as a sales multiple or revenue multiple.",
        investopediaUrl:
          "https://www.investopedia.com/terms/p/price-to-salesratio.asp",
        valueType: "number",
        values: {
          min: 30,
          max: 1,
          thresholdType: "below",
        },
      },
      {
        key: "currentRatio",
        type: "threshold",
        name: "Current Ratio",
        description:
          "The current ratio is a liquidity ratio that measures a company's ability to pay short-term obligations or those due within one year. It tells investors and analysts how a company can maximize the current assets on its balance sheet to satisfy its current debt and other payables.",
        investopediaUrl:
          "https://www.investopedia.com/terms/c/currentratio.asp",
        valueType: "number",
        values: {
          min: 0.5,
          max: 1,
          thresholdType: "above",
        },
      },
      {
        key: "quarterlyRevenueGrowth",
        type: "threshold",
        name: "Quarterly Revenue Growth",
        description:
          "Quarterly revenue growth is an increase in a company's sales in one quarter compared to sales of a different quarter. The current quarter's sales figure can be compared on a year-over-year basis (e.g., 3Q sales of Year 1 compared with 3Q sales of Year 2) or sequentially (3Q sales of Year 1 compared with 4Q sales of Year 1). This gives analysts, investors, and additional stakeholders an idea of how much a company's sales are increasing over time.",
        investopediaUrl:
          "https://www.investopedia.com/terms/q/quarterlyrevenuegrowth.asp",
        valueType: "percentage",
        values: {
          min: 1,
          max: 1,
          thresholdType: "above",
        },
      },
      {
        key: "quarterlyEarningsGrowth",
        type: "threshold",
        name: "Quarterly Earnings Growth",
        description:
          "Quarterly revenue growth is an increase in a company's sales in one quarter compared to sales of a different quarter. The current quarter's sales figure can be compared on a year-over-year basis (e.g., 3Q sales of Year 1 compared with 3Q sales of Year 2) or sequentially (3Q sales of Year 1 compared with 4Q sales of Year 1). This gives analysts, investors, and additional stakeholders an idea of how much a company's sales are increasing over time.",
        investopediaUrl:
          "https://www.investopedia.com/terms/q/quarterlyrevenuegrowth.asp",
        valueType: "percentage",
        values: {
          min: 0.1,
          max: 1,
          thresholdType: "above",
        },
      },
    ],
  },
};

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
