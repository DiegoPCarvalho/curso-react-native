import React from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import todayImage from '../assets/imgs/today.jpg';
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles';
import Task from '../components/Task';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddTask from './AddTask';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialTasks: any = [
    // {
    //     id: Math.random(),
    //     desc: 'Comprar pão',
    //     estimateAt: new Date(),
    //     doneAt: new Date()
    // },
    // {
    //     id: Math.random(),
    //     desc: 'Comprar pizza',
    //     estimateAt: new Date(),
    //     doneAt: null
    // },
    // {
    //     id: Math.random(),
    //     desc: 'Comprar cerveja',
    //     estimateAt: new Date(),
    //     doneAt: null
    // },
    // {
    //     id: Math.random(),
    //     desc: 'Comprar carne',
    //     estimateAt: new Date(),
    //     doneAt: null
    // },
    // {
    //     id: Math.random(),
    //     desc: 'Comprar legumes',
    //     estimateAt: new Date(),
    //     doneAt: null
    // },
]

// const initialState: any = {
//     task: initialTasks,
//     showDoneTasks: true,
//     visibleTasks: [],
//     showAddTask: false,
// }
export default function TaskList() {

    const [task, setTask] = React.useState(initialTasks)
    const [showDoneTasks, setShowDoneTasks] = React.useState(true)
    const [visibleTasks, setVisibleTasks] = React.useState<any>([])
    const [showAddTask, setShowAddTask] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)

    React.useEffect(() =>{
        loadTasks()
    }, [])

    React.useEffect(() => {
        filterTasks()
    }, [carregando])


    async function loadTasks() {
        const data = await AsyncStorage.getItem('tasks')
        const state =  data ? JSON.parse(data) : []

        setTask(state.task)
        setShowDoneTasks(state.showDoneTasks)
        setVisibleTasks(state.visibleTasks)
        setShowAddTask(state.showAddTask)
    }

    function toogleTask(id: any) {
        const tasks: any = [...task]

        tasks.forEach((task: any) => {
            if (task.id === id) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        setTask(tasks)
    }


    function toogleFilter() {
        setShowDoneTasks(!showDoneTasks)
    }

     async function filterTasks() {
        setCarregando(true)

        let visibleTasks: any = null
        if (showDoneTasks) {
            visibleTasks = [...task]
        } else {
            const pending = (task: any) => task.doneAt === null
            visibleTasks = task.filter(pending)
        }
        
        setVisibleTasks(visibleTasks)

        const state = {
            task: task,
            showDoneTasks: showDoneTasks,
            visibleTasks: visibleTasks,
            showAddTask: showAddTask,
        }

       await AsyncStorage.setItem('tasks', JSON.stringify(state))

        setCarregando(false)
        
        // let visible = showDoneTasks ? task : task.filter((task: any) => task.doneAt === null)
        // setVisibleTasks(visible)
    }

    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

    function addTask(newTask: any) {
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados inválidos', 'Descrição não informada.')
            return
        }

        const tasks: any = [...task]

        tasks.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: new Date(newTask.date),
            doneAt: null
        })

        
        setTask(tasks)
        setShowAddTask(false)
        filterTasks()
    }

    function deleteTask(id: any) {
        const tasks: any = task.filter((task: any )=> task.id !== id)
        setTask(tasks)
        filterTasks()
    }

    return (
        <View style={styles.container}>
            <AddTask
                isVisible={showAddTask}
                onCancel={() => setShowAddTask(false)}
                onSave={addTask}
            />
            <ImageBackground
                source={todayImage}
                style={styles.background}
            >
                <View style={styles.iconBar}>
                    <TouchableOpacity
                        onPress={toogleFilter}
                    >
                        <Icon
                            name={showDoneTasks ? 'eye' : 'eye-slash'}
                            size={20}
                            color={commonStyles.colors.secondary}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subtitle}>{today}</Text>
                </View>
            </ImageBackground>
            <View style={styles.tasklist}>
                <FlatList
                    data={visibleTasks}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => <Task {...item} toogleTask={toogleTask} onDelete={deleteTask} />}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowAddTask(true)}
                activeOpacity={0.7}
            >
                <Icon
                    name='plus'
                    size={25}
                    color={commonStyles.colors.secondary}
                />

            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    tasklist: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 50,
        color: commonStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: commonStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20,
    },
    iconBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 30,
        marginRight: 20,
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        backgroundColor: commonStyles.colors.today,
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
})