import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { time_to_readable } from "./utils";
import { STYLE_NTF_CARD } from "./styles";
import { ntf_manager, NTF_TYPE } from "./constants";

export default function NtfCard(props)
{
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Text style={STYLE_NTF_CARD.text}>{props.contents}</Text>
            <Text style={STYLE_NTF_CARD.time}>{time_to_readable(props.time)}</Text>
        </TouchableOpacity>
    );
}



export class NtfCardList extends Component
{
    render()
    {
        return (
            <View>
                {
                    this.props.ntf_list.map(ntf => {
                        return <NtfCard key={ntf.id} onPress={() => {this.props.onRemove(ntf.id)}} contents={ntf.contents} time={ntf.time} />
                    })
                }
            </View>
        );
    }
}