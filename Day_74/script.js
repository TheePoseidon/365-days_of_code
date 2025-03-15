document.addEventListener("DOMContentLoaded", function () {
    const chatToggle = document.getElementById("chat-toggle");
    const chatWindow = document.querySelector(".chat-window");
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const sendChat = document.getElementById("send-chat");

    chatToggle.addEventListener("click", function () {
        chatWindow.style.display = chatWindow.style.display === "block" ? "none" : "block";
    });

    sendChat.addEventListener("click", function () {
        sendMessage();
    });

    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === "") return;

        const userMessage = document.createElement("div");
        userMessage.textContent = "You: " + message;
        chatMessages.appendChild(userMessage);

        chatInput.value = "";

        setTimeout(() => {
            const botMessage = document.createElement("div");
            botMessage.textContent = "Bot: I'm here to assist you!";
            chatMessages.appendChild(botMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
});