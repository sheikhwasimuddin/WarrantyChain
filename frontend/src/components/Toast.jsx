import { useState, useEffect, useCallback } from "react";

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, title, message, duration = 5000) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, type, title, message, duration, exiting: false }]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, duration);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  const success = useCallback(
    (title, message) => addToast("success", title, message),
    [addToast]
  );

  const error = useCallback(
    (title, message) => addToast("error", title, message, 7000),
    [addToast]
  );

  const info = useCallback(
    (title, message) => addToast("info", title, message),
    [addToast]
  );

  return { toasts, success, error, info, removeToast };
}

const ICONS = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};

export default function ToastContainer({ toasts, removeToast }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast ${toast.type} ${toast.exiting ? "exiting" : ""}`}
        >
          <span className="toast-icon">{ICONS[toast.type]}</span>

          <div className="toast-content">
            <div className="toast-title">{toast.title}</div>
            {toast.message && (
              <div className="toast-message">{toast.message}</div>
            )}
          </div>

          <button
            className="toast-close"
            onClick={() => removeToast(toast.id)}
          >
            ✕
          </button>

          <div
            className="toast-progress"
            style={{ animationDuration: `${toast.duration}ms` }}
          />
        </div>
      ))}
    </div>
  );
}
