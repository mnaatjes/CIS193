/**
 * @function appendStyles
 * @param {Object} style HTML Element style object
 * @param {Object} styles
 * @returns {Void}
 */
export function appendStyles(style, styles){
    /**
     * Format Props
     */
    styles = Object.entries(styles).reduce((_, [key, val]) => {
        if(key.includes('-')){
            key = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
        }
        //console.log(obj[key]);
        return _[key] = val, _;
    }, {});
    /**
     * Apply Props
     */
    for(const prop in styles){
        style[prop] = styles[prop];
    }
}