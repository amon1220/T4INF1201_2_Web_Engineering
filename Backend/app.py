from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from Backend.src.methods import *

from Backend.src import api

# Initialize Flask application
app = Flask(__name__)

# Config the JWT KEY to sign and verify tokens
app.config["JWT_SECRET_KEY"] = "victorias_secret"

# Allows cross-origin requests due to the frontend and backend being on different ports
CORS(app)

# Initialize JWT Manager for handling JSON Web Tokens
jwt = JWTManager(app)

# Register the API blueprint under the '/api' prefix
app.register_blueprint(api.api, url_prefix='/api')


# Test database connection endpoint (Not part of the API)
@app.route('/api/test_db', methods=['GET'])
def status():
    test_db()
    return jsonify({"status": "connected", "service": "Database API"})


# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
