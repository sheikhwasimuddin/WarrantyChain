import { useState } from "react";
import { InlineSpinner } from "./Spinner";

export default function TransferOwnership({ loading, onTransfer }) {
  const [productId, setProductId] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!productId.trim()) e.productId = "Product ID is required";
    if (!newOwner.trim()) {
      e.newOwner = "Wallet address is required";
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(newOwner.trim())) {
      e.newOwner = "Invalid Ethereum address format";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const success = await onTransfer(productId.trim(), newOwner.trim());

    if (success) {
      setNewOwner("");
      setErrors({});
    }
  }

  return (
    <div className="glass-card">
      <div className="card-header">
        <h2 className="card-title">
          <span className="card-icon">🔄</span>
          Transfer Ownership
        </h2>
        <p className="card-description">
          Transfer a registered product's ownership to another wallet address.
          Only the current owner can transfer.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Product ID</label>
          <input
            className={`form-input ${errors.productId ? "error" : ""}`}
            placeholder="e.g. PROD-2024-001"
            value={productId}
            onChange={(e) => {
              setProductId(e.target.value);
              if (errors.productId) setErrors((p) => ({ ...p, productId: "" }));
            }}
          />
          {errors.productId && (
            <div className="form-error">⚠ {errors.productId}</div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">New Owner Wallet Address</label>
          <input
            className={`form-input ${errors.newOwner ? "error" : ""}`}
            placeholder="0x..."
            value={newOwner}
            onChange={(e) => {
              setNewOwner(e.target.value);
              if (errors.newOwner) setErrors((p) => ({ ...p, newOwner: "" }));
            }}
          />
          {errors.newOwner && (
            <div className="form-error">⚠ {errors.newOwner}</div>
          )}
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <InlineSpinner /> Processing...
            </>
          ) : (
            "Transfer Ownership"
          )}
        </button>
      </form>
    </div>
  );
}
