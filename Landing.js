import React, {Component} from "react";
import { TouchableOpacity, View, TextInput, Text, ToastAndroid } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { STYLE_EDITOR, STYLE, STYLE_LANDING_BUTTON, STYLE_HOME } from "./styles";

import Bell from "./Bell";

// Params:
// onNewFile -> Callback for file creation, takes string
// ntfNumber -> Number of notifications for the bell indicator
// onOpenFileMenu -> Opening the left panel
// onOpenNtfMenu -> Opening the right panel
export default class Landing extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            value: ""
        }
        
        this.onNewFile = this.onNewFile.bind(this);
        this.update_text = this.update_text.bind(this);
    }

    update_text(text)
    {
        this.setState({value: text});
    }

    onNewFile()
    {
        if(!this.state.value.trim()){
            ToastAndroid.show("Title can't be empty!", ToastAndroid.SHORT);
        }
        else{
            ToastAndroid.show("Creating...", ToastAndroid.SHORT);
            this.props.onNewFile(this.state.value.trim());
            this.setState({value: ""});
        }
        
    }

    render_top_bar()
    {
        return (
            <View style={STYLE_EDITOR.top_bar}>
                <View style={STYLE_EDITOR.top_bar_left}>
                    <FontAwesomeIcon 
                        style={STYLE_EDITOR.top_bar_item} 
                        icon={ faBars } 
                        color={'#e3ae0b'} 
                        size={STYLE.ICON_SIZE} 
                        onPress={this.props.onOpenFileMenu}/>
                </View>
                <View style={STYLE_EDITOR.top_bar_right}>
                    <Bell numberNTF={this.props.ntfNumber} stl={STYLE_EDITOR.top_bar_item} onPress={this.props.onOpenNtfMenu} /> 
                </View>
            </View>
        );
    }

    render()
    {
        return (
            <View style={{flex: 1}}>
                {this.render_top_bar()}
                <View style={{flexGrow: 1}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', zIndex:-1}}>
                        <View style={STYLE_HOME.inputView}>
                            <TextInput
                                style={STYLE_HOME.inputText}
                                onChangeText={this.update_text}
                                value={this.state.value}
                                placeholder="Title..."
                                placeholderTextColor = 'white' />
                        </View>
                        <TouchableOpacity
                            style={STYLE_LANDING_BUTTON.loginBtn}
                            onPress={this.onNewFile}>
                            <Text style={STYLE_LANDING_BUTTON.loginText}>New Note</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}