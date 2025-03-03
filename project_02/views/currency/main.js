import { createFormElement } from '../../src/elements/createFormElement.js';
import { createCustomForm } from '../../src/components/createCustomForm.js';
import { createTableElement } from '../../src/elements/createTableElement.js';
/**
 * @file views/currency/main.js
 */
const root      = document.getElementById('root');
const display   = document.getElementById('display');
/**
 * Declare Form Elements
 */
const pennies = createFormElement(
    'input',
    {
        name: 'pennies',
        type: 'number',
        placeholder: 'Enter Value in pennies',
        min: 1,
        max: 99999999,
        step: 1,
        required: true
    }
);
/**
 * Create Form
 */
const form = createCustomForm(
    {
        tagName: 'penny-form',
        action: './currency.php',
        mode: 'fetch',
        enctype: 'json',
        styles: '../../src/main.css'
    },
    [pennies],
    function(data){
        /**
         * Check if display populated
         */
        if(display.innerHTML !== ''){
            display.innerHTML = '';
        }
        const table = createTableElement(data);
        display.appendChild(table);
    }
);
root.appendChild(form);