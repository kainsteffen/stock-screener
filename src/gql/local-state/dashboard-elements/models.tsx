import { makeVar } from "@apollo/client";

export const defaultDashboardElements: DashboardElement[] = [
  {
    key: "markets",
    name: "Markets",
    description: "Shows you the largest market indices worldwide",
    selected: true,
  },
  {
    key: "marketNews",
    name: "Market News",
    description: "Shows daily market news for your followed stocks",
    selected: true,
  },
  {
    key: "followed",
    name: "Followed",
    description:
      "Shows your currently followed stocks with their daily change and 52-week-range",
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
    key: "trending",
    name: "Trending",
    description:
      "Shows the most popular stocks being traded for the day with their daily change and 52-week-range",
    selected: false,
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
