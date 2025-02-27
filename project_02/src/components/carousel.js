import { appendStyles } from '../utils.js';
/**
 * @type {HTMLElement} Carousel
 */
export class Carousel extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this._template = document.createElement('template');
        this.shadowRoot.appendChild(this._template.content.cloneNode(true));
        this.name = 'seeds';
        this._slideIndex = 0;
        this._data;
    }
    /**
     * slideIndex
     */
    get index(){return this._slideIndex;}
    set index(value){this._slideIndex = value;}
    /*----------------------------------------------------------*/
    /**
     * Load Data
     */
    /*----------------------------------------------------------*/
    #loadData(filePath, callback){
        const xhttp = new XMLHttpRequest();
        /**
         * @listens onreadystatechange#xhttp
         * Check Status
         * Parse if successful
         */
        xhttp.onreadystatechange = () => {
            if(xhttp.readyState === 4 && xhttp.status === 200){
                const type  = xhttp.getResponseHeader('content-type');
                const res   = {
                    text: (type === 'application/json') ? JSON.parse(xhttp.responseText) : undefined,
                    type: type,
                    url: xhttp.responseURL
                }
                callback(res);
            } else if(xhttp.readyState === 4 && xhttp.status !== 200){
                console.error('Error Connecting to File: ' + xhttp.status);
            }
        };
        /**
         * Open File
         */
        xhttp.open('GET', filePath, true);
        /**
         * Send Request
         */
        xhttp.send();
    }
    /*----------------------------------------------------------*/
    /**
     * Initialize Carousel:
     * Builds carousel from data object provided
     * @param {String} filePath
     * @returns {void}
     */
    /*----------------------------------------------------------*/
    initCarousel(filePath){
        /**
         * Load Data from php file
         */
        this.#loadData(filePath, (res) => {
            /**
             * Validate Response
             */
            if(res.type !== 'application/json'){
                throw new Error('Fatal Error: Cannot connect to Data Source!');
            }
            /**
             *  Build Carousel
             */
            this.#buildCarousel(res.text);
        });
    }
    /*----------------------------------------------------------*/
    /**
     * Build Carousel
     */
    /*----------------------------------------------------------*/
    #buildCarousel(responseText){
        /**
         * Declare Carousel Container
         */
        const data      = responseText.data;
        const container = document.createElement('div');
        container.classList.add('carousel__container');
        /**
         * Build Slides
         */
        data.forEach((item, index) => {
            console.log(item);
            /**
             * Generate Slide
             * Append to Carousel
             */
            container.appendChild(this.#buildSlide(item, index));
        });
        /**
         * Append Stylesheet to Root
         */
        this.#linkStyles();
        /**
         * Append Elements to Container
         */
        container.appendChild(this.#buildControls());
        /**
         * Append Container to Component
         */
        this.shadowRoot.appendChild(container);
        /**
         * Declare Slides Array for control methods
         */
        this.slides = this.shadowRoot.querySelectorAll('.carousel__slide');
    }
    /*----------------------------------------------------------*/
    /**
     * Build Controls
     * @private
     * @returns {HTMLElement} carousel controls
     */
    /*----------------------------------------------------------*/
    #buildControls(){
        const controls = document.createElement('div');
        controls.classList.add('carousel__controls');
        /**
         * Control Buttons
         * Define Text Content
         * Add Event Listener
         */
        const back  = document.createElement('button');
        const fwd   = document.createElement('button');
        back.textContent    = '<';
        fwd.textContent     = '>';
        back.addEventListener('click', function(e){this.#prevSlide(e);}.bind(this));
        fwd.addEventListener('click', function(e){this.#nextSlide(e);}.bind(this));
        /**
         * Append Buttons to Controls Container
         */
        controls.appendChild(back);
        controls.appendChild(fwd);
        /**
         * return element
         */
        return controls;
    }
    /*----------------------------------------------------------*/
    /**
     * Build Slide
     * @private
     * @returns {HTMLElement}
     */
    /*----------------------------------------------------------*/
    #buildSlide(item_data, index){
        const id = item_data;
        /**
         * Slide
         */
        const slide     = document.createElement('div');
        slide.id        = `id--${id}`;
        slide.classList.add('carousel__slide');
        if(index === 0){
            slide.classList.add('active');
        }
        /**
         * Title
         */
        const slide_title = document.createElement('h3');
        slide_title.textContent = `Title Number: ${slide.id}`;
        /**
         * Image
         */
        const slide_img = document.createElement('img');
        slide_img.src = 'assets/jonathan_green.png';
        slide_img.alt = 'Temp';
        /**
         * Append Slide Elements to Slide
         */
        slide.appendChild(slide_title);
        slide.appendChild(slide_img);
        /**
         * Return slide element
         */
        return slide;
    }
    /*----------------------------------------------------------*/
    /**
     * Link Stylesheet
     * @returns {void}
     */
    /*----------------------------------------------------------*/
    #linkStyles(){
        const link  = document.createElement('link');
        link.type   = 'text/css';
        link.rel    = 'stylesheet';
        link.href   = '../../../../../src/shared-library/styles/css/main.css';
        /**
         * append to Root
         */
        this.shadowRoot.appendChild(link);
    }
    /*----------------------------------------------------------*/
    /**
     * Prev Slide
     * @returns {void}
     */
    /*----------------------------------------------------------*/
    #prevSlide(e){this.#showSlide((this.index - 1 + this.slides.length) % this.slides.length);}
    /*----------------------------------------------------------*/
    /**
     * Next Slide
     * @returns {void}
     */
    /*----------------------------------------------------------*/
    #nextSlide(e){this.#showSlide((this.index + 1) % this.slides.length);}
    /*----------------------------------------------------------*/
    /**
     * Show Slide
     * @returns {void}
     */
    /*----------------------------------------------------------*/
    #showSlide(n){
        /**
         * Remove 'active' class from current
         * Attach 'active' to next
         */
        this.slides[this.index].classList.remove('active');
        this.slides[n].classList.add('active');
        /**
         * Set current slide
         */
        this.index = n;
    }
}