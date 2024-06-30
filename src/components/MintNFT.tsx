import { useEffect, useState } from 'react'
import { formatEther } from 'viem'
import { publicClient, walletClient } from './config'

import 'viem/window'
import { ERC721abi } from '../erc721abi'

type Props = {
  token: any;  //nft token address
  wallet: any; //wallet address
};

function MintNFT(props: Props) {
 // const [account, setAccount] = useState<Address>() 
  //const [balance, setBalance] = useState<String>("")
  //const [hash, setHash] = useState<Hash>()
 // const [chain, setChain] = useState<Boolean>(true)
  const [price, setPrice] = useState<String>("")  

 // const TOKEN_SPC = '0x3FA03F41d0B5Bc2Ba1827E9B10010304AFF38784'
 // const TOKEN_NFT = props.token; //'0xd1C3DA910dBa68F8E8b3Af4dd123179417048cEd'

 // const addressInput = React.createRef<HTMLInputElement>()
 // const valueInput = React.createRef<HTMLInputElement>()


useEffect(() => {
  getInfo();

 }, []);


 const getInfo = async () => {
    if (!props.wallet) return

    const _data2 = await publicClient.readContract({
            address: props.token,
            abi: ERC721abi,
            functionName: 'price'
    })
    setPrice(formatEther(_data2).toString())

 }

  const mint = async () => {
    if (!props.wallet) return

    try {  
      // Local Account
  /*    
      const signature_1 = await walletClient.signMessage({ 
          account,
          message: 'hello world',
        })
*/

      const [account] = await walletClient.requestAddresses();
      //setAccount(address)


       const _data2 = await publicClient.readContract({
            address: props.token,
            abi: ERC721abi,
            functionName: 'price'
          })


          //console.log("eth >>>:",_data2);



           const { request } = await publicClient.simulateContract({
            account,
            address: props.token,
            abi: ERC721abi,
            functionName: 'mintPresale',
            args: [props.wallet,BigInt(1)],
            value : _data2,

          })           

         const _data3 = await walletClient.writeContract(request)

/*
         const _data3 = await walletClient.writeContract({
            address: props.token,
            abi: ERC721abi,
            functionName: 'mintPresale',
            args: [props.wallet,_data2],
            account ,

          })
*/
        console.log(request);
        console.log(_data3);
        console.log("NFT price:",formatEther(_data2));
        
      } catch(e) {
        console.log("error:",e);
      }
  }


     
    return (
      <>      
      <div className="min-h-screen  bg-base-200" >
      <div className="card card-compact  p-4 mx-auto text-center w-96  shadow-xl">
            <figure><img src="https://bafybeicnwpftzndzu4rt4kqoff6i3bb6j2gsinyw5gcgtizx2jstauat2a.ipfs.dweb.link/" alt="NFT" /></figure>
            <div className="card-body mx-auto">
              <h2 className="card-title mx-auto">BUY Membership!</h2>
              <h2 className="card-title mx-auto" >{price} BNB</h2>
              <p>STadia NIL subscription is needed</p>
              <div className="card-actions mx-auto">
                <button className="btn btn-primary  mx-auto "  onClick={mint} >Buy it!</button>
              </div>
            </div>
      </div>  
      </div>  
      </>
    )
 
}

export default MintNFT;

