document.addEventListener('DOMContentLoaded', function() {
    initializeChat();
    initializeNavigation();
    loadDashboardData();
    setupEventListeners();
    checkAuth();
    initializeSidebarCollapse();
});

// Authentication check
function checkAuth() {
    const token = localStorage.getItem('authToken');
    if (!token && !window.location.href.includes('login.html')) {
        window.location.href = 'login.html';
    }
}

// Initialize Chat Feature
function initializeChat() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.querySelector('.chat-window');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendChat = document.getElementById('send-chat');
    const minimizeChat = document.querySelector('.minimize-chat');

    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('show');
        chatInput.focus();
    });

    minimizeChat.addEventListener('click', () => {
        chatWindow.classList.remove('show');
    });

    sendChat.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;

        appendMessage('user', message);
        chatInput.value = '';

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            appendMessage('bot', data.response);
        } catch (error) {
            console.error('Chat error:', error);
            appendMessage('bot', 'Sorry, I encountered an error. Please try again later.');
        }
    }

    function appendMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.sidebar a[data-section]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            
            // Update active states
            document.querySelector('.sidebar a.active')?.classList.remove('active');
            link.classList.add('active');
            
            // Show target section
            document.querySelector('.content-section.active')?.classList.remove('active');
            document.getElementById(targetSection)?.classList.add('active');
            
            // Load section specific data
            loadSectionData(targetSection);
        });
    });
}

// Load Dashboard Data
function loadDashboardData() {
    loadNotifications();
    loadExams();
}

// Load Notifications
function loadNotifications() {
    const notificationList = document.getElementById('notification-list');
    if (!notificationList) return;

    const notifications = [
        {
            title: 'Assignment Due',
            message: 'Web Development project due in 2 days',
            time: '2 hours ago'
        },
        {
            title: 'New Course Material',
            message: 'New lectures uploaded in CS101',
            time: '1 day ago'
        },
        {
            title: 'Grade Posted',
            message: 'Your Data Structures quiz has been graded',
            time: '2 days ago'
        }
    ];

    notificationList.innerHTML = '';
    notifications.forEach(notification => {
        const notificationItem = document.createElement('div');
        notificationItem.className = 'notification-item';
        notificationItem.innerHTML = `
            <h4>${notification.title}</h4>
            <p>${notification.message}</p>
            <span class="notification-time">${notification.time}</span>
        `;
        notificationList.appendChild(notificationItem);
    });
}

// Load Section Specific Data
function loadSectionData(section) {
    switch(section) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'courses':
            loadCourses();
            break;
        case 'exam-board':
            loadExams();
            break;
        case 'library':
            loadLibrary();
            break;
        case 'finance':
            loadFinance();
            break;
        case 'notifications':
            loadAllNotifications();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Logout functionality
    document.getElementById('logout')?.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('authToken');
        window.location.href = 'login.html';
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            // Implement search functionality
            console.log('Searching:', e.target.value);
        });
    }
}

// Load All Notifications
function loadAllNotifications() {
    const notificationList = document.querySelector('.full-notification-list');
    if (!notificationList) return;

    const notifications = [
        {
            title: 'Assignment Due',
            message: 'Web Development project due in 2 days',
            time: '2 hours ago',
            type: 'urgent'
        },
        {
            title: 'New Course Material',
            message: 'New lectures uploaded in CS101',
            time: '1 day ago',
            type: 'info'
        },
        {
            title: 'Grade Posted',
            message: 'Your Data Structures quiz has been graded',
            time: '2 days ago',
            type: 'success'
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

// Add the new function
function initializeSidebarCollapse() {
    const collapseBtn = document.getElementById('collapse-sidebar');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    collapseBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
        
        // Store the state in localStorage
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    });
    
    // Restore the state on page load
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed) {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('expanded');
    }
}

// Add new section loading functions
function loadCourses() {
    // Course data would typically come from an API
    console.log('Loading courses...');
}

function loadExams() {
    // Exam data would typically come from an API
    console.log('Loading exams...');
}

function loadLibrary() {
    // Library data would typically come from an API
    console.log('Loading library resources...');
}

function loadFinance() {
    // Financial data would typically come from an API
    console.log('Loading financial information...');
}

function loadSettings() {
    // User settings would typically come from an API
    console.log('Loading user settings...');
    
    // Add event listeners for settings forms
    const profileForm = document.querySelector('.profile-form');
    const passwordForm = document.querySelector('.password-form');
    
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Handle profile update
            console.log('Updating profile...');
        });
    }
    
    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Handle password update
            console.log('Updating password...');
        });
    }
} 