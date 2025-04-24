import React, { useState } from 'react'
import { Text, View, TextInput, StyleSheet, Button } from 'react-native'
import useUserData from '../hook/UseUsersData'


export default function UserForm({ route, navigation }: any) {
    const [user, setUser] = useState(route.params ? route.params : {})
    const { dispatch } = useUserData()

    return (
        <View style={styles.form}>
            <Text>Nome:</Text>
            <TextInput
                style={styles.input}
                onChangeText={name => setUser({ ...user, name })}
                placeholder='Informe o Nome'
                value={user.name}
            />
            <Text>E-mail:</Text>
            <TextInput
                style={styles.input}
                onChangeText={email => setUser({ ...user, email })}
                placeholder='Informe o E-mail'
                value={user.email}
            />
            <Text>URL do Avatar:</Text>
            <TextInput
                style={styles.input}
                onChangeText={avatarUrl => setUser({ ...user, avatarUrl })}
                placeholder='Informe o Url do Avatar'
                value={user.avatarUrl}
            />
            <Button
                title='Salvar'
                onPress={() => {
                    dispatch({
                        type: user.id ? 'updateUser' : 'createUser',
                        payload: user
                    })                    
                    navigation.goBack()
                }} />
        </View>
    )
}


const styles = StyleSheet.create({
    form: {
        padding: 12
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10
    }
})