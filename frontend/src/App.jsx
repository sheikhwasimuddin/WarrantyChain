import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "./contract";

import Header from "./components/Header";
import TabNav from "./components/TabNav";
import RegisterProduct from "./components/RegisterProduct";
import VerifyWarranty from "./components/VerifyWarranty";
import TransferOwnership from "./components/TransferOwnership";
import TransactionStatus from "./components/TransactionStatus";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner";
import ToastContainer, { useToast } from "./components/Toast";

import "./App.css";

function App() {
  // ---- Theme State ----
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("warrantychain_theme") || "dark";
  });

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("warrantychain_theme", nextTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // ---- Blockchain & App State ----
  const [account, setAccount] = useState("");
  const [network, setNetwork] = useState("");
  const [activeTab, setActiveTab] = useState("register");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [product, setProduct] = useState(null);

  const toast = useToast();

  // ===========================
  // CONNECT METAMASK
  // ===========================

  async function connectWallet() {
    if (!window.ethereum) {
      toast.error("MetaMask Required", "Please install MetaMask to use WarrantyChain.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      // Sepolia = 0xaa36a7
      if (chainId !== "0xaa36a7") {
        toast.error(
          "Wrong Network",
          "Please switch MetaMask to Ethereum Sepolia testnet."
        );
        setNetwork("");
      } else {
        setNetwork("Sepolia");
        toast.success("Wallet Connected", `Connected as ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Connection Failed", "Failed to connect wallet. Please try again.");
    }
  }

  // ===========================
  // PROVIDER
  // ===========================

  function getProvider() {
    return new ethers.BrowserProvider(window.ethereum);
  }

  // ===========================
  // CONTRACT WITH SIGNER
  // ===========================

  async function getSignerContract() {
    const provider = getProvider();
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  }

  // ===========================
  // REGISTER PRODUCT
  // ===========================

  async function registerProduct(productId, productName, manufacturer, warrantyMonths) {
    if (!account) {
      toast.error("Wallet Not Connected", "Please connect MetaMask first.");
      return false;
    }

    try {
      setLoading(true);
      setTxHash("");

      const contract = await getSignerContract();

      const tx = await contract.registerProduct(
        productId,
        productName,
        manufacturer,
        Number(warrantyMonths)
      );

      setTxHash(tx.hash);
      toast.info("Transaction Submitted", "Waiting for blockchain confirmation...");

      await tx.wait();

      toast.success(
        "Product Registered!",
        `${productName} has been registered on the blockchain.`
      );

      return true;
    } catch (error) {
      console.error(error);
      toast.error(
        "Registration Failed",
        error.reason || error.shortMessage || "An error occurred during registration."
      );
      return false;
    } finally {
      setLoading(false);
    }
  }

  // ===========================
  // VERIFY PRODUCT
  // ===========================

  async function verifyProduct(searchId) {
    try {
      setLoading(true);
      setProduct(null);

      const provider = getProvider();
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      const data = await contract.getProduct(searchId);
      const active = await contract.isWarrantyActive(searchId);

      setProduct({
        id: data[0],
        name: data[1],
        manufacturer: data[2],
        owner: data[3],
        registrationDate: Number(data[4]),
        expiry: Number(data[5]),
        registered: data[6],
        active: active,
      });

      toast.success("Product Found", `Showing details for ${data[1]}.`);
    } catch (error) {
      console.error(error);
      toast.error("Not Found", "No product found with that ID on the blockchain.");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }

  // ===========================
  // TRANSFER OWNERSHIP
  // ===========================

  async function transferOwnership(productId, newOwner) {
    if (!account) {
      toast.error("Wallet Not Connected", "Please connect MetaMask first.");
      return false;
    }

    try {
      setLoading(true);
      setTxHash("");

      const contract = await getSignerContract();

      const tx = await contract.transferOwnership(productId, newOwner);

      setTxHash(tx.hash);
      toast.info("Transaction Submitted", "Waiting for blockchain confirmation...");

      await tx.wait();

      toast.success(
        "Ownership Transferred!",
        `Product ${productId} ownership has been transferred.`
      );

      return true;
    } catch (error) {
      console.error(error);
      toast.error(
        "Transfer Failed",
        error.reason || error.shortMessage || "Ownership transfer failed."
      );
      return false;
    } finally {
      setLoading(false);
    }
  }

  // ===========================
  // FORMAT DATE
  // ===========================

  function formatDate(timestamp) {
    if (!timestamp) return "N/A";
    return new Date(timestamp * 1000).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  // ===========================
  // RENDER ACTIVE TAB
  // ===========================

  function renderTab() {
    switch (activeTab) {
      case "register":
        return (
          <RegisterProduct loading={loading} onRegister={registerProduct} />
        );
      case "verify":
        return (
          <VerifyWarranty
            loading={loading}
            product={product}
            onVerify={verifyProduct}
            formatDate={formatDate}
          />
        );
      case "transfer":
        return (
          <TransferOwnership loading={loading} onTransfer={transferOwnership} />
        );
      default:
        return null;
    }
  }

  // ===========================
  // UI
  // ===========================

  return (
    <div className="app" data-theme={theme}>
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />

      {loading && <Spinner />}

      <Header
        account={account}
        network={network}
        onConnect={connectWallet}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      <TransactionStatus txHash={txHash} />

      <main className="main-content">{renderTab()}</main>

      <Footer />
    </div>
  );
}

export default App;