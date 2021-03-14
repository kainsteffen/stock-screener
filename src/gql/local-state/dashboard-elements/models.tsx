import { makeVar } from "@apollo/client";

export const defaultDashboardElements: DashboardElement[] = [
  {
    key: "trending",
    name: "Trending",
    description:
      "Shows the most popular stocks being traded for the day with their daily changes and 52-week-ranges",
    selected: true,
  },
  {
    key: "upcomingEvents",
    name: "Upcoming Events",
    description:
      "Shows upcoming events for your followed stocks such as ex-dividend, dividend payout and earnings call dates",
    selected: true,
  },

  {
    key: "marketNews",
    name: "Market News",
    description: "Shows daily market news for your followed stocks",
    selected: true,
  },
];

export interface DashboardElement {
  key: string;
  name: string;
  description: string;
  selected: boolean;
}

export const dashboardElementsVar = makeVar<DashboardElement[]>(
  JSON.parse(
    localStorage.getItem("dashboardElements") ??
      JSON.stringify(defaultDashboardElements)
  )
);
