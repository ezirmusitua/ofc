FROM python:3.6.6-alpine3.6
COPY . /src
WORKDIR /src
RUN pip install -i https://pypi.douban.com/simple && export FLASK_APP=csv2excel && export FLASK_ENV="production"
CMD ['gnuicorn', '-w', '2', '-b', '0.0.0.0:4000', '-k', 'gevent', '-n', 'ocf', 'csv2excel:create_app']