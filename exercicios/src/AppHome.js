import React from 'react';
import { StyleSheet, View} from 'react-native';
// import Primeiro from './components/Primeiro';
// import MinMax from './components/MinMax';
import Aleatorio from './components/Aleatorio';

export default function AppHome() {
    return (
      <View style={styles.container}>
        <Aleatorio min={1} max={60}/>
        {/* <MinMax min={1} max={2}/>
        <MinMax min={10} max={25}/> */}
        {/* <Primeiro /> */}
      </View>
    );
  }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    },
  });