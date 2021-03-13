import { gql } from "@apollo/client";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const QUOTE = gql`
  query getQuote($symbol: String!) {
    symbol(symbol: $symbol) {
      quote {
        symbol
        companyName
        latestPrice
        changePercent
      }
    }
  }
`;

export const COMPANY = gql`
  query getCompany($symbol: String!) {
    company(symbol: $symbol) {
      symbol
      companyName
      employees
      exchange
      industry
      website
      description
      CEO
      securityName
      issueType
      sector
      primarySicCode
      tags
      address
      address2
      state
      city
      zip
      country
      phone
    }
  }
`;

export const LOGO = gql`
  query getLogo($symbol: String!) {
    logo(symbol: $symbol) {
      url
    }
  }
`;

export const KEY_STATS = gql`
  query getKeyStats($symbol: String!) {
    keyStats(symbol: $symbol) {
      companyName
      marketcap
      week52high
      week52low
      week52highSplitAdjustOnly
      week52lowSplitAdjustOnly
      week52change
      sharesOutstanding
      float
      avg10Volume
      avg30Volume
      day200MovingAvg
      day50MovingAvg
      employees
      ttmEPS
      ttmDividendRate
      dividendYield
      nextDividendDate
      exDividendDate
      nextEarningsDate
      peRatio
      beta
      maxChangePercent
      year5ChangePercent
      year2ChangePercent
      year1ChangePercent
      ytdChangePercent
      month6ChangePercent
      month3ChangePercent
      month1ChangePercent
      day30ChangePercent
      day5ChangePercent
    }
  }
`;

export const FUNDAMENTALS = gql`
  query getCompany($symbol: String!) {
    fundamentals(symbol: $symbol) {
      name
      symbol
      fiftyTwoWeekRange
      # ---------------------------
      marketCap
      trailingPE
      forwardPE
      pegRatio
      priceToSales
      priceToBook
      eps
      enterpriseValue
      beta5YMonthly
      enterPriseValueToRevenue
      enterPriseValueToEbitda
      avgVol3Month
      avgVol10Day
      avgVolume
      sharesOutstanding
      float
      percentageHeldbyInsiders
      percentageHeldByInstitutions
      sharesShort
      shortRatio
      shortPercentageOfFloat
      shortPercentageOfSharesOutstanding
      forwardAnnualDividendRate
      forwardAnnualDividendYield
      trailingAnnualDividendRate
      trailingAnnualDividendYield
      fiveYearAverageDividendYield
      payOutRatio
      profitMargin
      operatingMargin
      returnOnAssets
      returnOnEquity
      revenue
      revenuePerShare
      quarterlyRevenueGrowth
      grossProfit
      ebitda
      netIncomeAviToCommon
      dilutedEps
      quarterlyEarningsGrowth
      totalCash
      totalCashPerShare
      totalDebt
      totalDebtPerEquity
      currentRatio
      bookValuePerShare
      operatingCashFlow
      leveredFreeCashFlow
    }
  }
`;
