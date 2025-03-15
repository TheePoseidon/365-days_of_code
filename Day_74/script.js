document.addEventListener("DOMContentLoaded", function () {
    // Initialize components
    initializeChatbot();
    loadDashboardData();
    setupEventListeners();
    initializeSidebar();
    initializeNavigation();
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

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.sidebar a[data-section]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            
            // Update active states
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            document.querySelectorAll('.sidebar a').forEach(a => {
                a.classList.remove('active');
            });
            
            // Show target section
            document.getElementById(targetSection).classList.add('active');
            link.classList.add('active');

            // Load section specific data
            loadSectionData(targetSection);

            // Close sidebar on mobile after navigation
            if (window.innerWidth < 768) {
                document.querySelector('.sidebar').classList.add('collapsed');
                document.querySelector('.dashboard-container').classList.add('sidebar-collapsed');
            }
        });
    });
}

// Load section specific data
function loadSectionData(section) {
    switch(section) {
        case 'dashboard':
            loadNotifications();
            loadEvents();
            break;
        case 'courses':
            loadCourses();
            break;
        case 'notifications':
            loadAllNotifications();
            break;
        case 'profile':
            updateUserProfile();
            break;
    }
}

// Dashboard functionality
function loadDashboardData() {
    loadNotifications();
    loadEvents();
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

function loadEvents() {
    const eventsList = document.getElementById('events-list');
    if (!eventsList) return;

    const events = [
        {
            title: "Project Presentation",
            date: "2024-03-15",
            time: "10:00 AM",
            course: "Web Development"
        },
        {
            title: "Midterm Exam",
            date: "2024-03-20",
            time: "2:00 PM",
            course: "Data Structures"
        },
        {
            title: "Group Meeting",
            date: "2024-03-16",
            time: "3:30 PM",
            course: "Software Engineering"
        }
    ];

    eventsList.innerHTML = '';
    events.forEach(event => {
        const date = new Date(event.date);
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        eventItem.innerHTML = `
            <div class="event-date">
                <div class="date">${date.getDate()}</div>
                <div class="month">${date.toLocaleString('default', { month: 'short' })}</div>
            </div>
            <div class="event-details">
                <h4>${event.title}</h4>
                <p>${event.time} - ${event.course}</p>
            </div>
        `;
        eventsList.appendChild(eventItem);
    });
}

function loadAllNotifications() {
    const notificationList = document.querySelector('.full-notification-list');
    if (!notificationList) return;

    const notifications = [
        {
            title: "Assignment Due",
            message: "Web Development project due in 2 days",
            time: "2 hours ago",
            type: "urgent"
        },
        {
            title: "New Course Material",
            message: "New lectures uploaded in CS101",
            time: "1 day ago",
            type: "info"
        },
        {
            title: "Grade Posted",
            message: "Your Data Structures quiz has been graded",
            time: "2 days ago",
            type: "success"
        },
        {
            title: "System Maintenance",
            message: "Portal will be down for maintenance on Sunday",
            time: "3 days ago",
            type: "warning"
        }
    ];

    notificationList.innerHTML = '';
    notifications.forEach(notification => {
        const notificationItem = document.createElement('div');
        notificationItem.className = `notification-item ${notification.type}`;
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

// Sidebar functionality
function initializeSidebar() {
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const sidebar = document.querySelector(".sidebar");
    const dashboardContainer = document.querySelector(".dashboard-container");
    const floatingProfile = document.querySelector(".floating-profile");
    
    // Load sidebar state from localStorage
    const isSidebarCollapsed = localStorage.getItem("sidebarCollapsed") === "true";
    if (isSidebarCollapsed) {
        sidebar.classList.add("collapsed");
        dashboardContainer.classList.add("sidebar-collapsed");
        floatingProfile.classList.add("expanded");
    }
    
    sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        dashboardContainer.classList.toggle("sidebar-collapsed");
        floatingProfile.classList.toggle("expanded");
        
        // Save sidebar state to localStorage
        localStorage.setItem("sidebarCollapsed", sidebar.classList.contains("collapsed"));
    });

    // Close sidebar when clicking outside
    document.addEventListener("click", (e) => {
        if (!sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target) && 
            !floatingProfile.contains(e.target) && 
            !sidebar.classList.contains("collapsed")) {
            sidebar.classList.add("collapsed");
            dashboardContainer.classList.add("sidebar-collapsed");
            floatingProfile.classList.add("expanded");
            localStorage.setItem("sidebarCollapsed", "true");
        }
    });
}