import { useState } from "react";
import { InlineSpinner } from "./Spinner";

export default function RegisterProduct({ loading, onRegister }) {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [warrantyMonths, setWarrantyMonths] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!productId.trim()) e.productId = "Product ID is required";
    if (!productName.trim()) e.productName = "Product name is required";
    if (!manufacturer.trim()) e.manufacturer = "Manufacturer is required";
    if (!warrantyMonths || Number(warrantyMonths) <= 0)
      e.warrantyMonths = "Enter a valid warranty period";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const success = await onRegister(
      productId.trim(),
      productName.trim(),
      manufacturer.trim(),
      warrantyMonths
    );

    if (success) {
      setProductId("");
      setProductName("");
      setManufacturer("");
      setWarrantyMonths("");
      setErrors({});
    }
  }

  return (
    <div className="glass-card">
      <div className="card-header">
        <h2 className="card-title">
          <span className="card-icon">📦</span>
          Register Product
        </h2>
        <p className="card-description">
          Register a new product on the blockchain with warranty information.
          Only the contract admin can register products.
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
          <label className="form-label">Product Name</label>
          <input
            className={`form-input ${errors.productName ? "error" : ""}`}
            placeholder="e.g. Samsung Galaxy S24"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
              if (errors.productName)
                setErrors((p) => ({ ...p, productName: "" }));
            }}
          />
          {errors.productName && (
            <div className="form-error">⚠ {errors.productName}</div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Manufacturer</label>
          <input
            className={`form-input ${errors.manufacturer ? "error" : ""}`}
            placeholder="e.g. Samsung Electronics"
            value={manufacturer}
            onChange={(e) => {
              setManufacturer(e.target.value);
              if (errors.manufacturer)
                setErrors((p) => ({ ...p, manufacturer: "" }));
            }}
          />
          {errors.manufacturer && (
            <div className="form-error">⚠ {errors.manufacturer}</div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Warranty Period (months)</label>
          <input
            className={`form-input ${errors.warrantyMonths ? "error" : ""}`}
            type="number"
            min="1"
            placeholder="e.g. 24"
            value={warrantyMonths}
            onChange={(e) => {
              setWarrantyMonths(e.target.value);
              if (errors.warrantyMonths)
                setErrors((p) => ({ ...p, warrantyMonths: "" }));
            }}
          />
          {errors.warrantyMonths && (
            <div className="form-error">⚠ {errors.warrantyMonths}</div>
          )}
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <InlineSpinner /> Processing...
            </>
          ) : (
            "Register Product"
          )}
        </button>
      </form>
    </div>
  );
}
