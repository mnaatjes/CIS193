/**
 * @file views/triangle/main.js
 */
import { createCustomForm } from "../../src/components/createCustomForm.js";
import { createElement } from "../../src/elements/createElement.js";
import { createFormElement } from "../../src/elements/createFormElement.js";
/**
 * @file salary/main.js
 */
/**
 * @function drawTriangle
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @returns {HTMLCanvasElement}
 */
function drawTriangle(data){
    /**
     * Calculate cos of Side B 
     * Calculate x coord of side B
     */
    const cosB  = (data.a * data.a + data.c * data.c - data.b * data.b) / (2 * data.a * data.c);
    const xB    = data.c * cosB;
    /**
     * Calculate y coord of side B
     */
    const yB = Math.sqrt(data.c * data.c - xB * xB);
    /**
     * calculate canvas dimensions
     */
    const width     = Math.max(data.a, xB) + 20;
    const height    = Math.max(data.h, yB) + 20;
    /**
     * Create canvas element
     */
    const canvas    = document.createElement('canvas');
    canvas.width    = width;
    canvas.height   = height;
    const ctx       = canvas.getContext('2d');
    /**
     * Draw Triangle
     */
    ctx.beginPath();
    ctx.moveTo(10, height - 10);
    ctx.lineTo(10 + data.a, height - 10);
    ctx.lineTo(10 + xB, height - 10 - yB);
    ctx.closePath();
    // add color
    ctx.strokeStyle = 'cornflowerblue';
    ctx.stroke();

    /**
     * return canvas element
     */
    return canvas;
}
/**
 * Declare container elements
 */
const root      = document.getElementById('root');
const display   = document.getElementById('display');
/**
 * Form Elements
 */
const labelA = createElement('label', {
    for: 'a',
    textContent: 'Side A'
});
const labelB = createElement('label', {
    for: 'b',
    textContent: 'Side B'
});
const labelC = createElement('label', {
    for: 'c',
    textContent: 'Side C'
});
const a = createFormElement(
    'input',
    {
        name: 'a',
        type: 'number',
        placeholder: 'Enter Value',
        maxlength: 150,
        required: true,
        style: {width: 150, marginLeft: 24, marginRight: 50}
    }
);
const b = createFormElement(
    'input',
    {
        name: 'b',
        type: 'number',
        placeholder: 'Enter Value',
        maxlength: 150,
        required: true,
        style: {width: 150, marginLeft: 24}
    }
);
const c = createFormElement(
    'input',
    {
        name: 'c',
        type: 'number',
        placeholder: 'Enter Value',
        maxlength: 150,
        required: true,
        style: {width: 150, marginLeft: 24}
    }
);
/**
 * Create Form
 */
const form = createCustomForm(
    /**
     * Form Config
     */
    {
        tagName: 'triangle-form', 
        action: './triangle.php', 
        mode: 'fetch',
        enctype: 'json',
        styles: '../../src/main.css'
    },
    /**
     * Input fields
     */
    [labelA, a, document.createElement('br'), labelB, b, document.createElement('br'), labelC, c, document.createElement('br')],
    /**
     * Form Handling
     */
    function(data){
        console.log(data);
        if(display.innerHTML !== ''){
            display.innerHTML = '';
        }
        if(data.errors.length === 0){
            display.appendChild(drawTriangle(data));
        } else {
            display.appendChild(
                createElement('h3', {
                    textContent: data.errors.msg,
                    style: {color: 'tomato'}
                })
            );
        }
    }
);
/**
 * Append to root
 */
root.appendChild(form);