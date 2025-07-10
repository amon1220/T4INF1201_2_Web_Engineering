from sqlalchemy.orm import sessionmaker
from Backend.src.models import *
from werkzeug.security import generate_password_hash
import os

# Database setup
db_path = os.path.abspath("db/database.db") # Path to the SQLite database
engine = create_engine(f'sqlite:///{db_path}', echo=True)
Base.metadata.create_all(engine)    # Create tables if they do not exist

Session = sessionmaker(bind=engine) # Create a session factory bound to the engine

def create_session():
    """
    Returns the session object for database operations
    :return Session: SQLAlchemy session object
    """
    return Session()


def test_db():
    """
    Test function to insert a user with a hashed password into the database
    """
    session = create_session()
    try:
        hashed_pw = generate_password_hash("2")
        session.add(User(username="2", email="2", password=hashed_pw))
        session.commit()
        print("User with hashed password inserted")

        for u in session.query(User).all():
            print(u.user_id, u.username, u.email)
    finally:
        session.close()

def password_policy(password):
    """
    Password validation function to enforce security policies
    :param password:
    :return: Tuple (is_valid: bool, message: str)
    """
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    if not any(char.isdigit() for char in password):
        return False, "Password must contain at least one digit"
    if not any(char.isupper() for char in password):
        return False, "Password must contain at least one uppercase letter"
    if not any(char.islower() for char in password):
        return False, "Password must contain at least one lowercase letter"
    if not any(char in "!@#$%^&*()-_=+[]{}|;:,.<>?/" for char in password):
        return False, "Password must contain at least one special character"
    return True, "Password is valid"
