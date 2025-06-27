from sqlalchemy.orm import sessionmaker
from Backend.src.models import *
from werkzeug.security import generate_password_hash
import os

db_path = os.path.abspath("db/database.db")
engine = create_engine(f'sqlite:///{db_path}', echo=True)
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)

def create_session():
    return Session()


def test_db():
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
    return True
