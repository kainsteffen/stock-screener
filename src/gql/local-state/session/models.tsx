import { makeVar } from "@apollo/client";

const defaultSession: Session = {
  firstTime: true,
  darkMode: true,
};

export interface Session {
  firstTime: boolean;
  darkMode: boolean;
}

export const sessionVar = makeVar<Session>(
  JSON.parse(localStorage.getItem("session") ?? JSON.stringify(defaultSession))
);
