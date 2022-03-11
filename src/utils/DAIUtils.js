import Contract from 'web3-eth-contract';
import * as dotenv from 'dotenv';
import Web3 from 'web3';
import { ethers } from 'ethers'

import DaiABI from '../contracts/DAI.json';
import { RPC_URL, DaiContractAddress as contractAddress } from './constants';

dotenv.config();

const CHAIN_ID = 43113 //process.env.CHAIN_ID

console.log("DaiUtils: CHAIN_ID = ", CHAIN_ID)

export const approve = async (library, account, spender, amount) => {
    const web3 = new Web3(library)
    const contract = await new web3.eth.Contract(DaiABI, contractAddress)
    try {
        const parsedAmount = ethers.utils.parseEther(amount)
        console.log("parsedAmount = ", parsedAmount)
        const res = await contract.methods.approve(spender, parsedAmount).send({
            from: account
        })
        console.log("approve: res = ", res)
        return {
            success: true,
            status: ""
        }
    } catch (err) {
        return {
            success: false,
            status: err.message
        }
    }
}