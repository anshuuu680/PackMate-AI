import { ChatGroq } from "@langchain/groq";

const groq = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0,
});

export default groq;
