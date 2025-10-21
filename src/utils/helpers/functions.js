function formatCurrencyAmount(amount) {
  try {
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } catch (error) {
    return "0.00";
  }
}

function formatDate(dateStr) {
  try {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${month} ${day} ${year}`;
  } catch (error) {
    return "N/A";
  }
}

function formatDateForInput(date) {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function filterTransactions(transactions, filters) {
  const { startDate, endDate, types, status } = filters;

  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    const isWithinDateRange =
      (!startDate || transactionDate >= new Date(startDate)) &&
      (!endDate || transactionDate <= new Date(endDate));

    const isTypeValid = Array.isArray(types) ? types.includes(transaction.type) : types === transaction.type;
    const isStatusValid = Array.isArray(status) ? status.includes(transaction.status) : status === transaction.status;

    return isWithinDateRange && isTypeValid && isStatusValid;
  });
}

function toSnakeCase(str) {
  return str
    .replace(/\s+/g, '_')
    .toLowerCase();
};

export { formatCurrencyAmount, formatDate, filterTransactions, toSnakeCase, formatDateForInput };
