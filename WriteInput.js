import React, { Component } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";


// Params:
// text -> Text to be rendered
// onChangeText -> When the user types, this will be called
// editable 
export default function WriteInput(props) 
{
    return (
        <View style={STYLE_WRITEINPUT.top}>
            <Text style={STYLE_WRITEINPUT.title}>{props.title}</Text>
            <TextInput
                multiline
                numberOfLines={1}
                style={STYLE_WRITEINPUT.text}
                onChangeText={props.onChangeText}
                value={props.value}
                top={0}
                editable={props.editable} 
                autoCorrect={true}
                placeholder="Insert text..."
                placeholderTextColor = 'gray'/>
        </View>
    ); 
}

const STYLE_WRITEINPUT = StyleSheet.create({
    top:
    {
        flex: 1,
        flexGrow: 1,
        width: "100%",
        height: "100%",
    },

    title:
    {
        fontSize: 25,
        color: "white",
        paddingLeft: 5,
        paddingBottom: 5    
    },

    text:
    {
        flexGrow: 1,
        borderColor: 'gray',
        color: "white",
        borderWidth: 1.5,
        borderRadius: 5,
        overflow: "hidden",
        paddingLeft: 10,
        fontSize: 20,
        textAlignVertical: 'top'
    }
});
