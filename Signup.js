import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ToastAndroid, StatusBar } from 'react-native';
import {socket} from './constants.js';
import { STYLE } from './styles.js';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            emailAcc:'',
            passwordAcc:'',
            nameAcc: '',
          }
    }


    registar(){
      if(!this.state.emailAcc.trim() || !this.state.passwordAcc.trim() || !this.state.nameAcc.trim()){
        ToastAndroid.show("Fill all the fields", ToastAndroid.SHORT);
      }
      else{
        //'connect_error', 'connect_failed' and 'disconnect'
        console.log("carregado");
        //io.connect("https://my.website.com:3002/", { secure: true, reconnection: true, rejectUnauthorized: false }); io('ws://localhost:3000');
        //socket = io("http://192.168.1.108:7501"); // Meter o vosso proprio IP (/ipconfig )
        let register = {name: this.state.nameAcc, email: this.state.emailAcc, password: this.state.passwordAcc}
        socket.emit("register_user",register);
        socket.on("register_user_done", (data) => {
          if(data.status == 0){
            this.props.navigation.replace('Home');
            alert("Account Created!");
          }
          else{
            alert("Email already in use");
          }
        });
    }
  }

    render() {
        return(
            <View style={styles.container}>
               <StatusBar backgroundColor="black" hidden = {false} barStyle="light-content" />
                <Image style={styles.logoImg} source={require('./assets/logo.png')} />
        <Text style={styles.logo}>We Note</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Name..." 
            placeholderTextColor="#fff"
            onChangeText={text => this.setState({nameAcc:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#fff"
            onChangeText={text => this.setState({emailAcc:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#fff"
            onChangeText={text => this.setState({passwordAcc:text})}/>
        </View>
        <TouchableOpacity
         style={styles.loginBtn}
         onPress={this.registar.bind(this)}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => {this.props.navigation.replace('Home'); }}>
          <Text style={styles.loginText, {color: "white"}}>Already have an account?</Text>
        </TouchableOpacity>
      </View>
        );
    }
}


    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        },
        logoImg:{
            width: 150,
            height: 150,
          },
        logo:{
          fontWeight:"bold",
          fontSize:50,
          color:"#fff",
          marginBottom:40
        },
        inputView:{
          width:"80%",
          backgroundColor:"#465881",
          borderRadius:25,
          height:50,
          marginBottom:20,
          justifyContent:"center",
          padding:20
        },
        inputText:{
          height:50,
          color:"white"
        },
        loginBtn:{
          width:"80%",
          backgroundColor:STYLE.COLOR_PRIMARY,
          borderRadius:25,
          height:50,
          alignItems:"center",
          justifyContent:"center",
          marginBottom:10
        },
        loginText:{
          color:"black"
        }
  });