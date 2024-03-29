import InvoiceLoader from "./modules/invoiceLoader.js";
import InvoiceGenerator from "./modules/invoiceGenerator.js";

let filterMenu = document.querySelector(".action_menu-checkbox_menu");
let filterMenuContainer = document.querySelector(
  ".action_menu-checkbox_options"
);
const invoiceContainer = document.querySelector(".invoice-list");
let amountOfInvoiceText = document.querySelector(".action_menu-total");
let emptyInvoiceImage = document.querySelector(".invoice-empty-image");
let listOfInvoiceSection = document.querySelector(".invoice_list_section");
let viewInvoiceSection = document.querySelector(".invoice_view-section");
let goBackDiv = document.querySelector(".invoice_view-back");

//Variable to save all possible statuses
let statuses = [];
//Array to populate filtered statuses
let selectedStatuses = [];

async function startApp() {
  genLoadInvoices([], invoiceContainer);

  //Pending move this to api all posible statuses
  statuses = await InvoiceLoader.genStatuses();

  //Add on click event to each invoice
  setOnClickInvoice();

  await genLoadMenu();
}

async function genLoadMenu() {
  //Generate menu with all statuses
  InvoiceGenerator.generateFilterMenuDom(statuses, filterMenuContainer);
  let statusCheckBoxesItem = document.querySelectorAll(
    ".action_menu-filter_item"
  );

  statusCheckBoxesItem.forEach((checkboxItem, index) => {
    setOnStatusClick(checkboxItem, index);
  });
}

async function genLoadInvoices(selectedStatuses, invoiceContainer) {
  //Create an array with all filtered invoices await
  const filteredInvoices = await InvoiceLoader.genInvoices(selectedStatuses);
  //Generate the DOM elements to populate the invoice list
  InvoiceGenerator.generateInvoiceDom(filteredInvoices, invoiceContainer);
  //Update the text depends on invoices amount
  updateAmountOfInvoicesText(filteredInvoices.length);
}

startApp();

//On click event to show/hide the filter menu
filterMenu.addEventListener("click", () => {
  filterMenuContainer.classList.toggle("visually-hidden");
});

//Update the text depends on invoices amount
function updateAmountOfInvoicesText(amount) {
  if (amount !== 0) {
    amountOfInvoiceText.textContent = "There are " + amount + " total invoices";
    emptyInvoiceImage.classList.add("visually-hidden");
  } else {
    amountOfInvoiceText.textContent = "No invoices";
    emptyInvoiceImage.classList.remove("visually-hidden");
  }
}

//Add event on clic to show/hide the view invoice section
function setOnClickInvoice() {
  let invoicesItems = document.querySelectorAll(".invoice-item");
  invoicesItems.forEach((invoice) => {
    invoice.addEventListener("click", async () => {
      listOfInvoiceSection.classList.toggle("visually-hidden");
      viewInvoiceSection.classList.toggle("visually-hidden");
      // console.log(invoice);
      // console.log(invoice.querySelector("#id").textContent.slice(1));
      let invoiceId = invoice.querySelector("#invoice-id").textContent.slice(1);
      // setInvoiceDataById(invoiceId);
      let invoiceByIdData = await InvoiceLoader.genInvoiceDataFromId(invoiceId);
      let invoiceData = JSON.stringify(invoiceByIdData, null, 2);
      const invoiceObject = JSON.parse(invoiceData);
      setInvoiceData(invoiceObject);
    });
  });
}

function setOnStatusClick(statusItem, index) {
  let checkboxItem = statusItem.querySelector(".action_menu-checkbox");
  statusItem.addEventListener("click", async (event) => {
    //Clean all elements from the invoice list before generate filtered invoices
    while (invoiceContainer.firstChild) {
      invoiceContainer.removeChild(invoiceContainer.firstChild);
    }

    if (event.target !== checkboxItem) {
      checkboxItem.checked = !checkboxItem.checked;
    }

    //On click if the ckeckbox is checked and the array doesnt have the value add this value to the array
    if (checkboxItem.checked && !selectedStatuses.includes(statuses[index])) {
      //Add the current invoice to the array
      selectedStatuses.push(statuses[index]);
      genLoadInvoices(selectedStatuses, invoiceContainer);
    }
    //On click if the checkbox is not checked delete this value from the array
    else if (
      !checkboxItem.checked &&
      selectedStatuses.includes(statuses[index])
    ) {
      selectedStatuses = selectedStatuses.filter(
        (value) => value !== statuses[index]
      );
      genLoadInvoices(selectedStatuses, invoiceContainer);
    }
  });
}

//Add the event clic to the Go Back button
goBackDiv.addEventListener("click", () => {
  listOfInvoiceSection.classList.toggle("visually-hidden");
  viewInvoiceSection.classList.toggle("visually-hidden");
});

//Set the invoice data to the invoice view
function setInvoiceData(invoiceData) {
  // Verify is invoice data has the info
  if (!invoiceData) {
    console.error("Datos de factura no válidos");
    return;
  }
  //Access to DOM elements to update values
  const invoiceStatus = document.getElementById("invoice-status-value");
  const invoiceId = document.getElementById("invoice-id-view");
  const invoiceDescription = document.getElementById("invoice-description");
  const invoiceAddress = document.getElementById("invoice-address");
  const invoiceDate = document.getElementById("invoice-date");
  const invoicePaymentDue = document.getElementById("invoice-payment-due");
  const invoiceBillTo = document.getElementById("invoice-bill-to");
  const invoiceEmail = document.getElementById("invoice-email");
  const invoiceClientAddress = document.getElementById(
    "invoice-client-address"
  );

  console.log(JSON.stringify(invoiceData, null, 2));
  //Add text content and css to update the style
  // Status
  invoiceStatus.classList = ["font-heading-s"];
  invoiceStatus.textContent = `● ${invoiceData.status}`;
  invoiceStatus.classList.add("status", invoiceData.status.toLowerCase());
  invoiceStatus.style.textTransform = "capitalize";

  //Id
  invoiceId.textContent = `${invoiceData.id}`;
  //Description
  invoiceDescription.textContent = `${invoiceData.description}`;
  //Address
  invoiceAddress.textContent = formatAddress(invoiceData.senderAddress);
  //Date
  invoiceDate.textContent = formatDate(`${invoiceData.createdAt}`);
  //PaymentDue
  invoicePaymentDue.textContent = formatDate(`${invoiceData.paymentDue}`);
  //Bill to
  invoiceBillTo.textContent = `${invoiceData.clientName}`;
  //Email
  invoiceEmail.textContent = `${invoiceData.clientEmail}`;
  //Client Address
  invoiceClientAddress.textContent = formatAddress(invoiceData.clientAddress);
}

function formatDate(inputDate) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateParts = inputDate.split("-");
  const year = dateParts[0];
  const month = months[parseInt(dateParts[1], 10) - 1];
  const day = dateParts[2];

  return `${day} ${month} ${year}`;
}

function formatAddress(address) {
  return `${address.street} ${address.city} ${address.postCode} ${address.country}`;
}
