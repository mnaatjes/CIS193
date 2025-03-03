/**
 * @file seeds/main.js
 * @author Michael Naatjes
 * @version 1.2.0
 * @description Main js file for seeds calculator
 */
import { createCustomForm } from "../../src/components/createCustomForm.js";
import { createElement } from "../../src/elements/createElement.js";
import { createFormElement } from "../../src/elements/createFormElement.js";
import { createLabelElement } from "../../src/elements/createLabelElement.js";
import { createSelectElement } from "../../src/elements/createSelectElement.js";
/**
 * @const {HTMLElement} root
 */
const root = document.getElementById('root');
/**
 * @const {HTMLElement} display
 */
const display = document.getElementById('display');
/**
 * Declare form elements
 */
const length = createFormElement(
    'input',
    {
        name: 'length',
        placeholder: 'Length',
        min: 1,
        max: 9999999,
        maxlength: 8,
        type: 'number',
        required: true
    }
);
const width = createFormElement(
    'input',
    {
        name: 'width',
        placeholder: 'Width',
        min: 1,
        max: 9999999,
        maxlength: 8,
        type: 'number',
        required: true
    }
);
/**
 * Fetch Seed Data
 */
fetch('./seeds.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({req: 'empty'})
}).then((res) =>{
    if(!res.ok){
        throw new Error('Could not connect!', res.status);
    }
    return res.json();
}).then((seedData) => {
    /**
     * Create Select element and populate from seed data
     */
    const select = createSelectElement(
        {name:'seeds'},
        seedData.map(seed => {
            return {value: seed.price_per_lb, text: `${seed.type}: $${seed.price_per_lb}/lb`}
        })
    );
    /**
     * Generate and append form element
     */
    const seedForm = createCustomForm({
        tagName: 'seed-form',
        action: './calc.php',
        mode: 'fetch',
        enctype: 'json',
        styles: '../../src/main.css'
    },
    /**
     * Append form elements
     */
    [
        createLabelElement('length', 'Enter Length of Yard'),
        length, 
        createLabelElement('width', 'Enter Width of Yard'),
        width,
        createLabelElement('seeds', 'Select Seed Brand and Cost/lb'),
        select
    ],
    /**
     * Handle submit data
     */
    function(data){
        /**
         * Check if div exists
         */
        if(display.children.length > 0){
            display.innerHTML = '';
        }
        /**
         * Print data to response area
         */
        const items = createElement('div', {}, [
            createElement('h4', {textContent: 'Original Value:'}),
            createElement('p', {textContent: '$' + data.original.toFixed(2), styles: {marginBottom: 12}}),
            createElement('h4', {textContent: 'Adjusted Value:'}),
            createElement('p', {textContent: '$' + data.adjusted.toFixed(2), styles: {marginBottom: 12}})
        ])
        display.appendChild(items);
    });
    /**
     * Append form to root
     */
    root.appendChild(seedForm);
})
