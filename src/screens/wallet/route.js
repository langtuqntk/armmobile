import React, { Component } from 'react';
import { StackNavigator } from "react-navigation";
import Anatomy from "../anatomy/";
import CreateWallet from "./createwallet";
import ActiveWallet from "./activewallet";
import TrustAsset from "./trustasset";

export default class WalletNavigator extends Component {
  render() {
    const WalletRoute = StackNavigator(
        {
            Anatomy: { screen: (navigation) => <Anatomy {...navigation} drawerNavigation={this.props.drawerNavigation} /> },
            CreateWallet: { screen: CreateWallet },
            ActiveWallet: { screen: ActiveWallet },
            TrustAsset: { screen: TrustAsset },
        },
        {
            initialRouteName: "Anatomy",
            headerMode: "none"
        }
    );
    
    return (
      <WalletRoute />
    );
  }
}