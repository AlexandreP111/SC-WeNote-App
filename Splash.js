import React, {Component, component} from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

export default class Splash extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
        <View style={{
            flex: 1,
            backgroundColor: '#000'
        
        }}
        >
        
        <LottieView
            source={require('./assets/progressBar.json')}
            autoPlay
            loop = {false}
            speed = {1} //colocar a 1 para ficar normal
            onAnimationFinish = {() => {
                this.props.navigation.replace('Home');
            }}
        >


        </LottieView>
        </View>
        )
    }
}