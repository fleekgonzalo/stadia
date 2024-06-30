import { useState, useEffect } from 'react'
import { formatEther } from 'viem'
import { ERC20abi } from '../erc20abi'
import {publicClient} from './config'
import coin1 from '../assets/coin.png'
//import icon_bnb from '../assets/bnb_icon.png'
//import maskAddress from './util.ts';

type Props = {
  token: any;  //token address
  wallet: any; //wallet address
};

/*
export const publicClient = createPublicClient({
  chain: bscTestnet,
  transport: http()
})
*/

function ERC20token(props: Props) {

const [data, setData] = useState<String>("")
const [symbol, setSymbol] = useState<String>("")
const [name, setName] = useState<String>("")


  useEffect(() => {
    mir1();
   }, []);


    // read token metadata
  const mir1 = async () => {
    try {
       (document.getElementById('my_modal_1')  as HTMLFormElement).showModal()
/*
       const _data = await publicClient.readContract({
          //address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE', //Token Shiba Inu
          address: props.token,
          abi: ERC20abi,
          functionName: 'totalSupply',
        })
*/
        const _data2 = await publicClient.readContract({
          address: props.token,
          abi: ERC20abi,
          functionName: 'balanceOf',
          args: [props.wallet]
        })

        const _data3 = await publicClient.readContract({
          address: props.token,
          abi: ERC20abi,
          functionName: 'name'
        })

       const _data4 = await publicClient.readContract({
          address: props.token,
          abi: ERC20abi,
          functionName: 'symbol'
        })

       setData(formatEther(_data2));
       setName(_data3);
       setSymbol(_data4);
       // console.log(">>> ",formatEther(_data2)) // 
        (document.getElementById('my_modal_1')  as HTMLFormElement).close()
    }catch(e) {
      //console.log(e)
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

 <div className="bg-base-400" >
      <div >
        <table className="table bg-gray-200 mt-2 mb-2  w-full">
          <tbody className="justify-self-auto">
            <tr>
              <td className=" w-12">
                <div className="flex content-start">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12">
                      <img src={coin1} alt="coin token" />
                    </div>
                  </div>
                </div>  
              </td>  
              <td  className="flex w-36 whitespace-normal">
              {name}
              </td>
              <td >
                <tr className="font-bold text-lg  whitespace-normal ">
                {symbol}
                </tr>
                <tr className="flex content-start whitespace-normal" >
                $0
                </tr>
              </td>
              <td>
                <tr className="font-bold text-lg">
                {data}
                </tr>
                <tr>
                $0
                </tr>
              </td> 
              <th  className="flex  content-start whitespace-normal">
                <a href={"https://testnet.bscscan.com/address/"+props.token} target="_blank" className="btn btn-ghost btn-xs">details</a>
              </th>       
            </tr>
          </tbody>
        </table>
       
      </div>
    </div>  
    </>
  )
}

export default ERC20token;

