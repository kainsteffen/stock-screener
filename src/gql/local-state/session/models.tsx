import { makeVar } from "@apollo/client";

const defaultSession: Session = {
  firstTime: true,
};

export interface Session {
  firstTime: boolean;
}

export const sessionVar = makeVar<Session>(
  JSON.parse(localStorage.getItem("session") ?? JSON.stringify(defaultSession))
);
