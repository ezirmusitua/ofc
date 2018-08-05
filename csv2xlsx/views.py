from flask import render_template


def hello():
    return 'hello world'


def index():
    return render_template('index.html')
