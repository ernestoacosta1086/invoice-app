import InvoiceLoader from './modules/invoiceLoader.js'
import InvoiceGenerator from './modules/invoiceGenerator.js'

let filterMenu = document.querySelector('.action_menu-checkbox_menu')
let filterMenuContainer = document.querySelector('.action_menu-checkbox_options')

//Variable to save all possible status
let statusData = []

async function startApp() {
  const invoiceData = await InvoiceLoader.invoiceLoad()
  if (invoiceData) {
    console.log(invoiceData)
    const invoiceContainer = document.querySelector('.invoice-list')
    InvoiceGenerator.generateInvoiceDom(invoiceData, invoiceContainer)
    invoiceData.forEach((invoice) => {
      if (!statusData.includes(invoice.status)) {
        statusData.push(invoice.status)
      }
    })
  }
  //Generate menu with all status
  InvoiceGenerator.generateFilterMenuDom(statusData, filterMenuContainer)
  let statusCheckBoxesItem = document.querySelectorAll('.action_menu-filter_item')
  let checkboxesStatus = document.querySelectorAll('.action_menu-checkbox')

  //Array to populate filtered status
  let statusFiltered = []

  statusCheckBoxesItem.forEach((checkboxItem, index) => {
    checkboxItem.addEventListener('click', () => {
      //On click if the ckeckbox is checked and the array doesnt have the value add this value to the array
      if (checkboxesStatus[index].checked && !statusFiltered.includes(statusData[index])) {
        //Add the value to the array
        statusFiltered.push(statusData[index])
        console.log(statusFiltered)
      }
      //On click if the checkbox is not checked delete this value from the array
      else if (!checkboxesStatus[index].checked && statusFiltered.includes(statusData[index])) {
        statusFiltered = statusFiltered.filter((value) => value !== statusData[index])
        console.log(statusFiltered)
      }
    })
  })
}

startApp()

//On click event to show/hide the filter menu
filterMenu.addEventListener('click', () => {
  filterMenuContainer.classList.toggle('visually-hidden')
})
