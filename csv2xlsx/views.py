from csv import DictReader
from io import StringIO
from tempfile import TemporaryFile

from flask import render_template, request, send_file
from xlwt import Workbook


def hello():
    return 'hello world'


def index():
    return render_template('index.html')


def handle_and_download():
    wb = Workbook()
    for fileName in request.files:
        print(fileName)
        ws = wb.add_sheet(fileName)
        reader = DictReader(StringIO(request.files[fileName].read().decode()))
        for c, val in enumerate(reader.fieldnames):
            ws.write(0, c, val)
        for r, row in enumerate(reader, 1):
            for c, field in enumerate(row):
                ws.write(r, c, row[field])
    # try in memory fp with string io
    fp = TemporaryFile()
    wb.save(fp)
    fp.seek(0)
    return send_file(fp, as_attachment=True, attachment_filename='demo.xlsx')
