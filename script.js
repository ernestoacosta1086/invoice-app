import { createHtmlElement } from './modules/utils.js'

//Elements variables
let invoicesListContainer = document.querySelector('.invoice-list')
let item = document.createElement('div')
item.textContent = 'Test invoice Test invoice Test invoice Test invoice'

createHtmlElement(invoicesListContainer, item)
