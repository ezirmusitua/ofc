FROM python:3.6.6-alpine3.6

RUN pip install -i https://pypi.douban.com/simple pipenv
COPY . /src
WORKDIR /src
RUN pipenv install
CMD gnuicorn -w 4 csv2excel:create_app