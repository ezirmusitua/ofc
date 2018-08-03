#!/usr/bin/env bash
pipenv shell
pipenv install
export FLASK_APP=app/app.py
flask run