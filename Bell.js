import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import { STYLE } from "./styles";

export default function Bell(props)
{
    let number = null;
    if(props.numberNTF > 0)
        number = <View style={STYLE_NTF_BELL.viewNtf}><Text style={STYLE_NTF_BELL.iconText}>{props.numberNTF}</Text></View>
    return (
        <TouchableOpacity style={props.stl} onPress={props.onPress}>
            <FontAwesomeIcon icon={faBell} color={STYLE.COLOR_PRIMARY} size={STYLE.ICON_SIZE} />
            {number}
        </TouchableOpacity>
    );
}

const STYLE_NTF_BELL = StyleSheet.create({

    iconText:
    {
        color: 'white',
    },
    viewNtf: 
    {
        borderRadius: 50,
        paddingRight: 5,
        paddingLeft: 5,
        backgroundColor: 'red',
        position: "absolute",
        top: 0,
        right: 0
        
    }
});

