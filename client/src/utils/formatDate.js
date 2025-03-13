export default function formatDate(date) {
    return date.toLocaleDateString("en-us", { day: "numeric", year: "numeric", month: "long" });
}