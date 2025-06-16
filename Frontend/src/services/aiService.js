import api from "./api";

export const handleChat = async (message, history) => {
  const response = await api.post("/ai/chat", { message, history });
  return response.data;
};

export const parseBetIntent = async (text) => {
  const response = await api.post("/ai/parse-bet-intent", { text });
  return response.data;
};

export const analyzeGame = async (gameId) => {
  const response = await api.post("/ai/analyze-game", { gameId });
  return response.data;
};

export const getBettingFeedback = async () => {
  const response = await api.get("/ai/my-betting-feedback");
  return response.data;
};

export const generateLimitSuggestion = async () => {
  const response = await api.get("/ai/limit-suggestion");
  return response.data;
};
