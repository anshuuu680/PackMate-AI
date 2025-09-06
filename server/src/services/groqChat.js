import groq from "../config/groq.config.js";

/**
 * @param {string} userMessage
 * @returns {Promise<string>}
 */
export async function getChatCompletion(userMessage) {
  try {
    const context = [
      {
        role: "system",
        content: "You will reply to every message in just 15 words.",
      },
      { role: "user", content: userMessage },
    ];

    const response = await groq.call(context);

    return response;
  } catch (error) {
    console.error("Groq Chat Error:", error);
    throw error;
  }
}
