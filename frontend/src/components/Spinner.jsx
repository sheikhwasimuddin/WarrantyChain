export default function Spinner({ message = "Processing transaction..." }) {
  return (
    <div className="spinner-overlay">
      <div className="spinner-ring" />
      <div className="spinner-text">{message}</div>
    </div>
  );
}

export function InlineSpinner() {
  return <span className="spinner-inline" />;
}
