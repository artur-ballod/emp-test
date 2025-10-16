export class StickyNav {
    constructor(headerSelector = 'header') {
        this.header = document.querySelector(headerSelector);
        if (!this.header) {
            console.error(`Элемент с селектором "${headerSelector}" не найден.`);
            return;
        }
        this.stickyPoint = this.header.offsetTop;
        this.handleScroll = this.handleScroll.bind(this);
    }

    init() {
        if (!this.header) return;
        window.addEventListener('scroll', this.handleScroll);
    }

    destroy() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        if (window.scrollY > this.stickyPoint) {
            this.header.classList.add('fixed');
        } else {
            this.header.classList.remove('fixed');
        }
    }
}

export class ToggleNav {
    constructor(toggleSelector = '.header__toggle', navSelector = '.nav', bodySelector = '.body', navLinksSelector = '.nav__link') {
        this.body = document.querySelector(bodySelector);
        this.headerToggle = document.querySelector(toggleSelector);
        this.nav = document.querySelector(navSelector);
        this.navLinks = document.querySelectorAll(navLinksSelector);

        if (!this.headerToggle || !this.nav || !this.body) {
            console.error('Один или несколько необходимых элементов не найдены.');
            return;
        }

        this.toggleNav = this.toggleNav.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);
		this.handleResize = this.handleResize.bind(this);
    }

    init() {
        if (!this.headerToggle || !this.nav || !this.body) return;

        this.headerToggle.addEventListener('click', this.toggleNav);

        this.navLinks.forEach(navLink => {
            navLink.addEventListener('click', this.handleLinkClick);
        });
		window.addEventListener('resize', this.handleResize);
    }

    destroy() {
        this.headerToggle.removeEventListener('click', this.toggleNav);

        this.navLinks.forEach(navLink => {
            navLink.removeEventListener('click', this.handleLinkClick);
        });

		window.removeEventListener('resize', this.handleResize);
    }

    toggleNav() {
        this.nav.classList.toggle('is-active');
        this.body.classList.toggle('no-scroll');
        this.headerToggle.classList.toggle('is-active');
    }

    handleLinkClick() {
        if (this.nav.classList.contains('is-active')) {
            this.nav.classList.remove('is-active');
            this.body.classList.remove('no-scroll');
            this.headerToggle.classList.remove('is-active');
        }
    }

	handleResize() {
        const menu = this.nav;
        menu.style.transition = 'none';

        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
            menu.style.transition = '';
        }, 250);
    }
}