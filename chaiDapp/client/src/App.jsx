import { ethers } from "hardhat";
import abi from "./contractJson/chai.json";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Buy from "./components/Buy";
import Memos from "./components/Memos";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    const template = async () => {
      const contractAddress = "";
      const contractABI = "abi.abi";

      try {
        //Metamask part
        const { ethereum } = window;

        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(account);

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setState({ provider, signer, contract });
      } catch (error) {
        alert(error);
      }
    };
    template();
  });
  return (
    <div className="App">
      connected account: {account}
      <Buy state={state}> </Buy>
      <Memos state={state}> </Memos>
    </div>
  );
}

export default App;
