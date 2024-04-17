// Task.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';

const Task = ({ text, date }) => {
    // Extract the first occurrence of the date in the format YYYY-mm-dd
    const formattedDate = date.match(/\d{4}-\d{2}-\d{2}/);
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                {formattedDate && <Text style={styles.itemDate}>{formattedDate[0]}</Text>}
                {/*{date && <Text style={styles.itemDate}>{date}</Text>}*/}
                <Text style={styles.itemText}>{text}</Text>
            </View>
            <View style={styles.circular}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        alignItems: 'left',
        flexWrap: 'wrap',
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '95%',
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
    },
    itemDate: {
        fontSize: 14,
        color: COLORS.primary,
        marginBottom: 4,
    },
});

export default Task;
