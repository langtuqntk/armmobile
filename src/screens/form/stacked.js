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
import { onSignIn } from "../../utils/auth";

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
          this.setState({code: nextState.code, token: responseJson.success ? responseJson.result.access_token : responseJson.error.errorMessage});
          onSignIn(this.state.token).then(() => this.props.navigation.navigate("SignedIn"));;
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
          <Body>
            <Title>Stacked Label</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Button block style={{ margin: 15, marginTop: 50 }} onPress={() => this.props.navigation.navigate('ArmLogin', {returnData: this.returnData.bind(this)})}>
            <Text>Sign In</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Stacked;
