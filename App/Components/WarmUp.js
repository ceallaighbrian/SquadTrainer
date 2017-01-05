import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Navigator} from 'react-native';
import {workout} from "../workout/workout";


type State = {
  workout: Object,
  exercise: number,
  section: number,
  sessionTime: number,
  countDownTime: number,
  timerId: number,
  finishedWarmUp: number
}

export default class WarmUp extends React.Component{

  state: State;

  constructor(){
    super();
    this.state = {
      workout: workout,
      exercise: 0,
      section: 0,
      sessionTime: 0,
      countDownTime: 5,
      timerId: 0,
      finishWarmUp: false
    }
  }


  handleSubmit(){
    let {workout, exercise, section} = this.state;
    let exe = getCurrentExercise(workout, exercise);

    console.log(exe.sections.length-1);
    console.log(section);
    if (this.state.finishedWarmUp) {
      this.props.navigator.push({
        title: 'Weights',
        passProps: {
          sessionTime: this.state.sessionTime
        }
      })
    }
    else if (section === exe.sections.length-2){
      let timerId = setInterval(() => this.setState({countDownTime: this.state.countDownTime - 1}), 1000);
      this.setState({countDownTime: exe.sections[section+1].duration});
      this.setState({section: section+1});
      this.setState({timerId : timerId});
      this.setState({finishedWarmUp: true})
    }
    else if(section < exe.sections.length-1){
      let timerId = setInterval(() => this.setState({countDownTime: this.state.countDownTime - 1}), 1000);
      this.setState({countDownTime: exe.sections[section+1].duration});
      this.setState({section: section+1});
      this.setState({timerId : timerId});
    }
  }



  componentWillMount() {
    setInterval(() => this.setState({sessionTime: this.state.sessionTime + 1}), 1000);

    let timerId = setInterval(() => this.setState({countDownTime: this.state.countDownTime - 1}), 1000);
    this.setState({timerId : timerId});

  }

  componentDidUpdate(){
    let {workout, exercise, section, sessionTime, countDownTime, timerId} = this.state;
    let exe = getCurrentExercise(workout, exercise);

    if (countDownTime === 0) {
      clearInterval(timerId);
    }

  }


  render(){
    let {workout, exercise, section, sessionTime, countDownTime} = this.state;
    let exe = getCurrentExercise(workout, exercise);

    let displayButton;

    //if warmup finished display different button
    if (this.state.finishedWarmUp){
        displayButton = (
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit.bind(this)} >
          <Text style={styles.buttonText}>Start Workout</Text>
        </TouchableHighlight>
        )
    }
    else {
      displayButton = (
      <View>
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit.bind(this)} >
          <Text style={styles.buttonText}>Start Next Exercise</Text>
        </TouchableHighlight>
        <Text>Next Exercise: {exe.sections[section+1].name}</Text>
      </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Current Session Time: {sessionTime}</Text>
        <Text style={styles.title}>Exercise Section: {exe.name} {section+1} / {exe.sections.length}</Text>
        <Text style={styles.title}>Exercise: {exe.sections[section].name}</Text>
        <Text style={styles.title}>Time Left: {countDownTime}</Text>
        <View>
          {displayButton}
        </View>
      </View>
    )
  }
}



function getCurrentExercise(workout, exercise) {
  return workout.exercises[exercise];
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
