export function formatPrice(num) {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatDate(dateString) {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", options); // 'en-GB' ensures the format is day month year
}

export function formatTime(dateString) {
  const isoString = dateString.replace(" ", "T");

  const date = new Date(isoString);

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedHours = String(hours).padStart(2, "0");

  return `${formattedHours}:${minutes} ${ampm}`;
}
