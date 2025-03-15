document.addEventListener("DOMContentLoaded", function () {
    // Initialize components
    initializeChatbot();
    loadDashboardData();
    setupEventListeners();
});

// Chatbot functionality
function initializeChatbot() {
    const chatToggle = document.getElementById("chat-toggle");
    const chatWindow = document.querySelector(".chat-window");
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const sendChat = document.getElementById("send-chat");
    const minimizeChat = document.querySelector(".minimize-chat");

    chatToggle.addEventListener("click", () => {
        chatWindow.classList.toggle("show");
        chatInput.focus();
    });

    minimizeChat.addEventListener("click", () => {
        chatWindow.classList.remove("show");
    });

    sendChat.addEventListener("click", () => sendMessage());
    
    chatInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === "") return;

        // Add user message
        appendMessage("user", message);
        chatInput.value = "";

        // Simulate AI response
        simulateTyping().then(() => {
            const responses = [
                "I can help you with that!",
                "Let me check that for you.",
                "Here's what I found...",
                "That's an interesting question.",
                "I'm processing your request."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            appendMessage("bot", randomResponse);
        });
    }

    function appendMessage(sender, text) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `chat-message ${sender}-message`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function simulateTyping() {
        const typingIndicator = document.createElement("div");
        typingIndicator.className = "chat-message bot-message typing";
        typingIndicator.textContent = "AI is typing...";
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        return new Promise(resolve => {
            setTimeout(() => {
                typingIndicator.remove();
                resolve();
            }, 1500);
        });
    }
}

// Dashboard functionality
function loadDashboardData() {
    loadCourses();
    loadNotifications();
    updateUserProfile();
}

function loadCourses() {
    const courseList = document.getElementById("course-list");
    const courses = [
        {
            title: "Introduction to Computer Science",
            progress: 75,
            instructor: "Dr. Smith",
            image: "assets/course1.jpg"
        },
        {
            title: "Web Development Fundamentals",
            progress: 60,
            instructor: "Prof. Johnson",
            image: "assets/course2.jpg"
        },
        {
            title: "Data Structures and Algorithms",
            progress: 45,
            instructor: "Dr. Williams",
            image: "assets/course3.jpg"
        }
    ];

    courses.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.className = "course-card";
        courseCard.innerHTML = `
            <img src="${course.image}" alt="${course.title}" class="course-image">
            <h3>${course.title}</h3>
            <p>Instructor: ${course.instructor}</p>
            <div class="progress-bar">
                <div class="progress" style="width: ${course.progress}%"></div>
            </div>
            <p class="progress-text">${course.progress}% Complete</p>
        `;
        courseList.appendChild(courseCard);
    });
}

function loadNotifications() {
    const notificationList = document.getElementById("notification-list");
    const notifications = [
        {
            title: "Assignment Due",
            message: "Web Development project due in 2 days",
            time: "2 hours ago"
        },
        {
            title: "New Course Material",
            message: "New lectures uploaded in CS101",
            time: "1 day ago"
        },
        {
            title: "Grade Posted",
            message: "Your Data Structures quiz has been graded",
            time: "2 days ago"
        }
    ];

    notifications.forEach(notification => {
        const notificationItem = document.createElement("div");
        notificationItem.className = "notification-item";
        notificationItem.innerHTML = `
            <h4>${notification.title}</h4>
            <p>${notification.message}</p>
            <span class="notification-time">${notification.time}</span>
        `;
        notificationList.appendChild(notificationItem);
    });
}

function updateUserProfile() {
    const profileName = document.querySelector(".profile-name");
    const profileRole = document.querySelector(".profile-role");
    
    // In a real application, this would come from your backend
    const userData = {
        name: "John Doe",
        role: "Computer Science Student"
    };
    
    if (profileName) profileName.textContent = userData.name;
    if (profileRole) profileRole.textContent = userData.role;
}

function setupEventListeners() {
    // Logout functionality
    document.getElementById("logout")?.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("authToken");
        window.location.href = "login.html";
    });

    // Search functionality
    const searchInput = document.querySelector(".search-bar input");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            // Implement search functionality here
            console.log("Searching for:", e.target.value);
        });
    }
}