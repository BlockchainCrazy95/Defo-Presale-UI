import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import './NodeCard.scss';
import {
    SAPPHIRE_NODE,
    RUBY_NODE,
    DIAMOND_NODE,
    NODE_INFOS,
    SapphireContractAddress,
    RubyContractAddress,
    DiamondContractAddress
} from '../utils/constants'
import { 
    getNodeInfo,
    getAccountInfo
} from '../utils'
import { mintNode as mintSapphireNode } from '../utils/SapphireContractUtils';
import { mintNode as mintRubyNode } from '../utils/RubyContractUtils';
import { mintNode as mintDiamondNode } from '../utils/DiamondContractUtils';
import { approve } from '../utils/DAIUtils';

const NodeCard = ({ nodeType }) => {
    const { account, active, library } = useWeb3React()
    const { name, symbol, rewardRate, maintenanceFee } = NODE_INFOS[nodeType]
    const [maxTotalNodes, setMaxTotalNodes] = useState(0)
    const [totalSupply, setTotalSupply] = useState(0)
    const [price, setPrice] = useState(0)
    const [maxPerWallet, setMaxPerWallet] = useState(0)
    const [balance, setBalance] = useState(0)
        
    useEffect(() => {
        const loadInfo = async () => {
            const res = await getNodeInfo(nodeType);
            console.log("loadInfo: res = ", res)
            if(res) {
                setMaxTotalNodes(res.maxTotalNodes)
                setTotalSupply(res.totalSupply)
                setPrice(res.price)
                setMaxPerWallet(res.maxPerWallet)
            }
        }
        loadInfo()
    }, [])
    useEffect(() => {
        if(account) {
            const loadAccountInfo = async () => {
                const res = await getAccountInfo(nodeType, account);
                console.log("loadAccountInfo: res = ", res)
                if(res) {
                    setBalance(res.balance)
                }
            }
            loadAccountInfo()
        }
    }, [account])

    const getPriceInfo = () => {
        const limit = maxTotalNodes / 3
        if(totalSupply < limit) {
            return `10% PRICE DECERASE PRICE BEFORE ${limit} NODES`
        } else if(totalSupply >= limit * 2){
            return `10% PRICE INCREASE AFTER ${limit*2} NODES`
        }
    }

    const onMintNode = async () => {
        if(!account) {
            alert("Please Connect Wallet!!!")
            return;
        }
        let contractAddress;
        if(nodeType === SAPPHIRE_NODE)
            contractAddress = SapphireContractAddress
        else if(nodeType === RUBY_NODE)
            contractAddress = RubyContractAddress
        else if(nodeType === DIAMOND_NODE)
            contractAddress = DiamondContractAddress
        let res = await approve(library, account, contractAddress, price)
        console.log("approve: res = ", res)
        if(!res.success){
            alert(res.status);
            return;
        }
        if(nodeType === SAPPHIRE_NODE)
            res = await mintSapphireNode(library, account, 1)
        else if(nodeType === RUBY_NODE)
            res = await mintRubyNode(library, account, 1)
        else if(nodeType === DIAMOND_NODE)
            res = await mintDiamondNode(library, account, 1)
        console.log("onMintNode: res = ", res)
        if(res.success) {
            alert("Successfully minted");
            setBalance(parseInt(balance) + 1)
            setTotalSupply(parseInt(totalSupply) + 1)
        } else {
            alert(res.status);
            return;
        }
    }

    return (
        <div className="container">
            <div className="node-title-container text-center">
                <p className="node-title">{`${name}`}</p>
            </div>
            <div className="card1 text-center border-0">
                <div className="card-body row-top ">
                    <p className="card-text card-text-top">NODES SUPPLY</p>
                    <p className="card-text card-text-left"> {`${maxTotalNodes - totalSupply} LEFT`}</p>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar">
                        </div>
                    </div>
                    <p className="card-subtitle card-text-minted mb-2">{`${totalSupply} MINTED`}</p>
                </div>
            
                <div className="card-body mid-row alt-row">
                    <p className="card-text card-text-top">REWARD RATE</p>
                    <div className="card-text-box-container">
                        <div className='card-text-box'> {`${rewardRate} DEFO PER WEEK`}</div>
                    </div>
                </div>
            
                <div className="card-body mid-row">
                    <p className="card-text card-text-top">MAINTENANCE FEE</p>
                    <div className="card-text-box-container">
                        <div className='card-text-box'>{`${maintenanceFee} DAI PER MONTH`}</div>
                    </div>
                </div>
            
                <div className="card-body alt-row alt-row-end">
                    <p className="card-text card-text-top">CURRENT PRICE</p>
                    <div className="card-text-box-container">
                        <div className='card-text-box'>{`${price} DAI`}</div>
                    </div>
                    <div className='price-increase-container'>
                        <div className='price-increase'>{getPriceInfo()}</div>
                    </div>
                </div>
            </div>
            
            <div className="text-center border-0 over-card">
                <button className="under-card mint-button" onClick={onMintNode}>MINT NODE</button>
            </div>
            
            <div className="nodes-owned-container text-center">
                <p className="text-secondary nodes-owned">{`${balance} of ${maxPerWallet} nodes owned`}</p>
            </div>
        </div>
    );
}

export default NodeCard;
