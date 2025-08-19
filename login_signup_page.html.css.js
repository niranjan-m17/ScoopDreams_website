<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ScoopDreams Login & Sign Up</title>
    <!-- Use Tailwind CSS for modern styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Pacifico&display=swap" rel="stylesheet">
    <!-- Font Awesome for the eye icon -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            /* Changed to a linear gradient blending cream and coffee colors */
            background: linear-gradient(135deg, #F5F5DC, #6F4E37); 
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            overflow: hidden;
            position: relative; /* For the copyright notice */
        }

        .main-container {
            position: relative;
            /* Increased size for a more spacious and professional look */
            width: 950px;
            height: 600px;
            border-radius: 1.5rem;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            display: flex;
            overflow: hidden;
            /* Added margin to create spacing below the header */
            margin-top: 3rem;
        }

        /* The sliding panels */
        .panel {
            flex-shrink: 0;
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: transform 0.6s ease-in-out;
            position: relative;
        }

        .left-panel {
            background-color: #6F4E37; /* Coffee color */
            color: #fff;
            padding: 3rem;
            text-align: center;
            flex-direction: column;
            
        }

        .right-panel {
            background-color: #f5f0e1; /* Cream color */
            padding: 3rem;
            position: relative;
        }

        /* Active state for animation */
        .main-container.active .left-panel {
            transform: translateX(100%);
        }

        .main-container.active .right-panel {
            transform: translateX(-100%);
        }

        /* Text and button styles for the left panel */
        .panel-text {
            max-width: 80%;
        }

        .panel-text h2 {
            font-family: 'Pacifico', cursive;
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }

        .panel-text p {
            font-weight: 400;
            line-height: 1.5;
            margin-bottom: 2rem;
        }
        
        .logo-text {
            position: absolute;
            /* Moved to the top-left corner */
            top: 1.5rem;
            left: 1.5rem;
            font-family: 'Pacifico', cursive;
            /* Reverted font size back to 20-25pt range */
            font-size: 2.25rem;
            color: #6F4E37;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }

        .home-button {
            position: absolute;
            /* Moved to the top-right corner */
            top: 1.5rem;
            right: 1.5rem;
            padding: 0.75rem 1.5rem;
            border: 2px solid #6F4E37;
            border-radius: 1.5rem;
            background-color: transparent;
            color: #6F4E37;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s, color 0.2s;
            /* Kept font size at the smaller 10-15pt range */
            font-size: 1.25rem;
        }
        
        .home-button:hover {
            background-color: #6F4E37;
            color: white;
        }

        /* Form container within the right panel */
        .form-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: transform 0.6s ease-in-out;
        }
        
        #login-form-wrapper {
            transform: translateX(0);
        }
        
        #signup-form-wrapper {
            transform: translateX(100%);
        }

        /* Active form state */
        .main-container.active #login-form-wrapper {
            transform: translateX(-100%);
        }

        .main-container.active #signup-form-wrapper {
            transform: translateX(0);
        }

        /* Form elements */
        .auth-title {
            font-family: 'Pacifico', cursive;
            font-size: 2.5rem;
            font-weight: 400;
            color: #6F4E37; /* Chocolate coffee color */
            text-align: center;
            margin-bottom: 2rem;
        }

        .input-group {
            /* Reduced margin for a more compact layout */
            margin-bottom: 1rem;
            position: relative; /* Make it a positioning context for the label */
        }

        .input-group label {
            position: absolute;
            top: 50%;
            left: 1rem;
            transform: translateY(-50%);
            color: #4b5563;
            font-weight: 500;
            pointer-events: none; /* Allows clicks to pass through to the input */
            transition: all 0.2s ease-in-out;
        }

        .input-group input {
            width: 100%;
            padding: 1.5rem 1rem 0.5rem; /* Adjust padding for the floating label */
            border: 1px solid #d1d5db;
            border-radius: 0.75rem;
            font-size: 1rem;
            background-color: #FAF8F1; /* Cream input field */
            transition: border-color 0.2s, box-shadow 0.2s;
        }

        .input-group input:focus {
            outline: none;
            border-color: #6F4E37; /* ScoopDreams theme color */
            box-shadow: 0 0 0 3px rgba(111, 78, 55, 0.2);
        }

        /* Floating label effect */
        .input-group input:focus + label,
        .input-group.active label {
            top: 0.5rem;
            font-size: 0.75rem;
            transform: translateY(0);
        }
        
        .btn-primary {
            width: 100%;
            padding: 0.75rem 1rem;
            background-color: #6F4E37;
            color: white;
            font-weight: 600;
            border-radius: 0.75rem;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s, transform 0.2s;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .btn-primary:hover {
            background-color: #5b3e2a;
            transform: translateY(-2px);
        }

        /* Custom styles for the password field and eye icon */
        .password-container {
            position: relative;
        }
        .password-container input {
            padding-right: 2.5rem; /* Make space for the icon */
        }
        .toggle-password {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: #6B7280;
            font-size: 1.2rem;
        }

        /* Custom styles for remember me checkbox */
        .remember-me {
            display: flex;
            align-items: center;
            /* Reduced margin for a more compact layout */
            margin-bottom: 1rem;
        }
        .remember-me input[type="checkbox"] {
            margin-right: 0.5rem;
        }
        .remember-me label {
            margin-bottom: 0;
            font-weight: 400;
            color: #4b5563;
        }
        
        /* Password rules styling */
        .password-rules {
            font-size: 0.875rem;
            color: #6b7280;
            /* Adjusted margin to bring it closer to the input field */
            margin-top: -0.5rem;
            margin-bottom: 1rem;
            list-style: none;
            padding-left: 0;
        }
        .password-rules li:before {
            content: "✓";
            color: #6F4E37;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
        }

        /* Adjusted font size for links */
        .link-text a {
            font-size: 1.125rem;
            color: #6F4E37;
            font-weight: 600;
            text-decoration: none;
            transition: color 0.2s;
        }
        .link-text a:hover {
            color: #5b3e2a;
            text-decoration: underline;
        }
        
        .copyright {
            position: absolute;
            bottom: 1rem;
            left: 50%;
            transform: translateX(-50%);
            /* Updated color to be a much lighter shade for visibility */
            color: #d1d5db; 
            /* Reduced font size for a more subtle look */
            font-size: 0.625rem;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="logo-text">ScoopDreams!</div>
    <a href="Homepage.html" class="home-button">Home</a>

    <div class="main-container" id="main-container">
        <!-- Left Panel for text -->
        <div class="panel left-panel">
            <div class="panel-text">
                <h2 id="panel-title">Welcome Back!</h2>
                <p id="panel-text">To keep connected with us please login with your personal info</p>
            </div>
        </div>

        <!-- Right Panel containing the forms -->
        <div class="panel right-panel">
            <div id="login-form-wrapper" class="form-container">
                <form id="loginForm" class="w-full max-w-sm">
                    <h2 class="auth-title">Login</h2>
                    <div class="input-group">
                        <input type="email" id="login-email" name="email" required>
                        <label for="login-email">User name or Email</label>
                    </div>
                    <div class="input-group">
                        <div class="password-container">
                            <input type="password" id="login-password" name="password" required>
                            <label for="login-password">Password</label>
                            <i class="fas fa-eye-slash toggle-password" id="toggle-login-password"></i>
                        </div>
                    </div>
                    <div class="remember-me">
                        <input type="checkbox" id="remember-me" name="remember-me">
                        <label for="remember-me">Remember me</label>
                    </div>
                    <button type="submit" class="btn-primary">Login</button>
                    <p class="link-text mt-4">
                        Don't have an account? <a href="#" id="show-signup">Sign up</a>
                    </p>
                </form>
            </div>
            
            <div id="signup-form-wrapper" class="form-container">
                 <form id="signupForm" class="w-full max-w-sm">
                    <h2 class="auth-title">Create Account</h2>
                    <div class="input-group">
                        <input type="text" id="signup-name" name="name" required>
                        <label for="signup-name">Name</label>
                    </div>
                    <div class="input-group">
                        <input type="email" id="signup-email" name="email" required>
                        <label for="signup-email">Email Address</label>
                    </div>
                    <div class="input-group">
                        <input type="password" id="signup-password" name="password" required>
                        <label for="signup-password">Create your password</label>
                    </div>
                    <ul class="password-rules">
                        <li>At least 8 characters long</li>
                        <li>Contains a number</li>
                        <li>Contains a capital letter</li>
                    </ul>
                    <div class="input-group">
                        <div class="password-container">
                            <input type="password" id="signup-re-enter-password" name="re_enter_password" required>
                            <label for="signup-re-enter-password">Re-enter your password</label>
                            <i class="fas fa-eye-slash toggle-password" id="toggle-signup-re-enter-password"></i>
                        </div>
                    </div>
                    <button type="submit" class="btn-primary">Sign Up</button>
                    <p class="link-text mt-4">
                        Already have an account? <a href="#" id="show-login">Log in</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
    
    <p class="copyright">&copy; 2025 | Created by NIRANJAN M</p>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const mainContainer = document.getElementById('main-container');
            const showSignupLink = document.getElementById('show-signup');
            const showLoginLink = document.getElementById('show-login');
            const panelTitle = document.getElementById('panel-title');
            const panelText = document.getElementById('panel-text');
            
            // Function to handle the slide transition
            const toggleForm = (isLogin) => {
                if (isLogin) {
                    mainContainer.classList.remove('active');
                    panelTitle.innerText = "Welcome Back!";
                    panelText.innerText = "To keep connected with us please login with your personal info";
                } else {
                    mainContainer.classList.add('active');
                    panelTitle.innerText = "Hello, Friend!";
                    panelText.innerText = "Enter your personal details and start your journey with us.";
                }
            };

            // "Don't have an account?" link
            showSignupLink.addEventListener('click', (e) => {
                e.preventDefault();
                toggleForm(false); // Switch to Sign Up
            });

            // "Already have an account?" link
            showLoginLink.addEventListener('click', (e) => {
                e.preventDefault();
                toggleForm(true); // Switch to Login
            });

            // Function to toggle password visibility
            const setupPasswordToggle = (passwordId, toggleId) => {
                const passwordInput = document.getElementById(passwordId);
                const toggleIcon = document.getElementById(toggleId);
                
                toggleIcon.addEventListener('click', () => {
                    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                    passwordInput.setAttribute('type', type);
                    toggleIcon.classList.toggle('fa-eye');
                    toggleIcon.classList.toggle('fa-eye-slash');
                });
            };

            // Setup toggles for both login and signup forms
            setupPasswordToggle('login-password', 'toggle-login-password');
            setupPasswordToggle('signup-re-enter-password', 'toggle-signup-re-enter-password');

            // Function to handle floating labels
            const setupFloatingLabels = () => {
                document.querySelectorAll('.input-group input').forEach(input => {
                    // Check on page load if the input has a value and activate the label
                    if (input.value !== '') {
                        input.parentElement.classList.add('active');
                    }
                    input.addEventListener('focus', () => {
                        input.parentElement.classList.add('active');
                    });
                    input.addEventListener('blur', () => {
                        if (input.value === '') {
                            input.parentElement.classList.remove('active');
                        }
                    });
                });
            };

            // Handle Form Submission
            document.getElementById('loginForm').addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                const rememberMe = document.getElementById('remember-me').checked;

                console.log('Login attempt:', { email, password, rememberMe });
            });

            document.getElementById('signupForm').addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('signup-name').value;
                const email = document.getElementById('signup-email').value;
                const password = document.getElementById('signup-password').value;
                const reEnterPassword = document.getElementById('signup-re-enter-password').value;

                console.log('Sign Up attempt:', { name, email, password, reEnterPassword });
            });

            // Function to get query parameters from the URL
            const getQueryParams = () => {
                const params = {};
                window.location.search.substring(1).split('&').forEach(param => {
                    const [key, value] = param.split('=');
                    params[key] = value;
                });
                return params;
            };

            // Get query params on page load
            const urlParams = getQueryParams();
            if (urlParams.form === 'signup') {
                toggleForm(false);
            }
            
            // Initialize floating labels
            setupFloatingLabels();
        });
    </script>
</body>
</html>
