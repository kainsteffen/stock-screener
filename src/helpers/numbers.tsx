import numeral from "numeral";

export const parseIndicatorValue = (value: any, valueType: string) => {
  switch (valueType) {
    case "number":
      return parseFloat(value);
    case "bigNumber":
      return numeral(value).format("0.0a").toUpperCase();
    case "percentage":
      return numeral(value).format("0.00%");
  }
};
