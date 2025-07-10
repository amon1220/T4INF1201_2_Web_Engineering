from flask import Blueprint, request, jsonify, abort
from Backend.src.models import *
from Backend.src.methods import create_session, password_policy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)


@api.route('/data')
def get_data():
    """
    GET /api/dataAdd commentMore actions

    route for initial testing
    """
    return "Placeholder"


@api.route('/users')
def get_users():
    """
    GET /api/users

    Get a list of all users

    Returns:
        JSON: A list of users with 'user_id', 'username', and 'email' fields.
    """
    with create_session() as session:
        users = session.query(User).all()

        return jsonify([{
            'user_id': u.user_id,
            'username': u.username,
            'email': u.email
        } for u in users])


@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """
    GET /api/users/<user_id>

    Get a user by id.

    Args:
        user_id (int): The id of the user.

    Returns:
        JSON: A user object containing 'user_id', 'username', and 'email' fields.

    Raises:
        404: If there is no user associated with the given id.
    """
    with create_session() as session:
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
    POST /api/users

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

    pw_hash = generate_password_hash(data['password'])

    with create_session() as session:
        new_user = User(
            username=data['username'],
            email=data['email'],
            password=pw_hash
        )
        session.add(new_user)
        session.commit()
        return jsonify({'message': 'User created', 'user_id': new_user.user_id}), 201


@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """
    GET /api/users/<user_id>

    Get a user by id.

    Args:
        user_id (int): The id of the user.

    Returns:
        JSON: A user object containing 'user_id', 'username', and 'email' fields.

    Raises:
        404: If there is no user associated with the given id.
    """
    data = request.json

    with create_session() as session:
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
    DELETE /api/users/<user_id>

    Delete a user by id.

    Returns:
        JSON: Success message.
    Raises:
        404: If the user doesn´t exist.
    """
    with create_session() as session:
        user = session.get(User, user_id)

        if not user:
            return abort(404, "User not found")

        session.delete(user)
        session.commit()
        return jsonify({'message': 'User deleted'}), 200


@api.route('/notepads')
def get_notepads():
    """
    GET /api/notepads

    Get all notepads.

    Returns:
        JSON: List of all notepads.
    """
    with create_session() as session:
        notepads = session.query(Notepad).all()

        return jsonify([{
            'notepad_id': n.notepad_id,
            'user_id': n.user_id,
            'saved_text': n.saved_text,
            'created': n.created,
        } for n in notepads])


@api.route('/notepads/fromUser/<int:user_id>', methods=['GET'])
def get_user_notepads(user_id):
    """
    GET /api/notepads/fromUser/<int:user_id>

    Get all notepad that are associated with the user.

    Args:
        user_id (int): id of the user the notepads belongs to.

    Returns:
        JSON: List of notepads and teir data.
    Raises:
        404: If the user doesn´t exist.
    """
    with create_session() as session:
        user = session.get(User, user_id)

        if not user:
            return abort(404, "User not found")

        notepads = session.query(Notepad).filter(Notepad.user_id == user_id).all()

        result = [{
            'notepad_id': n.notepad_id,
            'saved_text': n.saved_text,
            'created': n.created,
        } for n in notepads]

        return jsonify(result), 200


@api.route('/notepads/<int:notepad_id>', methods=['GET'])
def get_notepad(notepad_id):
    """
    GET /api/notepads/<notepad_id>

    Get a single notepad by id.

    Args:
        notepad_id (int): id of the notepad.

    Returns:
        JSON: Notepad data.
    Raises:
        404: If the notepad doesn´t exist.
    """
    with create_session() as session:
        notepad = session.get(Notepad, notepad_id)

        if notepad:
            return jsonify({
                'notepad_id': notepad.notepad_id,
                'user_id': notepad.user_id,
                'saved_text': notepad.saved_text,
                'created': notepad.created,
            })
        return abort(404, "Notepad not found")


# the name is kid of misleading "file" would be better
@api.route('/notepad', methods=['POST'])
def create_notepad():
    """
    POST /api/notepad

    Create a new notepad.

    Request JSON:
        {
            "user_id": int,
            "saved_text": str,
            "created": str,
        }

    Returns:
        JSON: Success message and new notepad id.
    Raises:
        400: If required fields are missing.
    """
    data = request.json
    required_fields = ('user_id', 'saved_text', 'created')
    missing = [k for k in required_fields if k not in data]
    if missing:
        return abort(400, f"Missing fields: {', '.join(missing)}")

    with create_session() as session:
        new_notepad = Notepad(
            user_id=data['user_id'],
            saved_text=data['saved_text'],
            created=data['created'],
        )
        session.add(new_notepad)
        session.commit()
        return jsonify({'message': 'Notepad created', 'notepad_id': new_notepad.notepad_id}), 201


#we can argue if there is a reason to offer created but I just leave it
@api.route('/notepad/<int:notepad_id>', methods=['PUT'])
def update_notepad(notepad_id):
    """
    PUT /api/notepad/<notepad_id>

    Update an existing notepad.

    Request JSON 'saved_text' || 'created' (logical or):
        {
            "saved_text": str,
            "created": str,
        }

    Returns:
        JSON: Success message.
    Raises:
        404: If the notepad doesn´t exist.
    """
    data = request.json

    with create_session() as session:
        notepad = session.get(Notepad, notepad_id)

        if not notepad:
            return abort(404, "Notepad not found")

        notepad.saved_text = data.get('saved_text', notepad.saved_text)
        notepad.created = data.get('created', notepad.created)
        session.commit()
        return jsonify({'message': 'Notepad updated'}), 200


@api.route('/notepad/<int:notepad_id>', methods=['DELETE'])
def delete_notepad(notepad_id):
    """
    DELETE /api/notepad/<notepad_id>

    Delete a notepad by id.

    Returns:
        JSON: Success message.
    Raises:
        404: If the notepad doesn´t exist.
    """
    with create_session() as session:
        notepad = session.get(Notepad, notepad_id)

        if not notepad:
            return abort(404, "Notepad not found")

        session.delete(notepad)
        session.commit()
        return jsonify({'message': 'Notepad deleted'}), 200


@api.route('login', methods=['POST'])
def login():
    """
    POST /api/login
    Login a user with username and password
    Request JSON:
        {
            'username': str,
            'password': str
        }
    Checks if user exists and password is correct
    If successful, returns an access token and user json object

    """
    data = request.json
    username = data.get('username')
    password = data.get('password')
    with create_session() as session:
        user = session.query(User).filter_by(username=username).first()
        if not user or not check_password_hash(user.password, password):
            return jsonify({'message': 'Invalid Username or Password'}), 401

        access_token = create_access_token(identity=user.user_id)
        return jsonify({
            'access_token': access_token,
            'user': {
                'user_id': user.user_id,
                'username': user.username,
                'email': user.email
            }
        }), 200

@api.route('/register', methods=['POST'])
def register():
    """
    POST /api/register
    Register a new user with username, email and password
    Request JSON:
        {
            'username': str,
            'email': str,
            'password': str
        }

    Checks for missing fields, existing username and email
    If successful creates a new user and hashes the password
    :return JSON with: access token and user data
    """
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not all([username, email, password]):
        return jsonify({'message': 'Missing Fields'}), 400


    pw_valid, msg = password_policy(password)
    if not pw_valid:
        return jsonify({'message': msg}), 400

    with create_session() as session:
        if session.query(User).filter_by(username=username).first():
            return jsonify({'message': 'Username already exits'}), 400
        if session.query(User).filter_by(email=email).first():
            return jsonify({'message': 'Email already exists'}), 400

        hashed_pw = generate_password_hash(password)
        new_user = User(username=username, email=email, password=hashed_pw)
        session.add(new_user)
        session.commit()

        access_token = create_access_token(identity=new_user.user_id)
        return jsonify({
            'access_token': access_token,
            'user': {
                'user_id': new_user.user_id,
                'username': new_user.username,
                'email': new_user.email
            }
        }), 200

@api.route('/change_pw', methods=['POST'])
def change_pw():
    """
    POST /api/change_pw
    Change the password of a user
    Request JSON:
        {
            'user_id': int,
            'oldPassword': str,
            'newPassword': str
        }
    Check if all fields exist and password meets policy requirements
    If successful, updates the user password in the database
    :return:
    """
    data = request.json
    user_id = data.get('user_id')
    old_password = data.get('oldPassword')
    new_password = data.get('newPassword')

    if not all([user_id, old_password, new_password]):
        return jsonify({'message': 'Missing Fields'}), 400

    pw_valid, msg = password_policy(new_password)
    if not pw_valid:
        return jsonify({'message': msg}), 400

    with create_session() as session:
        user = session.get(User, user_id)
        if not user or not check_password_hash(user.password, old_password):
            return jsonify({'message': 'Invalid credentials'}), 401

        user.password = generate_password_hash(new_password)
        session.commit()
        return jsonify({'message': 'Password changed successfully'}), 200