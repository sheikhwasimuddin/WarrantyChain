export default function Header({ account, network, onConnect, theme, onToggleTheme }) {
  const truncated = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : "";

  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-logo">👑</div>
        <div>
          <div className="header-title">WarrantyChain</div>
          <div className="header-subtitle">
            Royal Blockchain Warranty & Ownership Registry
          </div>
        </div>
      </div>

      <div className="header-right">
        {network === "Sepolia" && (
          <div className="network-badge">
            <span className="network-dot" />
            Sepolia
          </div>
        )}

        {/* Theme Toggle Button */}
        <button
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          aria-label="Toggle Theme"
        >
          <span className="theme-toggle-icon">
            {theme === "dark" ? "☀️" : "🌙"}
          </span>
          <span className="theme-toggle-label">
            {theme === "dark" ? "Light" : "Dark"}
          </span>
        </button>

        <button
          className={`connect-btn ${account ? "connected" : ""}`}
          onClick={onConnect}
        >
          <span className="wallet-icon">{account ? "🟢" : "🦊"}</span>
          {account ? (
            <span className="connect-address">{truncated}</span>
          ) : (
            "Connect Wallet"
          )}
        </button>
      </div>
    </header>
  );
}
