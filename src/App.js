import './App.css';
import Header from './components/Header.js';
import NodeCard from './components/NodeCard.js';
import { SAPPHIRE_NODE, RUBY_NODE, DIAMOND_NODE } from './utils/constants';

const App = () => {
    return (
        <div className="wrapper">
            <nav id="sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                            <img alt='Logo' src="/assets/logo-small.svg.png"/>
                            <div>DeFo</div>
                    </div>
                </div>
                <ul className="list-unstyled components">
                    <li className="active">
                        <a href="#" className="sidebar-text-bold"><img alt='' src="assets/blocks.svg.png"/> NFT Pre-sale</a>
                    </li>
                    <li>
                        <a href="#" className="sidebar-text"><img alt='' src="assets/docs.svg.png"/> Docs</a>
                    </li>
                    <li>
                        <a href="#" className="sidebar-text"><img alt='' src="assets/dai.svg.png"/> Buy $DAI</a>
                    </li>
                </ul>
                <ul className="list-unstyled components">
                    <li>
                        <p className="sidebar-text-white"> Coming Soon </p>
                    </li>
                    <li>
                        <a className="isDisabled sidebar-text-bold "><img alt='' src="assets/blocks.svg.png"/> dApp Dash</a>
                    </li>
                    <li>
                        <a className="isDisabled sidebar-text"><img alt='' src="assets/logo-small.svg.png"/> Buy $DEFO</a>
                    </li>
                    <li>
                        <a className="isDisabled sidebar-text"><img alt='' src="assets/chart.svg.png"/> DEFO Chart</a>
                    </li>
                    <li>
                        <a className="isDisabled sidebar-text"> <img alt='' src="assets/calc.svg.png"/> Calculator</a>
                    </li>
                </ul>
                <div className="pin-down">
                    <ul className="list-unstyled components">
                        <li>
                            <a href="" className="sidebar-text"><img alt='' src="assets/discord.svg.png"/>Join the DEFO fam</a>
                        </li>
                        <li>
                            <a href="https://twitter.com/defoxyz" className="sidebar-text"><img alt='' src="assets/twitter.svg.png"/>
                                Follow @defoxyz</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div id="content">
                <Header></Header>
                <div className="container cards-container">
                    <div className="row d-flex justify-content-between">
                        <div className="col d-flex justify-content-center">
                            <NodeCard nodeType={SAPPHIRE_NODE}></NodeCard>
                        </div>
                        <div className="col d-flex justify-content-center">
                            <NodeCard nodeType={RUBY_NODE}></NodeCard>
                        </div>
                        <div className="col d-flex justify-content-center">
                            <NodeCard nodeType={DIAMOND_NODE}></NodeCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
