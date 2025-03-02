/**
 * @file seeds/main.js
 * @author Michael Naatjes
 * @version 1.2.0
 * @description Main js file for seeds calculator
 */
import { createCustomForm } from "../../src/components/createCustomForm.js";
import { createFormElement } from "../../src/elements/createFormElement.js";
import { createSelectElement, testProps } from "../../src/elements/createSelectElement.js";
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
        min: 0.01,
        max: 9999999,
        maxlength: 8,
        type: 'number'
    }
);
const width = createFormElement(
    'input',
    {
        name: 'width',
        placeholder: 'Width',
        min: 0.01,
        max: 9999999,
        maxlength: 8,
        type: 'number'
    }
);
/**
 * Generate and append form element
 */
const seedForm = createCustomForm({
        tagName: 'seed-form',
        action: './calc.php',
        mode: 'fetch',
        enctype: 'json',
        styles: '../../../../../src/shared-library/styles/css/main.css'
    },
    [
        length,
        width
    ],
    function(data){
        console.log(data);
});
root.appendChild(seedForm);
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
}).then((data) => {
    console.log(data);
})

const select = createSelectElement({}, [{name: '', value: '', props: {}}]);
const test = testProps({})