class InvoiceLoader {
  static async genLoadInvoices() {
    try {
      const response = await fetch('./../data.json')
      if (response.ok) {
        const invoiceData = await response.json()
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

  // static async genInvoiceStatuses(statusSelected) {
  //   try {
  //     const response = await fetch('./../data.json')
  //     if (response.ok) {
  //       const invoiceData = await response.json()

  //       statusSelected.forEach((status) => {
  //         const filteredStatus = invoiceData.filter((invoice) => status.includes(invoice.status))
  //         console.log(filteredStatus)
  //       })
  //       return filteredStatus
  //     } else {
  //       console.error('Error al cargar datos de factura')
  //       return null
  //     }
  //   } catch (error) {
  //     console.error('Error en la solicitud de factura:', error)
  //     return null
  //   }
  // }

  static async genInvoiceFilteredFromAPI(statusSelected) {
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
