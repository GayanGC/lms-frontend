document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const errorAlert = document.getElementById("error-alert");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // පිටුව Reload වීම නවත්වයි
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // FR-1.1: Validation (සරල පරීක්ෂාවක්)
        if (!email || !password) {
            showError("Please enter both email and password.");
            return;
        }

        // FR-1.2: Backend Request Simulating (Backend එකක් නැති නිසා අපි මෙහෙම හිතමු)
        // අපි ඊමේල් එක බලලා Role එක තීරණය කරමු:
        let role = "";
        
        if (email.includes("student")) {
            role = "Student";
        } else if (email.includes("instructor")) {
            role = "Instructor";
        } else if (email.includes("admin")) {
            role = "Admin";
        } else {
            // FR-1.4: Error Handling
            showError("Invalid Email or Password! (Try: student@lms.com)");
            return;
        }

        // FR-1.3: Role & Token Storage
        // සාර්ථක නම් Role එක sessionStorage එකේ සේව් කරනවා
        sessionStorage.setItem("userRole", role);
        sessionStorage.setItem("authToken", "fake-jwt-token-123");

        alert(`Login Successful as ${role}!`);

        // FR-2.1: Role Routing (අදාළ පිටුවට යැවීම)
        if (role === "Student") {
            window.location.href = "pages/student.html";
        } else if (role === "Instructor") {
            window.location.href = "pages/instructor.html";
        } else if (role === "Admin") {
            window.location.href = "pages/admin.html";
        }
    });

    function showError(message) {
        errorAlert.textContent = message;
        errorAlert.classList.remove("d-none");
    }
});