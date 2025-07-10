from sqlalchemy import *
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class User(Base):
    """
    Represents a user in the system
    Attributes:
        user_id (int): Unique identifier for the user. (Primary Key, auto-incremented)
        username (str): Username of the user
        email (str): Email address of the user
        password (hash): Password of the user
    """
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String)
    email = Column(String)
    password = Column(String)


class Notepad(Base):
    """
    Represents a notepad entry for a user
    Attributes:
        notepad_id (int): Unique identifier for the notepad entry. (Primary Key, auto-incremented)
        user_id (int): Foreign key referencing the user who created the entry
        saved_text (str): The text saved in the notepad
        created (str): Timestamp of when the entry was created
    """
    __tablename__ = 'notepad'
    notepad_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(ForeignKey('users.user_id'))
    saved_text = Column(String)
    created = Column(String)
