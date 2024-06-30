import { createWalletClient,http,custom, createPublicClient } from 'viem';
import { bscTestnet } from 'viem/chains';
//import { privateKeyToAccount } from 'viem/accounts'

export const walletClient = createWalletClient({
  chain: bscTestnet,
  transport: custom(window.ethereum!),
})


export const publicClient = createPublicClient({
  chain: bscTestnet,
  transport: http(),
})


//export const [account] = await walletClient.getAddresses()



//export const [account] = await walletClient.getAddresses();


