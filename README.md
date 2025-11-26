# 🎓 Learning Management System (LMS) - Frontend

This is a responsive, web-based Learning Management System (LMS) interface designed to support Students, Instructors, and Administrators. It features Role-Based Access Control (RBAC), dynamic content rendering, and a modern UI using Bootstrap 5.

🚀 **Live Demo:** [Click here to view the website](https://gayangc.github.io/lms-frontend/)

---

## ✨ Key Features
* **🔐 Role-Based Access Control (RBAC):** distinct dashboards for Students, Instructors, and Admins.
* **🛡️ Secure Routing:** Router guards prevent unauthorized access to pages.
* **🌙 Dark Mode:** Fully integrated dark/light theme toggle with persistence.
* **📱 Responsive Design:** Works seamlessly on mobile and desktop.
* **⚡ Dynamic Data:** Simulated backend API fetching using JavaScript Promises.
* **🛠️ CRUD Operations:** Instructors can add new courses via modal forms.

---

## 🛠️ Technology Stack
* **HTML5** - Semantic structure
* **CSS3 & Bootstrap 5** - Styling and layout
* **JavaScript (ES6+)** - Logic, Auth, Routing, and API simulation

---

## 🔑 Login Credentials (For Testing)
You can use the following credentials to test the different user roles:

| Role | Email | Password |
| :--- | :--- | :--- |
| **👨‍🎓 Student** | `student@lms.com` | `student123` |
| **👨‍🏫 Instructor** | `instructor@lms.com` | `instructor123` |
| **👮 Admin** | `admin@lms.com` | `admin123` |

---

## 📂 Project Structure
```text
/
├── index.html          # Landing Page
├── login.html          # Login Page
├── README.md           # Project Documentation
├── /pages/             # Dashboard Pages
│   ├── student.html
│   ├── instructor.html
│   └── admin.html
└── /assets/            # Static Assets
    ├── /css/           # Stylesheets
    └── /js/            # Auth, Router, API Logic