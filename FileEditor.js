import { faTrash, faPencilAlt, faBars, faTimes, faSave, faArrowLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { Component } from "react";
import { View, TextInput, ToastAndroid} from "react-native";
import { STYLE_EDITOR, STYLE } from "./styles";
import { g_user_data, socket, STATUS } from "./constants";

import Bell from "./Bell";
import WriteInput from "./WriteInput";
import UserCardList from "./UserCard";


// Props:
// onOpenFileMenu -> 
// onOpenNtfMenu ->
// onClose -> Closing the editor
// onDelete -> Deleting the file
// bindUpdateFn -> Gives the caller a function it can use to update the object.
// populate -> Uses the function given above to populate the editor data.
// ntfNumber
export default class FileEditor extends Component
{
    MODE = {
        FILE: 0,
        USERS: 2,
    }

    constructor(props)
    {
        super(props);

        this.state = {
            // Parent controlled file data
            file_id: 0,
            file_name: "",
            file_contents: "asdf",
            file_stored_contents: "",
            users: [],
            is_owner: "",
            flag_edit: false,

            mode: this.MODE.FILE,
            edit: false,
        }

        this.onSaveChanges = this.onSaveChanges.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onAddUser = this.onAddUser.bind(this);
        this.onRemoveUser = this.onRemoveUser.bind(this);

        this.parent_update = this.parent_update.bind(this);

        this.open_users = this.open_users.bind(this);
        this.close_users = this.close_users.bind(this);

        this._isMounted = false;
    }



    // Set up and tear down
    
    componentDidMount()
    {
        socket.on("file_edit_done", ((data) => {
            if (!this._isMounted)
                return;
            if (data.status != STATUS.OK)
                return;
            this.setState({
                file_stored_contents: this.state.file_contents, 
                mode: this.MODE.FILE, 
                edit: true
            });
        }).bind(this));

        this.props.bindUpdateFn(this.parent_update);
        this.props.populate();

        this._isMounted = true;
    }

    componentWillUnmount()
    {
        socket.on("file_edit_done", () => {});

        this.props.bindUpdateFn(null);

        this._isMounted = false;
    }



    // Callbacks

    onChangeText(text)
    {
        if (this.state.edit)
            this.setState({file_contents: text});
    }

    onEdit()
    {
        socket.emit("file_edit", {user_id: g_user_data.id, file_id: this.state.file_id});
        this.setState({});
    }

    onSaveChanges(text)
    {
        socket.emit("file_edit_end",
            {user_id: g_user_data.id, file_id: this.state.file_id, 
                contents: this.state.file_contents});
        this.setState({file_stored_contents: this.state.file_contents, edit: false});
    }

    onCancel()
    {
        socket.emit("file_edit_cancel",
            {user_id: g_user_data.id, file_id: this.state.file_id});
        this.setState({file_contents: this.state.file_stored_contents, edit: false});
    }

    parent_update(data)
    {
        if (!this._isMounted)
            return;
        this.setState(data);
    }

    onClose()
    {
        if (this.state.edit)
            this.onCancel();
        this.props.onClose();
    }

    open_users()
    {
        this.setState({mode: this.MODE.USERS});
    }

    close_users()
    {
        this.setState({mode: this.MODE.FILE});
    }

    onAddUser(email)
    {
        socket.emit("file_invite_user", 
            {file_id: this.state.file_id, user_email: email.trim()});
    }

    onRemoveUser(id)
    {
        if (id == g_user_data.id)
        {
            ToastAndroid.show("Can't remove yourself!", ToastAndroid.SHORT);
            return;
        }
        socket.emit("file_remove_user",
            {file_id: this.state.file_id, user_id: id});
    }



    // Rendering

    render_top_bar()
    {
        let trash = null;
        if (this.state.is_owner)
            trash = <FontAwesomeIcon 
                style={STYLE_EDITOR.top_bar_item} 
                icon={faTrash} 
                color={STYLE.COLOR_PRIMARY} 
                size={STYLE.ICON_SIZE} 
                onPress={this.props.onDelete}/>

        let edit = null
        if (this.state.edit)
            edit = <FontAwesomeIcon 
                style={STYLE_EDITOR.top_bar_item} 
                icon={faSave} 
                color={STYLE.COLOR_PRIMARY} 
                size={STYLE.ICON_SIZE} 
                onPress={this.onSaveChanges}/>
        else if (!this.state.flag_edit)
            edit = <FontAwesomeIcon 
                style={STYLE_EDITOR.top_bar_item} 
                icon={faPencilAlt} 
                color={STYLE.COLOR_PRIMARY} 
                size={STYLE.ICON_SIZE}
                onPress={this.onEdit}/>
        else
            edit = <FontAwesomeIcon 
                style={STYLE_EDITOR.top_bar_item} 
                icon={faPencilAlt} 
                color={STYLE.COLOR_FADED} 
                size={STYLE.ICON_SIZE} />

        let cancel = null;
        if (this.state.edit)
            cancel = <FontAwesomeIcon 
                style={STYLE_EDITOR.top_bar_item} 
                icon={faTimes} 
                color={STYLE.COLOR_PRIMARY} 
                size={STYLE.ICON_SIZE} 
                onPress={this.onCancel}/>


        let arrow = <FontAwesomeIcon 
                style={STYLE_EDITOR.top_bar_item} 
                icon={faArrowLeft} 
                color={STYLE.COLOR_PRIMARY} 
                size={STYLE.ICON_SIZE}
                onPress={this.onClose}/>

        let file_menu = null;
        if (!this.state.edit)
            file_menu = <FontAwesomeIcon 
                style={STYLE_EDITOR.top_bar_item} 
                icon={ faBars } 
                color={STYLE.COLOR_PRIMARY} 
                size={STYLE.ICON_SIZE} 
                onPress={this.props.onOpenFileMenu}/>
        
        let ntf_menu = <Bell 
            numberNTF={this.props.ntfNumber} 
            stl={STYLE_EDITOR.top_bar_item} 
            onPress={this.props.onOpenNtfMenu} /> 

        let users = null;
        if (this.state.mode == this.MODE.FILE)
        {
            if (!this.state.edit)
                users = <FontAwesomeIcon 
                    style={STYLE_EDITOR.top_bar_item} 
                    icon={ faUser } 
                    color={STYLE.COLOR_PRIMARY} 
                    size={STYLE.ICON_SIZE} 
                    onPress={this.open_users}/>
        }
        else
            users = <FontAwesomeIcon 
                style={STYLE_EDITOR.top_bar_item} 
                icon={faTimes} 
                color={STYLE.COLOR_PRIMARY} 
                size={STYLE.ICON_SIZE} 
                onPress={this.close_users}/>

        switch (this.state.mode)
        {
        case this.MODE.FILE:
            {
                return (
                    <View style={STYLE_EDITOR.top_bar}>
                        <View style={STYLE_EDITOR.top_bar_left}>
                            {file_menu}
                            {arrow}
                        </View>
                        <View style={STYLE_EDITOR.top_bar_right}>
                            {users}
                            {edit}
                            {cancel}
                            {trash}
                            {ntf_menu}
                        </View>
                    </View>
                );
            }

        case this.MODE.USERS:
            {
                return (
                    <View style={STYLE_EDITOR.top_bar}>
                        <View style={STYLE_EDITOR.top_bar_left}>
                            {file_menu}
                            {arrow}
                        </View>
                        <View style={STYLE_EDITOR.top_bar_right}>
                            {users}
                            {ntf_menu}
                        </View>
                    </View>
                );
            }
        }
    }

    render_main()
    {
        switch (this.state.mode)
        {
        case this.MODE.FILE:
            {
                return (
                    <View style={{flexGrow: 1}}>
                        <WriteInput 
                            title={this.state.file_name}
                            value={this.state.file_contents}
                            onChangeText={this.onChangeText} 
                            editable={this.state.edit} />
                    </View>
                );
            }

        case this.MODE.USERS:
            {
                return (
                    <View style={{flexGrow: 1}}>
                        <UserCardList 
                            isOwner={this.state.is_owner}
                            userList={this.state.users}
                            value={this.state.value}
                            onRemoveUser={this.onRemoveUser}
                            onPress={this.onAddUser} />
                    </View>
                );
            }
        }
    }

    render()
    {
        return (
            <View style={{flex: 1}}>
                {this.render_top_bar()}
                {this.render_main()}
            </View>
        );
    }
}


