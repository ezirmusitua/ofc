import os
from flask import Flask
from csv2excel import views


def create_app(test_config=None):
    # create and configure the csv2excel
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(SECRET_KEY='dev')

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.add_url_rule('/online-file-converter', 'index', views.index)
    app.add_url_rule('/online-file-converter', 'download', views.handle_and_download, methods=('POST',))
    app.add_url_rule('/ping', 'ping', views.hello)
    return app
