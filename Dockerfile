FROM python:3.6.6
COPY . /src
WORKDIR /src
RUN pip install -i https://pypi.douban.com/simple -r requirements.txt && \
export FLASK_APP=csv2excel && \
export FLASK_ENV="production"
CMD ["waitress-serve", "--listen", "0.0.0.0:4000", "--url-scheme", "https", "--call", "csv2excel:create_app"]