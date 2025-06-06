from flask import Flask, render_template

from src.routes import routes
from src.api import api
app = Flask(__name__)

app.register_blueprint(routes)
app.register_blueprint(api, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
