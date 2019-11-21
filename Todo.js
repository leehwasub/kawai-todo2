import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput} from "react-native";
import PropTypes from "prop-types";
import { supportsOrientationLockAsync } from "expo/build/ScreenOrientation/ScreenOrientation";

const {width, height} = Dimensions.get("window");

export default class ToDo extends React.Component{

    constructor(props){
        super(props);
        this.state = {isEditing:false, toDoValue: props.text};
    }

    static propTypes = {
        text : PropTypes.string.isRequired,
        isCompleted : PropTypes.bool.isRequired,
        deleteTodo : PropTypes.func.isRequired,
        id : PropTypes.string.isRequired,
        uncompleteTodo: PropTypes.func.isRequired,
        completeTodo: PropTypes.func.isRequired,
        updateTodo: PropTypes.func.isRequired
    };

    render(){
        const {isEditing, toDoValue} = this.state;
        const {text, id, deleteTodo, isCompleted} = this.props;
        return(
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.umcompletedCircle]}>

                        </View>
                    </TouchableOpacity>
                    {isEditing ? (
                        <TextInput style={[styles.input, styles.text, isCompleted ? styles.completedText : styles.uncompletedText]} value={toDoValue} multiline={true} onChangeText={this._controllInput}
                        returnKeyType={"done"} onBlur={this._finishEditing}/>
                    ) : (
                        <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>
                            {text}
                        </Text>
                    )}
                </View>
                    {isEditing ? (
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._finishEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>Check</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._startEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>Edit</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPressOut={() => deleteTodo(id)}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>X</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
            </View>
        );
    }
    
    _toggleComplete = () => {
        const {isCompleted, uncompleteTodo, completeTodo, id} = this.props;
        if(isCompleted){
            uncompleteTodo(id);
        } else{
            completeTodo(id);
        }
    };

    _startEditing = () => {
        this.setState({
            isEditing: true
        });
    }

    _finishEditing = () => {
        const {toDoValue} = this.state;
        const {id, updateTodo} = this.props;
        updateTodo(id, toDoValue);
        this.setState({
            isEditing: false
        });
    }

    _controllInput = (text) => {
        this.setState({
            toDoValue : text
        })
    }
}

const styles = StyleSheet.create({
    container:{
        width: width - 50,
        borderBottomColor:"#bbb",
        borderBottomWidth:StyleSheet.hairlineWidth,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    circle : {
        width:30,
        height:30,
        borderRadius:15,
        borderWidth:3,
        marginRight:25
    },
    completedCircle:{
        borderColor:"#bbb"
    },
    umcompletedCircle:{
        borderColor:"#F23657"
    },
    text :{
        fontWeight:"600",
        fontSize:20,
        marginVertical:20
    },
    completedText:{
        color:"#bbb",
        textDecorationLine:"line-through"
    },
    uncompletedText:{
        color:"#353839"
    },
    column:{
        flexDirection:"row",
        alignItems:"center",
        width: width / 2,
    },
    actions:{
        flexDirection:"row"
    },
    actionContainer:{
        marginVertical: 10,
        marginHorizontal: 10
    },
    input:{
        marginVertical:15,
        width: width / 2
    }
});