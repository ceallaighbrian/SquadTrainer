import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Navigator} from 'react-native';


export default class Main extends React.Component{

  constructor(){
    super();

  }

  handleSubmit(){
    this.props.navigator.push({
      title: 'Warm Up', // Matches route.name
    })
  }


  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cooraclare</Text>
        <Text>Workout Name</Text>
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit.bind(this)} >
          <Text style={styles.buttonText}>Begin Workout</Text>
        </TouchableHighlight>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#48BBEC',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#00008B'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
});
