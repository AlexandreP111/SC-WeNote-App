import * as React from 'react';
import { Component } from 'react';
import {useRef, useEffect} from 'react';
import { Button, View, TextInput, StatusBar ,SafeAreaView,  FlatList,  Text, TouchableOpacity, ToastAndroid, Animated, Easing } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faUserPlus, faTrash, faBars } from '@fortawesome/free-solid-svg-icons';
import Dialog from "react-native-dialog";
import { STYLE, STYLE_APP, STYLE_DRAWERS, STYLE_EDITOR, STYLE_DRAWER_TEXT } from "./styles";
import NtfCard, {NtfCardList} from "./NtfCard";
import { ntf_manager, NTF_TYPE, g_user_data, socket, STATUS } from "./constants";
import { time_to_readable } from "./utils";
import FileEditor from "./FileEditor";
import FileCard, {FileCardList} from './FileCard';


import Landing from "./Landing";

class HomeScreen extends Component{
  getValor() {
    nome_nota = "asfaf";
    //arranjar maneira de ir buscar ao MyTextInput
    console.log("Cliquei no botão e escrevi:" + nome_nota)
    return nome_nota;
  }
  
  nome_nota = "";
  render(){ 
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
        <StatusBar backgroundColor="black" hidden = {false} barStyle="light-content" />
        <FontAwesomeIcon icon={ faBars } color={'#e3ae0b'} style={STYLE_APP.left} size={STYLE.ICON_SIZE} onPress={() => this.props.navigation.openDrawer()}/>
        <MyTextInput id="textInput"/> 
        <Button onPress={this.getValor} title="Criar Nota" color={'#e3ae0b'}/>
      </View>
    );
  }  
}







function AddMember()
{
    const [value, onChangeText] = React.useState('');
    return(
        <View>
            <Text style={{color:"white"}}>Adicionar membro</Text>
            <TextInput
                style={{borderColor: 'gray', borderWidth: 1 , color: 'white', borderRadius: 20, overflow: "hidden" }}
                onChangeText={text => onChangeText(text)}
                value={value}
                width={"40%"}
                placeholder="Email"
                placeholderTextColor = 'gray'
            />
            
        </View>
    )
}



class NotificationsScreen extends Component
{
    constructor(params)
    {
        super(params);

        this.state = {
            dialog_add: false,
            dialog_leave: false,
            edit_mode: "#e3ae0b",
            files: files,

            ntf_list: []
        };

        this.set_edit = this.set_edit.bind(this);
        this.show_dialog_add = this.show_dialog_add.bind(this);
        this.show_dialog_leave = this.show_dialog_leave.bind(this);
        this.handle_cancel = this.handle_cancel.bind(this);
        this.handle_delete = this.handle_delete.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    componentDidMount()
    {
        ntf_manager.register_callback(NTF_TYPE.USER_NEW_NTF, ((data) => {
            
            let new_list = [...this.state.ntf_list];
            new_list.push(data);
            this.setState({ntf_list: new_list});
        }).bind(this));
    }

    set_edit()
    {
        let color = "blue";
        if(this.state.edit_mode == 'blue')
            color = '#e3ae0b';
        this.setState({edit_mode: color});
    }

    show_dialog_add()
    {
        this.setState({dialog_add: true});
    }

    show_dialog_leave()
    {
        this.setState({dialog_leave: true});
    }

    handle_cancel()
    {
        this.setState({
            dialog_leave: false, dialog_add: false
        });
    }

    handle_delete()
    {
        this.setState({dislog_leave: false});
    };


    onRemove(id)
    {
        let ntf_list = this.state.ntf_list.filter(ntf => ntf.id !== id);
        this.setState({ntf_list});
    }


    render()
    {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
                <StatusBar backgroundColor="black" hidden = {false} barStyle="light-content" />
                <FontAwesomeIcon icon={ faBars } color={'#e3ae0b'}style={STYLE_APP.left} size={STYLE.ICON_SIZE} onPress={this.props.openMenu}/>
                
                
                <NtfCardList onRemove={this.onRemove} ntf_list={this.state.ntf_list} />
                
                <Text style={{color: 'white'}}></Text>
                <FontAwesomeIcon icon={faTrash} color={'#e3ae0b'}style={STYLE_APP.rightprimary} size={STYLE.ICON_SIZE} onPress={this.show_dialog_leave}/>
                <BellComponent numberNTF={2} />
                <FontAwesomeIcon icon={faUserPlus} color={'#e3ae0b'}style={STYLE_APP.rightsecond} size={STYLE.ICON_SIZE} onPress={this.show_dialog_add}/>
                <FontAwesomeIcon icon={faEdit} color={this.state.edit_mode} style={STYLE_APP.rightthird} size={STYLE.ICON_SIZE} onPress={this.set_edit}/>

                <AddMember></AddMember>

                <Dialog.Container visible={this.state.dialog_add}>
                    <Dialog.Title>Account delete</Dialog.Title>
                    <Dialog.Description>
                        Insert the name of the User you wish to add
                    </Dialog.Description>
                    <Dialog.Input  placeholder="Name..."/>
                    <Dialog.Button label="Cancel" onPress={this.handle_cancel} />
                    <Dialog.Button label="Delete" onPress={this.handle_delete} />
                </Dialog.Container>

                <Dialog.Container visible={this.state.dialog_leave}>
                    <Dialog.Title>Delete Note</Dialog.Title>
                    <Dialog.Description>
                        Do you want to leave this note? You cannot undo this action.
                    </Dialog.Description>
                    <Dialog.Button label="Cancel" onPress={this.handle_cancel} />
                    <Dialog.Button label="Leave" onPress={this.handle_delete} />
                </Dialog.Container>
            </View>
        );
    }
}


const DATA = [
    {
        id: 1,
        dateCreated: "23/01/2020",
        title: "texto 1",
    },

    {
        id: 2,
        dateCreated: "Hoje",
        title: "texto 2",
    },

    {
        id: 3,
        dateCreated: "Hoje",
        title: "texto 3",
    },
];





export default class App extends Component
{
    MODE = {
        HOME: 0,
        EDIT: 1
    }

    constructor(props) 
    {
        super(props);

        this.state = {
            mode: this.MODE.HOME,
            r_drawer: false,
            l_drawer: false,
            ntfs: g_user_data.notifications,
            files: g_user_data.files,

            view_file: {},

            // Function with which to update the editor's state.
            fn_issue_update: null,
        }

        this.create_file = this.create_file.bind(this);
        this.close_drawers = this.close_drawers.bind(this);
        this.open_drawer_left = this.open_drawer_left.bind(this);
        this.open_drawer_right = this.open_drawer_right.bind(this);
        this.delete_ntf = this.delete_ntf.bind(this);
        this.open_editor = this.open_editor.bind(this);
        this.open_landing = this.open_landing.bind(this);
        this.delete_file = this.delete_file.bind(this);

        this.render_ntf_card_item = this.render_ntf_card_item.bind(this);
        this.render_file_card_item = this.render_file_card_item.bind(this);

        this.bindUpdateFn = this.bindUpdateFn.bind(this);
        this.populate_editor_data = this.populate_editor_data.bind(this);
        this.update_editor_contents = this.update_editor_contents.bind(this);
        this.update_editor_flag_edit = this.update_editor_flag_edit.bind(this);
        this.update_editor_users = this.update_editor_users.bind(this);
    }



    componentDidMount()
    {
        socket.on("file_create_done", ((data) => {
            let files = [...this.state.files];
            files.push(data.data);
            this.setState({files});
            ToastAndroid.show("File created!", ToastAndroid.SHORT);
        }).bind(this));

        socket.on("file_open_done", ((data) => {
            if (data.status == STATUS.OK)
            {
                data = data.data;
                let is_owner = (g_user_data.id == data.owner_id);
                this.setState({view_file: data, mode: this.MODE.EDIT});
                this.populate_editor_data();
            }
        }).bind(this));

        socket.on("file_invite_user_done", (data => {
            if (data.status == STATUS.EXISTS)
            {
                ToastAndroid.show("User already invited!", ToastAndroid.SHORT);
            }
            else if (data.status == STATUS.NOT_FOUND)
            {
                ToastAndroid.show("User not found.", ToastAndroid.SHORT);
            }
        }).bind(this));

        ntf_manager.register_callback(NTF_TYPE.USER_NEW_NTF, (data => {
            let ntfs = [...this.state.ntfs];
            ntfs.push(data);
            this.setState({ntfs});
        }).bind(this));

        ntf_manager.register_callback(NTF_TYPE.FILE_UPDATE, (data => {
            let files = this.state.files.filter(f => f.id !== data.id);
            files.push(data);
            this.setState({files});
        }).bind(this));

        ntf_manager.register_callback(NTF_TYPE.FILE_UPDATE_CONTENT, ((data) => {
            let view_file = this.state.view_file;
            if (this.state.view_file != null && this.state.view_file.id == data.file_id)
            {
                view_file = {...this.state.view_file};
                view_file.contents = data.contents;
                this.setState({view_file});
                this.update_editor_contents();
            }
        }).bind(this));

        ntf_manager.register_callback(NTF_TYPE.FILE_REMOVE, (data => {
            let files = this.state.files.filter(f => f.id !== data.file_id);
            this.setState({files});
        }).bind(this));

        ntf_manager.register_callback(NTF_TYPE.FILE_INVITE, (data => {
            let files = [...this.state.files];
            files.push(data)
            this.setState({files});
        }).bind(this));


        ntf_manager.register_callback(NTF_TYPE.FILE_START_EDIT, (data => {
            let files = [...this.state.files];
            let index = files.findIndex(f => f.id == data.file_id);
            let f = {...files[index]};
            files[index] = f;
            f.flag_edit = true;

            let view_file = this.state.view_file;
            if (this.state.view_file != null && this.state.view_file.id == data.file_id)
            {
                view_file = {...this.state.view_file};
                view_file.flag_edit = true;
            }

            this.setState({view_file, files});
            this.update_editor_flag_edit();
        }).bind(this));


        ntf_manager.register_callback(NTF_TYPE.FILE_END_EDIT, (data => {
            let files = [...this.state.files];
            let index = files.findIndex(f => f.id == data.file_id);
            let f = {...files[index]};
            files[index] = f;
            f.time_update = data.time;
            f.flag_edit = false;

            let view_file = this.state.view_file;
            if (this.state.view_file != null && this.state.view_file.id == data.file_id)
            {
                view_file = {...this.state.view_file};
                view_file.flag_edit = false;
            }

            this.setState({view_file, files});
            this.update_editor_flag_edit();
        }).bind(this));


        ntf_manager.register_callback(NTF_TYPE.FILE_ADD_USER, (data => {
            let view_file = this.state.view_file;
            if (view_file == null || view_file.id != data.file_id)
                return;
            view_file = {...view_file};
            view_file.users.push(data.user);

            this.setState({view_file});
            this.update_editor_users();
        }).bind(this));

        ntf_manager.register_callback(NTF_TYPE.FILE_REMOVE_USER, (data => {
            let view_file = this.state.view_file;
            if (view_file == null || view_file.id != data.file_id)
                return;
            view_file = {...view_file};
            view_file.users = view_file.users.filter(u => u.id !== data.user_id);
            
            this.setState({view_file});
            this.update_editor_users();
        }).bind(this));
    }


    // Button callbacks

    open_drawer_left()
    {
        this.setState({r_drawer: false, l_drawer: true});
    }

    open_drawer_right()
    {
        this.setState({r_drawer: true, l_drawer: false});
    }

    delete_ntf(id)
    {
        let ntfs = this.state.ntfs.filter(ntf => ntf.id != id);
        this.setState({ntfs});
        socket.emit("user_ntf_close", {user_id: g_user_data.id, ntf_id: id});
    }

    create_file(file_name)
    {
        if (file_name.length == 0)
            return;
        socket.emit("file_create", {user_id: g_user_data.id, title: file_name});
    }

    open_editor(file_id)
    {
        this.close_drawers();
        socket.emit("file_open", {user_id: g_user_data.id, file_id});
    }

    open_landing()
    {
        this.setState({mode: this.MODE.HOME});
    }

    delete_file()
    {
        if (this.state.view_file == null)
            return;
        socket.emit("file_delete", 
            {user_id: g_user_data.id, file_id: this.state.view_file.id});
        this.setState({mode: this.MODE.HOME});
    }



    // Other callbacks

    bindUpdateFn(fn_issue_update)
    {
        this.setState({fn_issue_update: fn_issue_update});
    }

    populate_editor_data()
    {
        if (this.state.fn_issue_update == null || 
            this.state.view_file == null)
            return;

        let file = this.state.view_file;
        let is_owner = file.owner_id == g_user_data.id;
        this.state.fn_issue_update({
            file_id: file.id,
            file_name: file.name,
            file_contents: file.contents,
            file_stored_contents: file.contents,
            flag_edit: file.flag_edit,
            users: file.users,
            is_owner,
        });
    }

    update_editor_flag_edit()
    {
        if (this.state.fn_issue_update == null || 
            this.state.view_file == null)
            return;
        this.state.fn_issue_update({
            flag_edit: this.state.view_file.flag_edit
        });
    }

    update_editor_users()
    {
        if (this.state.fn_issue_update == null || 
            this.state.view_file == null)
            return;
        this.state.fn_issue_update({
            users: this.state.view_file.users
        });
    }

    update_editor_contents()
    {
        if (this.state.fn_issue_update == null || 
            this.state.view_file == null)
            return;
        this.state.fn_issue_update({
            file_contents: this.state.view_file.contents 
        });
    }



    render_ntf_card_item({item})
    {
        return <NtfCard onPress={() => {this.delete_ntf(item.id)}} contents={item.contents} time={item.time} />
    }

    render_file_card_item({item})
    {
        return <FileCard onPress={() => {this.open_editor(item.id)}} name={item.name} time={item.time_update} flag_edit={item.flag_edit} />
    }

    render_drawer_left()
    {
        if (this.state.l_drawer)
            return (
                <FadeInView style={{position: "absolute", width: "100%", height: "100%", zIndex: 19}}>
                    <View style={STYLE_DRAWERS.left}>
                    <Text style={STYLE_DRAWER_TEXT.title}>Notes</Text>
                        <FlatList
                            data={this.state.files}
                            renderItem={this.render_file_card_item}
                            keyExtractor={item => item.id.toString()} />
                    </View>
                    <TouchableOpacity 
                        style={{position: "absolute", width: "100%", height: "100%", zIndex: 20}}
                        onPress={this.close_drawers} />
                </FadeInView>
            );
        return null;
    }

    render_drawer_right()
    {
        if (this.state.r_drawer)
            return (
                <FadeInView style={{position: "absolute", width: "100%", height: "100%", zIndex: 19}}>
                    <View style={STYLE_DRAWERS.right}>
                    <Text style={STYLE_DRAWER_TEXT.title}>Notifications</Text>
                        <FlatList
                            data={this.state.ntfs}
                            renderItem={this.render_ntf_card_item}
                            keyExtractor={item => item.id.toString()} />
                    </View>
                    <TouchableOpacity 
                        style={{position: "absolute", width: "100%", height: "100%", zIndex: 20}}
                        onPress={this.close_drawers} />
                </FadeInView>
            );
        return null;
    }

    close_drawers()
    {
        this.setState({r_drawer: false, l_drawer: false});
    }

    

    render()
    {
        let screen = null;
        if (this.state.mode == this.MODE.HOME)
            screen = <Landing 
                ntfNumber={this.state.ntfs.length} 
                onNewFile={this.create_file} 
                onOpenFileMenu={this.open_drawer_left}
                onOpenNtfMenu={this.open_drawer_right} />

        if (this.state.mode == this.MODE.EDIT)
            screen = <FileEditor 
                ntfNumber={this.state.ntfs.length}
                onOpenFileMenu={this.open_drawer_left}
                onOpenNtfMenu={this.open_drawer_right}
                onClose={this.open_landing}
                onDelete={this.delete_file}
                bindUpdateFn={this.bindUpdateFn}
                populate={this.populate_editor_data} />

        return (
            <View style={{backgroundColor: "black", height: "100%"}}>
                {this.render_drawer_left()}
                {this.render_drawer_right()}
                {screen}
            </View>
        );
    }
}



const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current

    // Initial value for opacity: 0

    useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 200 ,
          useNativeDriver: true
        }
      ).start();
    }, [fadeAnim])

    return (
      <Animated.View
        style={{
          ...props.style,
          opacity: fadeAnim, 
        }}

      >
        {props.children}
      </Animated.View>
    );
  }
