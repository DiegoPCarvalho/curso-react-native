import React from "react";
import { Text } from "react-native";
import estilo from "./estilo";


export default function MinMax(props){
    return(
        <Text style={estilo.textoGrande}>
            O valor {props.max} e maior que o valor {props.min}!
        </Text>
    )
}