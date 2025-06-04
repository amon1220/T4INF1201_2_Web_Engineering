from sqlalchemy import *
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String)
    email = Column(String)
    password = Column(String)

class Data(Base):
    __tablename__ = 'data'
    user_id = Column(ForeignKey('users.user_id'), primary_key=True)

class Notepad(Base):
    __tablename__ = 'notepad'
    notepad_id = Column(Integer, primary_key=True, autoincrement=True)
    data_user_id = Column(ForeignKey('data.user_id'))
    saved_text = Column(String)
    created = Column(Integer)
    last_edited = Column(Integer)
