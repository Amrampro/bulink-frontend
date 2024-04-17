import React, { useState, useEffect } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    ScrollView,
    Platform,
    Alert,
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import Task from '../../components/Task';
import API from '../../constants/api';
import axios from 'axios';
import {useAuth} from "../auth/AuthContext";

export default function Reminder() {
    const [task, setTask] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [taskItems, setTaskItems] = useState([]);
    const { user } = useAuth();

    const userId = user.id

    useEffect(() => {
        // Fetch tasks from the database when the component mounts
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            // const response = await axios.get(API.reminderReadAll);
            const response = await axios.get(`${API.reminderSingleUser}/${userId}`);
            setTaskItems(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleAddTask = async () => {
        Keyboard.dismiss();

        // Create a task in the database
        try {
            const response = await axios.post(API.reminderCreate, {
                task: task,
                reminder_date_time: selectedDate,
                // reminder_date_time: selectedDate.toLocaleDateString(),
                user_id: userId
            });

            alert(response.data)

            // After creating the task, fetch updated tasks
            fetchTasks();

            setTask('');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const completeTask = (taskId) => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this task?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => deleteTask(taskId),
                },
            ],
            { cancelable: true }
        );
    };

    const deleteTask = async (taskId) => {
        // Delete the task from the database
        try {
            await axios.delete(`${API.reminderDelete}/${taskId}`);

            // After deleting the task, fetch updated tasks
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate !== undefined) {
            setSelectedDate(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            {/* Added this scroll view to enable scrolling when the list gets longer than the page */}
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                keyboardShouldPersistTaps="handled"
            >

                {/* Today's Tasks */}

                <View style={styles.tasksWrapper}>
                    <Text style={styles.sectionTitle}>Today's tasks</Text>
                    <View style={styles.items}>
                        {/* This is where the tasks will go! */}
                        {taskItems.map((item) => (
                            <TouchableOpacity
                                key={item.reminderId}
                                onPress={() => completeTask(item.reminderId)}
                            >
                                <Task
                                    text={item.task}
                                    date={item.reminder_date_time}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

            </ScrollView>

            {/* Write a task */}
            {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.writeTaskWrapper}
            >
                <TextInput
                    style={styles.input}
                    placeholder={'Write a task'}
                    value={task}
                    onChangeText={(text) => setTask(text)}
                />

                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <View style={styles.datePickerButton}>
                        <Ionicons name="calendar-number"></Ionicons>
                        <Text style={styles.datePickerButtonText}>Date</Text>
                    </View>
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={handleDateChange}
                    />
                )}

                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Ionicons style={styles.addText} name="add-circle"></Ionicons>
                        {/*<Text style={styles.addText}>+</Text>*/}
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

// ... (remaining styles remain unchanged)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    items: {
        marginTop: 30,
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: "70%",
    },
    datePickerButton: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    datePickerButtonText: {

    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addText: {
        fontSize: 40
    },
});
