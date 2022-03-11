import { SAPPHIRE_NODE, RUBY_NODE, DIAMOND_NODE } from "./constants"
import {
    getMaxTotalNodes as getSapphireMaxTotalNodes,
    getPrice as getSapphirePrice,
    getTotalSupply as getSapphireTotalSupply,
    getSapphireUserBalance,
    getMaxNodesPerWallet as getSapphireMaxNodesPerWallet
} from './SapphireContractUtils'
import {
    getMaxTotalNodes as getRubyMaxTotalNodes,
    getPrice as getRubyPrice,
    getTotalSupply as getRubyTotalSupply,
    getRubyUserBalance,
    getMaxNodesPerWallet as getRubyMaxNodesPerWallet
} from './RubyContractUtils'
import {
    getMaxTotalNodes as getDiamondMaxTotalNodes,
    getPrice as getDiamondPrice,
    getTotalSupply as getDiamondTotalSupply,
    getDiamondUserBalance,
    getMaxNodesPerWallet as getDiamondMaxNodesPerWallet
} from './DiamondContractUtils'

export const getNodeInfo = (nodeType) => {
    if(nodeType === SAPPHIRE_NODE)
        return getSapphireNodeInfo()
    else if(nodeType === RUBY_NODE)
        return getRubyNodeInfo()
    else if(nodeType === DIAMOND_NODE)
        return getDiamondNodeInfo()
}

export const getAccountInfo = (nodeType, account) => {
    if(nodeType === SAPPHIRE_NODE)
        return getSapphireAccountInfo(account)
    else if(nodeType === RUBY_NODE)
        return getRubyAccountInfo(account)
    else if(nodeType === DIAMOND_NODE)
        return getDiamondAccountInfo(account)
}

export const getSapphireNodeInfo = async () => {
    const resMaxNodes = await getSapphireMaxTotalNodes()
    const resTotal = await getSapphireTotalSupply()
    const resPrice = await getSapphirePrice()
    const resMaxPerWallet = await getSapphireMaxNodesPerWallet()
    return {
        maxTotalNodes: resMaxNodes.success ? resMaxNodes.status : 0,
        totalSupply: resTotal.success ? resTotal.status : 0,
        price: resPrice.success ? resPrice.status : 0,
        maxPerWallet: resMaxPerWallet.success ? resMaxPerWallet.status : 0
    }
}

export const getSapphireAccountInfo = async (account) => {
    const resUserBalance = await getSapphireUserBalance(account)
    return {
        balance: resUserBalance.success ? resUserBalance.status : 0
    }
}

export const getRubyNodeInfo = async () => {
    const resMaxNodes = await getRubyMaxTotalNodes()
    const resTotal = await getRubyTotalSupply()
    const resPrice = await getRubyPrice()
    const resMaxPerWallet = await getRubyMaxNodesPerWallet()
    return {
        maxTotalNodes: resMaxNodes.success ? resMaxNodes.status : 0,
        totalSupply: resTotal.success ? resTotal.status : 0,
        price: resPrice.success ? resPrice.status : 0,
        maxPerWallet: resMaxPerWallet.success ? resMaxPerWallet.status : 0
    }
}

export const getRubyAccountInfo = async (account) => {
    const resUserBalance = await getRubyUserBalance(account)
    return {
        balance: resUserBalance.success ? resUserBalance.status : 0
    }
}

export const getDiamondNodeInfo = async () => {
    const resMaxNodes = await getDiamondMaxTotalNodes()
    const resTotal = await getDiamondTotalSupply()
    const resPrice = await getDiamondPrice()
    const resMaxPerWallet = await getDiamondMaxNodesPerWallet()
    return {
        maxTotalNodes: resMaxNodes.success ? resMaxNodes.status : 0,
        totalSupply: resTotal.success ? resTotal.status : 0,
        price: resPrice.success ? resPrice.status : 0,
        maxPerWallet: resMaxPerWallet.success ? resMaxPerWallet.status : 0
    }
}

export const getDiamondAccountInfo = async (account) => {
    const resUserBalance = await getDiamondUserBalance(account)
    return {
        balance: resUserBalance.success ? resUserBalance.status : 0
    }
}

export const ellipseAddress = (address = '', width = 4) => {
    if(!address)
        return ''
    return `${address.slice(0, width)}...${address.slice(-width)}`
}