export class RangeInput {
    constructor(rangeSelector = '.input__field--range', percentageSelector = '.input__percentage') {
        this.range = document.querySelector(rangeSelector);
        this.percentage = document.querySelector(percentageSelector);

        if (!this.range || !this.percentage) {
            console.error('Не найдены элементы диапазона или отображения процентов.');
            return;
        }

        this.handleInput = this.handleInput.bind(this);
    }

    init() {
        if (!this.range || !this.percentage) return;
        this.updatePercentage();
        this.range.addEventListener('input', this.handleInput);
    }

    destroy() {
        if (!this.range || !this.percentage) return;
        this.range.removeEventListener('input', this.handleInput);
    }

    handleInput() {
        this.updatePercentage();
    }

    updatePercentage() {
        this.percentage.textContent = this.range.value + '%';
    }
}

export class FileUpload {
    constructor(fileInputId = 'order-file', uploadButtonSelector = '.input--upload', fileNameSelector = '.input__filename', removeButtonSelector = '.input__remove') {
        this.fileInput = document.getElementById(fileInputId);
        this.uploadButton = document.querySelector(uploadButtonSelector);
        this.fileName = document.querySelector(fileNameSelector);
        this.removeButton = document.querySelector(removeButtonSelector);

        if (!this.fileInput || !this.uploadButton || !this.fileName || !this.removeButton) {
            console.error('Не все необходимые элементы для загрузки файла найдены.');
            return;
        }

        this.handleUploadButtonClick = this.handleUploadButtonClick.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    }

    init() {
        if (!this.fileInput || !this.uploadButton || !this.fileName || !this.removeButton) return;

        this.uploadButton.addEventListener('click', this.handleUploadButtonClick);
        this.fileInput.addEventListener('change', this.handleFileChange);
        this.removeButton.addEventListener('click', this.handleRemoveButtonClick);
    }

    destroy() {
        if (!this.fileInput || !this.uploadButton || !this.fileName || !this.removeButton) return;
        this.uploadButton.removeEventListener('click', this.handleUploadButtonClick);
        this.fileInput.removeEventListener('change', this.handleFileChange);
        this.removeButton.removeEventListener('click', this.handleRemoveButtonClick);
    }

    handleUploadButtonClick(event) {
        this.uploadButton.click();
    }

    handleFileChange(event) {
        if (this.fileInput.files.length > 0) {
            this.fileName.textContent = this.fileInput.files[0].name;
            this.removeButton.classList.add('is-active');
        } else {
            this.fileName.textContent = '';
            this.removeButton.classList.remove('is-active');
        }
    }

    handleRemoveButtonClick(event) {
        this.fileInput.value = '';
        this.fileName.textContent = '';
        this.removeButton.classList.remove('is-active');
    }
}