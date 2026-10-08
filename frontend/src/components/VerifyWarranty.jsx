import { useState } from "react";
import { InlineSpinner } from "./Spinner";

export default function VerifyWarranty({
  loading,
  product,
  onVerify,
  formatDate,
}) {
  const [searchId, setSearchId] = useState("");
  const [copied, setCopied] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!searchId.trim()) return;
    onVerify(searchId.trim());
  }

  function copyAddress(addr) {
    navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  // Calculate warranty progress percentage
  function getWarrantyProgress() {
    if (!product || !product.registrationDate || !product.expiry) return 0;
    const now = Date.now() / 1000;
    const total = product.expiry - product.registrationDate;
    const elapsed = now - product.registrationDate;
    if (total <= 0) return 0;
    const remaining = Math.max(0, 1 - elapsed / total);
    return Math.round(remaining * 100);
  }

  const progress = product ? getWarrantyProgress() : 0;

  return (
    <div className="glass-card">
      <div className="card-header">
        <h2 className="card-title">
          <span className="card-icon">🔍</span>
          Verify Warranty
        </h2>
        <p className="card-description">
          Look up any product's warranty status and ownership details directly
          from the blockchain.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Product ID</label>
          <input
            className="form-input"
            placeholder="Enter Product ID to verify"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <InlineSpinner /> Searching...
            </>
          ) : (
            "Verify Product"
          )}
        </button>
      </form>

      {product && (
        <div className="result-card">
          <div className="result-header">
            <span className="result-name">{product.name}</span>
          </div>

          <div className="result-row">
            <span className="result-label">Product ID</span>
            <span className="result-value">{product.id}</span>
          </div>

          <div className="result-row">
            <span className="result-label">Manufacturer</span>
            <span className="result-value">{product.manufacturer}</span>
          </div>

          <div className="result-row">
            <span className="result-label">Current Owner</span>
            <span
              className="result-value address"
              title="Click to copy"
              onClick={() => copyAddress(product.owner)}
            >
              {product.owner}
              {copied && <span className="copy-tooltip">Copied!</span>}
            </span>
          </div>

          <div className="result-row">
            <span className="result-label">Registered</span>
            <span className="result-value">
              {formatDate(product.registrationDate)}
            </span>
          </div>

          <div className="result-row">
            <span className="result-label">Warranty Expiry</span>
            <span className="result-value">
              {formatDate(product.expiry)}
            </span>
          </div>

          {/* Warranty progress bar */}
          {product.active && (
            <div className="warranty-progress">
              <div className="warranty-progress-label">
                <span>Warranty Remaining</span>
                <span>{progress}%</span>
              </div>
              <div className="warranty-progress-bar">
                <div
                  className={`warranty-progress-fill ${
                    progress < 20 ? "low" : ""
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <div
            className={`warranty-status ${
              product.active ? "active" : "expired"
            }`}
          >
            <span className="status-dot" />
            {product.active ? "WARRANTY ACTIVE" : "WARRANTY EXPIRED"}
          </div>
        </div>
      )}
    </div>
  );
}
