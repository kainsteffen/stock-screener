import numeral from "numeral";
import { IndicatorValue } from "../gql/local-state";

export const parseIndicatorValue = (indicator: IndicatorValue, value: any) => {
  switch (indicator.valueType) {
    case "number":
      return parseFloat(value);
    case "bigNumber":
      return numeral(value).format("0.0a");
  }
};
