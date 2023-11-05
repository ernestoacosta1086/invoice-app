import InvoiceLoader from './modules/invoiceLoader.js'
import InvoiceGenerator from './modules/invoiceGenerator.js'

let filterMenu = document.querySelector('.action_menu-checkbox_menu')
let filterMenuContainer = document.querySelector('.action_menu-checkbox_options')
const invoiceContainer = document.querySelector('.invoice-list')
let amountOfInvoiceText = document.querySelector('.action_menu-total')
let emptyInvoiceImage = document.querySelector('.invoice-empty-image')
let listOfInvoiceSection = document.querySelector('.invoice_list_section')
let viewInvoiceSection = document.querySelector('.invoice_view_section')
let goBackDiv = document.querySelector('.invoice_view-back')

//Variable to save all possible status
let statusData = []

async function startApp() {
  const invoiceData = await InvoiceLoader.genLoadInvoices()
  if (invoiceData) {
    //Generate the list with all invoices
    InvoiceGenerator.generateInvoiceDom(invoiceData, invoiceContainer)
    //Add on click event to each invoice
    let invoicesItems = document.querySelectorAll('.invoice-item')
    onClickInvoice(invoicesItems)
    console.log(invoicesItems)

    //Update the amount of invoice first time
    updateAmountOfInvoicesText(invoiceData.length)
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
        //Update the text depends on invoices amount
        updateAmountOfInvoicesText(filteredInvoices.length)
      }
      //On click if the checkbox is not checked delete this value from the array
      else if (!checkboxesStatus[index].checked && statusFiltered.includes(statusData[index])) {
        statusFiltered = statusFiltered.filter((value) => value !== statusData[index])
        //Create an array with all filtered invoices await
        const filteredInvoices = await genFilteredInvoices(statusFiltered)
        //Generate the DOM elements to populate the invoice list
        InvoiceGenerator.generateInvoiceDom(filteredInvoices, invoiceContainer)
        //Update the text depends on invoices amount
        updateAmountOfInvoicesText(filteredInvoices.length)
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

//Update the text depends on invoices amount
function updateAmountOfInvoicesText(amount) {
  if (amount !== 0) {
    amountOfInvoiceText.textContent = 'There are ' + amount + ' total invoices'
    emptyInvoiceImage.classList.add('visually-hidden')
  } else {
    amountOfInvoiceText.textContent = 'No invoices'
    emptyInvoiceImage.classList.remove('visually-hidden')
    console.log(emptyInvoiceImage.classList)
  }
}

//Add event on clic to show/hide the view invoice section
function onClickInvoice(invoicesList) {
  invoicesList.forEach((invoice) => {
    invoice.addEventListener('click', () => {
      listOfInvoiceSection.classList.toggle('visually-hidden')
      viewInvoiceSection.classList.toggle('visually-hidden')
    })
  })
}

//Add the event clic to the Go Back button
goBackDiv.addEventListener('click', () => {
  listOfInvoiceSection.classList.toggle('visually-hidden')
  viewInvoiceSection.classList.toggle('visually-hidden')
})
