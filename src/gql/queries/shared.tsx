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
