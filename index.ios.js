/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Main from './App/Components/Main';
import WarmUp from './App/Components/WarmUp';
import Weights from './App/Components/Weights';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

export default class squadTrainerMobile extends Component {

  constructor(){
    super();

  }

  renderScene(route, navigator) {
    if(route.title == 'Home') {
      return <Main navigator={navigator} />
    }
    if(route.title == 'Warm Up') {
      return <WarmUp navigator={navigator} {...route.passProps} />
    }
    if(route.title == 'Weights') {
      return <Weights navigator={navigator} {...route.passProps} />
    }
  }

  render() {
    return (
      <Navigator
      initialRoute={{
        title: 'Home',
        index: 0
      }}
      renderScene= { this.renderScene }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('squadTrainerMobile', () => squadTrainerMobile);
