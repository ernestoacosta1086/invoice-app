class InvoiceGenerator {
  static generateInvoiceDom(invoiceData, container) {
    // Genera y agrega la factura al contenedor
    const invoiceItem = document.createElement('div')
    invoiceItem.classList.add('invoice-item')

    // Llena facturaElement con los datos de facturaData
    invoiceItem.textContent = invoiceData

    container.appendChild(invoiceItem)
  }
}

export default InvoiceGenerator
