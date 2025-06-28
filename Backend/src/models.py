from sqlalchemy import *
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String)
    email = Column(String)
    password = Column(String)


class Notepad(Base):
    __tablename__ = 'notepad'
    notepad_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(ForeignKey('users.user_id'))
    saved_text = Column(String)
    created = Column(String)
    last_edited = Column(String)
