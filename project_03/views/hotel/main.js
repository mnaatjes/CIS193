/**
 * @file project_03/views/hotel/main.js
 * @description Main js file for hotel survey page
 */
import { createCustomForm } from '../../../../../src/packages/htmlComponents/createCustomForm.js';
import { createInputElement } from '../../../../../src/packages/htmlComponents/elements/createInputElement.js';
import { createSelectElement } from '../../../../../src/packages/htmlComponents/elements/createSelectElement.js';
import { createRadioList } from '../../../../../src/packages/htmlComponents/elements/createRadioBtn.js';
import { createCheckbox } from '../../../../../src/packages/htmlComponents/elements/createCheckboxElement.js';
/**
 * @const {HTMLElement} root - form container
 */
const root = document.getElementById('root');
/**
 * Room Numbers
 */
const room = createSelectElement(
    {name: 'room'},
    Array.from({length: 50}, (_, i) => {
        return {
            value: i + 100, 
            text: i + 100
        }
    })
);
/**
 * Check in / out fields
 */
const scale = Array.from({length:5}, (_, i) => {
    const val = i + 1;
    const obj = {
        value: val,
        label:  val === 1 ? 'No Opinion' : 
                val === 2 ? 'Poor' : 
                val === 3 ? 'Fair' : 
                val === 4 ? 'Good' : 
                'Excellent',
        config: {props: val === 1 ? {checked: true} : {}}
    }
    return obj;
});
/**
 * Form Elements
 */
const fname     = createInputElement('text', 'fname', {placeholder: 'Enter Full Name', required: true});
const checkIn   = createInputElement('date', 'checkIn', {required: true});
const checkOut  = createInputElement('date', 'checkOut', {required: true});
const staff     = createRadioList('staff', 'Staff Friendliness', scale);
const clean     = createRadioList('clean', 'Room Cleanliness', scale);
const bed       = createRadioList('bed', 'Bed Comfort', scale);
const amenity   = createRadioList('amenity', 'Quality of Amenities', scale);
const quality   = createRadioList('quality', 'Overall Experience', scale);
const ready     = createCheckbox('ready', true, 'Room ready at Check-in');
const recommend = createCheckbox('recommend', true, 'Would recommend Hotel');
/**
 * @const {HTMLElement} form - custom form for hotel survey
 */
const form = createCustomForm(
    {
        tagName: 'hotel-form',
        action: 'hotel.php',
        mode: 'submit',
        styles: '../../../../../src/shared-library/styles/css/main.css'
    },
    [
        fname,
        room,
        checkIn,
        checkOut,
        staff,
        clean,
        bed,
        amenity,
        quality,
        ready,
        recommend
    ]
);
/**
 * Append form to root
 */
root.appendChild(form);