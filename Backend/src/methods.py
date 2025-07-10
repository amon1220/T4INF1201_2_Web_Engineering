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
    Placeholder function for password policy validation.
    :param password:
    :return bool: True
    """
    return True
