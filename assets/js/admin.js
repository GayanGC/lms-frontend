// Admin Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentUser = null;
    let users = [];
    let currentPage = 1;
    const usersPerPage = 10;
    
    // DOM Elements
    const dashboardSection = document.getElementById('dashboardSection');
    const usersSection = document.getElementById('usersSection');
    const reportsSection = document.getElementById('reportsSection');
    const usersTableBody = document.getElementById('usersTableBody');
    const userSearch = document.getElementById('userSearch');
    const searchButton = document.getElementById('searchButton');
    const addUserForm = document.getElementById('addUserForm');
    const editUserForm = document.getElementById('editUserForm');
    const saveUserBtn = document.getElementById('saveUserBtn');
    const updateUserBtn = document.getElementById('updateUserBtn');
    const resetPasswordBtn = document.getElementById('resetPasswordBtn');
    const confirmActionBtn = document.getElementById('confirmActionBtn');
    const toast = new bootstrap.Toast(document.getElementById('toast'));
    
    // Initialize the dashboard
    initDashboard();
    
    // Navigation
    document.querySelectorAll('[data-section]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
            
            // Update active state
            document.querySelectorAll('[data-section]').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Toggle sidebar on mobile
    document.getElementById('sidebarToggle').addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('d-none');
    });
    
    // Search functionality
    searchButton.addEventListener('click', searchUsers);
    userSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') searchUsers();
    });
    
    // Form submissions
    if (addUserForm) {
        addUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewUser();
        });
    }
    
    if (editUserForm) {
        updateUserBtn.addEventListener('click', updateUser);
        resetPasswordBtn.addEventListener('click', resetUserPassword);
    }
    
    // Initialize the dashboard
    function initDashboard() {
        // Check if user is logged in and is admin
        const userRole = sessionStorage.getItem('userRole');
        const userName = sessionStorage.getItem('userName');
        
        if (!userRole || userRole !== 'Admin') {
            window.location.href = '../login.html';
            return;
        }
        
        // Set admin name
        if (userName) {
            document.getElementById('adminName').textContent = userName;
        }
        
        // Load initial data
        loadDashboardData();
        loadUsers();
        
        // Show dashboard by default
        showSection('dashboard');
    }
    
    // Show specific section
    function showSection(section) {
        // Hide all sections first
        [dashboardSection, usersSection, reportsSection].forEach(sec => {
            if (sec) sec.classList.add('d-none');
        });
        
        // Show the selected section
        switch(section) {
            case 'dashboard':
                if (dashboardSection) dashboardSection.classList.remove('d-none');
                break;
            case 'users':
                if (usersSection) usersSection.classList.remove('d-none');
                loadUsers();
                break;
            case 'reports':
                if (reportsSection) reportsSection.classList.remove('d-none');
                loadReports();
                break;
        }
    }
    
    // Load dashboard data
    function loadDashboardData() {
        // Simulate API call to get dashboard data
        setTimeout(() => {
            // Get users from localStorage
            const allUsers = JSON.parse(localStorage.getItem('lms_users')) || [];
            const students = allUsers.filter(user => user.role === 'Student');
            const instructors = allUsers.filter(user => user.role === 'Instructor');
            
            // Update dashboard stats
            document.getElementById('totalUsers').textContent = allUsers.length;
            document.getElementById('totalStudents').textContent = students.length;
            document.getElementById('totalInstructors').textContent = instructors.length;
            
            // Initialize charts
            initCharts({
                totalUsers: allUsers.length,
                students: students.length,
                instructors: instructors.length
            });
        }, 500);
    }
    
    // Initialize dashboard charts
    function initCharts(stats) {
        // User Registration Trend (Line Chart)
        const trendCtx = document.getElementById('userTrendChart').getContext('2d');
        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'New Users',
                    data: [12, 19, 15, 27, 34, 42],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.3,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
        
        // User Distribution (Doughnut Chart)
        const distCtx = document.getElementById('userDistributionChart').getContext('2d');
        new Chart(distCtx, {
            type: 'doughnut',
            data: {
                labels: ['Students', 'Instructors', 'Admins'],
                datasets: [{
                    data: [stats.students, stats.instructors, 1],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 159, 64, 0.8)',
                        'rgba(75, 192, 192, 0.8)'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Load users for the users table
    function loadUsers() {
        // Show loading state
        usersTableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-4">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-2 mb-0">Loading users...</p>
                </td>
            </tr>`;
        
        // Simulate API call
        setTimeout(() => {
            // Get users from localStorage
            users = JSON.parse(localStorage.getItem('lms_users')) || [];
            
            // Add admin user (not stored in the same way)
            users.unshift({
                id: 'admin-001',
                name: 'Administrator',
                email: 'admin@lms.com',
                role: 'Admin',
                joinDate: new Date().toISOString(),
                status: 'active'
            });
            
            renderUsersTable(users);
        }, 800);
    }
    
    // Render users table
    function renderUsersTable(usersToRender) {
        if (!usersToRender || usersToRender.length === 0) {
            usersTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-4">
                        <i class="bi bi-people fs-1 text-muted d-block mb-2"></i>
                        <p class="mb-0">No users found</p>
                        <button class="btn btn-primary btn-sm mt-2" data-bs-toggle="modal" data-bs-target="#addUserModal">
                            <i class="bi bi-plus-lg me-1"></i> Add User
                        </button>
                    </td>
                </tr>`;
            return;
        }
        
        // Calculate pagination
        const startIndex = (currentPage - 1) * usersPerPage;
        const paginatedUsers = usersToRender.slice(startIndex, startIndex + usersPerPage);
        
        // Generate table rows
        usersTableBody.innerHTML = paginatedUsers.map(user => `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <span class="badge ${getRoleBadgeClass(user.role)}">
                        ${user.role}
                    </span>
                </td>
                <td>${formatDate(user.joinDate)}</td>
                <td>
                    <span class="badge ${getStatusBadgeClass(user.status || 'active')}">
                        ${(user.status || 'active').charAt(0).toUpperCase() + (user.status || 'active').slice(1)}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="viewUser('${user.id}')">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    ${user.role !== 'Admin' ? `
                    <button class="btn btn-sm btn-outline-danger" onclick="confirmDeleteUser('${user.id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                    ` : ''}
                </td>
            </tr>
        `).join('');
        
        // Update pagination
        updatePagination(usersToRender.length);
    }
    
    // Get badge class based on user role
    function getRoleBadgeClass(role) {
        switch(role.toLowerCase()) {
            case 'admin': return 'bg-danger';
            case 'instructor': return 'bg-warning text-dark';
            case 'student': return 'bg-primary';
            default: return 'bg-secondary';
        }
    }
    
    // Get status badge class
    function getStatusBadgeClass(status) {
        switch(status.toLowerCase()) {
            case 'active': return 'bg-success';
            case 'inactive': return 'bg-secondary';
            case 'suspended': return 'bg-danger';
            default: return 'bg-secondary';
        }
    }
    
    // Format date
    function formatDate(dateString) {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    // Update pagination
    function updatePagination(totalUsers) {
        const totalPages = Math.ceil(totalUsers / usersPerPage);
        // You can implement pagination UI here if needed
    }
    
    // Search users
    function searchUsers() {
        const searchTerm = userSearch.value.toLowerCase();
        if (!searchTerm.trim()) {
            renderUsersTable(users);
            return;
        }
        
        const filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(searchTerm) || 
            user.email.toLowerCase().includes(searchTerm) ||
            user.role.toLowerCase().includes(searchTerm)
        );
        
        renderUsersTable(filteredUsers);
    }
    
    // Add new user
    function addNewUser() {
        const name = document.getElementById('fullName').value.trim();
        const email = document.getElementById('userEmail').value.trim();
        const role = document.getElementById('userRole').value;
        const password = document.getElementById('userPassword').value;
        
        // Basic validation
        if (!name || !email || !role || !password) {
            showToast('Error', 'Please fill in all required fields', 'danger');
            return;
        }
        
        if (password.length < 6) {
            showToast('Error', 'Password must be at least 6 characters long', 'danger');
            return;
        }
        
        // Check if email already exists
        const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existingUser) {
            showToast('Error', 'A user with this email already exists', 'danger');
            return;
        }
        
        // Create new user object
        const newUser = {
            id: 'user-' + Date.now(),
            name,
            email,
            password, // In a real app, this should be hashed
            role,
            status: 'active',
            joinDate: new Date().toISOString()
        };
        
        // Add to users array and save to localStorage
        users.push(newUser);
        localStorage.setItem('lms_users', JSON.stringify(users.filter(u => u.role !== 'Admin')));
        
        // Show success message
        showToast('Success', 'User added successfully', 'success');
        
        // Close modal and refresh table
        const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
        modal.hide();
        loadUsers();
    }
    
    // View/Edit user
    window.viewUser = function(userId) {
        const user = users.find(u => u.id === userId);
        if (!user) {
            showToast('Error', 'User not found', 'danger');
            return;
        }
        
        currentUser = user;
        
        // Populate form
        document.getElementById('editUserId').value = user.id;
        document.getElementById('editFullName').value = user.name;
        document.getElementById('editEmail').value = user.email;
        document.getElementById('editRole').value = user.role;
        document.getElementById('editStatus').value = user.status || 'active';
        document.getElementById('joinDateText').textContent = formatDate(user.joinDate);
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('userDetailsModal'));
        modal.show();
    };
    
    // Update user
    function updateUser() {
        if (!currentUser) return;
        
        const name = document.getElementById('editFullName').value.trim();
        const email = document.getElementById('editEmail').value.trim();
        const role = document.getElementById('editRole').value;
        const status = document.getElementById('editStatus').value;
        
        // Basic validation
        if (!name || !email || !role) {
            showToast('Error', 'Please fill in all required fields', 'danger');
            return;
        }
        
        // Check if email is already taken by another user
        const emailExists = users.some(u => 
            u.id !== currentUser.id && u.email.toLowerCase() === email.toLowerCase()
        );
        
        if (emailExists) {
            showToast('Error', 'This email is already in use by another account', 'danger');
            return;
        }
        
        // Update user
        const updatedUser = {
            ...currentUser,
            name,
            email,
            role,
            status
        };
        
        // Update in users array
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = updatedUser;
            
            // Save to localStorage (except admin)
            if (updatedUser.role !== 'Admin') {
                localStorage.setItem('lms_users', JSON.stringify(users.filter(u => u.role !== 'Admin')));
            }
            
            // Show success message
            showToast('Success', 'User updated successfully', 'success');
            
            // Close modal and refresh table
            const modal = bootstrap.Modal.getInstance(document.getElementById('userDetailsModal'));
            modal.hide();
            loadUsers();
        } else {
            showToast('Error', 'Failed to update user', 'danger');
        }
    }
    
    // Reset user password
    function resetUserPassword() {
        if (!currentUser) return;
        
        // In a real app, you would generate a secure random password
        const newPassword = 'NewPassword123';
        
        // Show the new password to the admin
        document.getElementById('passwordResetAlert').style.display = 'block';
        
        // Update user's password
        currentUser.password = newPassword; // In a real app, hash this password
        
        // Show success message
        showToast('Success', `Password has been reset to: ${newPassword}`, 'warning');
    }
    
    // Confirm delete user
    window.confirmDeleteUser = function(userId) {
        const user = users.find(u => u.id === userId);
        if (!user) return;
        
        currentUser = user;
        
        // Set up confirmation modal
        document.getElementById('confirmModalTitle').textContent = 'Delete User';
        document.getElementById('confirmModalBody').innerHTML = `
            Are you sure you want to delete <strong>${user.name}</strong>?<br>
            <span class="text-danger">This action cannot be undone.</span>
        `;
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
        modal.show();
        
        // Set up confirm button
        confirmActionBtn.onclick = function() {
            deleteUser(userId);
            modal.hide();
        };
    };
    
    // Delete user
    function deleteUser(userId) {
        // Remove user from array
        users = users.filter(u => u.id !== userId);
        
        // Save to localStorage (except admin)
        localStorage.setItem('lms_users', JSON.stringify(users.filter(u => u.role !== 'Admin')));
        
        // Show success message
        showToast('Success', 'User deleted successfully', 'success');
        
        // Refresh table
        loadUsers();
    }
    
    // Load reports
    function loadReports() {
        // Initialize charts for reports
        initReportCharts();
    }
    
    // Initialize report charts
    function initReportCharts() {
        // User Growth Chart
        const growthCtx = document.getElementById('userGrowthChart').getContext('2d');
        new Chart(growthCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'New Users',
                    data: [45, 78, 92, 110, 156, 198, 245, 301, 356, 412, 487, 532],
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Monthly User Growth'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        
        // Course Enrollment Chart
        const enrollCtx = document.getElementById('enrollmentChart').getContext('2d');
        new Chart(enrollCtx, {
            type: 'doughnut',
            data: {
                labels: ['Web Development', 'Data Science', 'Business', 'Design', 'Marketing', 'Other'],
                datasets: [{
                    data: [35, 25, 15, 10, 10, 5],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(201, 203, 207, 0.8)'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right'
                    },
                    title: {
                        display: true,
                        text: 'Course Enrollment by Category'
                    }
                }
            }
        });
    }
    
    // Show toast notification
    function showToast(title, message, type = 'info') {
        const toastTitle = document.getElementById('toastTitle');
        const toastMessage = document.getElementById('toastMessage');
        const toastElement = document.getElementById('toast');
        
        // Set title and message
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        
        // Set background color based on type
        const toast = new bootstrap.Toast(toastElement);
        const toastHeader = toastElement.querySelector('.toast-header');
        
        // Remove previous color classes
        ['bg-primary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info'].forEach(cls => {
            toastHeader.classList.remove(cls, 'text-white');
        });
        
        // Add new color class
        switch(type) {
            case 'success':
                toastHeader.classList.add('bg-success', 'text-white');
                break;
            case 'error':
            case 'danger':
                toastHeader.classList.add('bg-danger', 'text-white');
                break;
            case 'warning':
                toastHeader.classList.add('bg-warning');
                break;
            case 'info':
            default:
                toastHeader.classList.add('bg-primary', 'text-white');
        }
        
        // Show the toast
        toast.show();
    }
    
    // Global logout function
    window.logout = function() {
        sessionStorage.clear();
        window.location.href = '../login.html';
    };
});
