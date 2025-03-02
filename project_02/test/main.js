import { createCustomForm } from "../src/components/createCustomForm.js";
import { createInputElement } from "../src/elements/createInputElement.js";

/**
 * @file test/main.js
 */
const root      = document.getElementById('root');
const display   = document.getElementById('display');
/**
 * Create form and append
 */
const form = createCustomForm(
    root,
    'test-form',
    {
        action: 'test.php',
        enctype: "application/json",
        mode: 'submit'
    },
    [
        createInputElement('text', 'fullName', {placeholder: 'Enter full name', pattern: 'text'}),
        createInputElement('email', 'email', {placeholder: 'Enter Email Address'})
    ],
    '../../../../src/shared-library/styles/css/main.css',
    function(data){
        console.log(data);
    }
);