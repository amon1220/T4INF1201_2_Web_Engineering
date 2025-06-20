from sqlalchemy.orm import sessionmaker
from Backend.src.models import *

engine = create_engine('sqlite:///db/database.db', echo=True)
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
def create_session():
    return Session()

def test():
    session = create_session()
    session.commit()

    for u in session.query(User).all():
        print(u.user_id, u.username, u.email)

    session.close()