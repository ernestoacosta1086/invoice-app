class InvoiceLoader {
  static async genInvoices(selectedStatuses) {
    try {
      const response = await fetch('./../data.json')
      if (response.ok) {
        let invoiceData = await response.json()
        if (selectedStatuses && selectedStatuses.length > 0) {
          // Filtrar facturas según los estados seleccionados
          invoiceData = invoiceData.filter((invoice) => selectedStatuses.includes(invoice.status))
        }

        return invoiceData
      } else {
        console.error('Error al cargar datos de factura')
        return null
      }
    } catch (error) {
      console.error('Error en la solicitud de factura:', error)
      return null
    }
  }

  static async genStatuses() {
    try {
      let statuses = []
      const invoices = await InvoiceLoader.genInvoices()
      invoices.forEach((invoice) => {
        if (!statuses.includes(invoice.status)) {
          statuses.push(invoice.status)
        }
      })
      return statuses
    } catch (error) {
      console.error('Error en la solicitud de factura:', error)
      return null
    }
  }
  static async genInvoiceDataFromId(invoiceId) {
    try {
      const response = await fetch('./../data.json')
      if (response.ok) {
        const invoiceData = await response.json()

        // Filtrar facturas según los estados seleccionados
        const filteredInvoices = invoiceData.filter((invoice) =>
          statusSelected.includes(invoice.status)
        )
        return filteredInvoices
      } else {
        console.error('Error al cargar datos de factura')
        return null
      }
    } catch (error) {
      console.error('Error en la solicitud de factura:', error)
      return null
    }
  }
}

export default InvoiceLoader
