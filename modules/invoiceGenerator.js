class InvoiceGenerator {
  static generateInvoiceDom(invoiceData, container) {
    // Genera y agrega la factura al contenedor

    // Llena facturaElement con los datos de facturaData
    invoiceData.forEach((invoice) => {
      const invoiceItem = document.createElement("div");
      invoiceItem.classList.add("invoice-item", "rounded-whitebg-shadow");
      container.appendChild(invoiceItem);
      this.generateInvoiceItem(invoice, invoiceItem);
    });
  }

  static generateInvoiceItem(invoiceData, invoiceDiv) {
    const totalFixed = invoiceData.total.toFixed(2);
    const status =
      invoiceData.status.charAt(0).toUpperCase() + invoiceData.status.slice(1);
    // Llenar el div con los datos de la factura
    invoiceDiv.innerHTML = `
        <span class="font-heading-s" id="id"><span>#</span>${invoiceData.id}</span>
        <span class="font-body" id="date">Due ${invoiceData.createdAt}</span>
        <span class="font-body" id="clientName">${invoiceData.clientName}</span>
        <span class="font-heading-s" id="total">£ ${totalFixed}</span>
        <span class="font-heading-s status ${invoiceData.status}">&#x25CF; ${status}</span>
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4 4-4 4" stroke="#7C5DFA" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>
    `;
  }

  static generateFilterMenuDom(statusData, container) {
    statusData.forEach((status) => {
      const statusItem = document.createElement("div");
      statusItem.classList.add("font-heading-s", "action_menu-filter_item");
      container.appendChild(statusItem);
      this.generateFilterMenu(status, statusItem);
    });
  }

  static generateFilterMenu(status, container) {
    const statusCamelCase = status.charAt(0).toUpperCase() + status.slice(1);
    container.innerHTML = `
      <input class="action_menu-checkbox" type="checkbox" id="status-option-${status}" />
      <span class="action_menu-status_text">${statusCamelCase}</span>
`;
  }
}

export default InvoiceGenerator;
