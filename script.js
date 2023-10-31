import InvoiceLoader from './modules/invoiceLoader.js'
import InvoiceGenerator from './modules/invoiceGenerator.js'

async function startApp() {
  const invoiceData = await InvoiceLoader.invoiceLoad()
  if (invoiceData) {
    console.log(invoiceData)
    const invoiceContainer = document.querySelector('.invoice-list')
    InvoiceGenerator.generateInvoiceDom(invoiceData, invoiceContainer)
  }
}

startApp()
