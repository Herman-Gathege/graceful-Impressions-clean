
    

    
# from flask_login import UserMixin
# from app import db

# class User(db.Model, UserMixin):  # Inherit from UserMixin
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     password = db.Column(db.String(200), nullable=False)

#     # Added fields
#     bio = db.Column(db.Text, nullable=True)  # Optional bio
#     profile_picture = db.Column(db.String(255), nullable=True)  # Image URL
    
#     # Relationship: One user can have many art pieces
#     artworks = db.relationship('Art', backref='artist', lazy=True)

#     def __repr__(self):
#         return f"<User {self.name}>"

#     # Flask-Login required methods
#     def is_active(self):
#         return True  # Always active unless specified otherwise

#     def get_id(self):
#         return str(self.id)  # Flask-Login expects this to be a string

#     def is_authenticated(self):
#         return True  # The user is authenticated if they are logged in

#     def is_anonymous(self):
#         return False  # Normal users are not anonymous
    

# class Art(db.Model):  # 🚀 Art is now a standalone model
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     description = db.Column(db.Text, nullable=False)
#     price = db.Column(db.Float, nullable=False)
#     image_url = db.Column(db.String(255), nullable=False)  # URL for art image
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Artist reference
    
from flask_login import UserMixin
from flask_bcrypt import generate_password_hash, check_password_hash
from extensions import db  # ✅ Avoids circular import

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)  # ✅ Hashed password

    # Additional fields
    bio = db.Column(db.Text, nullable=True)
    profile_picture = db.Column(db.String(255), nullable=True)

    # Relationship
    artworks = db.relationship('Art', backref='artist', lazy='dynamic')  # ✅ More efficient lazy loading

    # Password Methods
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"<User(id={self.id}, name={self.name}, email={self.email})>"

class Art(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Foreign key to User

    def __repr__(self):
        return f"<Art(id={self.id}, name={self.name}, price={self.price}, artist_id={self.user_id})>"
