document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const errorAlert = document.getElementById("error-alert");
    const successAlert = document.getElementById("success-alert");

    // Function to display error messages
    function showError(message) {
        errorAlert.textContent = message;
        errorAlert.classList.remove("d-none");
        successAlert.classList.add("d-none");
        
        // Hide error after 5 seconds
        setTimeout(() => {
            errorAlert.classList.add("d-none");
        }, 5000);
    }

    // Function to show success message and redirect
    function showSuccess() {
        errorAlert.classList.add("d-none");
        successAlert.classList.remove("d-none");
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    }

    // Handle form submission
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const role = document.getElementById("role").value;
        
        // Validate form
        if (password !== confirmPassword) {
            showError("Passwords do not match!");
            return;
        }
        
        if (password.length < 6) {
            showError("Password must be at least 6 characters long!");
            return;
        }
        
        if (!role) {
            showError("Please select a role!");
            return;
        }
        
        // Get existing users or initialize empty array
        const users = JSON.parse(localStorage.getItem('lms_users')) || [];
        
        // Check if user already exists
        if (users.some(user => user.email === email)) {
            showError("An account with this email already exists!");
            return;
        }
        
        // Create new user object
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password, // In a real app, this should be hashed
            role,
            joinDate: new Date().toISOString(),
            status: 'active'
        };
        
        // Save user to localStorage
        users.push(newUser);
        localStorage.setItem('lms_users', JSON.stringify(users));
        
        // Show success message and redirect
        showSuccess();
    });
});
