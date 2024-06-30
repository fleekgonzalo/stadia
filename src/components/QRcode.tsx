import { useEffect, useState } from 'react';
import qrcode from 'qrcode';


type Props = {
  wallet: string; //wallet address
};


export default function QRcode(props: Props) {

  const [url, setUrl] = useState<any>("")

  useEffect(() => {
    
      qrcode.toDataURL(props.wallet+"", function (err:any, url:any) {
        console.log(url,err)
        setUrl(url)
      })

   }, []);


  return (
    <>
     <div className="mask mask-squircle w-48 h-48 mx-auto">
        <img src={url} alt="QRcode" />
     </div>        
    </>
  )
}