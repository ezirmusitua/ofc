#!/usr/bin/env bash
pipenv shell
export FLASK_APP="csv2xlsx"
export FLASK_ENV="development"
flask run