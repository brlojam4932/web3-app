import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';

import { contractABI, contractAddress } from "../utils/constants";


// with context we can share our data within our app
// our logic can be coded from one centralized space

export const TransactionContext = React.createContext();

// deconstruct window.ethereum object from Metamask
const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionContract;

/*
    console.log({
    provider,
    signer,
    transactionContract
  });
*/

}


// here, we "hold" our code from above and share access to it
// a context provider needs children from props & return data
// the "children" will have access to this value object

// if succesfull, we will have transfered our data to all of our components, using context
export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: ""}); // state variable created here, passed through the context Provider's values as objects, down below
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  }


  const checkIfWalletIsConnected = async () => {
    try {
      // if no etheruem object, return alert
      if (!ethereum) return alert("Please install Metamask");

      // get accounts
      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log(accounts);

      // check if account exists and set to our state
      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        // getAllTransactions();
      } else {
        console.log("No accounts found.");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object found.");
    }
  }


  // we conncect to Metamask here
  const connectWallet = async () => {
    // try and catch block
    try {
      // check if Metamask is installed
      if (!ethereum) return alert("Plsease install Metamask");
      // request a metamask account
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      // set to first account, which is our account(msg.sender)
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object found.");
    }
  }


  const sendTransaction = async () => {
    // first, we check if Metamask is installed
    try {
      if(!ethereum) return alert("Please install Metamask");

      // get data from the form....
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract() // console.log values
      const parsedAmount = ethers.utils.parseEther(amount);

      // sending ether from one account to another account
      // gas written in hexadecimal: '0x5208'
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', // 21000 GWEI
          value: parsedAmount._hex // 0.000021 Ether
        }]
      });
      
      // now we need to store our transaction to the blockchain, using our function from our smart contract
      const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait(); // here, we wait for the transaction to execute

      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();

      setTransactionCount(transactionCount.toNumber());

    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object"); 
    }
  }

  // this "useEffect" will check only at the start of our session 
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  // we first create a test: value={{ value: "test" }}
  // then we replace it with our "connectWallet: connectWallet", key/value pair function
  // Key/Value pair is the same so we just provide the key
  // this gets passed to all of our components

  // current account state can be passed as an object, here...
  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
      {children}
    </TransactionContext.Provider>
  )

}