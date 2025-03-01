import React from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const App = (props) => {
  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isVisible}
        onRequestClose={props.onClose}>
         <View style={styles.frame}>
                <View style={styles.container}>
                    <Text style={styles.title}>Selecione o Nivel</Text>
                    <TouchableOpacity
                        onPress={() => props.onLevelSelected(0.1)}
                        style={[styles.button, styles.bgEasy]}
                    >
                        <Text style={styles.buttonLabel}>Facil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.onLevelSelected(0.2)}
                        style={[styles.button, styles.bgNormal]}
                    >
                        <Text style={styles.buttonLabel}>Intermediario</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.onLevelSelected(0.3)}
                        style={[styles.button, styles.bgHard]}
                    >
                        <Text style={styles.buttonLabel}>Dificil</Text>
                    </TouchableOpacity>
                </View>
            </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    container: {
        backgroundColor: '#EEE',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    button: {
        marginTop: 10,
        padding: 5,
        borderRadius: 5
    },
    buttonLabel: {
        fontSize: 20,
        color: '#EEE',
        fontWeight: 'bold'
    },
    bgEasy: {
        backgroundColor: '#49b65d'
    },
    bgNormal: {
        backgroundColor: '#2765f7'
    },
    bgHard: {
        backgroundColor: '#F26337'
    }

})

export default App;