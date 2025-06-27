from flask import Blueprint, request, jsonify, abort
from sqlalchemy.orm import Session
from Backend.src.models import *
from Backend.src.methods import engine

api = Blueprint('api', __name__)


@api.route('/data')
def get_data():
    """
    GET /data

    route for initial testing
    """
    return "Placeholder"


@api.route('/users')
def get_users():
    """
    GET /users

    Get a list of all users

    Returns:
        JSON: A list of users with 'user_id', 'username', and 'email' fields.
    """
    with Session(engine) as session:
        users = session.query(User).all()

        return jsonify([{
            'user_id': u.user_id,
            'username': u.username,
            'email': u.email
        } for u in users])


@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """
    GET /users/<user_id>

    Get a user by id.

    Args:
        user_id (int): The id of the user.

    Returns:
        JSON: A user object containing 'user_id', 'username', and 'email' fields.

    Raises:
        404: If there is no user associated with the given id.
    """
    with Session(engine) as session:
        user = session.get(User, user_id)

        if user:
            return jsonify({
                'user_id': user.user_id,
                'username': user.username,
                'email': user.email
            })
        return abort(404, "User not found")


@api.route('/users', methods=['POST'])
def create_user():
    """
    POST /users

    Create a new user with the provided data.

    Request JSON:
        {
            'username': str,
            "email": str,
            "password": str
        }

    Returns:
        JSON: Success message and new user id.
    Raises:
        400: If not all required information is provided.
    """
    data = request.json
    if not all(k in data for k in ('username', 'email', 'password')):
        return abort(400, "Missing fields")

    with Session(engine) as session:
        new_user = User(
            username=data['username'],
            email=data['email'],
            password=data['password']
        )
        session.add(new_user)
        session.commit()
        return jsonify({'message': 'User created', 'user_id': new_user.user_id}), 201


@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """
    PUT /users/<user_id>

    Update the data of an existing user.

    Request JSON 'username' || 'email' || 'password' (|| logical or):
        {
            "username": str,
            "email": str,
            "password": str
        }

    Returns:
        JSON: Success message.
    Raises:
        404: If the user doesn´t exist.
    """
    data = request.json

    with Session(engine) as session:
        user = session.get(User, user_id)

        if not user:
            return abort(404, "User not found")

        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.password = data.get('password', user.password)
        session.commit()
        return jsonify({'message': 'User updated'}), 200


@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    """
    DELETE /users/<user_id>

    Delete a user by id.

    Returns:
        JSON: Success message.
    Raises:
        404: If the user doesn´t exist.
    """
    with Session(engine) as session:
        user = session.get(User, user_id)

        if not user:
            return abort(404, "User not found")

        session.delete(user)
        session.commit()
        return jsonify({'message': 'User deleted'}), 200


@api.route('/notepads')
def get_notepads():
    """
    GET /notepads

    Get all notepads.

    Returns:
        JSON: List of all notepads.
    """
    with Session(engine) as session:
        notepads = session.query(Notepad).all()

        return jsonify([{
            'notepad_id': n.notepad_id,
            'user_id': n.user_id,
            'email': n.saved_text,
            'created': n.created,
            'last_edited': n.last_edited
        } for n in notepads])


@api.route('/notepads/<int:user_id>', methods=['GET'])
def get_user_notepads(user_id):
    """
    GET /notepads/<user_id>

    Retrieve all notepads associated with a specific user.

    Args:
        user_id (int): id of the user.

    Returns:
        JSON: List of all notepads associated with the user.
    Raises:
        404: If the user doesn´t exist.
    """
    with Session(engine) as session:
        user = session.get(User, user_id)

        if not user:
            return abort(404, "User not found")

        notepads = session.query(Notepad).filter(Notepad.user_id == user_id).all()

        result = [{
            'notepad_id': n.notepad_id,
            'saved_text': n.saved_text,
            'created': n.created,
            'last_edited': n.last_edited
        } for n in notepads]

        return jsonify(result), 200


@api.route('/notepads/<int:notepad_id>', methods=['GET'])
def get_notepad(notepad_id):
    """
    GET /notepads/<notepad_id>

    Get a single notepad by id.

    Args:
        notepad_id (int): id of the notepad.

    Returns:
        JSON: Notepad data.
    Raises:
        404: If the notepad doesn´t exist.
    """
    with Session(engine) as session:
        notepad = session.get(Notepad, notepad_id)

        if notepad:
            return jsonify({
                'notepad_id': notepad.notepad_id,
                'user_id': notepad.user_id,
                'saved_text': notepad.saved_text,
                'created': notepad.created,
                'last_edited': notepad.last_edited
            })
        return abort(404, "Notepad not found")


# the name is kid of misleading "file" would be better
@api.route('/notepad', methods=['POST'])
def create_notepad():
    """
    POST /notepad

    Create a new notepad.

    Request JSON:
        {
            "saved_text": str,
            "created": str,
            "last_edited": str
        }

    Returns:
        JSON: Success message and new notepad id.
    Raises:
        400: If required fields are missing.
    """
    data = request.json
    if not all(k in data for k in ('saved_text', 'created', 'last_edited')):
        return abort(400, "Missing fields")

    with Session(engine) as session:
        new_notepad = Notepad(
            saved_text=data['saved_text'],
            created=data['created'],
            last_edited=data['last_edited']
        )
        session.add(new_notepad)
        session.commit()
        return jsonify({'message': 'Notepad created', 'notepad_id': new_notepad.notepad_id}), 201


@api.route('/notepad/<int:notepad_id>', methods=['PUT'])
def update_notepad(notepad_id):
    """
    PUT /notepad/<notepad_id>

    Update an existing notepad.

    Request JSON 'saved_text' || 'created' || 'last_edited' (logical or):
        {
            "saved_text": str,
            "created": str,
            "last_edited": str
        }

    Returns:
        JSON: Success message.
    Raises:
        404: If the notepad doesn´t exist.
    """
    data = request.json

    with Session(engine) as session:
        notepad = session.get(Notepad, notepad_id)

        if not notepad:
            return abort(404, "Notepad not found")

        notepad.saved_text = data.get('saved_text', notepad.saved_text)
        notepad.created = data.get('created', notepad.created)
        notepad.last_edited = data.get('last_edited', notepad.last_edited)
        session.commit()
        return jsonify({'message': 'Notepad updated'}), 200


@api.route('/notepad/<int:notepad_id>', methods=['DELETE'])
def delete_notepad(notepad_id):
    """
    DELETE /notepad/<notepad_id>

    Delete a notepad by id.

    Returns:
        JSON: Success message.
    Raises:
        404: If the notepad doesn´t exist.
    """
    with Session(engine) as session:
        notepad = session.get(Notepad, notepad_id)

        if not notepad:
            return abort(404, "Notepad not found")

        session.delete(notepad)
        session.commit()
        return jsonify({'message': 'Notepad deleted'}), 200
