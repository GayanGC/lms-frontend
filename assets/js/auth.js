document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const errorAlert = document.getElementById("error-alert");

    // Check if user is already logged in
    if (sessionStorage.getItem("authToken") && window.location.pathname.includes('login.html')) {
        redirectToDashboard(sessionStorage.getItem("userRole"));
        return;
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent page reload on submit
            
            // Get values and remove extra spaces
            const email = document.getElementById("email").value.trim().toLowerCase();
            const password = document.getElementById("password").value.trim();

            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('lms_users')) || [];
            
            // Check hardcoded admin credentials (for demo purposes)
            if (email === "admin@lms.com" && password === "admin123") {
                handleSuccessfulLogin({
                    id: 'admin-001',
                    name: 'Administrator',
                    email: 'admin@lms.com',
                    role: 'Admin',
                    joinDate: new Date().toISOString(),
                    status: 'active'
                });
                return;
            }

            // Check against registered users
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                handleSuccessfulLogin(user);
            } else {
                // Show error if details are invalid
                showError("Invalid Email or Password! Please try again.");
            }
        });
    }

    // Function to handle successful login
    function handleSuccessfulLogin(user) {
        // Save user data to session storage
        sessionStorage.setItem("userId", user.id);
        sessionStorage.setItem("userRole", user.role);
        sessionStorage.setItem("userName", user.name);
        sessionStorage.setItem("userEmail", user.email);
        sessionStorage.setItem("authToken", `token-${Date.now()}`);
        
        // Redirect to appropriate dashboard
        redirectToDashboard(user.role);
    }

    // Function to redirect to dashboard based on role
    function redirectToDashboard(role) {
        // If already on the correct dashboard, don't redirect
        const currentPath = window.location.pathname;
        if (
            (role === 'Student' && currentPath.includes('student.html')) ||
            (role === 'Instructor' && currentPath.includes('instructor.html')) ||
            (role === 'Admin' && currentPath.includes('admin.html'))
        ) {
            return;
        }

        // Redirect to the appropriate dashboard
        if (role === 'Student') {
            window.location.href = 'pages/student.html';
        } else if (role === 'Instructor') {
            window.location.href = 'pages/instructor.html';
        } else if (role === 'Admin') {
            window.location.href = 'pages/admin.html';
        } else {
            // If role is not recognized, go to login
            window.location.href = '../login.html';
        }
    }

    // Function to display error messages
    function showError(message) {
        if (!errorAlert) return;
        
        errorAlert.textContent = message;
        errorAlert.classList.remove("d-none");
        
        // Automatically hide the error after 5 seconds
        setTimeout(() => {
            errorAlert.classList.add("d-none");
        }, 5000);
    }
});