import React, { useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";
import { injected } from './wallet/Connectors';
import { ellipseAddress } from '../utils';
import './Header.scss';
import { changeNetwork } from '../utils/hooks';


const Header = () => {
  const { active, account, activate, deactivate, chainId } = useWeb3React();

  const connect = async () => {
    try {
      await activate(injected)
      console.log("connect: chainId = ", chainId)
      if(chainId === undefined) {
        changeNetwork()
      }
      localStorage.setItem('isWalletConnected', true)      
    } catch (err) {
      console.log(err)
    }
  }

  const disconnect = async () => {
    try {
      deactivate()
      localStorage.setItem('isWalletConnected', false)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      console.log("isWalletConnected:", localStorage.getItem('isWalletConnected'))
      if(localStorage?.getItem('isWalletConnected') === 'true') {
        connect()
      }
    }
    connectWalletOnPageLoad()
  }, [])

  return (
    <div className="container header-top">
      <div className="float-left">
        <div className="d-flex  justify-content-between align-items-center">
          <ul>
            <li><h5 className="mt-2 text-white welcome">Welcome to the DEFO NFT Pre-Sale</h5></li>
            <li><p className="text-secondary welcome-read">Make sure to read the pre-sale details before you buy</p></li>
          </ul>
          { active ? 
            <button type="button" className="btn btn-warning connect-button" onClick={disconnect}>{ellipseAddress(account)}</button> :
            <button type="button" className="btn btn-primary connect-button mybutton" onClick={connect}>CONNECT WALLET</button>
          }
        </div>
      </div>
    </div>
  );
}

export default Header;