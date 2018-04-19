import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Text
} from "native-base";
import styles from "./styles";

class Stacked extends Component {

  state = {
    code: '',
    token: ''
  }

  returnData(code) {
    this.setState({code});
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.state.code !== nextState.code) {
      fetch('http://10.0.3.2:8443/oauth/token', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          client_id: '5ad59d978b0b311bd73b11d9',
          client_key: 'Q6A0LNMfXd3vfblxpY20t9UnUg2B4jZp',
          code: nextState.code,
          redirect_uri: 'http://test-langtuqntk.c9users.io:8080/getToken'
        }),
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          this.setState({code: nextState.code, token: responseJson.result.access_token});
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Stacked Label</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>{this.state.code}</Text>
          <Button block style={{ margin: 15, marginTop: 50 }} onPress={() => this.props.navigation.navigate('ArmLogin', {returnData: this.returnData.bind(this)})}>
            <Text>Sign In</Text>
          </Button>
          <Text>{this.state.token}</Text>
        </Content>
      </Container>
    );
  }
}

export default Stacked;
