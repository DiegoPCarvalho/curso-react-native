import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TelaA from "../views/TelaA";
import TelaB from "../views/TelaB";
import TelaC from "../views/TelaC";
import TelaD from "../views/TelaD";

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

const Tab = createBottomTabNavigator()

export default function TabMain(props: any) {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName: any
                switch (route.name) {
                    case 'TelaA':
                       iconName = focused ? 'home' : 'home-outline'
                        break
                    case 'TelaB':
                        iconName = focused ? 'user' : 'user-outline'
                        break
                    case 'TelaC':
                        iconName = focused ? 'star' : 'star-outline'
                        break
                    case 'TelaD':
                        iconName = focused ? 'settings' : 'settings-outline'
                        break
                }
                return <FontAwesome6 name={iconName} iconStyle="brand" color={color} size={size} />
            }, 
            tabBarActiveTintColor: 'red',
            tabBarInactiveTintColor: 'blue',
            tabBarShowLabel: false  
        })}
         initialRouteName="TelaB">
            <Tab.Screen name="TelaA" component={TelaA} />
            <Tab.Screen name="TelaB" component={TelaB} />
            <Tab.Screen name="TelaC" component={TelaC} />
            <Tab.Screen name="TelaD" component={TelaD} />
        </Tab.Navigator>
    )
}