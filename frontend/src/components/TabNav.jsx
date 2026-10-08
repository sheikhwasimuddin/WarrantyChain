const TABS = [
  { id: "register", label: "Register", icon: "📦" },
  { id: "verify", label: "Verify", icon: "🔍" },
  { id: "transfer", label: "Transfer", icon: "🔄" },
];

export default function TabNav({ activeTab, onTabChange }) {
  return (
    <nav className="tab-nav">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
