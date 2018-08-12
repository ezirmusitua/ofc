from flask import render_template, request


def hello():
    return 'hello world'


def index():
    return render_template('index.html')


def handle_and_download():
    print(request.form)
    print(request.files)
    return 'Handled'
