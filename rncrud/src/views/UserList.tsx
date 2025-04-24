import React from 'react';
import { View, FlatList, Alert } from 'react-native';
import { Avatar, Button, ListItem } from '@rneui/base';
import useUserData from '../hook/UseUsersData';

export default function UserList(props: any) {

    const { state, dispatch } = useUserData()

    function confirmeUserDeletion(user: any) {
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user
                    })
                }
            },
            {
                text: 'Não'
            }

        ])
    }

    function getUserItem({ item: user }: any) {
        return (
            <ListItem bottomDivider
                onPress={() => props.navigation.navigate('UserForm', user)}
            >
                <Avatar source={{ uri: user.avatarUrl }} rounded />
                <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: 'bold' }}>{user.name}</ListItem.Title>
                    <ListItem.Subtitle style={{ color: 'gray' }}>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content right>
                    <View style={{ display: 'flex', flexDirection: "row", alignItems: "flex-end" }}>
                        <Button
                            type="clear"
                            onPress={() => props.navigation.navigate('UserForm', user)}
                            icon={{ name: 'edit', color: 'orange' }}
                        />
                        <Button
                            type="clear"
                            onPress={() => confirmeUserDeletion(user)}
                            icon={{ name: 'delete', color: 'red' }}
                        />
                    </View>
                </ListItem.Content>
            </ListItem>
        )
    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state!.users}
                renderItem={getUserItem}
            />
        </View>
    )
}