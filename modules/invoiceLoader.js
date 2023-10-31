class InvoiceLoader {
  static async invoiceLoad() {
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
}

export default InvoiceLoader
