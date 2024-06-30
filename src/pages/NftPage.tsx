import Layout from '../components/Layout'
import ERC721token from '../components/ERC721token'

export default function NftPage() {
  const TOKEN_NFT = '0x4918A0D79a3B56e7EF78fD645858C895A6dD3EC6'
 
  return (
    <Layout>
     
        <ERC721token token={TOKEN_NFT}  />  
           
    </Layout>
  )
}