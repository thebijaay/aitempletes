document.addEventListener("DOMContentLoaded", function () {
    // Visitor Registration
    const registrationForm = document.getElementById("visitor-registration-form");
    if (registrationForm) {
        registrationForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const fullName = document.getElementById("full_name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const password = document.getElementById("password").value;

            // Input validation
            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }
            if (password.length < 8) {
                alert("Password must be at least 8 characters long.");
                return;
            }

            // WARNING: This is a mock implementation for demonstration purposes only.
            // In a real application, user registration and password hashing should be handled
            // on a secure backend server. Storing hashed passwords in local storage is not secure.
            bcrypt.hash(password, 10, function (err, hash) {
                if (err) {
                    console.error("Error hashing password:", err);
                    return;
                }

                const visitor = {
                    fullName,
                    email,
                    phone,
                    password: hash,
                    address: "",
                    profileImage: ""
                };

                // Save visitor to local storage
                let visitors = JSON.parse(localStorage.getItem("visitors")) || [];
                visitors.push(visitor);
                localStorage.setItem("visitors", JSON.stringify(visitors));

                alert("Registration successful!");
                window.location.href = "visitor-login.html";
            });
        });
    }

    // Visitor Login
    const loginForm = document.getElementById("visitor-login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const visitors = JSON.parse(localStorage.getItem("visitors")) || [];
            const visitor = visitors.find((v) => v.email === email);

            if (visitor) {
                bcrypt.compare(password, visitor.password, function (err, result) {
                    if (result) {
                        sessionStorage.setItem("loggedInVisitor", JSON.stringify(visitor));
                        alert("Login successful!");
                        window.location.href = "visitor-dashboard.html";
                    } else {
                        alert("Invalid email or password.");
                    }
                });
            } else {
                alert("Invalid email or password.");
            }
        });
    }

    // Visitor Dashboard
    const visitorInfo = document.getElementById("visitor-info");
    if (visitorInfo) {
        const loggedInVisitor = JSON.parse(sessionStorage.getItem("loggedInVisitor"));
        if (loggedInVisitor) {
            visitorInfo.innerHTML = `
                <p><strong>Full Name:</strong> ${loggedInVisitor.fullName}</p>
                <p><strong>Email:</strong> ${loggedInVisitor.email}</p>
                <p><strong>Phone:</strong> ${loggedInVisitor.phone}</p>
                <p><strong>Address:</strong> ${loggedInVisitor.address || "Not provided"}</p>
                <p><strong>Profile Image:</strong> ${loggedInVisitor.profileImage ? `<img src="${loggedInVisitor.profileImage}" alt="Profile Image" style="max-width: 100px;">` : "Not provided"}</p>
            `;
        } else {
            window.location.href = "visitor-login.html";
        }
    }

    // Update Profile
    const updateProfileForm = document.getElementById("update-profile-form");
    if (updateProfileForm) {
        const loggedInVisitor = JSON.parse(sessionStorage.getItem("loggedInVisitor"));
        if (loggedInVisitor) {
            document.getElementById("full_name").value = loggedInVisitor.fullName;
            document.getElementById("email").value = loggedInVisitor.email;
            document.getElementById("phone").value = loggedInVisitor.phone;
            document.getElementById("address").value = loggedInVisitor.address || "";

            updateProfileForm.addEventListener("submit", function (event) {
                event.preventDefault();
                const fullName = document.getElementById("full_name").value;
                const email = document.getElementById("email").value;
                const phone = document.getElementById("phone").value;
                const address = document.getElementById("address").value;
                const profileImage = document.getElementById("profile_image").files[0];

                const reader = new FileReader();
                reader.onload = function (e) {
                    const updatedVisitor = {
                        ...loggedInVisitor,
                        fullName,
                        email,
                        phone,
                        address,
                        profileImage: e.target.result
                    };

                    let visitors = JSON.parse(localStorage.getItem("visitors")) || [];
                    visitors = visitors.map((v) => v.email === loggedInVisitor.email ? updatedVisitor : v);
                    localStorage.setItem("visitors", JSON.stringify(visitors));
                    sessionStorage.setItem("loggedInVisitor", JSON.stringify(updatedVisitor));

                    alert("Profile updated successfully!");
                    window.location.href = "visitor-dashboard.html";
                };

                if (profileImage) {
                    reader.readAsDataURL(profileImage);
                } else {
                    const updatedVisitor = {
                        ...loggedInVisitor,
                        fullName,
                        email,
                        phone,
                        address,
                    };

                    let visitors = JSON.parse(localStorage.getItem("visitors")) || [];
                    visitors = visitors.map((v) => v.email === loggedInVisitor.email ? updatedVisitor : v);
                    localStorage.setItem("visitors", JSON.stringify(visitors));
                    sessionStorage.setItem("loggedInVisitor", JSON.stringify(updatedVisitor));

                    alert("Profile updated successfully!");
                    window.location.href = "visitor-dashboard.html";
                }
            });
        } else {
            window.location.href = "visitor-login.html";
        }
    }

    // Logout
    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
        logoutLink.addEventListener("click", function (event) {
            event.preventDefault();
            sessionStorage.removeItem("loggedInVisitor");
            window.location.href = "visitor-login.html";
        });
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
