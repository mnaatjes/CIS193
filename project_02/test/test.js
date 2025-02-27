/**
 * Testing FormComponent
 */
import { createCustomForm } from "../src/components/createCustomForm.js";
import { createFormElement } from "../src/components/createFormElement.js";

/**
 * @listens window#onload
 */
window.onload = () => {
    /**
     * Render Load Timestamp
     */
    console.info(`Window Loaded: ${new Date().toLocaleTimeString()}`);
    /**
     * @const {HTMLElement} root
     */
    const root = document.getElementById('root');
    /**
     * Declare Test Case Elements
     */
    /**
     * @const {HTMLElement} btn
     */
    const btn       = document.createElement('button');
    btn.innerHTML   = 'Click Me Now';
    /**
     * @const {HTMLElement} radio
     */
    const radio     = document.createElement('input');
    radio.type      = 'radio';
    radio.name      = 'dot';
    radio.value     = false;
    radio.checked   = false;
    //radio.required  = true;
    /**
     * @const {HTMLElement} textOne
     */
    const textOne   = createFormElement('input', {
        type: 'text',
        classList: ['btn', 'green'],
        placeholder: 'I am REQUIRED',
        name: 'second',
        //required: true
    });
    /**
     * @const textTwo
     */
    const textTwo   = createFormElement(
        'input', {
            type: 'text', 
            placeholder: 'I am a text box, required', 
            name: 'stuff', 
            //required: true
        }
    );
    /**
     * @const {HTMLElement} password
     */
    const password = createFormElement('input', {type: 'password', name: 'pw', required: true});
    /**
     * @const {HTMLElement} fieldSet
     */
    const fieldSet      = document.createElement('fieldset');
    fieldSet.innerHTML  = `
        <legend>Personal Information</legend>
        <label for="firstName">First Name:</label><br>
        <input type="text" id="firstName" name="firstName"><br><br>

        <label for="lastName">Last Name:</label><br>
        <input type="text" id="lastName" name="lastName"><br><br>
    `;
    /**
     * Create Form Component
     */
    createCustomForm(
        root,
        'test-form',
        {action: 'test.php'},
        [
            textOne,
            textTwo,
            radio,
            password,
            fieldSet
            
        ],
        '../../../../src/shared-library/styles/css/main.css', 
        'fetch',
        function(data){
            console.log(data);
        }
    )
}