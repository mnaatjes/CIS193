/**
 * Alert Component for Project 2
 */
export class Alert extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this._template = document.createElement('template');
        this._template.innerHTML = '<small>Missing value!</small>';
        this.shadowRoot.appendChild(this._template.content.cloneNode(true));
        
        this.small = this.shadowRoot.querySelector('small');
        this.small.style.color          = 'red';
        this.small.style.display        = 'block';
        this.small.style.marginBottom   = '1rem';
    }
    get textContent(){return this.small.textContent;}
    set textContent(content){this.small.textContent = content;}
}