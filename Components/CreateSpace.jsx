import { faFontAwesome } from "@fortawesome/free-regular-svg-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react";
import { View,StyleSheet, Text, SafeAreaView, TextInput, Button, TouchableOpacity, Image, DatePickerIOS } from "react-native"
import { CheckBox, Divider } from "react-native-elements"
function CreateSpace({navigation}) {

    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [time, setTime] = useState(new Date())
    
    const [token, setToken] = useState('')
    
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenTime, setIsOpenTime] = useState(false)

    const api = "https://api.mypal.itcentral.ng"

    

    const onDateChange = (newDate) => {
      setDate(newDate);
    };
    const onTimeChange = (newTime) => {
      setTime(newTime);
    };

    useEffect(() => {
        AsyncStorage.getItem('token').then(token => {
            if(token){
                setToken(token)
            }else{
                navigation.navigate('signin')
            }
        })
    }, [])


    const handleCreateSpace = () => {
        fetch(`${api}/space`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    title,
                    description,
                    date,
                    time
                }
            )
        })
        .then(response => {
            if(response.status === 201){
                response.json().then(data => {
                    console.log(data)
                    // AsyncStorage.setItem('token', data.token)
                    // AsyncStorage.setItem('user', JSON.stringify(data.user))
                    navigation.navigate('Bottombar')
                })
            }else if (response.status === 401){
                navigation.navigate('signin')
            }
            else{
                setError(true)
            }
        })
    }
        
  
  

  return (
    <View style = {styles.all}>
        <SafeAreaView style = {styles.container}>
            <View style = {styles.body}>
                <View style = {styles.signup}>
                    <TouchableOpacity onPress={() =>{
                        navigation.navigate('Bottombar')
                    }} style = {{display:'flex', flexDirection: 'row', alignItems: 'center', gap:5}}>
                        <Image source = {require('../assets/Icons/back.png')} style = {{height: 20, width: 20, borderRadius: 30}}/>
                        <Text style = {styles.greetings}>Create a space</Text>
                        {/* <Text style = {[styles.inputnames, {textAlign: 'center', fontWeight:'bold'}]}>Connect with your friends today!</Text>  */}

                    </TouchableOpacity>
                <View>
                    <View style = {styles.form}>
                        <TextInput style = {styles.input} placeholderTextColor = 'rgba(0,0,0, .6)' placeholder="Enter Title" onChangeText = {(text) => setTitle(text)}/>
                    </View>
                    <View style = {styles.form}>
                        <TextInput style = {styles.input} placeholderTextColor = 'rgba(0,0,0, .6)' placeholder="Enter Description" onChangeText = {(text) => setDescription(text)}/>
                    </View>
                    <View style = {[styles.form]}>
                        <Text style = {[styles.input, { color: 'rgba(0,0,0, .6)', paddingVertical:10} ]} onPress={() => setIsOpen(!isOpen)}>Date: {date.toLocaleDateString()}</Text>
                    {isOpen && (
                        <DatePickerIOS
                        date={date}
                        onDateChange={onDateChange}
                        mode="date"
                        display="default"
                        />
                    )}
                    </View>
                    
                    <View style = {[styles.form]}>
                        <Text style = {[styles.input, { color: 'rgba(0,0,0, .6)', paddingVertical:10} ]} onPress={() => setIsOpenTime(!isOpenTime)}>Time: {date.toLocaleTimeString()}</Text>
                    {isOpenTime && (
                        <DatePickerIOS
                        date={time}
                        onTimeChange={onTimeChange}
                        mode="time"
                        display="default"
                        />
                    )}
                    </View>
                    <TouchableOpacity style = {styles.button} onPress = {handleCreateSpace}>
                        <Text style = {{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>Create Space</Text>
                    </TouchableOpacity>

                </View>

                </View>
            </View>
        </SafeAreaView>

    </View>

  )
}
const styles = StyleSheet.create({
    all:{
        backgroundColor: 'white',
        height: '100%',
    }, 
    container: {
        flex: 1,
        fontFamily: 'poppinsLight'
        // paddingTop: Platform.OS ==='android'? StatusBar.currentHeight : 0
    },
      body:{
        paddingHorizontal: 30,
        display: 'flex',
        justifyContent: 'center',
        // backgroundColor: 'white'
    },    
    signup:{
        // backgroundColor: 'red',
         height: '100%',
         display: 'flex',
         gap: 50,
         justifyContent:'center',
        //  alignItems: 'center',
         width: '100%'

    },
    greetings:{
        // marginTop: 30,
        fontSize: 30,
        fontFamily: 'poppinsBold',
        textAlign: 'left',
        color: 'black',
        paddingHorizontal: 60

    },
    inputnames:{
        marginBottom: 10,
        color: 'black',
        fontFamily: 'poppinsRegular'

    },
    input:{
        paddingHorizontal: 20,
        height:50,
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 28,
        borderColor: 'rgba(0,0,0,1)',
        fontFamily: 'poppinsRegular'

    },
    button:{
        backgroundColor: 'black',
        height: 48,
        borderRadius: 5,
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 20
    },
    buttonColor:{

    },
    icon:{
        height: 20,
        width: 20,
    },

})
export default CreateSpace
