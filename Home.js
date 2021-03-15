import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, ToastAndroid, StatusBar } from 'react-native';
import {socket, STATUS, NTF_TYPE, set_g_user_data} from './constants.js';
import { STYLE_HOME } from "./styles";

export default class Home extends Component
{
    constructor(props){
        super(props);
        this.state={
            emailAcc:'',
            passwordAcc:'',
        }
    }


    componentDidMount()
    {
        socket.on("login_done", data => {
            console.log(data);
            if(data.status == STATUS.OK)
            {
                ToastAndroid.show("Logged in!", ToastAndroid.SHORT);
                set_g_user_data(data.data);
                this.props.navigation.navigate('App');
            }
            else if (data.status == STATUS.EMAIL_NOT_REGISTERED)
            {
                alert("Wrong email");
                this.setState({passwordAcc:''})
            }
            else
            {
                alert("Wrong password");
            }
        });

        socket.on("connect_error", data =>{
            ToastAndroid.show("Database is down", ToastAndroid.SHORT);
        });
    }


    conectar(){
        if(!this.state.emailAcc.trim() || !this.state.passwordAcc.trim()){
            ToastAndroid.show("Fill all the fields", ToastAndroid.SHORT);
        }
        else{
            ToastAndroid.show("Loggin in...", ToastAndroid.SHORT);
            console.log("carregado");

            let data = {email: this.state.emailAcc, password: this.state.passwordAcc};
            socket.emit("login", data);
        }
    }

    render() {
        return(
            <View style={STYLE_HOME.container}>
                <StatusBar backgroundColor="black" hidden = {false} barStyle="light-content" />
                <Image style={STYLE_HOME.logoImg} source={require('./assets/logo.png')} />
                <Text style={STYLE_HOME.logo}>We Note</Text>

                <View style={STYLE_HOME.inputView} >
                    <TextInput  
                        style={STYLE_HOME.inputText}
                        placeholder="Email..." 
                        placeholderTextColor="#fff"
                        onChangeText={text => this.setState({emailAcc:text})}/>
                </View>

                <View style={STYLE_HOME.inputView} >
                    <TextInput  
                        secureTextEntry
                        style={STYLE_HOME.inputText}
                        placeholder="Password..." 
                        placeholderTextColor="#fff"
                        onChangeText={text => this.setState({passwordAcc:text})}/>
                </View>

                <TouchableOpacity>
                    <Text style={STYLE_HOME.forgot}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={STYLE_HOME.loginBtn}
                    onPress={this.conectar.bind(this)}>
                    <Text style={STYLE_HOME.loginText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress= {() => {this.props.navigation.replace('Signup');}}>
                    <Text style={STYLE_HOME.loginText, {color: "white"}}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


    