import {
    createAppContainer,
} from 'react-navigation';

import {
    createStackNavigator,
} from 'react-navigation-stack';


import Splash from './Splash';
import Home from './Home';
import Signup from './Signup';
import App from './App';

const MainNavigator = createStackNavigator(
    {
        Splash: { screen: Splash },
        Home: { screen: Home },
        Signup: {screen: Signup },
        App: {screen: App }
    }, 
    {
        headerMode: 'none',
            navigationOptions: {
                headerVisible: false,
                headerShown: false,
            }
    }
);

export default createAppContainer(MainNavigator);
