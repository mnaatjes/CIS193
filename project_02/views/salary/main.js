import { createCustomForm } from "../../src/components/createCustomForm.js";
import { createFormElement } from "../../src/elements/createFormElement.js";
import { createTableElement } from "../../src/elements/createTableElement.js";

/**
 * @file salary/main.js
 */
const root      = document.getElementById('root');
const display   = document.getElementById('display');
const hours     = createFormElement(
    'input', 
    {
        type: 'number', 
        name: 'hours', 
        placeholder: 'Enter number of hours worked',
        max: 127,
        min: 1,
        required: true
    }
);
const pay       = createFormElement(
    'input', 
    {
        type: 'number', 
        name: 'pay', 
        placeholder: 'Enter your hourly pay',
        max: 999999,
        min: 1,
        required: true
    }
);
const form      = createCustomForm(
    {
        tagName: 'work-form', 
        action: 'salary.php', 
        mode: 'fetch',
        enctype: 'json',
        styles: '../../src/main.css'
    },
    [hours, pay],
    /**
     * Process Data
     */
    function(data){
        /**
         * Check if data build
         */
        if(display.innerHTML !== ''){
            display.innerHTML = '';
        }
        const table = createTableElement(
            data, {
                /**
                 * Define Header Properties
                 */
                thead: {
                    headers: ['OT HRS', 'Reg HRS', 'Gross HRS', 'OT Rate', 'Reg Rate', 'Reg Pay', 'OT Pay', 'Gross'],
                    props: {styles: {
                        color: 'cornflowerblue',
                        fontSize: 12
                    }}
                },
                /**
                 * Define Body Properties
                 */
                tbody: {
                    props: {
                        styles: {
                            fontSize: 12
                        }
                    }
                }
            }
        );
        /**
         * Append output to display element
         */
        display.appendChild(table);
    }
);
root.appendChild(form);