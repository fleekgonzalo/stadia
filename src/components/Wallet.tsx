import { useEffect, useState } from 'react'
import { formatEther } from 'viem'
import { walletClient, publicClient } from './config'
import 'viem/window'
//import coin1 from '../assets/coin.png'
//import icon_bnb from '../assets/bnb_icon.png'

//import ERC721token from './ERC721token';
import ERC20token from './ERC20token';
import ConnectButton from './ConnectButton'
import QRcode from './QRcode'

/*
import SingleFileUploader from './SingleFileUploader';


*/

function Wallet() {
  const [account, setAccount] = useState<any>(null) 
  const [balance, setBalance] = useState<String>("0")
  //const [hash, setHash] = useState<Hash>()
  //const [chain, setChain] = useState<any>("")
  const [price, setPrice] = useState<String>("0")


  useEffect(() => {
    init();

   }, []);


   const TOKEN_SPC = '0x3FA03F41d0B5Bc2Ba1827E9B10010304AFF38784'
 //  const TOKEN_USDC = '0x64544969ed7EBf5f083679233325356EbE738930'
  //const TOKEN_NFT = '0x4918A0D79a3B56e7EF78fD645858C895A6dD3EC6'
//  const addressInput = React.createRef<HTMLInputElement>()
//  const valueInput = React.createRef<HTMLInputElement>()

  const init = async () => {
    
    try {
      const [address] = await walletClient.requestAddresses();
      setAccount(address)

      const chainId = await publicClient.getChainId(); 
      //setChain(chainId)
      console.log(chainId);
        
      // read wallet native balance
      const mbalance = await publicClient.getBalance({ 
          address: address,
      })
   
      const balanceAsEther = formatEther(mbalance)
      setBalance(balanceAsEther)

      const sym = "bnb";
      fetch('https://min-api.cryptocompare.com/data/price?fsym='+sym+'&tsyms=usdt')
        .then(response => response.json())
        .then(data => {
          console.log('data:', data);
          const bnbPrice = data.USDT;
          setPrice(bnbPrice)
          
        })
        .catch(error => {
          console.log('Error al obtener el precio de ETH en USD:', error);
          setPrice("0")
        });

      console.log("balance:",balanceAsEther);

      
      
    } catch(e) {
      console.log(e)
    }
  }


  const connect = async () => {
    
    try {
      (document.getElementById('my_modal_2')  as HTMLFormElement).showModal();
      const [address] = await walletClient.requestAddresses()
      setAccount(address)

      const chainId = await publicClient.getChainId(); 
      //setChain(chainId)
      console.log(chainId);
        
      // read wallet native balance
      const mbalance = await publicClient.getBalance({ 
          address: address,
      })
   
      const balanceAsEther = formatEther(mbalance)
      setBalance(balanceAsEther)

      const sym = "bnb";
      fetch('https://min-api.cryptocompare.com/data/price?fsym='+sym+'&tsyms=usdt')
        .then(response => response.json())
        .then(data => {
          console.log('data:', data);
          const bnbPrice = data.USDT;
          setPrice(bnbPrice)
          
        })
        .catch(error => {
          console.log('Error al obtener el precio de ETH en USD:', error);
          setPrice("0")
        });

      (document.getElementById('my_modal_2')  as HTMLFormElement).close()
      console.log("balance:",balanceAsEther);

      
      
    } catch(e) {
      console.log(e);
        (document.getElementById('my_modal_2')  as HTMLFormElement).close();
    }
  }

/*
  const sendTransaction = async () => {
    
    try {  
        const hash = await walletClient.sendTransaction({
          account,
          to: addressInput.current!.value as any,
          value: parseEther(valueInput.current!.value as '${number}'),
        })
        //setHash(hash);
        console.log("TX hash:",hash);
        
      } catch(e) {
        console.log("error:",e);
      }
  }
*/

 if (account)  
    return (
      <>
 
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box  bg-blue-500 ">
      
        <h3 className="font-bold text-lg">Please wait</h3>
        <span className="loading loading-dots loading-lg"></span>
        <p className="py-4">retrieving data from blockchain</p>
       
      </div>
    </dialog>            


        <div className="card card-compact  p-4 mx-auto text-center w-180 shadow-xl  bg-base-200">
            <QRcode wallet={account} />
            <div className="text-3xl">{Number(balance).toFixed(4)} BNB</div>
            <div>$ {(Number(price)*Number(balance)).toFixed(2)}</div>

             <ERC20token token={TOKEN_SPC} wallet={account} />
             
              <button  className="btn btn-primary mt-5 w-30 mx-auto"   onClick={connect}>refresh</button>            
         </div>
        
   
       
         
        
      </>
    )
  return (
    <>
      <ConnectButton />
      
    </>  
    )
}

export default Wallet;
/*
      <div className="card card-compact  p-4 mx-auto text-center w-96  shadow-xl mt-10">
            <input ref={addressInput} placeholder="address"  className="input input-bordered mb-5 mx-auto  w-full max-w-xs" />
            <input ref={valueInput} placeholder="value (ether)"  className="input input-bordered mb-5 mx-auto  w-full max-w-xs" />
            <button  className="btn btn-primary w-24  mx-auto" onClick={sendTransaction}>Send</button>
             <br/><br/>
 
        </div>    

*/

