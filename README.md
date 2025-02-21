# AI-ChatBot

-> Technologies & Tools Used
1. Frontend: HTML, CSS, JavaScript
2. Styling: Custom CSS
3. Backend API: Google Gemini API
4. Security: Cloudflare Workers (to protect API key)

-> Project Overview
A simple chatbot web application that interacts with the Google Gemini API to generate AI responses. It provides a smooth chat experience with a user-friendly interface and predefined prompts for quick responses.

-> How It Works
1. User types a message and submits it.
2. The input is displayed in the chat interface.
3. A request is sent to Cloudflare Workers, which forwards it to the Google Gemini API.
4. The API processes the input and returns a response.
5. The response is displayed in the chat interface.
6. User can delete the chats.
