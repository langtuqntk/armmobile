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

class ArmLogin extends Component {
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
      this.props.navigation.state.params.returnData(code);
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <WebView
        ref={webview => (this.webview = webview)}
        source={{uri: 'http://10.0.3.2:8443/oauth/authorize?response_type=code&scope=USER_PROLILE,WALLET_INFO&client_id=5ad59d978b0b311bd73b11d9'}}
        style={{marginTop: 20}}
        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
      />
    );
  }
}

export default ArmLogin;
