import React, { useEffect,useState } from 'react'
import Web3 from "web3"
import detectEthereumProvider from '@metamask/detect-provider'
import KryptoBird from '../abis/KryptoBird.json'
import Navbar from './Navbar';
import Button from '@mui/material/Button';
import MintingForm from './MintingForm';
import DisplayNFts from './DisplayNFts';
function App() {


  const [walletExists,setWalletExists] = useState(false);
  const [account,setAccount] = useState('');
  const [error,setError] = useState('');
  const [networkData,setNetworkData] = useState('');
  const [contract,setContract] = useState({});
  const [loading,setLoading] = useState(false);
  const [totalSupply,setTotalSupply] = useState(0);
  const [allNfts,setAllNfts] = useState([]);

  const web3 = new Web3(window.ethereum);
  //check ethereum provider
    //Load account data 
    const loadWeb3AndData = async()=>{
      setLoading(true);
      if (window.ethereum) {
       
        try {
         
          //web3 comes from here................
       
          
          setWalletExists(true);
          instantiateContract();
          

        } catch (error) {
          if (error.code === 4001) {
            // User rejected request
            console.log("User refused to connect");
            setError("User refused to connect");
          }
      
          setError(error.message);
        }
      }
      else{
        setWalletExists(false);
      }
      setLoading(false);
    }

    const instantiateContract  = async()=>{
              //these both work 
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          //const accounts = await web3.eth.getAccounts();
          console.log(accounts)
        setAccount(accounts[0]);
        
        const networkId =await window.ethereum.request({ method: 'net_version' });
        console.log("networkId",networkId)
        const tempnetworkData =  KryptoBird.networks[networkId]
        console.log("tempnetworkData",tempnetworkData)
        
        if(tempnetworkData){
          setNetworkData(tempnetworkData);
          let abi = KryptoBird.abi;
          let contractAddress = tempnetworkData.address;
          let contract =await new web3.eth.Contract(abi,contractAddress);
          let data = await contract.methods.getKryptoArr().call();
          setAllNfts(data);
          console.log(contract);
          setContract(contract)
          calculateTotalSupply(contract);
         
        }
    }

    const minting = async(dataUrl)=>{


        console.log(dataUrl);
        await contract.methods.mint(dataUrl).send({
          from:account,
          gas:"1000000"
        });
        instantiateContract();

    }

    useEffect(()=>{
      //loadWeb3();
      loadWeb3AndData();
    },[]);

    const calculateTotalSupply = async(contract)=>{
      let alltokenSupply = await  contract.methods.totalSupply().call();
      console.log("alltokenSupply",alltokenSupply)
      setTotalSupply(alltokenSupply)
    }
  
  return (
    <div>
      <Navbar account={account} connectFunction={loadWeb3AndData}/>
      {
        loading?
        "":
        networkData && contract ?
        
        <div style={{padding:"1.5rem"}}>

          <b style={{fontSize:"1.5rem"}}>Total Supply -  {totalSupply} NFTs</b>
          
          <MintingForm mintFunction={minting}/>


          <div style={{marginTop:"2rem",display:"flex",flexWrap:"wrap"}}>
              {
                allNfts && allNfts.length>0 && allNfts.map(item=>{
                  return  <DisplayNFts data={item}/>
                })}
         
          </div>

        </div>

        
   
        :
        <div style={{textAlign:"center",fontSize:"1.5rem",lineHeight:"40px",marginTop:"2rem"}}>
            Connect to the Rinkeby or ganache local network !
           <br/>
              Switch Network
             
          </div>
      }
    </div>
  )
}

export default App