import InvoiceLoader from './modules/invoiceLoader.js'
import InvoiceGenerator from './modules/invoiceGenerator.js'

let filterMenu = document.querySelector('.action_menu-checkbox_menu')
let filterMenuContainer = document.querySelector('.action_menu-checkbox_options')
const invoiceContainer = document.querySelector('.invoice-list')

//Variable to save all possible status
let statusData = []

async function startApp() {
  const invoiceData = await InvoiceLoader.genLoadInvoices()
  if (invoiceData) {
    //Generate the list with all invoices
    InvoiceGenerator.generateInvoiceDom(invoiceData, invoiceContainer)
    //Populate all posible statuses
    invoiceData.forEach((invoice) => {
      if (!statusData.includes(invoice.status)) {
        statusData.push(invoice.status)
      }
    })
  }
  //Generate menu with all statuses
  InvoiceGenerator.generateFilterMenuDom(statusData, filterMenuContainer)
  let statusCheckBoxesItem = document.querySelectorAll('.action_menu-filter_item')
  let checkboxesStatus = document.querySelectorAll('.action_menu-checkbox')

  //Array to populate filtered statuses
  let statusFiltered = []

  statusCheckBoxesItem.forEach((checkboxItem, index) => {
    checkboxItem.addEventListener('click', async () => {
      //Clean all elements from the invoice list before generate filtered invoices
      while (invoiceContainer.firstChild) {
        invoiceContainer.removeChild(invoiceContainer.firstChild)
      }

      //On click if the ckeckbox is checked and the array doesnt have the value add this value to the array
      if (checkboxesStatus[index].checked && !statusFiltered.includes(statusData[index])) {
        //Add the current invoice to the array
        statusFiltered.push(statusData[index])
        //Create an array with all filtered invoices await
        const filteredInvoices = await genFilteredInvoices(statusFiltered)
        //Generate the DOM elements to populate the invoice list
        InvoiceGenerator.generateInvoiceDom(filteredInvoices, invoiceContainer)
      }
      //On click if the checkbox is not checked delete this value from the array
      else if (!checkboxesStatus[index].checked && statusFiltered.includes(statusData[index])) {
        statusFiltered = statusFiltered.filter((value) => value !== statusData[index])

        //Create an array with all filtered invoices await
        const filteredInvoices = await genFilteredInvoices(statusFiltered)
        //Generate the DOM elements to populate the invoice list
        InvoiceGenerator.generateInvoiceDom(filteredInvoices, invoiceContainer)
      }
    })
  })
}

startApp()

//Function to await the filtered Invoices by statuses
async function genFilteredInvoices(status) {
  try {
    const invoiceFilteredData = await InvoiceLoader.genInvoiceFilteredFromAPI(status)
    if (invoiceFilteredData) {
      return invoiceFilteredData
    } else {
      throw new Error('Error loadind the data')
    }
  } catch (error) {
    throw error
  }
}

//On click event to show/hide the filter menu
filterMenu.addEventListener('click', () => {
  filterMenuContainer.classList.toggle('visually-hidden')
})
