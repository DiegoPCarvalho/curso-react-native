import React from 'react';
import {
    StyleSheet,
    Text,
    Dimensions,
    TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
    button:{
        fontSize: 40,
        height: Dimensions.get('screen').width / 4,
        width: Dimensions.get('screen').height / 8.89,
        padding: 20,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#888'
    },
    operationButon:{
       color:'#fff',
       backgroundColor:'#fa8231'     
    },
    buttonDouble:{
        width: (Dimensions.get('screen').width / 4) * 2
    },
    buttonTriple:{
        width: (Dimensions.get('screen').width / 4) * 3
    }
})


export default props => {
    const stylesButton = [styles.button]
    if(props.double) stylesButton.push(styles.buttonDouble)
    if(props.triple) stylesButton.push(styles.buttonTriple)
    if(props.operation) stylesButton.push(styles.operationButon)

    return(
        <TouchableHighlight onPress={() => props.onClick(props.label)}>
            <Text style={stylesButton}>{props.label}</Text>
        </TouchableHighlight>
    )
}