import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Navigator, Picker} from 'react-native';
import {workout} from "../workout/workout";

const Item = Picker.Item;

type State = {
  workout: Object,
  exercise: number,
  set: number,
  rest: boolean,
  restTime: number,
  sessionTime: number
}

export default class Weights extends React.Component{

  state: State;
  constructor(props){

    super(props);
    this.changeView = this.changeView.bind(this);
    this.state = {
      workout: workout,
      exercise: 1,
      set: 0,
      rest: false,
      restTime: 30,
      sessionTime: this.props.sessionTime
    }

    console.log(this.props)
  }

  componentWillMount() {
    setInterval(() => this.setState({sessionTime: this.state.sessionTime + 1}), 1000);
  }

  handleTouch(){
    let {workout, exercise, set} = this.state;
    let exe = getCurrentExercise(workout, exercise);

    //update sets and set rest to true
    if (set < exe.sets.length-1){

      this.setState({set: set+1});
      this.setState({rest: true});
      this.setState({restTime: exe.sets[set].rest});
    }
    else if (set === exe.sets.length-1  && exercise < workout.exercises.length-1){
      this.setState({rest: true});
      this.setState({exercise: exercise+1});
      this.setState({set: 0});
    }
  }

  changeView(){
    this.setState({
      rest: false
    })
  }

  render(){
    let {workout, exercise, set} = this.state;
    let exe = getCurrentExercise(workout, exercise);

    let currentDisplay;

    if (this.state.rest) {
      currentDisplay = (
        <View>
          <Rest time={this.state.restTime} updateView={this.changeView}/>
          <Text style={styles.title}>Next Exercise</Text>
          <Text>Exercise: {exe.name}</Text>
          <Text >Weight: {exe.sets[set].weight}kg</Text>
          <Text >Reps: {exe.sets[set].reps}</Text>
        </View>
      )
    }
    else {
      currentDisplay = (
        <View >
          <Text style={styles.title}>Exercise Section: {exe.name} {set+1} / {exe.sets.length}</Text>
          <Text style={styles.title}>Weight: {exe.sets[set].weight}kg</Text>
          <Text style={styles.title}>Reps: {exe.sets[set].reps}</Text>
          <TouchableHighlight
            style={styles.button}
            underlayColor="white"
            onPress={this.handleTouch.bind(this)}>
            <Text style={styles.buttonText}>Finshed</Text>
          </TouchableHighlight>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Current Session Time: {this.state.sessionTime}</Text>
        {currentDisplay}
        </View>
    )
  }

}




class Rest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timerId: 0,
      restTime: this.props.time,
      value: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    let timerId = setInterval(() => this.setState({restTime: this.state.restTime - 1}), 1000);
    this.setState({timerId : timerId});
  }

  componentDidUpdate(){
    if (this.state.restTime === 0 ) {
      this.props.updateView();
      clearInterval(this.state.timerId);
      this.setState({restTime: -1})
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Please select the number of reps:</Text>
        <Picker
          style={styles.picker}
          selectedValue={this.state.selected1}
          onValueChange={this.onValueChange.bind(this, 'selected1')}>
          <Item label="5" value="5" />
          <Item label="6" value="6" />
          <Item label="7" value="7" />
          <Item label="8" value="8" />
          <Item label="9" value="9" />
          <Item label="10" value="10" />
          <Item label="11" value="11" />
          <Item label="12" value="12" />
        </Picker>
        <Text style={styles.title}>Rest Time Left: {this.state.restTime}</Text>
      </View>
    )
  }


  onValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };

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
    marginBottom: 10,
    fontSize: 20,
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
  picker: {
    width: 100,
  },
});
