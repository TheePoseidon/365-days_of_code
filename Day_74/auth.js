// Handle login form submission
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        // Here you would typically make an API call to your backend
        const response = await mockLoginAPI(email, password);
        
        if (response.success) {
            // Store the token in localStorage
            localStorage.setItem('authToken', response.token);
            // Redirect to dashboard
            window.location.href = 'index.html';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again.');
    }
});

// Handle registration form submission
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    try {
        // Here you would typically make an API call to your backend
        const response = await mockRegisterAPI(fullname, email, password);
        
        if (response.success) {
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        } else {
            alert('Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('An error occurred during registration. Please try again.');
    }
});

// Mock API functions (replace these with real API calls)
async function mockLoginAPI(email, password) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (email === 'demo@example.com' && password === 'password') {
        return {
            success: true,
            token: 'mock-jwt-token'
        };
    }
    return { success: false };
}

async function mockRegisterAPI(fullname, email, password) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock registration (always succeeds)
    return { success: true };
}

// Check authentication status
function checkAuth() {
    const token = localStorage.getItem('authToken');
    if (!token && !window.location.href.includes('login.html') && !window.location.href.includes('register.html')) {
        window.location.href = 'login.html';
    }
}

// Run auth check when page loads
checkAuth(); 