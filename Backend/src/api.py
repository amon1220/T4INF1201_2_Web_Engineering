from flask import Blueprint, request, jsonify, abort
from sqlalchemy.orm import Session
from Backend.src.models import *
from Backend.src.methods import engine

api = Blueprint('api', __name__)


@api.route('/data')
def get_data():
    return "Placeholder"


# /api/users GET get all users
@api.route('/users')
def get_users():
    with Session(engine) as session:
        users = session.query(User).all()

        return jsonify([{
            'user_id': u.user_id,
            'username': u.username,
            'email': u.email
        } for u in users])


# /api/users/1 GET get user by id
@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    with Session(engine) as session:
        user = session.get(User, user_id)

        if user:
            return jsonify({
                'user_id': user.user_id,
                'username': user.username,
                'email': user.email
            })
        return abort(404, "User not found")


# /api/users POST add new user
@api.route('/users', methods=['POST'])
def create_user():
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


# /api/users/1 PUT update user by id
@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
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


# /api/users/1 DELETE delete user by id
@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    with Session(engine) as session:
        user = session.get(User, user_id)

        if not user:
            return abort(404, "User not found")

        session.delete(user)
        session.commit()
        return jsonify({'message': 'User deleted'}), 200


# /api/notepads GET get all notepads
@api.route('/notepads')
def get_notepads():
    with Session(engine) as session:
        notepads = session.query(Notepad).all()

        return jsonify([{
            'notepad_id': n.notepad_id,
            'user_id': n.user_id,
            'email': n.saved_text,
            'created': n.created,
            'last_edited': n.last_edited
        } for n in notepads])


# /api/notepads/1 GET get all notepads for user_id
@api.route('/notepads/<int:user_id>', methods=['GET'])
def get_user_notepads(user_id):
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


# /api/notepads/1 GET get notepad by id
@api.route('/notepads/<int:notepad_id>', methods=['GET'])
def get_notepad(notepad_id):
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


# /api/notepad POST add new notepad
@api.route('/notepad', methods=['POST'])
def create_notepad():
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


# /api/notepad/1 PUT update notepad by id
@api.route('/notepad/<int:notepad_id>', methods=['PUT'])
def update_notepad(notepad_id):
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


# /api/notepad/1 DELETE delete notepad by id
@api.route('/notepad/<int:notepad_id>', methods=['DELETE'])
def delete_notepad(notepad_id):
    with Session(engine) as session:
        notepad = session.get(Notepad, notepad_id)

        if not notepad:
            return abort(404, "Notepad not found")

        session.delete(notepad)
        session.commit()
        return jsonify({'message': 'Notepad deleted'}), 200
