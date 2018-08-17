import datetime
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
    for key in request.files:
        file = request.files[key]
        sheet_name = request.form.get(key + '_sheet_name')
        if not sheet_name:
            sheet_name = file.filename
        ws = wb.add_sheet(sheet_name)
        reader = DictReader(StringIO(file.read().decode()))
        for c, val in enumerate(reader.fieldnames):
            ws.write(0, c, val)
        for r, row in enumerate(reader, 1):
            for c, field in enumerate(row):
                ws.write(r, c, row[field])
    fp = TemporaryFile()
    wb.save(fp)
    fp.seek(0)
    now = datetime.datetime.now()
    download_file_name = request.remote_addr + '_' + now.strftime("%Y-%m-%d %H:%M") + '.xlsx'
    return send_file(fp, as_attachment=True, attachment_filename=download_file_name)
