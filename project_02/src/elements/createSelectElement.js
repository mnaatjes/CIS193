/**
 * @typedef {Object} HTMLProperties - HTML Element Properties
 * @property {String} name - Name of HTML Element
 * @property {String | Number} value - Value of HTML Element
 */
/**
 * @function createSelectElement
 * @param {Object} config - Configuration for element
 * @param {Object[]} options - Array of option element data
 * @param {String | Number} options.value - Value of option element
 * @param {String} options.text - Text for option element
 * @param {Object} options.props - Properties object for option element
 * @param {Object} properties - Properties for select element
 * @returns {HTMLSelectElement} - returns select element with option children
 */
export function createSelectElement(config={}, options, properties){

}

/**
 * @function testProps
 * @param {HTMLProperties} props
 * @throws {Console}
 */
export function testProps(props){
    console.log(props);
}