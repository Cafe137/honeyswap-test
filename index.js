import { Contract, ethers, providers } from 'ethers'
import { swapExactETHForTokens } from './interface'

const myAddress = '0x14CaCf4276a963ff3a678b0E56e5e4cc85bBb497'

const contracts = {
    UniswapV2Factory: '0xA818b4F111Ccac7AA31D0BCc0806d64F2E0737D7',
    UniswapV2Router02: '0x1C232F01118CB8B424793ae03F870aa7D0ac7f77'
}

const JSON_RPC_PROVIDER = 'https://rpc.gnosischain.com/'

const provider = new providers.JsonRpcProvider(JSON_RPC_PROVIDER)
const signer = new ethers.Wallet(process.env.FAUCET_PRIVATE_KEY, provider)

const gasLimit = 30000000

const contract = new Contract(contracts.UniswapV2Router02, swapExactETHForTokens, signer)

const WRAPPED_XDAI_CONTRACT = '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d'
const WRAPPED_ETHER_CONTRACT = '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1'
const BZZ_ON_XDAI_CONTRACT = '0xdbf3ea6f5bee45c02255b2c26a16f300502f68da'

const value = ethers.utils.parseEther('0.01') // xDAI to be swapped for xBZZ

const response = await contract.swapExactETHForTokens(
    '10000000000', // minimum xBZZ to receive, otherwise transaction reverts
    [WRAPPED_XDAI_CONTRACT, WRAPPED_ETHER_CONTRACT, BZZ_ON_XDAI_CONTRACT],
    myAddress,
    Date.now(),
    {
        value,
        gasLimit
    }
)

console.log(response)
