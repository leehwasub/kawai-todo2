import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import ToDo from "./ToDo";
import {AppLoading} from "expo";

const {height, width} = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDOs : false
  };

  componentDidMount = () =>{
    this._loadToDos();
  }

  render(){
    const {newToDo, loadedToDOs} = this.setState;
    if(!loadedToDOs){
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder={"New To Do"}
            value={newToDo}
            onChangeText={this._crontolNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}>
          </TextInput>
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text={"Hello I'm a To Do"}/>
          </ScrollView>
        </View>
      </View>
    );
  }
  _crontolNewToDo = text =>{
    this.setState({
      newToDo: text
    });
  };
  _loadToDos = () =>{
    this.setState({loadedToDOs:true});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center'
  },
  title: {
    color:"white",
    fontSize : 30,
    marginTop : 50,
    fontWeight: "400",
    marginBottom: 30
  },
  card:{
    backgroundColor : "white",
    flex : 1,
    width : width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios:{
        shadowColor:"rgba(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset:{
          height:-1,
          width:0
        }
      },
      android:{
        elevation:3
      }
    })
  },
  input:{
    padding:20,
    borderBottomColor:"#bbb",
    borderBottomWidth: 1,
    fontSize:25
  },
  toDos:{
    alignItems:"center"
  }
});
