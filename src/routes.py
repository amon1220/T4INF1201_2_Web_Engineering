from flask import *

routes = Blueprint('routes', __name__)

@routes.route('/')
def index():
    return render_template("index.html")

@routes.route('/next')
def next_page():
    return render_template("new.html")