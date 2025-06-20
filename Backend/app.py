from flask import Flask, jsonify
from flask_cors import CORS


from Backend.src import api
app = Flask(__name__)
CORS(app)

app.register_blueprint(api.api_bp, url_prefix='/api')

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({"status": "connected", "service": "Database API"})

if __name__ == '__main__':
    app.run(debug=True)
