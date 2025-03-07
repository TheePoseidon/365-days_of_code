import json
from flask import Flask, redirect, url_for, session
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from authlib.integrations.flask_client import OAuth
from flask_session import Session

# Flask Session Configurations
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_PERMANENT"] = False
Session(app)

app = Flask(__name__)
app.secret_key = "your_secret_key"

# Flask-Login Setup
login_manager = LoginManager()
login_manager.login_view = "login"
login_manager.init_app(app)

# OAuth Setup
oauth = OAuth(app)
google = oauth.register(
    name="google",
    client_id="YOUR_GOOGLE_CLIENT_ID",
    client_secret="YOUR_GOOGLE_CLIENT_SECRET",
    access_token_url="https://oauth2.googleapis.com/token",
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    authorize_params=None,
    api_base_url="https://www.googleapis.com/oauth2/v2/",
    userinfo_endpoint="https://www.googleapis.com/oauth2/v2/userinfo",
    client_kwargs={"scope": "openid email profile"},
)

# User Model
class User(UserMixin):
    def __init__(self, id, name, email):
        self.id = id
        self.name = name
        self.email = email

users = {}  # Temporary storage for users (use a database in production)

@login_manager.user_loader
def load_user(user_id):
    return users.get(user_id)

@app.route("/")
def home():
    return f"Hello, {current_user.name if current_user.is_authenticated else 'Guest'}! <a href='/login'>Login</a>"

@app.route("/login")
def login():
    return google.authorize_redirect(url_for("callback", _external=True))

@app.route("/login/callback")
def callback():
    token = google.authorize_access_token()
    user_info = google.get("userinfo").json()

    if user_info["email"] not in users:
        users[user_info["email"]] = User(user_info["email"], user_info["name"], user_info["email"])

    login_user(users[user_info["email"]])
    return redirect(url_for("dashboard"))

@app.route("/dashboard")
@login_required
def dashboard():
    return f"Welcome, {current_user.name}! <a href='/logout'>Logout</a>"

@app.route("/logout")
@login_required
def logout():
    logout_user()
    session.clear()
    return redirect(url_for("home"))

if __name__ == "__main__":
    app.run(debug=True)
