// --------------------------------------------------------
// 1. Security Check (Run Immediately)
// This code runs BEFORE the page content loads
// --------------------------------------------------------
const role = sessionStorage.getItem("userRole");
const token = sessionStorage.getItem("authToken");

// If user is not logged in, force redirect to Login page
if (!role || !token) {
    window.location.href = "../login.html";
}

// --------------------------------------------------------
// 2. Role Permission Check (RBAC)
// Check if the user is allowed to visit this page
// --------------------------------------------------------
const path = window.location.pathname;

// If you are NOT an Admin, block access to Admin page
if (path.includes("admin.html") && role !== "Admin") {
    window.location.href = "403.html";
}

// If you are NOT an Instructor, block access to Instructor page
if (path.includes("instructor.html") && role !== "Instructor") {
    window.location.href = "403.html";
}

// If you are NOT a Student, block access to Student page
if (path.includes("student.html") && role !== "Student") {
    window.location.href = "403.html";
}

// --------------------------------------------------------
// 3. Auto-Logout Timer (Runs after page loads)
// --------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    startSessionTimer();
});

// Timer Variables
let sessionTimeout;

function startSessionTimer() {
    // Set time to 30 minutes (30 * 60 * 1000 milliseconds)
    const timeoutDuration = 30 * 60 * 1000; 

    // Reset timer when user moves mouse or presses a key
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
    document.onclick = resetTimer;

    // Start the countdown
    resetTimer(timeoutDuration);
}

function resetTimer() {
    clearTimeout(sessionTimeout);
    // Start countdown again for 30 minutes
    sessionTimeout = setTimeout(logoutUser, 30 * 60 * 1000); 
}

function logoutUser() {
    alert("Time's up! You have been logged out for security.");
    sessionStorage.clear(); // Remove saved data
    window.location.href = "../login.html"; // Go back to login
}