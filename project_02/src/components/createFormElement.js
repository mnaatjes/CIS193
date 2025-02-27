/**
 * @function createFormElement
 * @param {String} tagName
 * @param {Object} properties Attributes, styles, and properties of the Form Element
 * @param {Object} data textContent, innerHTML, etc of Form Element
 */
export function createFormElement(tagName, properties={}){
    /**
     * Validate Tag Name
     * Create element instance
     */
    if(typeof tagName !== 'string'){
        throw new TypeError('TagName type invalid! Must be a string!');
    }
    /**
     * Check that properties contains name
     */
    if(!(Object.keys(properties).includes('name'))){
        throw new Error('Form Element missing "Name" attribute!');
    }
    const ele = document.createElement(tagName);
    /**
     * Append Properties
     */
    applyElementProps(ele, properties);
    /**
     * Return created element
     */
    return ele;
}
/**
 * @function applyElementProps
 * @param {HTMLElement} element
 * @param {Object} attributes
 * @param {String} mode default == 'set'
 * @returns {Void} Applies properties to provided HTMLElement
 */
export function applyElementProps(element, properties, mode='set'){
    /**
     * Validate Attributes
     */
    if(typeof properties !== 'object' && Object.keys(properties).length === 0){
        throw new TypeError('No Attributes provided! Attributes must be formatted in an object');
    }
    /**
     * Valid mode values
     * @property {Array} modes
     */
    const modes = ['set', 'remove'];
    /**
     * validate mode
     */
    if(!modes.includes(mode)){
        throw new Error('Wrong mode!');
    }
    /**
     * Destructure Attributes object
     */
    const { id, styles, classList, ...attributes} = properties;
    /**
     * Set Attributes
     */
    if(mode === 'set'){
        /**
         * Validate and Apply id
         */
        if(id && typeof id === 'string'){
            element.id = id;
        }
        /**
         * Validate and Apply Styles
         */
        if(styles && typeof styles === 'object'){
            for(const prop in styles){
                element.style[prop] = styles[prop];
            }
        }
        /**
         * Validate and Apply ClassList
         */
        if(classList && typeof classList === 'string'){
            element.classList.add(classList);
        } else if(classList && typeof classList === 'object' && Array.isArray(classList)){
            element.classList.add(...classList);
        }
        /**
         * Validate and apply attribs
         */
        if(attributes && typeof attributes === 'object' && Object.keys(attributes).length > 0){
            for(const prop in attributes){
                element.setAttribute(prop, attributes[prop]);
            }
        }
    }
}