(function () {
  function humanReadableSize(size) {
    // less than 1KB
    if (size < 1024) return '1KB';
    else if (size > 1024 * 1024) return Math.ceil(size / 1024 / 1024) + 'G';
    else return (size / 1024).toFixed(2) + 'MB';
  }

  class Uploader {
    static init() {
      Uploader.container = document.getElementById('container');
      Uploader.addBtn = document.getElementById('add-uploader');
      Uploader.addBtn.addEventListener('click', Uploader.create);
    }

    static create() {
      const idx = Uploader.items.length;
      const item = new Uploader(idx);
      item.appendTo(Uploader.container);
      Uploader.items.push(item);
    }

    static clear() {
      Uploader.items.forEach((u) => {
        u.destroy();
      });
      Uploader.addBtn.removeEventListener('click', Uploader.create);
    }

    constructor(index) {
      this.id = 'file_' + index;
      this.createRoot();
      this.createFileStats();
      this.createInputs();
      this.bindEvents();
    }

    createRoot() {
      this.rootElem = document.createElement('div');
      this.rootElem.setAttribute('class', 'csv-upload-area');
      this.rootElem.setAttribute('id', this.id);
    }

    createFileStats() {
      this.fileStatsElem = document.createElement('div');
      this.fileStatsElem.setAttribute('class', 'file-stats');
      this.fileNameElem = document.createElement('h3');
      this.fileNameElem.innerText = 'Not Selected';
      this.fileStatsDetailElem = document.createElement('div');
      this.fileStatsDetailElem.setAttribute('class', 'stats-detail');
      this.fileSizeElem = document.createElement('p');
      this.fileSizeElem.innerText = 'Size: Unknown';
      this.fileUpdateAtElem = document.createElement('p');
      this.fileUpdateAtElem.innerText = 'Last Update At: Unknown';
      this.fileStatsDetailElem.appendChild(this.fileSizeElem);
      this.fileStatsDetailElem.appendChild(this.fileUpdateAtElem);
      this.fileStatsElem.appendChild(this.fileNameElem);
      this.fileStatsElem.appendChild(this.fileStatsDetailElem);
      this.rootElem.appendChild(this.fileStatsElem);
    }

    createInputs() {
      this.inputsElem = document.createElement('div');
      this.inputsElem.setAttribute('class', 'inputs');
      this.sheetNameInputElem = document.createElement('input');
      this.sheetNameInputElem.setAttribute('name', this.id + '_sheet_name');
      this.sheetNameInputElem.setAttribute('type', 'text');
      this.sheetNameInputElem.setAttribute('placeholder', 'Enter the sheet name');
      this.fileUploadElem = document.createElement('input');
      this.fileUploadElem.setAttribute('name', this.id);
      this.fileUploadElem.setAttribute('type', 'file');
      this.inputsElem.appendChild(this.sheetNameInputElem);
      this.inputsElem.appendChild(this.fileUploadElem);
      this.rootElem.appendChild(this.inputsElem);
    }

    handleFileUpload(e) {
      const file = e.target.files[0];
      this.fileNameElem.innerText = 'Name: ' + file.name;
      this.fileSizeElem.innerText = 'Size: ' + humanReadableSize(file.size);
      this.fileUpdateAtElem.innerText = 'Last Update At: ' + new Date(file.lastModified).toLocaleDateString();
    }

    appendTo(e) {
      e.appendChild(this.rootElem);
    }

    bindEvents() {
      this.fileUploadElem.addEventListener('change', (e) => this.handleFileUpload(e));
    }

    destroy() {
      this.fileUploadElem.removeEventListener('change', this.handleFileUpload);
    }
  }

  Uploader.items = [];
  Uploader.container = null;
  window.Uploader = Uploader;
  document.addEventListener('DOMContentLoaded', () => {
    console.log('file upload script start');
    Uploader.init();
    Uploader.create();
  });
  window.addEventListener('onunload', () => {
    Uploader.clear();
  });
})();
