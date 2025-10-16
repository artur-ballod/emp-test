import './scss/modules.scss';
import 'simplebar/dist/simplebar.min.css';
import 'virtual:svg-icons/register';
import { StickyNav, ToggleNav } from './components/header/_header';
import { CustomSelect } from './common/select/_select';
import { RangeInput, FileUpload } from './common/input/_input';

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

document.addEventListener('DOMContentLoaded', function () {
    const stickyNav = new StickyNav();
    const toggleNav = new ToggleNav();
	const customSelect = new CustomSelect();
	const rangeInput = new RangeInput();
	const fileUpload = new FileUpload();

    stickyNav.init();
    toggleNav.init();
	customSelect.init();
	rangeInput.init();
	fileUpload.init();

    window.stickyNavInstance = stickyNav;
    window.toggleNavInstance = toggleNav;
	window.customSelectInstance = customSelect;
	window.rangeInputInstance = rangeInput;
	window.fileUploadInstance = fileUpload;
});