import streamlit as st
import hashlib
import sqlite3
from pathlib import Path
import base64

DB_PATH = Path("users.db")

def init_auth_db():
    """Initialize the authentication database."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Create demo user if it doesn't exist
    demo_password_hash = hash_password("demo123")
    cursor.execute("""
        INSERT OR IGNORE INTO users (email, password_hash)
        VALUES ('demo@saasvalidator.com', ?)
    """, (demo_password_hash,))
    
    conn.commit()
    conn.close()

def hash_password(password: str) -> str:
    """Hash a password using SHA256."""
    return hashlib.sha256(password.encode()).hexdigest()

def create_user(email: str, password: str) -> bool:
    """Create a new user account."""
    init_auth_db()
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        password_hash = hash_password(password)
        cursor.execute("""
            INSERT INTO users (email, password_hash)
            VALUES (?, ?)
        """, (email, password_hash))
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        return False  # Email already exists
    finally:
        conn.close()

def verify_user(email: str, password: str) -> bool:
    """Verify user credentials."""
    init_auth_db()
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    password_hash = hash_password(password)
    cursor.execute("""
        SELECT id FROM users 
        WHERE email = ? AND password_hash = ?
    """, (email, password_hash))
    
    result = cursor.fetchone()
    conn.close()
    
    return result is not None

def show_login_page():
    """Display the login page."""
    # Page config should be set before any other streamlit calls
    # This will be called from app.py which already sets page config
    
    # IdeaProof theme CSS
    css_base = """
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    
    * {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    
    .stApp {
        background-color: #f9fafb !important;
        background-image: linear-gradient(rgba(220, 220, 220, 0.6) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(220, 220, 220, 0.6) 1px, transparent 1px) !important;
        background-size: 30px 30px !important;
        min-height: 100vh;
    }
    
    .stApp::before {
        display: none !important; /* Remove dark overlay entirely */
    }
    
    .main {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        max-height: 100vh;
        padding: 0;
        overflow: hidden;
    }
    
    .login-container {
        background: #ffffff;
        border-radius: 20px;
        padding: 2.5rem 2.5rem 2rem 2.5rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        border: 1px solid #f3f4f6;
        max-width: 400px;
        width: 100%;
        margin: 0 auto;
        animation: slideUp 0.6s ease-out;
        position: relative;
        z-index: 10;
    }
    
    @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .logo {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
        font-size: 24px;
        font-weight: bold;
        color: white;
        box-shadow: 0 4px 14px rgba(139, 92, 246, 0.4);
    }
    
    .welcome-text {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .welcome-title {
        font-size: 26px;
        font-weight: 800;
        color: #111827;
        margin-bottom: 0.25rem;
        letter-spacing: -0.5px;
    }
    
    .welcome-subtitle {
        font-size: 14px;
        color: #6b7280;
        font-weight: 500;
    }
    
    .demo-box {
        background: #fdf4ff;
        border-radius: 12px;
        padding: 1rem;
        margin-top: 1rem;
        margin-bottom: 2rem;
        border: 1px dashed #e879f9;
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
    }
    
    .demo-title {
        font-weight: 600;
        color: #a855f7;
        margin-bottom: 0.25rem;
        font-size: 13px;
    }
    
    .demo-box div {
        font-size: 12px;
        color: #4b5563;
        line-height: 1.4;
    }
    
    .demo-box:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(168, 85, 247, 0.15);
        border-color: rgba(168, 85, 247, 0.3);
    }
    
    /* Enhanced input field styling - IdeaProof */
    .stTextInput > div > div > input {
        background-color: #f9fafb;
        border: 2px solid #e5e7eb;
        border-radius: 12px;
        padding: 0.75rem 1rem;
        font-size: 14px;
        transition: all 0.3s ease;
        color: #111827;
        height: 48px;
        max-width: 100%;
        margin: 0 auto;
    }
    .stTextInput > div > div > input::placeholder { color: #9ca3af; }
    
    .stTextInput > div {
        max-width: 100%;
        margin: 0 auto;
    }
    
    .stTextInput > div > div > input:hover {
        border-color: #d1d5db;
        background-color: #ffffff;
    }
    
    .stTextInput > div > div > input:focus {
        border-color: #8b5cf6;
        background-color: #ffffff;
        box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
        outline: none;
    }
    
    .stTextInput label {
        font-weight: 600;
        color: #374151;
        font-size: 13px;
        margin-bottom: 0.5rem;
        max-width: 100%;
    }
    
    /* Button styling - Purple IdeaProof style */
    button[kind="primary"] {
        background: linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%) !important;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        font-size: 15px;
        padding: 0.75rem 1.5rem;
        transition: all 0.3s ease;
        box-shadow: 0 4px 14px rgba(139, 92, 246, 0.4) !important;
        text-transform: none;
        color: white !important;
        width: 100%;
        height: 48px;
        margin-top: 1rem;
    }
    
    button[kind="primary"]:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 20px rgba(139, 92, 246, 0.5) !important;
        background: linear-gradient(135deg, #9333ea 0%, #7c3aed 100%) !important;
    }
    
    button[kind="primary"]:active {
        transform: translateY(0) !important;
        box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3) !important;
    }
    
    /* Checkbox styling - Compact */
    .stCheckbox {
        max-width: 350px;
        margin: 0 auto;
    }
    
    .stCheckbox label {
        font-weight: 500;
        color: #4a5568;
        font-size: 13px;
    }
    
    /* Link styling */
    a {
        transition: all 0.2s ease;
    }
    
    a:hover {
        opacity: 0.8;
        text-decoration: underline;
    }
    
    /* Form container */
    .element-container {
        margin-bottom: 1.5rem;
    }
    
    /* Sign up link */
    .signup-link {
        text-align: center;
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid #e2e8f0;
    }
    
    .signup-link a {
        color: #667eea;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.2s ease;
    }
    
    .signup-link a:hover {
        color: #764ba2;
        text-decoration: underline;
    }
    
    /* Compact styling for all elements */
    .signup-link {
        margin-top: 0.75rem !important;
        padding-top: 0.75rem !important;
        max-width: 350px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        font-size: 12px !important;
    }
    
    .signup-link a {
        font-size: 13px !important;
    }
    
    .stMarkdown a {
        font-size: 12px !important;
    }
    
    .element-container {
        max-width: 350px !important;
        margin: 0 auto !important;
    }
    
    /* Prevent scrolling - ensure single page */
    .stApp {
        overflow: hidden !important;
        max-height: 100vh !important;
    }
    
    /* Reduce spacing between form elements */
    form {
        margin-bottom: 0.5rem !important;
    }
    
    .stForm {
        margin-bottom: 0.5rem !important;
    }
    
    .element-container {
        margin-bottom: 0.5rem !important;
    }
    
    /* Reduce all margins and padding */
    .stForm {
        margin-bottom: 0.25rem !important;
    }
    
    form {
        margin-bottom: 0.25rem !important;
    }
    
    /* Compact checkbox and links */
    .stCheckbox {
        margin-bottom: 0.5rem !important;
    }
    
    .stMarkdown {
        margin-bottom: 0.25rem !important;
    }
    
    /* Hide Streamlit default elements */
    #MainMenu { visibility: hidden; }
    footer { visibility: hidden; }
    header { visibility: hidden; }
    
    /* Smooth scroll */
    html {
        scroll-behavior: smooth;
    }
    
    /* Loading animation */
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    .loading {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    </style>
    
    <script>
    // Add smooth interactions and client-side enhancements
    document.addEventListener('DOMContentLoaded', function() {
        // Add focus animations to inputs
        const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                if (this.parentElement && this.parentElement.parentElement) {
                    this.parentElement.parentElement.style.transform = 'scale(1.02)';
                    this.parentElement.parentElement.style.transition = 'transform 0.2s ease';
                }
            });
            input.addEventListener('blur', function() {
                if (this.parentElement && this.parentElement.parentElement) {
                    this.parentElement.parentElement.style.transform = 'scale(1)';
                }
            });
        });

        // Find key elements
        const emailInput = document.querySelector('input[placeholder="Enter your email or user ID"]') || document.querySelector('input[placeholder="Enter your email"]');
        const passwordInput = document.querySelector('input[placeholder="Enter your password"]') || document.querySelector('input[placeholder="Create a password"]');
        const primaryBtn = document.querySelector('button[kind="primary"]');

        // Helper to insert nodes cleanly
        function insertAfter(newNode, referenceNode) {
            if (referenceNode && referenceNode.parentNode) referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }

        // Inline email validation
        if (emailInput) {
            const emailErr = document.createElement('div');
            emailErr.className = 'inline-error';
            emailErr.setAttribute('aria-live', 'polite');
            emailErr.style.display = 'none';
            insertAfter(emailErr, emailInput.parentElement.parentElement);

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            emailInput.addEventListener('input', () => {
                if (!emailInput.value) {
                    emailErr.style.display = 'none';
                } else if (!emailRegex.test(emailInput.value)) {
                    emailErr.textContent = 'Invalid email format';
                    emailErr.style.display = 'block';
                } else {
                    emailErr.style.display = 'none';
                }
            });
        }

        // Password toggle and strength meter
        if (passwordInput) {
            // Create toggle
            const toggleBtn = document.createElement('button');
            toggleBtn.type = 'button';
            toggleBtn.className = 'pwd-toggle';
            toggleBtn.textContent = 'Show';
            toggleBtn.setAttribute('aria-label', 'Toggle password visibility');

            // Style relative container
            const pwdContainer = passwordInput.parentElement;
            pwdContainer.style.position = 'relative';
            toggleBtn.style.position = 'absolute';
            toggleBtn.style.right = '10px';
            toggleBtn.style.top = '6px';
            toggleBtn.style.background = 'transparent';
            toggleBtn.style.border = 'none';
            toggleBtn.style.cursor = 'pointer';
            toggleBtn.style.color = '#667eea';
            toggleBtn.style.fontWeight = '600';
            toggleBtn.style.padding = '4px 6px';
            toggleBtn.style.fontSize = '13px';

            pwdContainer.appendChild(toggleBtn);

            toggleBtn.addEventListener('click', () => {
                const isPwd = passwordInput.type === 'password';
                passwordInput.type = isPwd ? 'text' : 'password';
                toggleBtn.textContent = isPwd ? 'Hide' : 'Show';
                passwordInput.focus();
            });

            // Strength meter elements
            const strengthWrap = document.createElement('div');
            strengthWrap.className = 'strength-wrap';
            strengthWrap.innerHTML = '<div class="strength-bar" aria-hidden="true"><div class="strength-inner"></div></div><div class="strength-text">&nbsp;</div>';
            insertAfter(strengthWrap, pwdContainer.parentElement);

            const strengthInner = strengthWrap.querySelector('.strength-inner');
            const strengthText = strengthWrap.querySelector('.strength-text');

            function passwordScore(p) {
                let score = 0;
                if (p.length >= 8) score++;
                if (/[A-Z]/.test(p)) score++;
                if (/[0-9]/.test(p)) score++;
                if (/[^A-Za-z0-9]/.test(p)) score++;
                return Math.min(score, 3);
            }

            function updateStrength() {
                const s = passwordScore(passwordInput.value);
                const pct = (s / 3) * 100;
                strengthInner.style.width = pct + '%';
                if (s === 0) {
                    strengthInner.style.background = '#e6e6e6';
                    strengthText.textContent = 'Too short';
                } else if (s === 1) {
                    strengthInner.style.background = '#ef4444';
                    strengthText.textContent = 'Weak';
                } else if (s === 2) {
                    strengthInner.style.background = '#f59e0b';
                    strengthText.textContent = 'Medium';
                } else {
                    strengthInner.style.background = '#10b981';
                    strengthText.textContent = 'Strong';
                }
            }

            passwordInput.addEventListener('input', () => {
                updateStrength();
            });

            // initialize
            updateStrength();
        }

        // Demo autofill button
        if (primaryBtn) {
            const demoBtn = document.createElement('button');
            demoBtn.type = 'button';
            demoBtn.className = 'demo-btn';
            demoBtn.textContent = 'Use demo account';
            demoBtn.style.marginLeft = '8px';
            demoBtn.style.background = 'transparent';
            demoBtn.style.border = '1px dashed rgba(102,126,234,0.6)';
            demoBtn.style.color = '#667eea';
            demoBtn.style.padding = '6px 10px';
            demoBtn.style.borderRadius = '8px';
            demoBtn.style.cursor = 'pointer';
            demoBtn.style.fontSize = '13px';

            primaryBtn.parentElement.appendChild(demoBtn);

            demoBtn.addEventListener('click', () => {
                if (emailInput) emailInput.value = 'demo@saasvalidator.com';
                if (passwordInput) passwordInput.value = 'demo123';
                // trigger input events to update any UI
                emailInput && emailInput.dispatchEvent(new Event('input'));
                passwordInput && passwordInput.dispatchEvent(new Event('input'));
                // auto-click sign in to demonstrate
                // give a small delay so the user can see autofill
                setTimeout(() => primaryBtn.click(), 200);
            });

            // Add a quick spinner when clicking primary button for immediate feedback
            primaryBtn.addEventListener('click', function (e) {
                // If button already shows loading, do not add another
                if (this.classList.contains('loading')) return;
                this.classList.add('loading');
                const spinner = document.createElement('span');
                spinner.className = 'btn-spinner';
                spinner.setAttribute('aria-hidden', 'true');
                spinner.style.marginLeft = '8px';
                this.appendChild(spinner);

                // Remove spinner after a timeout in case Streamlit doesn't reload immediately
                setTimeout(() => {
                    this.classList.remove('loading');
                    spinner.remove();
                }, 4000);
            });
        }

        // Preserve ripple effect on buttons
        const buttons = document.querySelectorAll('button[kind="primary"]');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 700);
            });
        });
    });
    </script>

    <style>
    /* Ripple effect */
    button[kind="primary"] {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    /* Inline error */
    .inline-error {
        color: #dc2626;
        font-size: 12px;
        margin-top: 6px;
        text-align: left;
        max-width: 350px;
        margin-left: auto;
        margin-right: auto;
    }

    /* Password toggle */
    .pwd-toggle {
        background: transparent;
        border: none;
        color: #667eea;
        cursor: pointer;
        font-weight: 600;
        font-size: 13px;
        padding: 4px 6px;
    }

    /* Strength meter */
    .strength-wrap { max-width: 350px; margin: 6px auto; text-align: center; }
    .strength-bar { background: #eee; height: 8px; border-radius: 6px; overflow: hidden; }
    .strength-inner { height: 100%; width: 0%; transition: width .25s ease; background: linear-gradient(90deg,#ef4444,#f59e0b,#10b981); }
    .strength-text { font-size: 12px; color: #718096; margin-top: 6px; }

    /* Demo button */
    .demo-btn { background: transparent; border: 1px dashed rgba(102,126,234,0.6); color: #667eea; padding: 6px 10px; border-radius: 8px; margin-left: 8px; cursor: pointer; font-size: 13px; }

    /* Spinner for button */
    .btn-spinner { border: 3px solid rgba(255,255,255,.2); border-left-color: #fff; border-radius: 50%; width: 16px; height: 16px; display: inline-block; margin-left: 8px; animation: spin .9s linear infinite; vertical-align: middle; }

    @keyframes spin { to { transform: rotate(360deg); } }
    </style>
    """
    
    # Output the complete CSS
    st.markdown(css_base, unsafe_allow_html=True)
    
    # Login container
    st.markdown('<div class="login-container">', unsafe_allow_html=True)
    
    # Logo
    st.markdown('<div class="logo">🚀</div>', unsafe_allow_html=True)
    
    # Welcome text
    st.markdown("""
    <div class="welcome-text">
        <div class="welcome-title">Welcome back</div>
        <div class="welcome-subtitle">Sign in to your AI SaaS Validator account</div>
    </div>
    """, unsafe_allow_html=True)

    # Back to landing (visible on login page)
    if st.button("← Back to home", key="back_to_home", help="Return to the landing page"):
        st.session_state.show_login = False
        st.experimental_rerun()
    
    # Demo credentials box (helpful for quick evaluation)
    st.markdown("""
    <div class="demo-box" role="note" aria-live="polite">
        <div class="demo-title">Demo account</div>
        <div>Try: <strong>demo@saasvalidator.com</strong> / <strong>demo123</strong></div>
        <div style="margin-top:8px;text-align:center;"><small style="color:#4a5568">Click <em>Use demo account</em> after autofill to sign in automatically.</small></div>
    </div>
    """, unsafe_allow_html=True)

    # Login form
    with st.form("login_form"):
        email = st.text_input("Email or User ID", placeholder="Enter your email or user ID", key="login_email")
        password = st.text_input("Password", type="password", placeholder="Enter your password", key="login_password")
        
        col1, col2 = st.columns([1, 1])
        with col1:
            remember_me = st.checkbox("Remember me")
        with col2:
            st.markdown('<div style="text-align: right; padding-top: 0.5rem;"><a href="#" style="color: #667eea; text-decoration: none;">Forgot password?</a></div>', unsafe_allow_html=True)
        
        login_button = st.form_submit_button("Sign In", type="primary", use_container_width=True)
        
        if login_button:
            if not email or not password:
                st.error("Please enter both email and password")
            elif verify_user(email, password):
                st.session_state.authenticated = True
                st.session_state.user_email = email
                if remember_me:
                    st.session_state.remember_me = True
                st.success("Login successful!")
                st.rerun()
            else:
                st.error("Invalid email or password")
    
    # Sign up link removed
    # Demo credentials removed - users must sign up to access
    
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Sign up form (hidden by default, can be toggled)
    with st.expander("Create New Account", expanded=False):
        with st.form("signup_form"):
            new_email = st.text_input("Email", placeholder="Enter your email", key="signup_email")
            new_password = st.text_input("Password", type="password", placeholder="Create a password", key="signup_password")
            confirm_password = st.text_input("Confirm Password", type="password", placeholder="Confirm your password", key="confirm_password")
            
            signup_button = st.form_submit_button("Sign Up", type="primary", use_container_width=True)
            
            if signup_button:
                if not new_email or not new_password:
                    st.error("Please fill in all fields")
                elif new_password != confirm_password:
                    st.error("Passwords do not match")
                elif len(new_password) < 6:
                    st.error("Password must be at least 6 characters")
                else:
                    if create_user(new_email, new_password):
                        st.success("Account created successfully! You can now sign in.")
                    else:
                        st.error("Email already exists. Please use a different email.")
