import { dashboardElementsVar } from "./models";

export const toggleSelectedDashboardElement = (key: string) => {
  const newArr = dashboardElementsVar().map((element) => {
    if (element.key === key) {
      return { ...element, selected: !element.selected };
    }
    return element;
  });
  dashboardElementsVar(newArr);
  localStorage.setItem(
    "dashboardElements",
    JSON.stringify(dashboardElementsVar())
  );
};

export const reorderDashboardElement = (from: number, to: number) => {
  // Slice existing array to create a new array reference
  // or else the reactive var won't detect an update
  const arr = dashboardElementsVar().slice();
  const item = arr.splice(from, 1)[0];
  arr.splice(to, 0, item);
  dashboardElementsVar(arr);
  localStorage.setItem(
    "dashboardElements",
    JSON.stringify(dashboardElementsVar())
  );
};
