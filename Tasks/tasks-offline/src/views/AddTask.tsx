import React from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
    TouchableOpacity,
    TextInput,
    Platform
} from 'react-native';
import commonStyles from '../commonStyles';
import DatePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const initialState: any = { desc: '', date: new Date()};

export default function AddTask(props: any) {

    const [state, setState] = React.useState(initialState)
    const [showDatePicker, setShowDatePicker] = React.useState(false)

    function getDateTimePicker(){
  
        let datePicker: any = <DatePicker
                value={state.date}
                mode='date'
                onChange={(_, date: any) => {
                    setState({...state, date})
                    setShowDatePicker(false)
                }}
            />

            const dateString = moment(state.date).format('ddd, D [de] MMMM [de] YYYY')

            if(Platform.OS === 'android'){
                return datePicker = (
                    <View>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                            <Text style={styles.date}>
                                {dateString}
                            </Text>
                        </TouchableOpacity>
                        {showDatePicker && datePicker}
                    </View>
                )
            }

            return datePicker
    }

    function save() {
        const newTask = {
            desc: state.desc,
            date: state.date,
        }

        props.onSave && props.onSave(newTask)
        setState(initialState)
        setShowDatePicker(false)
    }

    return (
        <Modal transparent={true} visible={props.isVisible}
            onRequestClose={props.onCancel} animationType="slide" >
            <TouchableWithoutFeedback
                onPress={props.onCancel}
            >
                <View style={styles.overlay}>

                </View>
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <Text style={styles.header}>Nova Tarefa</Text>
                <TextInput style={styles.input}
                    placeholder='Informe a descrição...'
                    value={state.desc}
                    onChangeText={text => setState({...state, desc: text })}
                />
                {getDateTimePicker()}
                <View style={styles.buttons}>
                    <TouchableOpacity
                        onPress={props.onCancel}
                    >
                        <Text style={styles.button}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={save}>
                        <Text style={styles.button}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableWithoutFeedback
                onPress={props.onCancel}
            >
                <View style={styles.overlay}>

                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        backgroundColor: 'white',
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        padding: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        height: 40,
        backgroundColor: '#fff',
        borderColor: '#E3E3E3',
        borderWidth: 1,
        margin: 10,
        paddingLeft: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 10,
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today,
    },
    date:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        
        marginLeft: 15,
        marginBottom: 20,
    }
})