

from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token
from extensions import db, bcrypt  # ✅ Ensure bcrypt is imported correctly
from models import User

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh_token():
    identity = get_jwt_identity()
    new_access_token = create_access_token(identity=identity)
    return jsonify(access_token=new_access_token), 200

# ---- SIGNUP ROUTE ----
@auth_routes.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password1 = data.get('password1')
        password2 = data.get('password2')

        # ✅ Validate required fields
        if not name or not email or not password1 or not password2:
            return jsonify({"error": "All fields are required."}), 400

        # ✅ Check if passwords match
        if password1 != password2:
            return jsonify({"error": "Passwords do not match."}), 400

        # ✅ Check password length
        if len(password1) < 7:
            return jsonify({"error": "Password must be at least 7 characters."}), 400

        # ✅ Check if email is already taken
        if User.query.filter_by(email=email).first():
            return jsonify({"error": "User already exists."}), 400

        # ✅ Create and save the user
        new_user = User(name=name, email=email)
        new_user.set_password(password1)  # ✅ Hash password using set_password method
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User created successfully"}), 201

    except Exception as e:
        print(f"Signup Error: {e}")  # Debugging
        return jsonify({"error": "An error occurred during signup."}), 500

# ---- LOGIN ROUTE ----
# @auth_routes.route('/login', methods=['POST'])
# def login():
#     try:
#         data = request.get_json()
#         email = data.get('email')
#         password = data.get('password')

#         user = User.query.filter_by(email=email).first()

#         if user and user.check_password(password):  # ✅ Use the model's method
#             access_token = create_access_token(identity=user.id)
#             return jsonify({
#                 "message": "Login successful",
#                 "access_token": access_token,
#                 "user": {"id": user.id, "name": user.name, "email": user.email}
#             }), 200

#         return jsonify({"error": "Invalid email or password"}), 400

#     except Exception as e:
#         print(f"Login Error: {e}")  # Debugging
#         return jsonify({"error": "An error occurred during authentication."}), 500
@auth_routes.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()

        if user and user.check_password(password):  # ✅ Use model's method
            access_token = create_access_token(identity=str(user.id))  # 🔥 Convert to string
            return jsonify({
                "message": "Login successful",
                "access_token": access_token,
                "user": {"id": user.id, "name": user.name, "email": user.email}
            }), 200

        return jsonify({"error": "Invalid email or password"}), 400

    except Exception as e:
        print(f"Login Error: {e}")  # Debugging
        return jsonify({"error": "An error occurred during authentication."}), 500



# ---- LOGOUT ROUTE ----
@auth_routes.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    user_id = get_jwt_identity()
    return jsonify({"message": f"User {user_id} logged out successfully"}), 200
