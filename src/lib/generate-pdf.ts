import { jsPDF } from "jspdf";
import { contracts, customers, salesOrders, products, suppliers, formatCurrency } from "./data";

function addHeader(doc: jsPDF) {
  doc.setFillColor(15, 15, 15);
  doc.rect(0, 0, 210, 32, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("KARD", 15, 16);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Engineering & Supplies Ltd", 15, 22);
  doc.text("Unit 4, Kylemore Industrial Estate, Dublin 12, Ireland", 15, 27);

  doc.setFontSize(8);
  doc.text("Tel: +353 1 456 7890", 140, 16);
  doc.text("Email: contracts@kardengineering.ie", 140, 22);
  doc.text("VAT: IE 1234567T", 140, 27);

  doc.setTextColor(0, 0, 0);
}

function addFooter(doc: jsPDF, pageNum: number) {
  const y = 280;
  doc.setDrawColor(200, 200, 200);
  doc.line(15, y, 195, y);
  doc.setFontSize(7);
  doc.setTextColor(130, 130, 130);
  doc.text("Kard Engineering & Supplies Ltd — Registered in Ireland No. 456789 — Directors: H. Brennan, P. Kearns", 15, y + 5);
  doc.text(`Page ${pageNum}`, 190, y + 5, { align: "right" });
  doc.setTextColor(0, 0, 0);
}

export function generateContractPDF(contractId: string) {
  const contract = contracts.find((c) => c.id === contractId);
  if (!contract) return;

  const customer = customers.find((c) => c.id === contract.customer);
  const doc = new jsPDF();

  addHeader(doc);

  // Contract title
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(contract.type.toUpperCase(), 15, 45);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`Contract Reference: ${contract.id}`, 15, 52);
  doc.text(`Date: ${new Date().toLocaleDateString("en-IE")}`, 15, 58);
  doc.setTextColor(0, 0, 0);

  // Parties
  let y = 72;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("PARTIES", 15, y);
  y += 8;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("1. Kard Engineering & Supplies Ltd (\"Supplier\")", 15, y);
  y += 6;
  doc.text("   Unit 4, Kylemore Industrial Estate, Dublin 12, Ireland", 15, y);
  y += 10;
  doc.text(`2. ${contract.customerName} ("Customer")`, 15, y);
  if (customer) {
    y += 6;
    doc.text(`   Sector: ${customer.sector}`, 15, y);
  }

  // Terms
  y += 15;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("CONTRACT DETAILS", 15, y);
  y += 10;

  const details = [
    ["Contract Type", contract.type],
    ["Start Date", new Date(contract.startDate).toLocaleDateString("en-IE")],
    ["End Date", new Date(contract.endDate).toLocaleDateString("en-IE")],
    ["Contract Value", formatCurrency(contract.value)],
    ["Payment Terms", contract.terms],
    ["Auto-Renewal", contract.autoRenew ? "Yes" : "No"],
    ["Status", contract.status.charAt(0).toUpperCase() + contract.status.slice(1)],
  ];

  doc.setFontSize(9);
  details.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(label + ":", 15, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, 70, y);
    y += 7;
  });

  // Terms and Conditions
  y += 10;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("TERMS AND CONDITIONS", 15, y);
  y += 10;

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  const terms = [
    "1. SCOPE: The Supplier agrees to provide engineering supplies and components as detailed in the attached schedule to the Customer for the duration of this agreement.",
    "2. PRICING: All prices are quoted in Euro (EUR) exclusive of VAT unless otherwise stated. Pricing shall remain fixed for the initial 12-month period unless raw material costs vary by more than 10%.",
    "3. DELIVERY: Standard delivery within the Republic of Ireland is 3-5 working days. Express delivery is available at additional cost. All deliveries are Ex Works unless agreed otherwise.",
    "4. QUALITY: All products shall meet or exceed the specifications detailed in the product data sheets. The Supplier maintains ISO 9001:2015 certification.",
    "5. PAYMENT: Payment shall be made within the agreed terms from date of invoice. Late payment will incur interest at 8% above ECB base rate per annum.",
    "6. LIABILITY: The Supplier's liability under this agreement shall not exceed the total contract value. This excludes liability for death or personal injury caused by negligence.",
    "7. TERMINATION: Either party may terminate this agreement with 90 days written notice. Immediate termination is permitted in cases of material breach.",
    "8. CONFIDENTIALITY: Both parties agree to keep confidential all commercially sensitive information disclosed during the term of this agreement.",
    "9. GOVERNING LAW: This agreement shall be governed by and construed in accordance with the laws of Ireland.",
  ];

  terms.forEach((term) => {
    const lines = doc.splitTextToSize(term, 175);
    if (y + lines.length * 5 > 265) {
      addFooter(doc, 1);
      doc.addPage();
      addHeader(doc);
      y = 45;
    }
    doc.text(lines, 15, y);
    y += lines.length * 5 + 3;
  });

  // Signatures
  y += 10;
  if (y > 230) {
    addFooter(doc, 1);
    doc.addPage();
    addHeader(doc);
    y = 45;
  }

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("SIGNATURES", 15, y);
  y += 12;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("For and on behalf of Kard Engineering & Supplies Ltd:", 15, y);
  y += 15;
  doc.line(15, y, 85, y);
  y += 5;
  doc.text("Authorised Signatory", 15, y);
  doc.text("Date: _______________", 55, y);

  y += 15;
  doc.text(`For and on behalf of ${contract.customerName}:`, 15, y);
  y += 15;
  doc.line(15, y, 85, y);
  y += 5;
  doc.text("Authorised Signatory", 15, y);
  doc.text("Date: _______________", 55, y);

  addFooter(doc, doc.getNumberOfPages());

  doc.save(`${contract.id}_${contract.customerName.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`);
}

export function generateOrderPDF(orderId: string) {
  const order = salesOrders.find((o) => o.id === orderId);
  if (!order) return;

  const customer = customers.find((c) => c.id === order.customer);
  const doc = new jsPDF();

  addHeader(doc);

  // Order confirmation title
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("ORDER CONFIRMATION", 15, 45);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`Order Reference: ${order.id}`, 15, 52);
  doc.text(`Date: ${new Date(order.date).toLocaleDateString("en-IE")}`, 15, 58);
  doc.setTextColor(0, 0, 0);

  // Customer info
  let y = 72;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("BILL TO", 15, y);
  y += 8;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(order.customerName, 15, y);
  if (customer) {
    y += 6;
    doc.text(`Sector: ${customer.sector}`, 15, y);
    y += 6;
    doc.text(`Account: ${customer.id}`, 15, y);
  }

  // Order details
  y += 15;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("ORDER DETAILS", 15, y);
  y += 10;

  // Table header
  doc.setFillColor(240, 240, 240);
  doc.rect(15, y - 5, 180, 8, "F");
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Salesperson", 17, y);
  doc.text("Items", 80, y);
  doc.text("Status", 110, y);
  doc.text("Total", 170, y, { align: "right" });

  y += 10;
  doc.setFont("helvetica", "normal");
  doc.text(order.salesperson, 17, y);
  doc.text(order.items.toString(), 80, y);
  doc.text(order.status.charAt(0).toUpperCase() + order.status.slice(1), 110, y);
  doc.text(formatCurrency(order.total), 170, y, { align: "right" });

  // Sample line items
  y += 20;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("LINE ITEMS (SAMPLE)", 15, y);
  y += 10;

  doc.setFillColor(240, 240, 240);
  doc.rect(15, y - 5, 180, 8, "F");
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("SKU", 17, y);
  doc.text("Description", 50, y);
  doc.text("Qty", 120, y, { align: "right" });
  doc.text("Unit Price", 145, y, { align: "right" });
  doc.text("Line Total", 175, y, { align: "right" });

  y += 8;
  doc.setFont("helvetica", "normal");
  const sampleProducts = products.slice(0, Math.min(order.items, 5));
  sampleProducts.forEach((p) => {
    const qty = Math.ceil(Math.random() * 20) + 1;
    doc.text(p.sku, 17, y);
    doc.text(p.name.substring(0, 35), 50, y);
    doc.text(qty.toString(), 120, y, { align: "right" });
    doc.text(formatCurrency(p.price), 145, y, { align: "right" });
    doc.text(formatCurrency(p.price * qty), 175, y, { align: "right" });
    y += 7;
  });

  // Totals
  y += 5;
  doc.line(120, y, 195, y);
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.text("Subtotal:", 120, y);
  doc.text(formatCurrency(order.total * 0.81), 175, y, { align: "right" });
  y += 7;
  doc.text("VAT (23%):", 120, y);
  doc.text(formatCurrency(order.total * 0.19), 175, y, { align: "right" });
  y += 7;
  doc.setFontSize(10);
  doc.text("TOTAL:", 120, y);
  doc.text(formatCurrency(order.total), 175, y, { align: "right" });

  // Terms
  y += 20;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text("Payment terms: Net 30 days from date of invoice. All prices are in Euro (EUR).", 15, y);
  y += 5;
  doc.text("Delivery: Standard 3-5 working days within Ireland. Express delivery available on request.", 15, y);
  y += 5;
  doc.text("Returns: Goods may be returned within 14 days in original packaging. Restocking fee may apply.", 15, y);
  doc.setTextColor(0, 0, 0);

  addFooter(doc, 1);

  doc.save(`${order.id}_Order_Confirmation.pdf`);
}

export function generateInvoicePDF(orderId: string) {
  const order = salesOrders.find((o) => o.id === orderId);
  if (!order) return;

  const customer = customers.find((c) => c.id === order.customer);
  const doc = new jsPDF();

  addHeader(doc);

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 15, 45);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`Invoice No: INV-${order.id.replace("SO-", "")}`, 15, 52);
  doc.text(`Order Ref: ${order.id}`, 15, 58);
  doc.text(`Date: ${new Date(order.date).toLocaleDateString("en-IE")}`, 140, 52);
  doc.text(`Due: ${customer ? "Net 30" : "Immediate"}`, 140, 58);
  doc.setTextColor(0, 0, 0);

  let y = 72;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("BILL TO", 15, y);
  y += 8;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(order.customerName, 15, y);
  if (customer) {
    y += 6;
    doc.text(`Account: ${customer.id}`, 15, y);
  }

  y += 15;
  doc.setFillColor(240, 240, 240);
  doc.rect(15, y - 5, 180, 8, "F");
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Description", 17, y);
  doc.text("Qty", 100, y, { align: "right" });
  doc.text("Unit Price", 130, y, { align: "right" });
  doc.text("Amount", 175, y, { align: "right" });

  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text(`Engineering supplies per order ${order.id}`, 17, y);
  doc.text(order.items.toString(), 100, y, { align: "right" });
  doc.text(formatCurrency(order.total / order.items), 130, y, { align: "right" });
  doc.text(formatCurrency(order.total * 0.81), 175, y, { align: "right" });

  y += 15;
  doc.line(120, y, 195, y);
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.text("Subtotal:", 120, y);
  doc.text(formatCurrency(order.total * 0.81), 175, y, { align: "right" });
  y += 7;
  doc.text("VAT @ 23%:", 120, y);
  doc.text(formatCurrency(order.total * 0.19), 175, y, { align: "right" });
  y += 2;
  doc.line(120, y, 195, y);
  y += 8;
  doc.setFontSize(11);
  doc.text("TOTAL DUE:", 120, y);
  doc.text(formatCurrency(order.total), 175, y, { align: "right" });

  y += 25;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text("Bank: Bank of Ireland | IBAN: IE29 BOFI 9000 1234 5678 90 | BIC: BOFIIE2D", 15, y);
  y += 5;
  doc.text("Please quote invoice number with payment. Late payment interest: 8% above ECB base rate.", 15, y);
  doc.setTextColor(0, 0, 0);

  addFooter(doc, 1);

  doc.save(`INV-${order.id.replace("SO-", "")}_${order.customerName.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`);
}
