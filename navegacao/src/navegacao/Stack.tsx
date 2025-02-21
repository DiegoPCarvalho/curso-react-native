import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import TelaA from "../views/TelaA";
import TelaB from "../views/TelaB";
import TelaC from "../views/TelaC";
import PassoStack from "../components/PassoStack";

const Stack = createStackNavigator();

export default function StackMain(props: any) {
    return (
        <Stack.Navigator initialRouteName="TelaA"
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen name="TelaA"
                options={
                    { title: "Informações Inicias" }
                }
            >
                {props => (
                    <PassoStack {...props} avancar="TelaB">
                        <TelaA />
                    </PassoStack>
                )}
            </Stack.Screen>
            <Stack.Screen name="TelaB">
                {props => (
                    <PassoStack {...props} avancar="TelaC" voltar>
                        <TelaB />
                    </PassoStack>
                )}
            </Stack.Screen>
            <Stack.Screen name="TelaC">
                {props => (
                    <PassoStack {...props} avancar="TelaC" voltar>
                        <TelaC />
                    </PassoStack>
                )}
            </Stack.Screen>
        </Stack.Navigator>
    )
}