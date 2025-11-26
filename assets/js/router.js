document.addEventListener("DOMContentLoaded", () => {
    // 1. Check if user is logged in
    const role = sessionStorage.getItem("userRole");
    const token = sessionStorage.getItem("authToken");

    // ලොග් වෙලා නැත්නම් කෙලින්ම Login එකට එලවනවා
    if (!role || !token) {
        window.location.href = "../login.html"; 
        return;
    }

    // 2. Identify Current Page
    const path = window.location.pathname;

    // 3. Role-Based Access Control (RBAC) Logic
    // FR-2.2: Router guard prevents loading pages not assigned for the user role [cite: 50]
    
    // Admin පිටුවට යන්න හදනවා නම්, එයා Admin ද බලනවා
    if (path.includes("admin.html") && role !== "Admin") {
        alert("Access Denied! You are not an Admin.");
        redirectToDashboard(role);
    }
    
    // Instructor පිටුවට යන්න හදනවා නම්, එයා Instructor ද බලනවා
    if (path.includes("instructor.html") && role !== "Instructor") {
        alert("Access Denied! You are not an Instructor.");
        redirectToDashboard(role);
    }

    // Student පිටුවට යන්න හදනවා නම්, එයා Student ද බලනවා
    if (path.includes("student.html") && role !== "Student") {
        alert("Access Denied! You are not a Student.");
        redirectToDashboard(role);
    }
});

function redirectToDashboard(role) {
    // SR-5: Mismatch redirects to correct place or login [cite: 74]
    if (role === "Admin") window.location.href = "admin.html";
    else if (role === "Instructor") window.location.href = "instructor.html";
    else if (role === "Student") window.location.href = "student.html";
    else window.location.href = "../login.html";
}