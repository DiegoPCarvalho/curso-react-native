import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserForm from './views/UserForm'
import UserList from './views/UserList'
import { Button, Icon } from '@rneui/base'
import { UsersProvider } from './context/UsersContext'


const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <UsersProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='UserList'
          screenOptions={options}
        >
          <Stack.Screen
            name="UserList"
            component={UserList}
            options={({ navigation }) => {
              return {
                title: 'Lista de Usuários',
                headerRight: () => (
                  <Button
                    onPress={() => navigation.navigate('UserForm')}
                    type='clear'
                    icon={<Icon name="add" size={25} color="#fff" />}
                  />
                )
              }
            }}
          />
          <Stack.Screen
            name="UserForm"
            component={UserForm}
            options={{ title: 'Formulario de Usuários' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UsersProvider>
  )
}

const options: any = {
  headerStyle: {
    backgroundColor: '#f4511e'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold'
  }
}