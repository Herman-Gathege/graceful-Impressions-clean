import os
from flask import Flask, send_from_directory
from extensions import db 
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_login import LoginManager
from config import Config  # Import your config.py

# Initialize your Flask app
app = Flask(
    __name__,
    static_folder='../frontend/build',
    static_url_path='/'
)

# Load the configurations from config.py
app.config.from_object(Config)

# Initialize extensions
jwt = JWTManager(app)
db.init_app(app)
# bcrypt.init_app(app)
migrate = Migrate(app, db)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "auth.login"  # This should match the name of the login route


# CORS setup with dynamic frontend URL from .env
frontend_url = app.config['REACT_APP_URL']  # Use the value from config.py

# CORS(app, supports_credentials=True, resources={r"/*": {"origins": [frontend_url, "http://localhost:3000"]}})
CORS(app, supports_credentials=True, resources={r"/*": {"origins": [Config.REACT_APP_URL, "http://localhost:3000"]}})




# Register your blueprints
from routes import auth_routes
from profile import profile_routes


app.register_blueprint(auth_routes, url_prefix='/auth')
app.register_blueprint(profile_routes, url_prefix='/api')

# Serve React frontend for non-API routes
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    # Allow API and auth routes to work properly
    if path.startswith("api") or path.startswith("auth"):
        return "Not found", 404  

    # Serve React static files if they exist
    full_path = os.path.join(app.static_folder, path)
    if os.path.exists(full_path):
        return send_from_directory(app.static_folder, path)

    # ✅ If path doesn't exist, serve React's index.html for routing
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    app.run(debug=True)