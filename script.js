import InvoiceLoader from './modules/invoiceLoader.js'
import InvoiceGenerator from './modules/invoiceGenerator.js'

let filterMenu = document.querySelector('.action_menu-checkbox_menu')
let filterMenuContainer = document.querySelector('.action_menu-checkbox_options')

async function startApp() {
  const invoiceData = await InvoiceLoader.invoiceLoad()
  if (invoiceData) {
    console.log(invoiceData)
    const invoiceContainer = document.querySelector('.invoice-list')
    InvoiceGenerator.generateInvoiceDom(invoiceData, invoiceContainer)
  }
}

//onClickEvent
let statusTest = ['pending', 'draft', 'paid']

InvoiceGenerator.generateFilterMenuDom(statusTest, filterMenuContainer)

filterMenu.addEventListener('click', () => {
  filterMenuContainer.classList.toggle('visually-hidden')
})

startApp()
