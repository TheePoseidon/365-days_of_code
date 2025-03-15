document.addEventListener("DOMContentLoaded", function () {
    // Initialize components
    initializeChatbot();
    loadDashboardData();
    setupEventListeners();
    initializeSidebar();
    initializeNavigation();
    initializeProfilePicture();
    initializeExperience();
    initializeCertifications();
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

// Course functionality
async function loadCourses() {
    try {
        const response = await fetch('/api/courses');
        const courses = await response.json();
        
        const courseList = document.getElementById("course-list");
        courseList.innerHTML = '';
        
        courses.forEach(course => {
            const courseCard = createCourseCard(course);
            courseList.appendChild(courseCard);
        });

        // Initialize course search and filters
        initializeCourseSearch();
        initializeCourseFilters();
    } catch (error) {
        console.error('Error loading courses:', error);
    }
}

function createCourseCard(course) {
    const div = document.createElement("div");
    div.className = "course-card";
    div.innerHTML = `
        <img src="${course.image || 'assets/default-course.jpg'}" alt="${course.title}" class="course-image">
        <div class="course-content">
            <h3>${course.title}</h3>
            <div class="course-meta">
                <span>${course.code}</span>
                <span>${course.instructor_name}</span>
            </div>
            <div class="progress-bar">
                <div class="progress" style="width: ${course.progress}%"></div>
            </div>
            <p class="progress-text">${course.progress}% Complete</p>
        </div>
    `;

    div.addEventListener('click', () => showCourseDetails(course));
    return div;
}

function initializeCourseSearch() {
    const searchInput = document.getElementById('course-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const courseCards = document.querySelectorAll('.course-card');

        courseCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const code = card.querySelector('.course-meta span').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || code.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

function initializeCourseFilters() {
    const filterBtns = document.querySelectorAll('.course-filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter courses
            const courseCards = document.querySelectorAll('.course-card');
            courseCards.forEach(card => {
                const progress = parseInt(card.querySelector('.progress-text').textContent);
                
                switch(filter) {
                    case 'in-progress':
                        card.style.display = progress > 0 && progress < 100 ? '' : 'none';
                        break;
                    case 'completed':
                        card.style.display = progress === 100 ? '' : 'none';
                        break;
                    default: // all
                        card.style.display = '';
                }
            });
        });
    });
}

async function showCourseDetails(course) {
    const modal = document.getElementById('course-details-modal');
    modal.style.display = 'flex';

    // Set course basic info
    document.getElementById('course-modal-title').textContent = course.title;
    document.getElementById('course-code').textContent = course.code;
    document.getElementById('course-instructor').textContent = course.instructor_name;
    document.getElementById('course-credits').textContent = course.credits;
    document.getElementById('course-semester').textContent = `${course.semester} ${course.year}`;
    document.getElementById('course-description').textContent = course.description;

    // Initialize tabs
    initializeCourseTabs();

    // Load initial data
    await Promise.all([
        loadCourseTopics(course.id),
        loadCourseAssignments(course.id),
        loadCourseGrades(course.id)
    ]);

    // Close modal handler
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.onclick = () => modal.style.display = 'none';
}

function initializeCourseTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });
}

async function loadCourseTopics(courseId) {
    try {
        const response = await fetch(`/api/courses/${courseId}/topics`);
        const topics = await response.json();
        
        const topicsList = document.querySelector('.topics-list');
        topicsList.innerHTML = '';
        
        topics.forEach(topic => {
            const topicElement = createTopicElement(topic);
            topicsList.appendChild(topicElement);
        });
    } catch (error) {
        console.error('Error loading course topics:', error);
    }
}

function createTopicElement(topic) {
    const div = document.createElement('div');
    div.className = 'topic-item';
    div.innerHTML = `
        <div class="topic-header">
            <h4>${topic.title}</h4>
            <button class="toggle-topic">
                <i class="fas fa-chevron-down"></i>
            </button>
        </div>
        <p>${topic.description}</p>
        <div class="topic-content">
            <div class="materials-list">
                ${topic.materials.map(material => `
                    <div class="material-item">
                        <i class="material-icon fas ${getMaterialIcon(material.type)}"></i>
                        <div class="material-info">
                            <h5>${material.title}</h5>
                            <p>${getMaterialMeta(material)}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    const toggleBtn = div.querySelector('.toggle-topic');
    const content = div.querySelector('.topic-content');
    
    toggleBtn.addEventListener('click', () => {
        content.classList.toggle('show');
        toggleBtn.querySelector('i').classList.toggle('fa-chevron-up');
    });

    return div;
}

function getMaterialIcon(type) {
    switch (type) {
        case 'video': return 'fa-video';
        case 'document': return 'fa-file-alt';
        case 'quiz': return 'fa-question-circle';
        case 'assignment': return 'fa-tasks';
        default: return 'fa-file';
    }
}

function getMaterialMeta(material) {
    if (material.duration_minutes) {
        return `Duration: ${material.duration_minutes} minutes`;
    }
    if (material.file_type) {
        return `File type: ${material.file_type.toUpperCase()}`;
    }
    return '';
}

async function loadCourseAssignments(courseId) {
    try {
        const response = await fetch(`/api/courses/${courseId}/assignments`);
        const assignments = await response.json();
        
        const assignmentsList = document.querySelector('.assignments-list');
        assignmentsList.innerHTML = '';
        
        assignments.forEach(assignment => {
            const assignmentElement = createAssignmentElement(assignment);
            assignmentsList.appendChild(assignmentElement);
        });
    } catch (error) {
        console.error('Error loading course assignments:', error);
    }
}

function createAssignmentElement(assignment) {
    const div = document.createElement('div');
    div.className = 'assignment-item';
    div.innerHTML = `
        <span class="assignment-status status-${assignment.status.toLowerCase()}">${assignment.status}</span>
        <h4>${assignment.title}</h4>
        <p>${assignment.description}</p>
        <div class="assignment-meta">
            <p><strong>Due:</strong> ${formatDate(assignment.due_date)}</p>
            <p><strong>Points:</strong> ${assignment.total_points}</p>
            <p><strong>Weight:</strong> ${assignment.weight_percentage}%</p>
        </div>
        ${assignment.status === 'Pending' ? `
            <button class="submit-assignment" data-id="${assignment.id}">Submit Assignment</button>
        ` : ''}
    `;

    const submitBtn = div.querySelector('.submit-assignment');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => showSubmissionModal(assignment));
    }

    return div;
}

async function loadCourseGrades(courseId) {
    try {
        const response = await fetch(`/api/courses/${courseId}/grades`);
        const grades = await response.json();
        
        updateGradeSummary(grades);
        updateGradesList(grades);
        updateGradeChart(grades);
    } catch (error) {
        console.error('Error loading course grades:', error);
    }
}

function updateGradeSummary(grades) {
    const overallGrade = calculateOverallGrade(grades);
    document.querySelector('.grade-value').textContent = overallGrade.toFixed(1);
}

function updateGradesList(grades) {
    const tbody = document.getElementById('grades-table-body');
    tbody.innerHTML = '';
    
    grades.forEach(grade => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${grade.assignment_title}</td>
            <td>${formatDate(grade.due_date)}</td>
            <td>${grade.grade_value !== null ? grade.grade_value.toFixed(1) : '--'}</td>
            <td>${grade.weight_percentage}%</td>
            <td><span class="status-${grade.status.toLowerCase()}">${grade.status}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

function updateGradeChart(grades) {
    const ctx = document.getElementById('grade-chart').getContext('2d');
    
    // Prepare data for the chart
    const gradeRanges = {
        'A': { min: 90, max: 100, count: 0 },
        'B': { min: 80, max: 89.99, count: 0 },
        'C': { min: 70, max: 79.99, count: 0 },
        'D': { min: 60, max: 69.99, count: 0 },
        'F': { min: 0, max: 59.99, count: 0 }
    };

    // Count grades in each range
    grades.forEach(grade => {
        if (grade.grade_value === null) return;
        
        for (const [letter, range] of Object.entries(gradeRanges)) {
            if (grade.grade_value >= range.min && grade.grade_value <= range.max) {
                range.count++;
                break;
            }
        }
    });

    // Create the chart
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(gradeRanges),
            datasets: [{
                label: 'Grade Distribution',
                data: Object.values(gradeRanges).map(range => range.count),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.8)',  // A - Teal
                    'rgba(54, 162, 235, 0.8)',  // B - Blue
                    'rgba(255, 206, 86, 0.8)',  // C - Yellow
                    'rgba(255, 159, 64, 0.8)',  // D - Orange
                    'rgba(255, 99, 132, 0.8)'   // F - Red
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.parsed.y;
                            const total = grades.filter(g => g.grade_value !== null).length;
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${value} assignments (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function calculateOverallGrade(grades) {
    const gradedAssignments = grades.filter(g => g.grade_value !== null);
    if (gradedAssignments.length === 0) return 0;

    const totalWeight = gradedAssignments.reduce((sum, g) => sum + g.weight_percentage, 0);
    const weightedSum = gradedAssignments.reduce((sum, g) => sum + (g.grade_value * g.weight_percentage), 0);

    return weightedSum / totalWeight;
}

function showSubmissionModal(assignment) {
    const content = `
        <form class="modal-form" id="submission-form">
            <div class="form-group">
                <label for="submission-file">Upload File</label>
                <input type="file" id="submission-file">
            </div>
            <div class="form-group">
                <label for="submission-comments">Comments</label>
                <textarea id="submission-comments"></textarea>
            </div>
            <div class="modal-actions">
                <button type="button" class="modal-cancel">Cancel</button>
                <button type="submit" class="modal-save">Submit</button>
            </div>
        </form>
    `;

    const modal = showModal('Submit Assignment', content);

    modal.querySelector('#submission-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('file', e.target.querySelector('#submission-file').files[0]);
        formData.append('comments', e.target.querySelector('#submission-comments').value);

        try {
            const response = await fetch(`/api/assignments/${assignment.id}/submit`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Failed to submit assignment');

            modal.remove();
            loadCourseAssignments(assignment.course_id);
        } catch (error) {
            console.error('Error submitting assignment:', error);
            alert('Failed to submit assignment');
        }
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

// Profile Picture Upload
function initializeProfilePicture() {
    const uploadBtn = document.getElementById('upload-picture-btn');
    const fileInput = document.getElementById('picture-upload');
    const profilePicture = document.getElementById('profile-picture');

    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('profile_picture', file);

            const response = await fetch('/api/upload-profile-picture', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            profilePicture.src = data.url;
            
            // Update user profile in database
            await updateUserProfile({ profile_picture_url: data.url });
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            alert('Failed to upload profile picture. Please try again.');
        }
    });
}

// Experience Management
function initializeExperience() {
    const addExperienceBtn = document.getElementById('add-experience-btn');
    const experienceList = document.getElementById('experience-list');

    addExperienceBtn.addEventListener('click', () => {
        showExperienceModal();
    });

    loadExperiences();
}

async function loadExperiences() {
    try {
        const response = await fetch('/api/experiences');
        const experiences = await response.json();
        
        const experienceList = document.getElementById('experience-list');
        experienceList.innerHTML = '';
        
        experiences.forEach(experience => {
            const experienceElement = createExperienceElement(experience);
            experienceList.appendChild(experienceElement);
        });
    } catch (error) {
        console.error('Error loading experiences:', error);
    }
}

function createExperienceElement(experience) {
    const div = document.createElement('div');
    div.className = 'experience-item';
    div.innerHTML = `
        <div class="actions">
            <button class="action-btn edit-experience" data-id="${experience.id}">
                <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete-experience" data-id="${experience.id}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <h4>${experience.title}</h4>
        <p>${experience.company}</p>
        <div class="date-range">
            ${formatDate(experience.start_date)} - ${experience.end_date ? formatDate(experience.end_date) : 'Present'}
        </div>
        <p>${experience.description}</p>
    `;

    // Add event listeners
    div.querySelector('.edit-experience').addEventListener('click', () => {
        showExperienceModal(experience);
    });

    div.querySelector('.delete-experience').addEventListener('click', async () => {
        if (confirm('Are you sure you want to delete this experience?')) {
            try {
                await fetch(`/api/experiences/${experience.id}`, {
                    method: 'DELETE'
                });
                loadExperiences();
            } catch (error) {
                console.error('Error deleting experience:', error);
                alert('Failed to delete experience');
            }
        }
    });

    return div;
}

// Certification Management
function initializeCertifications() {
    const addCertificationBtn = document.getElementById('add-certification-btn');
    const certificationList = document.getElementById('certification-list');

    addCertificationBtn.addEventListener('click', () => {
        showCertificationModal();
    });

    loadCertifications();
}

async function loadCertifications() {
    try {
        const response = await fetch('/api/certifications');
        const certifications = await response.json();
        
        const certificationList = document.getElementById('certification-list');
        certificationList.innerHTML = '';
        
        certifications.forEach(certification => {
            const certificationElement = createCertificationElement(certification);
            certificationList.appendChild(certificationElement);
        });
    } catch (error) {
        console.error('Error loading certifications:', error);
    }
}

function createCertificationElement(certification) {
    const div = document.createElement('div');
    div.className = 'certification-item';
    div.innerHTML = `
        <div class="actions">
            <button class="action-btn edit-certification" data-id="${certification.id}">
                <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete-certification" data-id="${certification.id}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <h4>${certification.name}</h4>
        <p>${certification.issuing_organization}</p>
        <div class="date-range">
            Issued: ${formatDate(certification.issue_date)}
            ${certification.expiry_date ? `<br>Expires: ${formatDate(certification.expiry_date)}` : ''}
        </div>
        ${certification.credential_url ? `
            <p><a href="${certification.credential_url}" target="_blank">View Credential</a></p>
        ` : ''}
    `;

    // Add event listeners
    div.querySelector('.edit-certification').addEventListener('click', () => {
        showCertificationModal(certification);
    });

    div.querySelector('.delete-certification').addEventListener('click', async () => {
        if (confirm('Are you sure you want to delete this certification?')) {
            try {
                await fetch(`/api/certifications/${certification.id}`, {
                    method: 'DELETE'
                });
                loadCertifications();
            } catch (error) {
                console.error('Error deleting certification:', error);
                alert('Failed to delete certification');
            }
        }
    });

    return div;
}

// Utility Functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    });
}

function showModal(title, content) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            ${content}
        </div>
    `;

    document.body.appendChild(modalOverlay);

    modalOverlay.querySelector('.modal-close').addEventListener('click', () => {
        modalOverlay.remove();
    });

    return modalOverlay;
}

function showExperienceModal(experience = null) {
    const content = `
        <form class="modal-form" id="experience-form">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" id="title" required value="${experience?.title || ''}">
            </div>
            <div class="form-group">
                <label for="company">Company</label>
                <input type="text" id="company" required value="${experience?.company || ''}">
            </div>
            <div class="form-group">
                <label for="start_date">Start Date</label>
                <input type="date" id="start_date" required value="${experience?.start_date || ''}">
            </div>
            <div class="form-group">
                <label for="end_date">End Date</label>
                <input type="date" id="end_date" value="${experience?.end_date || ''}">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description">${experience?.description || ''}</textarea>
            </div>
            <div class="modal-actions">
                <button type="button" class="modal-cancel">Cancel</button>
                <button type="submit" class="modal-save">Save</button>
            </div>
        </form>
    `;

    const modal = showModal(experience ? 'Edit Experience' : 'Add Experience', content);

    modal.querySelector('#experience-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            title: e.target.title.value,
            company: e.target.company.value,
            start_date: e.target.start_date.value,
            end_date: e.target.end_date.value || null,
            description: e.target.description.value
        };

        try {
            const url = experience 
                ? `/api/experiences/${experience.id}`
                : '/api/experiences';
            
            const response = await fetch(url, {
                method: experience ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Failed to save experience');

            loadExperiences();
            modal.remove();
        } catch (error) {
            console.error('Error saving experience:', error);
            alert('Failed to save experience');
        }
    });

    modal.querySelector('.modal-cancel').addEventListener('click', () => {
        modal.remove();
    });
}

function showCertificationModal(certification = null) {
    const content = `
        <form class="modal-form" id="certification-form">
            <div class="form-group">
                <label for="name">Certification Name</label>
                <input type="text" id="name" required value="${certification?.name || ''}">
            </div>
            <div class="form-group">
                <label for="issuing_organization">Issuing Organization</label>
                <input type="text" id="issuing_organization" required value="${certification?.issuing_organization || ''}">
            </div>
            <div class="form-group">
                <label for="issue_date">Issue Date</label>
                <input type="date" id="issue_date" required value="${certification?.issue_date || ''}">
            </div>
            <div class="form-group">
                <label for="expiry_date">Expiry Date (Optional)</label>
                <input type="date" id="expiry_date" value="${certification?.expiry_date || ''}">
            </div>
            <div class="form-group">
                <label for="credential_id">Credential ID (Optional)</label>
                <input type="text" id="credential_id" value="${certification?.credential_id || ''}">
            </div>
            <div class="form-group">
                <label for="credential_url">Credential URL (Optional)</label>
                <input type="url" id="credential_url" value="${certification?.credential_url || ''}">
            </div>
            <div class="modal-actions">
                <button type="button" class="modal-cancel">Cancel</button>
                <button type="submit" class="modal-save">Save</button>
            </div>
        </form>
    `;

    const modal = showModal(certification ? 'Edit Certification' : 'Add Certification', content);

    modal.querySelector('#certification-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: e.target.name.value,
            issuing_organization: e.target.issuing_organization.value,
            issue_date: e.target.issue_date.value,
            expiry_date: e.target.expiry_date.value || null,
            credential_id: e.target.credential_id.value || null,
            credential_url: e.target.credential_url.value || null
        };

        try {
            const url = certification 
                ? `/api/certifications/${certification.id}`
                : '/api/certifications';
            
            const response = await fetch(url, {
                method: certification ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Failed to save certification');

            loadCertifications();
            modal.remove();
        } catch (error) {
            console.error('Error saving certification:', error);
            alert('Failed to save certification');
        }
    });

    modal.querySelector('.modal-cancel').addEventListener('click', () => {
        modal.remove();
    });
}