import { sessionVar } from "./models";

export const setFirstTime = (firstTime: boolean) => {
  const session = sessionVar();
  const newSession = {
    ...session,
    firstTime: firstTime,
  };
  sessionVar(newSession);
  localStorage.setItem("session", JSON.stringify(sessionVar()));
};

export const toggleDarkMode = () => {
  const session = sessionVar();
  const newSession = {
    ...session,
    darkMode: !session.darkMode,
  };
  sessionVar(newSession);
  localStorage.setItem("session", JSON.stringify(sessionVar()));
};
