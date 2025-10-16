import SimpleBar from 'simplebar';

export class CustomSelect {
    constructor(selectElementSelector = '.select') {
        this.select = document.querySelector(selectElementSelector);
        if (!this.select) {
            console.error(`Элемент с селектором "${selectElementSelector}" не найден.`);
            return;
        }

        this.selected = this.select.querySelector('.select__head');
        this.selectedText = this.select.querySelector('.select__head-name');
        this.optionsContainer = this.select.querySelector('.select__list');
        this.optionsList = this.select.querySelectorAll('.select__item');

        if (!this.selected || !this.selectedText || !this.optionsContainer || this.optionsList.length === 0) {
            console.error('Не все необходимые элементы найдены в селекте.');
            return;
        }

        this.handleSelectedClick = this.handleSelectedClick.bind(this);
        this.handleOptionClick = this.handleOptionClick.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    init() {
        if (!this.select) return;

        this.selected.addEventListener('click', this.handleSelectedClick);
        this.optionsList.forEach(option => {
            option.addEventListener('click', this.handleOptionClick);
        });
        document.addEventListener('click', this.handleDocumentClick);
    }

    destroy() {
        if (!this.select) return;

        this.selected.removeEventListener('click', this.handleSelectedClick);
        this.optionsList.forEach(option => {
            option.removeEventListener('click', this.handleOptionClick);
        });
        document.removeEventListener('click', this.handleDocumentClick);
    }

    handleSelectedClick() {
        this.selected.classList.toggle('is-active');
        this.optionsContainer.style.display = this.optionsContainer.style.display === 'flex' ? 'none' : 'flex';
    }

    handleOptionClick(event) {
        const selectedOption = event.currentTarget;
        this.selectedText.textContent = selectedOption.textContent;
        this.optionsContainer.style.display = 'none';
        this.selected.classList.remove('is-active');
    }

    handleDocumentClick(event) {
        if (!this.select.contains(event.target)) {
            this.optionsContainer.style.display = 'none';
            this.selected.classList.remove('is-active');
        }
    }
}
// Custom Scrollbar
function initSimpleBar() {
  const scrollableElements = document.querySelectorAll('.select__list');
  scrollableElements.forEach(element => {
    new SimpleBar(element, {});
  });
}

document.addEventListener('DOMContentLoaded', initSimpleBar);