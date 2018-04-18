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

class ArmLogin extends Component {

  componentDidMount() {
    console.log(this.props.navigation.state.params.code);
    fetch('https://stg.arm-system-holdings.com/oauth/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: '5ad59d978b0b311bd73b11d9',
        client_key: 'Q6A0LNMfXd3vfblxpY20t9UnUg2B4jZp',
        code: this.props.navigation.state.params.code,
        redirect_uri: 'http://test-langtuqntk.c9users.io:8080/getToken'
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
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
            <Title>Arm Login</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>{this.props.navigation.state.params.code}</Text>
        </Content>
      </Container>
    );
  }
}

export default ArmLogin;
