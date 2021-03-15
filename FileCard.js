import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { time_to_readable } from "./utils";
import { STYLE_NTF_CARD } from "./styles";

let STYLE = StyleSheet.create({
    indicator:
    {
        backgroundColor: "red",
        position: "absolute",
        borderRadius: 100,
        width: 10,
        height: 10,
        top: 10,
        right: 10
    }
});

// Props:
// onPress
// name
// time -> Unix timestamp
// flag_edit -> If the file is being edited
export default function FileCard(props)
{
    let indicator = null;
    if (props.flag_edit)
        indicator = <View style={STYLE.indicator}></View>

    return (
        <TouchableOpacity onPress={props.onPress}>
            <Text style={STYLE_NTF_CARD.text}>{props.name}</Text>
            <Text style={STYLE_NTF_CARD.time}>{time_to_readable(props.time)}</Text>
            {indicator}
        </TouchableOpacity>
    );
}
