
from flask import Blueprint, request, jsonify
from models import db, User, Art
# from werkzeug.utils import secure_filename
# import os
from flask_jwt_extended import jwt_required, get_jwt_identity
import cloudinary
import cloudinary.uploader

profile_routes = Blueprint('profile', __name__)

# UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
# ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

# # Ensure upload folder exists
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)

# Route to serve uploaded images
# @profile_routes.route('/uploads/<filename>')
# def uploaded_file(filename):
#     return send_from_directory(UPLOAD_FOLDER, filename)

# def allowed_file(filename):
#     return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# 🔹 Profile Setup Route
@profile_routes.route('/profile/setup', methods=['POST'])
@jwt_required()
def setup_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    bio = request.form.get('bio', '')

    profile_picture = request.files.get("profile_picture")

    # if profile_picture and allowed_file(profile_picture.filename):
    #     filename = secure_filename(profile_picture.filename)
    #     filepath = os.path.join(UPLOAD_FOLDER, filename)
    #     profile_picture.save(filepath)

    #     # ✅ Store only filename, not full path
    #     user.profile_picture = filename

    # user.bio = bio
    # db.session.commit()
    if profile_picture:
        upload_result = cloudinary.uploader.upload(profile_picture)
        user.profile_picture = upload_result["secure_url"]

    user.bio = bio
    db.session.commit()


    return jsonify({
        "message": "Profile setup completed successfully",
        "user": {
            "name": user.name,
            "email": user.email,
            "bio": user.bio,
            "profile_picture": user.profile_picture
        }
    }), 200

# 🔹 Get Profile Route
@profile_routes.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "name": user.name,
        "email": user.email,
        "bio": user.bio,
        # "profile_picture": f"/uploads/{user.profile_picture}" if user.profile_picture else None,
        "profile_picture": user.profile_picture,
        "artworks": [
            {
                "id": art.id,
                "name": art.name,
                "description": art.description,
                "price": art.price,
                # "image_url": f"/uploads/{art.image_url}" if art.image_url else None,
                "image_url": art.image_url,  # ✅ Cloudinary URL
            }
            for art in user.artworks
        ],
    }), 200

# 🔹 Update Profile Route
@profile_routes.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    bio = request.form.get('bio', user.bio)
    profile_picture = request.files.get("profile_picture")

    # if profile_picture and allowed_file(profile_picture.filename):
    #     filename = secure_filename(profile_picture.filename)
    #     filepath = os.path.join(UPLOAD_FOLDER, filename)
    #     profile_picture.save(filepath)

    #     # ✅ Store only filename
    #     user.profile_picture = filename
    if profile_picture:
        upload_result = cloudinary.uploader.upload(profile_picture)
        user.profile_picture = upload_result["secure_url"]  # ✅ Cloudinary URL

    user.bio = bio
    db.session.commit()

    return jsonify({"message": "Profile updated successfully"})

# 🔹 Add Artwork Route (Handles File Uploads)
@profile_routes.route('/art', methods=['POST'])
@jwt_required()
def add_art():
    user_id = get_jwt_identity()

    name = request.form.get("name")
    description = request.form.get("description")
    price = request.form.get("price")
    image_file = request.files.get("image_file")

    if not all([name, description, price, image_file]):
        return jsonify({"error": "Missing required fields"}), 400

    # if not allowed_file(image_file.filename):
    #     return jsonify({"error": "Invalid file format"}), 400

    # Upload the image to Cloudinary
    upload_result = cloudinary.uploader.upload(image_file)
    image_url = upload_result["secure_url"]

    # filename = secure_filename(image_file.filename)
    # filepath = os.path.join(UPLOAD_FOLDER, filename)
    # image_file.save(filepath)

    new_art = Art(
        name=name,
        description=description,
        price=float(price),
        image_url=image_url,  # ✅ Store filename only
        user_id=user_id
    )

    db.session.add(new_art)
    db.session.commit()

    return jsonify({"message": "Art added successfully"}), 201

# 🔹 Delete Artwork Route
@profile_routes.route('/art/<int:art_id>', methods=['DELETE'])
@jwt_required()
def delete_art(art_id):
    user_id = get_jwt_identity()
    art = Art.query.get(art_id)

    if not art or art.user_id != user_id:
        return jsonify({"error": "Art not found or unauthorized"}), 403

    db.session.delete(art)
    db.session.commit()

    return jsonify({"message": "Art deleted successfully"})


@profile_routes.route('/artworks', methods=['GET'])
def get_all_artworks():
    artworks = Art.query.all()
    return jsonify([
        {
            "id": art.id,
            "name": art.name,
            "description": art.description,
            "price": art.price,
            # "image_url": f"/uploads/{art.image_url}" if art.image_url else None,
            "image_url": art.image_url,
            "artist": {
                "id": art.artist.id,
                "name": art.artist.name
            }
        }
        for art in artworks
    ]), 200


@profile_routes.route('/artists', methods=['GET'])
def get_all_artists():
    artists = User.query.all()
    return jsonify([
        {
            "id": artist.id,
            "name": artist.name,
            # "profile_picture": f"/uploads/{artist.profile_picture}" if artist.profile_picture else None
            "profile_picture": artist.profile_picture  # ✅ Cloudinary URL
        }
        for artist in artists
    ]), 200


@profile_routes.route('/artists/<int:artist_id>', methods=['GET'])
def get_artist_details(artist_id):
    artist = User.query.get(artist_id)

    if not artist:
        return jsonify({"error": "Artist not found"}), 404

    return jsonify({
        "id": artist.id,
        "name": artist.name,
        "bio": artist.bio,
        "profile_picture": artist.profile_picture,
        "artworks": [
            {
                "id": art.id,
                "name": art.name,
                "description": art.description,
                "price": art.price,
                "image_url": art.image_url
            }
            for art in artist.artworks
        ]
    }), 200
