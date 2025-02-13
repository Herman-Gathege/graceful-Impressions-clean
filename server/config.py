import os
from dotenv import load_dotenv
from datetime import timedelta
import cloudinary


# Load environment variables from a .env file
load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    REACT_APP_URL = os.getenv('REACT_APP_URL')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)  # Extended token lifespan
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=1)  # Refresh token lifespan


 # Cloudinary credentials
    CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")

# Initialize Cloudinary
cloudinary.config(
    cloud_name=Config.CLOUDINARY_CLOUD_NAME,
    api_key=Config.CLOUDINARY_API_KEY,
    api_secret=Config.CLOUDINARY_API_SECRET
)

