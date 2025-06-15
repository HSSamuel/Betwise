// src/api/aiService.js

// This file centralizes all API calls to the AI-powered backend endpoints.

const AI_API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

/**
 * Sends a message to the AI chatbot and gets a response.
 * Corresponds to: POST /ai/chat
 * @param {string} message - The user's message to the bot.
 * @param {Array} history - The previous chat history.
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} The AI's reply.
 */
export const handleChat = async (message, history, token) => {
  const response = await fetch(`${AI_API_URL}/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message, history }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.msg || "Failed to get chat response.");
  }
  return data;
};

/**
 * Sends a natural language string to be parsed into a bet slip.
 * Corresponds to: POST /ai/parse-bet-intent
 * @param {string} text - The user's natural language bet request (e.g., "bet 500 on Chelsea").
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} The structured bet slip object.
 */
export const parseBetIntent = async (text, token) => {
  const response = await fetch(`${AI_API_URL}/ai/parse-bet-intent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to parse bet intent.");
  }
  return data;
};

/**
 * Gets an AI-powered analysis for a specific upcoming game.
 * Corresponds to: POST /ai/analyze-game
 * @param {string} gameId - The ID of the game to analyze.
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} The AI's analysis text.
 */
export const analyzeGame = async (gameId, token) => {
  const response = await fetch(`${AI_API_URL}/ai/analyze-game`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ gameId }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.msg || "Failed to analyze game.");
  }
  return data;
};

/**
 * Gets personalized, non-judgmental feedback on recent betting patterns.
 * Corresponds to: GET /ai/my-betting-feedback
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} The AI's feedback message.
 */
export const getBettingFeedback = async (token) => {
  const response = await fetch(`${AI_API_URL}/ai/my-betting-feedback`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.msg || "Failed to get betting feedback.");
  }
  return data;
};

/**
 * Gets an AI-powered suggestion for weekly betting limits.
 * Corresponds to: GET /ai/limit-suggestion
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} The AI's suggested limits and message.
 */
export const generateLimitSuggestion = async (token) => {
  const response = await fetch(`${AI_API_URL}/ai/limit-suggestion`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.msg || "Failed to generate limit suggestion.");
  }
  return data;
};
