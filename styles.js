import { StyleSheet } from "react-native";


export const STYLE = {
    ICON_SIZE: 32,

    COLOR_PRIMARY: '#e3ae0b',
    COLOR_FADED: '#856811',
};


const STYLE_HOME = StyleSheet.create({

    container: 
    {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logoImg:
    {
        width: 150,
        height: 150,
    },

    logo:
    {
        fontWeight:"bold",
        fontSize:50,
        color:"#fff",
        marginBottom:40
    },

    inputView:
    {
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },

    inputText:
    {
        height:50,
        color:"white"
    },

    forgot:
    {
        color:"white",
        fontSize:12
    },

    loginBtn:
    {
        width:"80%",
        backgroundColor:STYLE.COLOR_PRIMARY,
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },

    loginText:{
        color:"black"
    }

});


const STYLE_APP = StyleSheet.create({
    rightthird: 
    {
        position: 'absolute',
        right: 150,
        top: 10,
    },

    rightsecond: 
    {
        position: 'absolute',
        right: 80,
        top: 10,
    },

    rightprimary: 
    {
        position: 'absolute',
        right: 10,
        top: 10,
    },

    left: 
    {
        position: 'absolute',
        left: 10,
        top: 10,
    },

    button: 
    {
        borderRadius: 20,
        position: 'absolute',
        left: 100,
        top: 100,
    },

    h1: 
    {
        fontSize: 20,
    },

    h2: 
    {
        fontSize: 15,
    },
});



const STYLE_NTF_CARD = StyleSheet.create({
    text:
    {
        paddingLeft: 8,
        paddingRight: 8,
        fontSize: 20,
        color: "white",
        paddingTop: 10,
    },

    time:
    {
        paddingLeft: 8,
        paddingBottom: 14,
        fontSize: 12,
        color: "rgb(227, 174, 11)",
        borderBottomColor: 'white',
        borderBottomWidth: 0.5,
    }
});


const STYLE_DRAWERS = StyleSheet.create({
    left:
    {
        zIndex: 40,
        position: "absolute",
        height: "100%",
        width: "44%",
        borderTopRightRadius: 20,
        backgroundColor: "rgba(52, 52, 52, 0.94)",
        top: 0,
        left: 0
    },

    right:
    {
        zIndex: 40,
        position: "absolute",
        height: "100%",
        width: "44%",
        borderTopLeftRadius: 20,
        backgroundColor: "rgba(52, 52, 52, 0.94)",
        top: 0,
        right: 0,
    }
});


const STYLE_EDITOR = StyleSheet.create({
    top_bar:
    {
        width: "100%",
    },
    top_bar_left:
    {
        left: 0,
        flexDirection: "row"
    },
    top_bar_right:
    {
        position: "absolute",
        right: 0,
        flexDirection: "row"
    },
    top_bar_item:
    {
        margin: 10
    }
});

const STYLE_DRAWER_TEXT = StyleSheet.create({
    title:{
        color: STYLE.COLOR_PRIMARY,
        fontSize: 26,
        fontWeight: 'bold',
        borderBottomColor: 'white',
        borderBottomWidth: 0.5,
        paddingBottom: 10,
        paddingTop: 8,
        paddingLeft: 8
    }
});


const STYLE_LANDING_BUTTON = StyleSheet.create({

    loginBtn:
    {
        width:"30%",
        backgroundColor: STYLE.COLOR_PRIMARY,
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:10,
        marginTop: 20
    },

    loginText:{
        color:"black"
    }

});


export { STYLE_HOME, STYLE_APP, STYLE_NTF_CARD, STYLE_DRAWERS, STYLE_EDITOR, STYLE_DRAWER_TEXT, STYLE_LANDING_BUTTON };
