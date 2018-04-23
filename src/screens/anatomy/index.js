import React, { Component } from "react";
import { Image, View } from 'react-native';
import AppLink from 'react-native-app-link';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Picker,
  Card,
  CardItem,
  Fab,
  IconNB
} from "native-base";
import { AsyncStorage } from "react-native";
import {USER_KEY} from "../../utils/auth";

import styles from "./styles";
const armcoinImg = require("../../../assets/ARMCOIN.png");

class Anatomy extends Component {

  state = {
    wallet: '',
    wallets: [],
    assets: [],
    selectedWallet: {},
    active: false,
    qrcode: ''
  }

  assetStatus = {
		STATUS_PENDING: 1,
		STATUS_REJECTED: 2,
		STATUS_ACCEPTED: 3
  };
  

  returnData(code) {
    this.setState({qrcode});
    console.warn(this.state.qrcode);
  }

  getAssetStatus =  (asset, lastRequestTrustAsset) => {
		var assetStatus = 3;
		if (!asset || !lastRequestTrustAsset || lastRequestTrustAsset.length === 0) return assetStatus;
		for (var i = 0; i < lastRequestTrustAsset.length; i++) {
			if (asset._id === lastRequestTrustAsset[i].requestID.assetID) assetStatus = lastRequestTrustAsset[i].requestID.status;
		}
		return assetStatus;
	}

  componentDidMount() {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          fetch('https://stg-api.arm-system-holdings.com/rpc', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: "get_all_user_wallets",
							params: {
								with_assets: true
							},
              token: res
            }),
          }).then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);
              this.setState({wallet: responseJson.result[0].address,wallets: responseJson.result, assets: responseJson.result[0].balances, selectedWallet: responseJson.result[0]});
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.log(false);
        }
      })
      .catch(err => console.log(err));
  }

  onValueChange(value) {
    var filterObj = this.state.wallets.filter(function(e) {
      return e.address === value;
    });
    console.log(filterObj);
    this.setState({
      wallet: value,
      assets: filterObj[0].balances,
      selectedWallet: filterObj[0]
    });
  }

  openAuthendicator() {
    AppLink.maybeOpenURL('otpauth://totp/Armcore:chinh05100?secret=XBGXXJODO6CAQZY4', { playStoreId: 'com.google.android.apps.authenticator2' }).then(() => {
      // do stuff
    })
    .catch((err) => {
      // handle error
    });
  }

  render() {
    const {wallets, assets, selectedWallet} = this.state;

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.drawerNavigation.navigate("DrawerOpen")}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Wallet</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Picker
              mode="dropdown"
              iosHeader="Ví"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: undefined }}
              selectedValue={this.state.wallet}
              onValueChange={this.onValueChange.bind(this)}>
              {
                wallets.map((item,i) => <Picker.Item key={i} label={item.name + ' - ' + item.address} value={item.address} />)
              }
          </Picker>

          {
            assets.map((item,i) =>
              <Card key={i}>
                <CardItem cardBody>
                {
                  item.logo ? <Image source={{uri: item.logo}} style={{height: 200, width: null, flex: 1}}/> :
                    <Image source={armcoinImg} style={{height: 200, width: null, flex: 1}}/>
                }

                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent>
                      <Icon active name="pie" />
                      <Text>{item.balance} {item.asset_code || 'ARMCOIN'}</Text>
                    </Button>
                  </Left>
                  <Right>
                    {
                        this.assetStatus.STATUS_ACCEPTED == this.getAssetStatus(item, selectedWallet.lastRequestTrustAsset) ? <Icon type="Ionicons" name="md-checkbox" style={{ color: "#3c763d" }} /> :
                        this.assetStatus.STATUS_REJECTED == this.getAssetStatus(item, selectedWallet.lastRequestTrustAsset) ? <Icon type="Ionicons" name="md-close-circle" style={{ color: "red" }} /> :
                        <Icon active name="alarm" style={{ color: "#8a6d3b" }}/>
                    }
                  </Right>
                </CardItem>
              </Card>
            )
          }
        </Content>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#5067FF" }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}
        >
          <Icon type="Ionicons" name="md-add-circle"/>
          <Button style={{ backgroundColor: "#34A34F" }} onPress={() => this.props.navigation.navigate('TrustAsset')}>
            <Icon type="Ionicons" name="logo-bitcoin"/>
          </Button>
          <Button style={{ backgroundColor: "#3B5998" }} onPress={this.openAuthendicator.bind(this)}>
            <Icon type="Ionicons" name="md-card"/>
          </Button>
          <Button disabled style={{ backgroundColor: "#DD5144" }}>
            <Icon type="Ionicons" name="md-cash"/>
          </Button>
        </Fab>
      </Container>
    );
  }
}

export default Anatomy;
