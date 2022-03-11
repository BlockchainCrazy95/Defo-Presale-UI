import Contract from 'web3-eth-contract';
import * as dotenv from 'dotenv';
import Web3 from 'web3';

import RubyABI from '../contracts/RubyNode.json';
import { RPC_URL, RubyContractAddress as contractAddress } from './constants';

dotenv.config();

const CHAIN_ID = 43113 //process.env.CHAIN_ID

console.log("RubyUtils: CHAIN_ID = ", CHAIN_ID)

/// Read Functions for Smart Contract

export const getMaxTotalNodes = async () => {
    Contract.setProvider(RPC_URL[CHAIN_ID])
    const contract = new Contract(RubyABI, contractAddress)
    try {
        const res = await contract.methods.maxTotalRubyNodes().call()
        return {
            success: true,
            status: res
        }
    } catch(err) {
        return {
            success: false,
            status: err.message
        }
    }
}

export const getTotalSupply = async () => {
    Contract.setProvider(RPC_URL[CHAIN_ID])
    const contract = new Contract(RubyABI, contractAddress)
    try {
        const res = await contract.methods.totalSupply().call()
        return {
            success: true,
            status: res
        }
    } catch(err) {
        return {
            success: false,
            status: err.message
        }
    }
}

export const getApproved = async (tokenId) => {
    Contract.setProvider(RPC_URL[CHAIN_ID])
    const contract = new Contract(RubyABI, contractAddress)
    try {
        const res = await contract.methods.getApproved(tokenId).call()
        return {
            success: true,
            status: res
        }
    } catch(err) {
        return {
            success: false,
            status: err.message
        }
    }
}

export const getPrice = async () => {
    Contract.setProvider(RPC_URL[CHAIN_ID])
    const contract = new Contract(RubyABI, contractAddress)
    try {
        const res = await contract.methods.getPrice().call()
        return {
            success: true,
            status: res
        }
    } catch(err) {
        return {
            success: false,
            status: err.message
        }
    }
}

export const getIsApprovedForAll = async (owner, operator) => {
    Contract.setProvider(RPC_URL[CHAIN_ID])
    const contract = new Contract(RubyABI, contractAddress)
    try {
        const res = await contract.methods.isApprovedForAll(owner, operator).call()
        return {
            success: true,
            status: res
        }
    } catch(err) {
        return {
            success: false,
            status: err.message
        }
    }
}

export const getMaxNodesPerWallet = async () => {
    Contract.setProvider(RPC_URL[CHAIN_ID])
    const contract = new Contract(RubyABI, contractAddress)
    try {
        const res = await contract.methods.maxNodesPerWallet().call()
        return {
            success: true,
            status: res
        }
    } catch(err) {
        return {
            success: false,
            status: err.message
        }
    }
}

export const getOwnerOf = async ( tokenId ) => {
    Contract.setProvider(RPC_URL[CHAIN_ID])
    const contract = new Contract(RubyABI, contractAddress)
    try {
        const res = await contract.methods.ownerOf(tokenId).call()
        return {
            success: true,
            status: res
        }
    } catch(err) {
        return {
            success: false,
            status: err.message
        }
    }
}

export const getTokenURI = async ( tokenId ) => {
    Contract.setProvider(RPC_URL[CHAIN_ID])
    const contract = new Contract(RubyABI, contractAddress)
    try {
        const res = await contract.methods.tokenURI(tokenId).call()
        return {
            success: true,
            status: res
        }
    } catch(err) {
        return {
            success: false,
            status: err.message
        }
    }
}

export const getRubySaleStatus = async () => {
    Contract.setProvider(RPC_URL[CHAIN_ID])
    const contract = new Contract(RubyABI, contractAddress)
    try {
        const res = await contract.methods.activeSale().call()
        return {
            success: true,
            status: res
        }
    } catch(err) {
        return {
            success: false,
            status: err.message
        }
    }
}

export const getRubyUserBalance = async ( account ) => {
    Contract.setProvider(RPC_URL[CHAIN_ID])
    const contract = new Contract(RubyABI, contractAddress)
    try {
        const res = await contract.methods.balanceOf(account).call()
        return {
            success: true,
            status: res
        }
    } catch(err) {
        return {
            success: false,
            status: err.message
        }
    }
}

/// Write Functions for Smart Contract
export const mintNode = async (library, account, amount = 1) => {
    let contract;
    let web3;
    if(library)
    {
        web3 = new Web3(library)
        contract = await new web3.eth.Contract(RubyABI, contractAddress)
    } else {
        Contract.setProvider(RPC_URL[CHAIN_ID])
        contract = new Contract(RubyABI, contractAddress)
    }
    
    try {
        const res = await contract.methods.mintNode(amount).send({
            from: account
        })
        console.log("mintNode: res = ", res)
        return {
            success: true,
            status: ""
        }
    } catch(err) {
        return {
            success: false,
            status: err.message
        }
    }
}