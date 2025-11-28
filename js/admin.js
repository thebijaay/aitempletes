document.addEventListener("DOMContentLoaded", function () {
    // Admin Login
    const adminLoginForm = document.getElementById("admin-login-form");
    if (adminLoginForm) {
        adminLoginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("admin_username").value;
            const password = document.getElementById("admin_password").value;

            // WARNING: This is a mock implementation for demonstration purposes only.
            // In a real application, admin credentials should be securely managed on a backend server.
            // Hardcoding credentials on the client-side is a major security risk.
            if (username === "admin" && password === "password") {
                sessionStorage.setItem("loggedInAdmin", "true");
                alert("Admin login successful!");
                window.location.href = "admin-dashboard.html";
            } else {
                alert("Invalid username or password.");
            }
        });
    }

    // Admin Dashboard
    const adminInfo = document.getElementById("admin-info");
    if (adminInfo) {
        const loggedInAdmin = sessionStorage.getItem("loggedInAdmin");
        if (loggedInAdmin) {
            adminInfo.innerHTML = "<p>Welcome, Admin!</p>";
        } else {
            window.location.href = "admin-login.html";
        }
    }

    // View Visitors
    const visitorsTable = document.getElementById("visitors-table");
    if (visitorsTable) {
        const loggedInAdmin = sessionStorage.getItem("loggedInAdmin");
        if (loggedInAdmin) {
            const visitors = JSON.parse(localStorage.getItem("visitors")) || [];
            let tableHtml = `
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            visitors.forEach((visitor, index) => {
                tableHtml += `
                    <tr>
                        <td>${visitor.fullName}</td>
                        <td>${visitor.email}</td>
                        <td>${visitor.phone}</td>
                        <td>${visitor.address || "Not provided"}</td>
                        <td>
                            <a href="admin-edit-visitor.html?id=${index}" class="btn btn-sm btn-primary">Edit</a>
                            <button class="btn btn-sm btn-danger" onclick="deleteVisitor(${index})">Delete</button>
                        </td>
                    </tr>
                `;
            });
            tableHtml += "</tbody></table>";
            visitorsTable.innerHTML = tableHtml;
        } else {
            window.location.href = "admin-login.html";
        }
    }

    // Edit Visitor
    const editVisitorForm = document.getElementById("edit-visitor-form");
    if (editVisitorForm) {
        const loggedInAdmin = sessionStorage.getItem("loggedInAdmin");
        if (loggedInAdmin) {
            const urlParams = new URLSearchParams(window.location.search);
            const visitorId = urlParams.get("id");
            const visitors = JSON.parse(localStorage.getItem("visitors")) || [];
            const visitor = visitors[visitorId];

            if (visitor) {
                document.getElementById("full_name").value = visitor.fullName;
                document.getElementById("email").value = visitor.email;
                document.getElementById("phone").value = visitor.phone;
                document.getElementById("address").value = visitor.address || "";

                editVisitorForm.addEventListener("submit", function (event) {
                    event.preventDefault();
                    const fullName = document.getElementById("full_name").value;
                    const email = document.getElementById("email").value;
                    const phone = document.getElementById("phone").value;
                    const address = document.getElementById("address").value;

                    const updatedVisitor = {
                        ...visitor,
                        fullName,
                        email,
                        phone,
                        address,
                    };

                    visitors[visitorId] = updatedVisitor;
                    localStorage.setItem("visitors", JSON.stringify(visitors));

                    alert("Visitor updated successfully!");
                    window.location.href = "admin-view-visitors.html";
                });
            }
        } else {
            window.location.href = "admin-login.html";
        }
    }

    // View Login Logs
    const loginLogsTable = document.getElementById("login-logs-table");
    if (loginLogsTable) {
        const loggedInAdmin = sessionStorage.getItem("loggedInAdmin");
        if (loggedInAdmin) {
            // This is a mock implementation. In a real application, you would fetch login logs from a database.
            const loginLogs = [
                { user_id: 1, user_type: "visitor", login_time: "2025-11-27 18:00:00", ip_address: "127.0.0.1", device: "Chrome" },
                { user_id: 1, user_type: "admin", login_time: "2025-11-27 18:05:00", ip_address: "127.0.0.1", device: "Firefox" },
            ];

            let tableHtml = `
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Type</th>
                            <th>Login Time</th>
                            <th>IP Address</th>
                            <th>Device</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            loginLogs.forEach((log) => {
                tableHtml += `
                    <tr>
                        <td>${log.user_id}</td>
                        <td>${log.user_type}</td>
                        <td>${log.login_time}</td>
                        <td>${log.ip_address}</td>
                        <td>${log.device}</td>
                    </tr>
                `;
            });
            tableHtml += "</tbody></table>";
            loginLogsTable.innerHTML = tableHtml;
        } else {
            window.location.href = "admin-login.html";
        }
    }

    // Logout
    const adminLogoutLink = document.getElementById("admin-logout-link");
    if (adminLogoutLink) {
        adminLogoutLink.addEventListener("click", function (event) {
            event.preventDefault();
            sessionStorage.removeItem("loggedInAdmin");
            window.location.href = "admin-login.html";
        });
    }
});

function deleteVisitor(index) {
    if (confirm("Are you sure you want to delete this visitor?")) {
        let visitors = JSON.parse(localStorage.getItem("visitors")) || [];
        visitors.splice(index, 1);
        localStorage.setItem("visitors", JSON.stringify(visitors));
        window.location.reload();
    }
}
