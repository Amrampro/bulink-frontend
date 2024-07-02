import {Image, TouchableOpacity, StyleSheet} from "react-native";

export default function CreateContact({ navigation }){
    return(
        <TouchableOpacity
            onPress={() => navigation.navigate('CreateMyCompany')}
            style={styles.addNewElement}
        >
            <Image style={styles.floatingButton} source={require('../assets/imgs/add.png')}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    addNewElement: {
        position: "absolute",
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30
    },
    floatingButton: {
        resizeMode: 'contain',
        width: 50,
        height: 50
    }
})