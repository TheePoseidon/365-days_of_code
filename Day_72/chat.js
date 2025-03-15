document.addEventListener('DOMContentLoaded', () => {
    const chatWidget = document.getElementById('chatWidget');
    const chatToggleButton = document.getElementById('chatToggleButton');
    const toggleChat = document.getElementById('toggleChat');
    const messageInput = document.getElementById('messageInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    // Toggle chat widget visibility
    function toggleChatWidget() {
        const isVisible = chatWidget.style.display === 'flex';
        chatWidget.style.display = isVisible ? 'none' : 'flex';
    }

    chatToggleButton.addEventListener('click', toggleChatWidget);
    toggleChat.addEventListener('click', toggleChatWidget);

    // Send message function
    function sendMessageHandler() {
        const message = messageInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'sent');
            
            // Clear input
            messageInput.value = '';

            // Simulate response (you can replace this with actual backend integration)
            setTimeout(() => {
                const responses = [
                    "Thank you for your message! Our team will get back to you soon.",
                    "Hello! How can we assist you further?",
                    "Thanks for reaching out! We're here to help with any questions about Bitcoin adoption in Africa."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'received');
            }, 1000);
        }
    }

    // Add message to chat
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const messageP = document.createElement('p');
        messageP.textContent = text;
        
        messageDiv.appendChild(messageP);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Event listeners
    sendMessage.addEventListener('click', sendMessageHandler);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessageHandler();
        }
    });
}); 