import * as dotenv from "dotenv";
import { useState, useEffect, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from 'ethers'
import { injected } from "../components/wallet/Connectors";
import Web3 from "web3";
import { RPC_URL } from "./constants";

dotenv.config();

const CHAIN_ID = 43113 // process.env.CHAIN_ID
console.log("process.env.chainId = ", CHAIN_ID)

export const changeNetwork = async () => {
    if(window.ethereum) {
        console.log("changeNetwork: chainId = ", CHAIN_ID)
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Web3.utils.toHex(CHAIN_ID)}]
            })
        } catch(err) {
            if(err.code === 4902) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainName: 'Avalanche',
                            chainId: Web3.utils.toHex(CHAIN_ID),
                            nativeCurrency: {
                                name: 'AVAX',
                                decimals: 18,
                                symbol: 'AVAX'
                            },
                            rpcUrls: RPC_URL[CHAIN_ID]
                        }
                    ]
                })
            }
        }
    }
}
