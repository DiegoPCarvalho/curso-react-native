import React from "react";
import { Text } from "react-native";
import estilo from "./estilo";

export default function Aleatorio(props){
    const {max, min} = props
    const delta = max - min + 1
    const aleatorio = parseInt(Math.random() * delta) + min

    return(
        <Text style={estilo.textoGrande}>
            Valor aleatorio {aleatorio}
        </Text>
    )
}