import React from "react";
import { View, Button } from 'react-native';

interface PassoStackProps {
    children: any
    avancar?: string
    voltar?: boolean
    navigation?: any
    avancarParam?: any
}

export default function PassoStack(props: PassoStackProps) {
    return (
        <View style={{
            flex: 1,
        }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-around",
            }}>
                {props.voltar ? 
                        <Button
                            title="Voltar"
                            onPress={() => {
                                props.navigation.goBack()
                            }}
                        /> 
                     : false
                }
                {props.avancar ? 
                        <Button
                            title="Avançar"
                            onPress={() => {
                                props.navigation.push(
                                    props.avancar,
                                    props.avancarParam || null
                                )
                            }}
                        /> 
                     : false
                }
            </View>
            <View style={{flex: 1}}>
                {props.children} 
            </View>
        </View>
    )
}