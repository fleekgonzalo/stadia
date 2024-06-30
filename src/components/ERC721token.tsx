import { useState,  useEffect } from 'react'
import { walletClient, publicClient } from './config'
import { formatEther } from 'viem'
import { ERC721abi } from '../erc721abi'
import MintNFT from './MintNFT' 
import SingleFileUploader from './SingleFileUploader';
import maskAddress from './util.ts';

type Props = {
  token: any;  //token address
  //wallet: any; //wallet address
};


function ERC721token(props: Props) {

const [data, setData] = useState<any>("")
//const [uri, setUri] = useState<String>("")
const [name, setName] = useState<String>("")
const [nft, setNft] = useState<any>("")
const [id, setId] = useState<String>("")

const [account, setAccount] = useState<any>(null) 


useEffect(() => {
  mir1();

 });


    // read token metadata
  const mir1 = async () => {

    (document.getElementById('my_modal_1')  as HTMLFormElement).showModal()

  try { 
    const [wallet] = await walletClient.requestAddresses()
    setAccount(wallet)

  
    const _data2 = await publicClient.readContract({
      address: props.token,
      abi: ERC721abi,
      functionName: 'balanceOf',
      args: [wallet]  //  args: [wallet.toString()]
    })


  const _data1 = await publicClient.readContract({
      address: props.token,
      abi: ERC721abi,
      functionName: 'tokensOfOwner',
      args: [wallet]
    })    


    const _data3 = await publicClient.readContract({
      address: props.token,
      abi: ERC721abi,
      functionName: 'name'
    })

    const _data4 = await publicClient.readContract({
      address: props.token,
      abi: ERC721abi,
      functionName: 'baseTokenURI'     
    })

    console.log ("uri is >>",_data4)

    const response = await fetch(_data4);
    const nft = await response.json();
    setNft(nft.properties.image.description)
    
    console.log("nft >>> ", nft.properties.image.description);
    console.log ("id is >>",_data1)
   setId(_data1.length>0?_data1[0].toString():"");
   setData(formatEther(_data2));
   setName(_data3);
  //setUri(_data4);
  //  console.log(">>> ",formatEther(_data2)); // 

    (document.getElementById('my_modal_1')  as HTMLFormElement).close()
    
  } catch(e) {
    // console.log("error >>> ",e); //
    (document.getElementById('my_modal_1')  as HTMLFormElement).close()
  }    
    
  }

  return (
    <>
    
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box  bg-blue-500 ">
      
        <h3 className="font-bold text-lg">Please wait</h3>
        <span className="loading loading-dots loading-lg"></span>
        <p className="py-4">retrieving data from blockchain</p>
       
      </div>
    </dialog>    
    
   
     {parseFloat(data)==0 &&
            <MintNFT token={props.token} wallet={account}  />
            
      }

     {parseFloat(data)>0 && 
     <div className="min-h-screen  bg-base-200" >
      <div className="card card-compact  p-4 mx-auto text-center w-96  shadow-xl mt-2">
        <figure><img src={nft} alt="nft" /></figure>
        <div className="card-body mx-auto">
          <h2 className="card-title mx-auto">Membership found!</h2>
          <p>{name}</p>
          <p><a href={"https://testnet.bscscan.com/address/"+props.token} target="_blank">{maskAddress(props.token)}</a></p>
          <p>ID:{id}</p>
        </div>
        <SingleFileUploader />
      </div>
    </div>

     }

    </>
  )
}

export default ERC721token;

