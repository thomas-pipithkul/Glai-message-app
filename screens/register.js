import React, { useState, useRef, useContext } from 'react';

import { Text, View, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Input, Button } from 'react-native-elements';
import { globalStyles } from '../styles/globalStyles';
import Feather from 'react-native-vector-icons/Feather';

// Context
import { AuthContext } from '../context/AuthContext';


export default function RegisterScreen({ navigation }) {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { onRegister } = useContext(AuthContext);
    const userNameInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const confirmPasswordInput = useRef();


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={globalStyles.background}>
                <View style={globalStyles.container}>
                    <Text style={[{flex:0.5}, globalStyles.headerText]}>Register</Text>

                    <Input 
                        ref={userNameInput}
                        leftIcon={<Feather name="user" size={24} color="black" />}
                        label='Username' 
                        placeholder='Enter username'
                        returnKeyType='next'
                        onSubmitEditing={() => emailInput.current.focus()}
                        blurOnSubmit={false}  // keep the keyboard up on submit
                        onChangeText={ text => setUserName(text)}
                    />
                    <Input 
                        ref={emailInput}
                        leftIcon={<Feather name="mail" size={24} color="black" />}
                        label='Email Address' 
                        placeholder='Enter email address'
                        returnKeyType='next'
                        onSubmitEditing={() => passwordInput.current.focus()}
                        blurOnSubmit={false}  // keep the keyboard up on submit
                        onChangeText={ text => setEmail(text)}
                    />
                    <Input 
                        ref={passwordInput}
                        leftIcon={<Feather name="lock" size={24} color="black" />}
                        label='Password' 
                        secureTextEntry 
                        placeholder='Enter your password'
                        returnKeyType='next'
                        onSubmitEditing={() => confirmPasswordInput.current.focus()}
                        blurOnSubmit={false}  // keep the keyboard up on submit
                        onChangeText={ text => setPassword(text)}
                    />
                    <Input 
                        ref={confirmPasswordInput}
                        leftIcon={<Feather name="lock" size={24} color="black" />}
                        label='Confirm Password' 
                        secureTextEntry 
                        placeholder='Confirm password'
                        onSubmitEditing={() => {if (userName && email && password) onRegister(userName, email, password)}}
                        onChangeText={ text => setConfirmPassword(text)}
                    />
                    <Button 
                        title='REGISTER'
                        containerStyle={globalStyles.button} 
                        buttonStyle={globalStyles.button}
                        raised
                        onPress={() => {
                            if (userName && email && password) onRegister(userName, email, password);
                        }}
                    />
                    <View style={{flex:1, justifyContent:'flex-end'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text>Have an Account?</Text>
                            <TouchableOpacity>
                                <Text style={{fontWeight:'bold'}} onPress={() => navigation.replace('Login')}> Sign in </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}



const styles = StyleSheet.create({});
