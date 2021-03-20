import { Strategies, strategiesVar, Strategy } from "./models";

export const getNewStrategyId = () => {
  const mostRecent = strategiesVar().ids?.sort((a, b) => b - a)[0];
  const id = mostRecent != null ? mostRecent + 1 : 0;
  return id;
};

export const saveStrategy = (newStrategy: Strategy) => {
  const newStrategies: Strategies = {
    ids: [
      ...strategiesVar().ids.filter((id) => id !== newStrategy.id),
      newStrategy.id,
    ],
    entities: {
      ...strategiesVar().entities,
      [newStrategy.id]: newStrategy,
    },
  };
  strategiesVar(newStrategies);
  localStorage.setItem("strategies", JSON.stringify(strategiesVar()));
};

export const deleteStrategy = (id: Number) => {
  const newStrategies: Strategies = {
    ids: strategiesVar().ids.filter((i) => i !== id),
    entities: Object.fromEntries(
      Object.entries(strategiesVar().entities).filter(
        ([key, val]) => key !== id.toString()
      )
    ),
  };

  strategiesVar(newStrategies);
  localStorage.setItem("strategies", JSON.stringify(strategiesVar()));
};
