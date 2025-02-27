/**
 * @callback FormCallback
 * @param {Object} data - JSON data response from Fetch
 */
/*----------------------------------------------------------*/
/**
 * @function validateFormAttributes
 * @param {Object} formAttributes
 * @returns {Object | Error}
 */
/*----------------------------------------------------------*/
function validateFormAttributes(formAttributes){
    /**
     * Check formAttributes is object
     * Check that attributes contains Action
     */
    if(typeof formAttributes !== 'object'){
        throw new TypeError('Form Attributes MUST be an Object!');
    }
    if(!formAttributes.hasOwnProperty('action')){
        throw new Error('Form Attributes Object missing "Action" property!');
    }
    /**
     * Form Attributes Schema
     * Merge Objects
     */
    const defaultAttributes = {
        method: 'POST', 
        target: '_self', 
        enctype: "application/x-www-form-urlencoded",
        novalidate: true
    }
    return {...defaultAttributes, ...formAttributes};
}
/*----------------------------------------------------------*/
/**
 * @function validateFormElements
 * @param {formElements}
 * @returns {Object | Error}
 */
/*----------------------------------------------------------*/
function validateFormElements(formElements){
    /**
     * Validate Form Elements
     */
    if(Array.isArray(formElements)){
        if(formElements.length === 0){
            throw new Error('No Form Elements provided!');
        } else if(!formElements.every(ele => ele instanceof HTMLElement)){
            throw new TypeError('One or more Form Elements is NOT an HTML Element!');
        } else if(formElements.every(ele => ele instanceof HTMLElement)){
            /**
             * Return array of HTML Elements
             */
            return formElements;
        }
    } else {
        throw new TypeError('Form Elements must be provided as an array of HTML Elements');
    }
}
/*----------------------------------------------------------*/
/**
 * Create Custom Form
 *      Generates an HTML Form Element (within ShadowDOM) composed of supplied HTMLElements. 
 *      Handles Client-Side Validation
 *      Allows for direct submit action or AJAX request
 * @function createCustomForm
 * @param {String | HTMLElement} root - Root HTML Element to append form. String must be an Element ID, or provide the element node itself
 * @param {String} componentName - Name for Form Component when defining custom element
 * @param {Object} formAttributes - Attributes to append to form element
 * @param {String} formAttributes.action - filepath
 * @param {String} formAttributes.method - Default === POST
 * @param {String} formAttributes.target - Default === _self
 * @param {String} formAttributes.enctype - Default === x-www-form-urlencoded
 * @param {Boolean} formAttributes.novalidate - Default === true
 * @param {Array} formElements - Array of HTMLElements for the Form
 * @param {String | Object} styles - String filepath to link a Stylesheet or an Object of style properties to append to Form element
 * @param {String} mode - Values: 'Submit' or 'Fetch' dictates the Form Action after validation; Default === 'submit'
 * @param {FormCallback} [callback] - Callback function executed on mode == 'fetch'; Default === undefined
 */
/*----------------------------------------------------------*/
export function createCustomForm(root, componentName, formAttributes={}, formElements=[], styles={}, mode='submit', callback=undefined){
    /**
     * Validate Parameters
     */
    const formProps     = validateFormAttributes(formAttributes);
    const formItems     = validateFormElements(formElements);
    /**
     * Define custom element
     */
    customElements.define(componentName, class extends HTMLElement {
        /*----------------------------------------------------------*/
        /**
         * Build Custom Form Component
         * @constructor
         */
        /*----------------------------------------------------------*/
        constructor(){
            super();
            /**
             * @property {Object} shadowRoot
             */
            this.attachShadow({mode: 'open'});
            /**
             * @property {HTMLTemplateElement} _template
             */
            this._template = document.createElement('template');
            this.shadowRoot.appendChild(this._template.content.cloneNode(true));
            /**
             * Append Form to Shadow Root
             */
            this.#buildForm(formProps, formItems, styles);
            /**
             * Enable Form Validation
             */
            this.#validateForm(mode, callback);
        }
        /*----------------------------------------------------------*/
        /**
         * @method buildForm
         * @private
         * @property {Object} formProperties
         * @param {Array} elementsList
         * @param {String | Object} styles
         */
        /*----------------------------------------------------------*/
        #buildForm(formProperties, elementsList, styles){
            /**
             * Create Form Element
             */
            const form = document.createElement('form');
            /**
             * Apply Form Attributes
             */
            for(const prop in formProperties){
                form.setAttribute(prop, formProperties[prop]);
            }
            /**
             * Append Elements to Form
             */
            if(Array.isArray(elementsList)){
                elementsList.forEach(element => {
                    form.appendChild(element);
                });
            }
            /**
             * Check that form Contains Submit Button:
             * If not, append
             */
            if(!Array.from(form.querySelectorAll('*')).some(
                ele => {
                    if(ele.tagName === 'BUTTON' && ele.type === 'submit'){
                        return true;
                    }
                    if(ele.tagName === 'INPUT' && ele.type === 'submit'){
                        return true;
                    }
                    return false;
                }
            )){
                /**
                 * Generate Submit Button
                 */
                const submit    = document.createElement('input');
                submit.type     = 'submit';
                submit.value    = 'Submit';
                form.appendChild(submit);
            }
            /**
             * Validate and add Styles | ClassList
             */
            if(typeof styles === 'object' && Object.keys(styles).length !== 0){
                /**
                 * Append Styles
                 */
                for(const prop in styles){
                    form.style[prop] = styles[prop];
                }
            } else if (typeof styles === 'string'){
                /**
                 * Create a link to a stylesheet
                 * Append link to shadowRoot
                 */
                const link  = document.createElement('link');
                link.rel    = 'stylesheet';
                link.type   = 'text/css';
                link.href   = styles;
                this.shadowRoot.appendChild(link);
            }
            /**
             * Append Form to ShadowRoot
             */
            this.shadowRoot.appendChild(form);
        }
        /*----------------------------------------------------------*/
        /**
         * @method validateForm
         * @private
         * @listens shadowRoot[form]#submit
         * @param {String} mode 
         * @param {FormCallback} callback
         * @returns {Void}
         */
        /*----------------------------------------------------------*/
        #validateForm(mode, callback){
            this.shadowRoot.querySelector('form').addEventListener('submit', (e) => {
                /**
                 * Prevent Default Behavior
                 */
                e.preventDefault();
                /**
                 * @property {HTMLFormElement} form
                 */
                const form = e.target;
                /**
                 * Clear previous Alert Messages
                 */
                form.querySelectorAll('.alert').forEach(alert => {alert.remove()});
                /**
                 * Check for required attribute elements with missing values
                 * @const {Array} missing
                 */
                const missing = Array.from(form.elements).filter(
                    ele => {
                        /**
                         * Excluded tagNames
                         */
                        if(['button', 'fieldset'].includes(ele.tagName.toLowerCase())){
                            return false;
                        }
                        /**
                         * Exclude Submit types
                         */
                        if(ele.tagName === 'INPUT' && ['button', 'submit', 'reset', 'image'].includes(ele.type)){
                            return false;
                        }
                        /**
                         * Include attribute 'Required
                         */
                        if(ele.hasAttribute('required')){
                            /**
                             * Check for empty values
                             */
                            switch(ele.tagName.toLowerCase()){
                                /**
                                 * Case: input - Checks against input tagName and type
                                 * 
                                 * @case
                                 * @returns {Boolean} - True if element empty or missing a value
                                 */
                                case 'input':
                                    /**
                                     * @const {Object} inputTypes
                                     */
                                    const inputTypes = {
                                        text: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
                                        dateTime: ['date', 'datetime-local', 'month', 'time', 'week'],
                                        selection: ['checkbox', 'radio', 'range', 'color', 'file']
                                    };
                                    /**
                                     * Loop by type
                                     */
                                    for(const category in inputTypes){
                                        const types = inputTypes[category];
                                        /**
                                         * Text inputs
                                         */
                                        if(category === 'text' && types.includes(ele.type)){
                                            return ele.value.trim() === '' || ele.value.trim().length === 0;
                                        }
                                        /**
                                         * Selection inputs
                                         */
                                        if(category === 'selection' && types.includes(ele.type)){
                                            /**
                                             * Checkbox | Radio
                                             */
                                            if(ele.type === 'checkbox' || ele.type === 'radio'){
                                                return !ele.checked;
                                            }
                                        }
                                    }
                                /**
                                 * Case: Textarea - Checks for empty value
                                 * @case
                                 * @returns {Boolean}
                                 */
                                case 'textarea':
                                    return ele.value.trim() === '';
                                /**
                                 * Case: Select - Checks for empty value
                                 * @case
                                 * @returns {Boolean}
                                 */
                                case 'select':
                                    return ele.value === '';
                                /**
                                 * Default:
                                 * @case
                                 * @returns {Boolean} false
                                 */
                                default:
                                    return false;
                            }
                        }
                    }
                );
                /**
                 * Check if any required elements missing and insert alert messages
                 */
                if(missing.length > 0){
                    missing.forEach(ele => {
                        /**
                         * Create alert element
                         */
                        const alert         = document.createElement('small');
                        alert.textContent   = '*Required Field!';
                        alert.classList.add('alert');
                        ele.insertAdjacentElement('afterend', alert);
                    });
                } else {
                    /**
                     * Run Action Script
                     */
                    this.#performAction(form, mode, callback);
                }
            })
        }
        /*----------------------------------------------------------*/
        /**
         * @method performAction
         * @private
         * @param {HTMLElement} form - Form Element
         * @param {String} mode - Values: 'submit' (default) or 'fetch'
         * @param {FormCallback} [callback] - Callback used for fetch
         * @property {Object} [formProps] - Form Properties passed to fetch request
         * @returns {Void}
         */
        /*----------------------------------------------------------*/
        #performAction(form, mode, callback=undefined){
            /**
             * Validate mode
             */
            if(mode !== 'submit' && mode !== 'fetch'){
                throw new Error(`Value for "mode" must be "submit" or "fetch"! "${mode}" is invalid`);
            }
            /**
             * Determine mode of action
             */
            if(mode === 'submit'){
                /**
                 * Submit Form
                 */
                form.submit();
            } else if (mode === 'fetch'){
                /**
                 * Make AJAX Request for data and perform callback
                 */
                console.log('Client Side Validation Successful!');
                /**
                 * Grab Form Data
                 */
                const formData = new FormData(form);
                /**
                 * Fetch
                 */
                fetch(formProps.action, {
                    method: formProps.method,
                    body: formData
                })
                .then(response => {
                    if(!response.ok){
                        throw new Error(`\n HTTP Error! Status: ${response.status} \n ${response.statusText}`);
                    } return response.json();
                })
                .then(data => {
                    /**
                     * Execute Callback Function
                     */
                    callback(data);
                });
            }
        }
    });
    /*----------------------------------------------------------*/

    /**
     * Declare component
     * Attach Custom Form Component to DOM
     */
    const formComponent = document.createElement(componentName);
    if(root instanceof HTMLElement){
        root.appendChild(formComponent);
    } else if(typeof root === 'string') {
        document.getElementById(root).appendChild(formComponent);
    } else {
        throw new TypeError('Invalid Type: Root parameter must be either an HTMLElement or String for an element ID');
    }
}
