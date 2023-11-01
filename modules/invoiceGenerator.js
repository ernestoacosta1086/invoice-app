class InvoiceGenerator {
  static generateInvoiceDom(invoiceData, container) {
    // Genera y agrega la factura al contenedor

    // Llena facturaElement con los datos de facturaData
    invoiceData.forEach((invoice) => {
      const invoiceItem = document.createElement('div')
      invoiceItem.classList.add('invoice-item')
      container.appendChild(invoiceItem)
      this.generateInvoiceItem(invoice, invoiceItem)
    })
  }

  static generateInvoiceItem(invoiceData, invoiceDiv) {
    const totalFixed = invoiceData.total.toFixed(2)
    const status = invoiceData.status.charAt(0).toUpperCase() + invoiceData.status.slice(1)
    // Llenar el div con los datos de la factura
    invoiceDiv.innerHTML = `
        <span id="id"><span>#</span>${invoiceData.id}</span>
        <span id="date">Due ${invoiceData.createdAt}</span>
        <span id="clientName">${invoiceData.clientName}</span>
        <span id="total">£ ${totalFixed}</span>
        <span class="status ${invoiceData.status}">&#x25CF; ${status}</span>
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4 4-4 4" stroke="#7C5DFA" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>
    `
  }
}

export default InvoiceGenerator
