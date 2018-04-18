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
import {WebView} from 'react-native';
import styles from "./styles";

class Stacked extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    };
  }  
  _onNavigationStateChange(webViewState){
    if(/getToken/i.test(webViewState.url) && this.state.url !== webViewState.url) {
      this.setState({url: webViewState.url});
      const index = webViewState.url.indexOf('code=');
      const code = index > -1 ? webViewState.url.substr(index + 5, webViewState.url.length - 1) : 'access_denied';
      console.log(code);
      this.props.navigation.navigate('ArmLogin', {code});
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
        <WebView
          ref={webview => (this.webview = webview)}
          source={{uri: 'https://stg.arm-system-holdings.com/oauth/authorize?response_type=code&scope=BASIC_ACCESS&client_id=5ad59d978b0b311bd73b11d9'}}
          style={{marginTop: 20}}
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
        />
      </Container>
    );
  }
}

export default Stacked;
