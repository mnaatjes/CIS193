/**
 * @file views/leap/main.js
 */
import { createCustomForm } from "../../src/components/createCustomForm.js";
import { createElement } from "../../src/elements/createElement.js";
import { createFormElement } from "../../src/elements/createFormElement.js";
import { createTableElement } from "../../src/elements/createTableElement.js";

/**
 * @file salary/main.js
 */
const root      = document.getElementById('root');
const display   = document.getElementById('display');
/**
 * Form Elements
 */
const year = createFormElement(
    'input',
    {
        name: 'year',
        type: 'number',
        placeholder: 'Enter a year between 1492 and 2100',
        min: 1492,
        max: 2100,
        maxlength: 4,
        step: 1,
        required: true
    }
);
/**
 * Create Form
 */
const form = createCustomForm(
    {
        tagName: 'leap-form', 
        action: './leap.php', 
        mode: 'fetch',
        enctype: 'json',
        styles: '../../src/main.css'
    },
    [year],
    function(data){
        if(display.innerHTML !== ''){
            display.innerHTML = '';
        }
        display.appendChild(createElement(
            'h2',
            {textContent: data['leap'] === true ? `Year ${data['year']} IS a leap year!` : `Year ${data['year']} is NOT a leap year!`}
        ))
    }
);
root.appendChild(form);