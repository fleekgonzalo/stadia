import  { useEffect, useState } from 'react';
import { publicClient } from './config';
import 'viem/window';
import { IPFSabi } from '../IPFSabi';
import maskAddress from './util.ts';

function BrowseIPFS() {
 
  const [html, setHTML] = useState<any>("")

  useEffect(() => {
    //init();

   });

  
  const CONTRACT_IPFS = '0x4901a36B47e392a39eE6e4D198343a154FFa0799'
 
  const init = async () => {
  
    (document.getElementById('my_modal_1') as HTMLFormElement).showModal();
        
   try {
    	
   let i: any = await publicClient.readContract({
      address: CONTRACT_IPFS,
      abi: IPFSabi,
      functionName: 'totalDweets'
    })

   //var rows = [];
   var _json = [];
   let _data: any;
   
    while (i > 0) {
      _data = await publicClient.readContract({
        address: CONTRACT_IPFS,
        abi: IPFSabi,
        functionName: 'getDweet',
        args: [i]
      })

      const myBigInt = BigInt(_data[3]);
      const myNumber = Number(myBigInt);
      const date= new Date(myNumber*1000);
      const dateFormat = date.toLocaleTimeString("en-US") + ", "+ date.toLocaleDateString("en-US");

      _json.push({id: Number(i), wallet: _data[0], date:dateFormat, likes:Number(_data[4]), hash:"https://fuchsia-broken-goat-339.mypinata.cloud/ipfs/"+_data[1]});
      //rows.push.apply(rows, _data);
/*
     
      console.log(_data[0]); //wallet address
      console.log("https://fuchsia-broken-goat-339.mypinata.cloud/ipfs/"+_data[1]); // ipfs hash
      console.log(_data[2]); //comment
      console.log(dateFormat); //timestamp
      console.log(_data[4]); //likes
      console.log("---------------------");
*/
    
      i--;
    }
    //setData(_info)
    console.log(_json);
    console.log(_json[0].hash);
    console.log(_json.length); // from 0 use -1 in loop    
    //setHTML(_json)

    const arrayDataItems: any = _json.map((file) => 
      <div className="card m-4 w-80 shadow  mx-auto  ">
        <figure>
          <img src={file.hash} alt="nft" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">post #{file.id}</h2>
          <p>{file.date}</p>
          <p>posted by {maskAddress(file.wallet)}</p>
          <p>likes {file.likes}</p>
        </div>

      </div>);    
    
    setHTML(arrayDataItems);

    (document.getElementById('my_modal_1') as HTMLFormElement).close();

    } catch(e) {
      //console.log(e)
       (document.getElementById('my_modal_1') as HTMLFormElement).close();
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

         <div className="card card-compact  p-4 mx-auto text-center w-180 shadow-xl  bg-base-200">
            {html}
           
           <button   className="btn btn-primary w-24  mx-auto"  onClick={init} >
              load
            </button>           
    

        </div>
           
        
      </>
    )
 
}

export default BrowseIPFS;




/*

<JsonToTable json={html} />

      {data.map((record) => {
                    return (
                      <th key={record.id}>
                        
                      </th>
                    );
                  })}

*/
