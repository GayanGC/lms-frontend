document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const errorAlert = document.getElementById("error-alert");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page reload on submit
        
        // Get values and remove extra spaces
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        let role = "";

        // Check hardcoded user credentials
        if (email === "student@lms.com" && password === "student123") {
            role = "Student";
        } else if (email === "instructor@lms.com" && password === "instructor123") {
            role = "Instructor";
        } else if (email === "admin@lms.com" && password === "admin123") {
            role = "Admin";
        } else {
            // Show error if details are invalid
            showError("Invalid Email or Password! Please try again.");
            return;
        }

        // Login Successful
        // 1. Save role and token to Session Storage (FR-1.3)
        sessionStorage.setItem("userRole", role);
        sessionStorage.setItem("authToken", "fake-secure-token");

        // 2. Redirect to specific dashboard based on role (FR-2.1)
        if (role === "Student") {
            window.location.href = "pages/student.html";
        } else if (role === "Instructor") {
            window.location.href = "pages/instructor.html";
        } else if (role === "Admin") {
            window.location.href = "pages/admin.html";
        }
    });

    // Function to display error messages
    function showError(message) {
        errorAlert.textContent = message;
        errorAlert.classList.remove("d-none"); // Show the alert box
        
        // Automatically hide the error after 3 seconds
        setTimeout(() => {
            errorAlert.classList.add("d-none");
        }, 3000);
    }
});