document.addEventListener("DOMContentLoaded", () => {
    // --------------------------------------------------------
    // 1. Security Check (Is User Logged In?)
    // --------------------------------------------------------
    const role = sessionStorage.getItem("userRole");
    const token = sessionStorage.getItem("authToken");

    // If no role or token found, redirect to login page
    if (!role || !token) {
        window.location.href = "../login.html"; 
        return;
    }

    // --------------------------------------------------------
    // 2. Role-Based Access Control (RBAC)
    // --------------------------------------------------------
    const path = window.location.pathname;

    // Prevent non-admins from accessing admin page
    if (path.includes("admin.html") && role !== "Admin") {
        alert("Access Denied! You are not an Admin.");
        redirectToDashboard(role);
    }
    
    // Prevent non-instructors from accessing instructor page
    if (path.includes("instructor.html") && role !== "Instructor") {
        alert("Access Denied! You are not an Instructor.");
        redirectToDashboard(role);
    }

    // Prevent non-students from accessing student page
    if (path.includes("student.html") && role !== "Student") {
        alert("Access Denied! You are not a Student.");
        redirectToDashboard(role);
    }

    // --------------------------------------------------------
    // 3. Auto-Logout Logic (SR-10)
    // --------------------------------------------------------
    startSessionTimer();
});

// Helper function to redirect users to their correct dashboard
function redirectToDashboard(role) {
    if (role === "Admin") window.location.href = "admin.html";
    else if