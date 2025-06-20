from sqlalchemy.orm import sessionmaker
from Backend.src.models import *
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
        session.add(User(username="1", email="1", password="1"))
        session.commit()
        print("User inserted")

        for u in session.query(User).all():
            print(u.user_id, u.username, u.email)
    finally:
        session.close()
