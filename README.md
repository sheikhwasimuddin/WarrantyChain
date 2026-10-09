# WarrantyChain 🔗
### Blockchain-Based Product Warranty and Ownership Tracking System

**Live Demo:** https://warrantychain.netlify.app/

## 📌 Overview

WarrantyChain is a decentralized application (DApp) that uses blockchain technology to manage product warranties and ownership records securely and transparently. It enables product registration, warranty verification, and ownership transfers using Solidity smart contracts deployed on the Ethereum Sepolia Testnet.

## ✨ Features

- **Product Registration:** Register products with their ID, name, manufacturer, and warranty duration.
- **Warranty Verification:** Check whether a product's warranty is active or expired.
- **Ownership Tracking:** Retrieve the current owner's wallet address.
- **Ownership Transfer:** Transfer registered products to another Ethereum wallet.
- **Blockchain Security:** Store product records on-chain for transparency and resistance to unauthorized modification.
- **MetaMask Integration:** Connect a wallet and authorize blockchain transactions.

## 🛠️ Tech Stack

- **Smart Contract:** Solidity
- **Blockchain:** Ethereum Sepolia Testnet
- **Smart Contract IDE:** Remix IDE
- **Wallet:** MetaMask
- **Frontend:** React.js, Vite
- **Blockchain Interaction:** ethers.js
- **Deployment:** Netlify

## 🏗️ Architecture

1. The user connects their MetaMask wallet to the application.
2. The React frontend communicates with the smart contract using ethers.js.
3. The smart contract processes registration, warranty checks, and ownership transfers.
4. Product information and ownership changes are recorded on the Ethereum Sepolia blockchain.
5. Users can verify product details and warranty status through the interface.

## 🚀 Live Application

Visit: https://warrantychain.netlify.app/

**Network:** Ethereum Sepolia Testnet  
**Contract Address:** `0xA20483F1d45FE61D3639299e3e5ab5C8C076f370`

[View Contract on Sepolia Etherscan](https://sepolia.etherscan.io/address/0xA20483F1d45FE61D3639299e3e5ab5C8C076f370)

## ⚙️ Run Locally

### Prerequisites

- Node.js and npm
- MetaMask browser extension
- Sepolia test ETH for blockchain transactions

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sheikhwasimuddin/WarrantyChain.git
   ```

2. Navigate to the frontend directory:

   ```bash
   cd WarrantyChain/frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

### Build for Production

```bash
npm run build
```

The production build is generated in the `frontend/dist` directory.

## 🧪 How to Use

1. Open the [WarrantyChain application](https://warrantychain.netlify.app/).
2. Install MetaMask and switch to the **Ethereum Sepolia Testnet**.
3. Connect your wallet.
4. Register a product using its ID, name, manufacturer, and warranty duration.
5. Verify the product to view its details, current owner, and warranty status.
6. Transfer ownership by entering the product ID and recipient wallet address.

**Note:** Product registration is restricted to the smart contract administrator. Ownership transfers must be initiated by the product's current owner.

## 🔐 Security and Limitations

- The application operates on a test network and is intended for educational and demonstration purposes.
- Sepolia test ETH has no real monetary value.
- Blockchain records are publicly viewable.
- The current implementation stores product information on-chain; it does not independently verify physical products or manufacturer warranty claims.

## 🔮 Future Enhancements

- QR-code-based product verification.
- Product transaction history.
- Manufacturer and customer dashboards.
- NFT-based warranty certificates.
- Integration with IoT devices for product monitoring.

## 👨‍💻 Author

**Sheikh Wasimuddin**

GitHub: https://github.com/sheikhwasimuddin

## 📄 License

This project is developed for educational purposes. Add a license file if you intend to distribute it under a specific open-source license.
