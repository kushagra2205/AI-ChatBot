const chatsContainer = document.querySelector(".chats-container");
const promptForm = document.querySelector(".prompt-form");
const promptInput = document.querySelector(".prompt-input");
const header = document.querySelector(".header");
const suggestionsContainer = document.querySelector(".suggestions");

// CloudFlare Workers for keeping API safe
const API_URL = "https://aichatbotapi.kushagra-maihar22.workers.dev/";

let userMessage = "";
const chatHistory = [];

// Function to create message element
const createMsgElement = (content, className) => {
    const div = document.createElement("div");
    div.classList.add("message", className);
    div.innerHTML = content;
    return div;
};

const scrollToBottom = () => {
    chatsContainer.scrollTop = chatsContainer.scrollHeight;
};

const generateResponse = async (botMsgDiv) => {
    const textElement = botMsgDiv.querySelector(".message-text");

    chatHistory.push({
        role: "user",
        parts: [{ text: userMessage }]
    });

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: chatHistory })
        });

        const data = await response.json();

        if (!response.ok || !data.candidates || !data.candidates[0].content.parts) {
            throw new Error("Invalid response from API");
        }

        const responseText = data.candidates[0].content.parts[0].text.replace(/\*\*([^*]+)\*\*/g, "$1").trim();
        textElement.textContent = responseText; // Update bot message
    } catch (error) {
        console.error(error);
        textElement.textContent = "Error: Unable to fetch response.";
    }
};

// Handle Form Submission
const handleFormSubmit = (e) => {
    e.preventDefault();
    userMessage = promptInput.value.trim();
    if (!userMessage) return;

    header.style.display = "none";
    suggestionsContainer.style.display = "none";

    // Create and append user message
    const userMsgDiv = createMsgElement(`<p class="message-text">${userMessage}</p>`, "user-message");
    chatsContainer.appendChild(userMsgDiv);
    setTimeout(scrollToBottom, 150);

    promptInput.value = ""; // Clear input after sending

    setTimeout(() => {
        // Create bot message element first
        const botMsgDiv = createMsgElement(
            `<img src="logo.svg" alt="" class="avatar"><p class="message-text">Just a sec...</p>`,
            "bot-message"
        );

        chatsContainer.appendChild(botMsgDiv);
        setTimeout(scrollToBottom, 150);
        generateResponse(botMsgDiv); // Pass the bot message element
    }, 200);
};

document.querySelectorAll(".suggestions-item").forEach(item => {
    item.addEventListener("click", () => {
        promptInput.value = item.querySelector(".text").textContent;
    });
});

document.querySelector("#delete-chats-btn").addEventListener("click", () => {
    chatHistory.length = 0;
    chatsContainer.innerHTML = "";

    header.style.display = "block";
    suggestionsContainer.style.display = "flex";
});

promptForm.addEventListener("submit", handleFormSubmit);
