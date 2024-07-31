export default function formatcurrency(amount) {
  return (Math.round(amount) / 100).toFixed(2);
}
