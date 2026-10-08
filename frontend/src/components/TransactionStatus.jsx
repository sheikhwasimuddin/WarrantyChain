export default function TransactionStatus({ txHash }) {
  if (!txHash) return null;

  const truncated = `${txHash.slice(0, 10)}...${txHash.slice(-8)}`;
  const url = `https://sepolia.etherscan.io/tx/${txHash}`;

  return (
    <div className="tx-status">
      <div className="tx-card">
        <span className="tx-icon">✓</span>
        <div className="tx-info">
          <div className="tx-title">Transaction Submitted</div>
          <div className="tx-hash" title={txHash}>
            {truncated}
          </div>
        </div>
        <a
          className="tx-link"
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          View ↗
        </a>
      </div>
    </div>
  );
}
