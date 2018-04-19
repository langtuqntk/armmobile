import React, { Component } from "react";
import { Image } from 'react-native';
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
  CardItem
} from "native-base";
import { AsyncStorage } from "react-native";
import {USER_KEY} from "../../utils/auth";

import styles from "./styles";

class Anatomy extends Component {

  state = {
    wallet: '',
    wallets: [],
    assets: []
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
              this.setState({wallet: responseJson.result[0].address,wallets: responseJson.result, assets: responseJson.result[0].balances});
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
      assets: filterObj[0].balances
    });
    
  }
  
  render() {
    const {wallets, assets} = this.state;

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
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
                  <Image source={{uri: item.logo}} style={{height: 200, width: null, flex: 1}}/>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent>
                      <Icon active name="pie" />
                      <Text>{item.asset_code}</Text>
                    </Button>
                  </Left>
                  <Right>
                    <Text>{item.balance}</Text>
                  </Right>
                </CardItem>
              </Card>  
            )
          }
          
        </Content>

        <Footer>
          <FooterTab>
            <Button active full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Anatomy;
