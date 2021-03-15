import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle, faTimes, faUserCircle,  } from '@fortawesome/free-solid-svg-icons';

import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from "react-native-gesture-handler";
import { STYLE_HOME } from "./styles";

function UserCard(props)
{
    let deleteBtn = null;
    if(props.canDelete)
        deleteBtn = <FontAwesomeIcon icon={ faTimes } color={'#e3ae0b'} size={26}  onPress={props.onPress}/>
    return (
        <View style={STYLE_User.viewUsername}>
            <LinearGradient 
                colors={['#111111', '#222222']} 
                start={{x: 0.0, y: 0.0}} 
                end={{x: 0.5, y: 1.5}}
                locations={[0,0.8]} style={STYLE_User.linearGradient} height={'auto'}>
                <FontAwesomeIcon style={STYLE_User.removeIcon}icon={ faUserCircle } color={'#d6d6d6'} size={38}/>
                <View style={{ flex: 1, flexDirection: 'column' }}> 
                    <Text style={STYLE_User.userName}>{props.name}</Text>
                    <Text style={STYLE_User.userEmail}>{props.email}</Text>
                </View >
                {deleteBtn}
            </LinearGradient>
        </View>
    );
}



export default class UserCardList extends Component
{
    state = {
        userEmail: ""
    }

    render()
    {
        let addControls = null;
        if(this.props.isOwner)
        addControls = <View style={STYLE_User.addView}>
                <TextInput style={STYLE_User.inputText}
                    placeholder="Email of user..." 
                    placeholderTextColor="#fff"
                    onChangeText={text => this.setState({userEmail:text})}></TextInput>
                <FontAwesomeIcon style={STYLE_User.addIcon} icon={ faCheckCircle } color={'#e3ae0b'} size={40} onPress={() => {this.props.onPress(this.state.userEmail); userEmail = ''}}/>
            </View>;

        return (
            <View style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}>
                <ScrollView style={{flexGrow: 1}} > 
                {
                    this.props.userList.map(user => {
                        return <UserCard 
                            key={user.id} 
                            name={user.name} 
                            email={user.email} 
                            canDelete={this.props.isOwner} 
                            onPress={() => {this.props.onRemoveUser(user.id);}}/>
                    })
                }
                </ScrollView>
                {addControls}
            </View>
        );
    }
}

/*



*/

const STYLE_User = StyleSheet.create({

    userName:
    {
        fontWeight: 'bold',
        marginBottom: 0,
        flex: 1,
        fontSize: 20,
        margin: 10,
        marginLeft: 10,
        paddingRight: 9,
        color: '#ffffff',
        backgroundColor: 'transparent',
        height: 'auto',

    },
    userEmail:
    {
        fontSize: 15,
        marginBottom: 8,
        flex: 1,
        marginLeft: 11,
        marginTop: 0,
        paddingRight: 9,
        color: '#ffffff',
        backgroundColor: 'transparent',
        height: 'auto',
    
    },
    viewUsername: 
    {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 25,
        
    },
    linearGradient: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",        
        paddingRight: 10,
        paddingLeft: 0,
        borderRadius: 25,
        width: '80%',

      },
      removeIcon: {
          margin: 10,
          paddingLeft: 0,
          paddingRight: 50,
      },
      inputText: {
        borderRadius: 25,
        borderColor: '#e3ae0b',
        borderWidth: 2,
        color: 'white',
        width: '80%',
        paddingLeft: 30,
        height:50,
        marginBottom: 70,
      },
      addView: {
        flexDirection: "row",
        alignItems: "center",
        left: 40,
        marginTop: 20,
      },
      addIcon: {
          top: 5,
          position: 'absolute',
          right: 100,
      }
});
