import React from "react";
import {SafeAreaView, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native'
import '../App.css';

// import StackMain from "./Stack";
import TabMain from "./Tabs";
// import DrawerMain from "./Drawer";

export default function Navegacao(){
    return (
        <SafeAreaView style={{flex: 1}}>
            <NavigationContainer>
                <TabMain />
                {/* <DrawerMain /> */}
                {/* <StackMain /> */}
            </NavigationContainer>
        </SafeAreaView>
    )
}