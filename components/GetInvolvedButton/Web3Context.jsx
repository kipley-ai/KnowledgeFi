import React, { createContext, useEffect, useState, useContext } from "react";
import { Web3 } from "web3";
import toast from 'react-hot-toast';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [error, setError] = useState("");

  const checkEthereumExists = () => {
    if (!window.ethereum) {
      setError("Please Install MetaMask.");
      return false;
    }
    return true;
  };

  const getConnectedAccounts = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (checkEthereumExists()) {
      window.ethereum?.on("accountsChanged", getConnectedAccounts);
      getConnectedAccounts();
    }
    return () => {
      window.ethereum?.removeListener("accountsChanged", getConnectedAccounts);
    };
  }, []);

  const connectToMetaMask = async () => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      try {
        // Request access to the user's MetaMask accounts
        await window.ethereum.enable();
        console.log("Connected to MetaMask!");
        toast.success('Connected to MetaMask.', {
          id: "connect-success"
        });

        // Now you can use Web3 to interact with the user's wallet
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        const domain = window.location.host;
        const message = `${domain} wants you to sign in with your Ethereum account:\n${account}\n\nWelcome to the KnowledgeFi movement. By connecting to the site, you are allowing us to log your wallet address and date / time of connection. More details will be revealed in due course.\n\nURI: https://${domain}\nVersion: 1\nChain ID: 1\nNonce: 32891757\nIssued At: 2021-09-30T16:25:24.000Z`;

        // Sign the message with MetaMask
        const signature = await web3.eth.personal.sign(message, account, "");
        fetch("/api/wallet", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ address: account }),
        });
        // Perform your sign-in logic here, for example, set a session or JWT token
        // You can also send the message and signature to your server for authentication
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.error("MetaMask not installed");
    }
  };

  const accountWasChanged = (accounts) => {
    setAccount(accounts[0]);
    console.log('accountWasChanged ', accounts);
    if (accounts.length === 0) {
      console.log('Logged out');
      toast.success('Disconnected from Metamask.', {
        id: "disconnect-success"
      });
    }
  }
  
  const clearAccount = () => {
    setAccount("");
    console.log('clearAccount');
  };

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }
    window.ethereum.on('accountsChanged', accountWasChanged);
    window.ethereum.on('disconnect', clearAccount);
    return () => {
      window.ethereum.removeListener('accountsChanged', accountWasChanged);
      window.ethereum.removeListener('disconnect', clearAccount);
    }
  }, []);

  return (
    <Web3Context.Provider value={{ account, connectToMetaMask, error }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3Context must be used within a Web3Provider");
  }
  return context;
};
