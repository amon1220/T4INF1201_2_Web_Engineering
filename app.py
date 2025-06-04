from flask import Flask, render_template

from src.methods import test
app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/next')
def next_page():
    test()
    return render_template("new.html")


if __name__ == '__main__':
    app.run()
