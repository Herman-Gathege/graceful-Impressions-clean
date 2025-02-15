
    
from flask_login import UserMixin
from flask_bcrypt import generate_password_hash, check_password_hash
from extensions import db  # ✅ Avoids circular import

# Many-to-Many Table for User Likes on Artworks
likes_table = db.Table(
    'likes',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('art_id', db.Integer, db.ForeignKey('art.id'), primary_key=True)
)

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
    liked_artworks = db.relationship('Art', secondary=likes_table, backref='liked_by')  # ✅ Track liked artworks


    # Password Methods
    def set_password(self, password):
        self.password_hash = generate_password_hash(password).decode('utf-8')

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
    likes = db.Column(db.Integer, default=0, nullable=False)  # ✅ Ensure default is set



    def __repr__(self):
        return f"<Art(id={self.id}, name={self.name}, price={self.price}, artist_id={self.user_id})>"
