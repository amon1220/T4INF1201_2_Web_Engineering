from flask import *

api = Blueprint('api', __name__)

@api.route('/data')
def get_data():
    return "Placeholder"