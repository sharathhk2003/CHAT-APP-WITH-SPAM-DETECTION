import { View, Text, Image, TextInput, Pressable ,TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView,Platform} from 'react-native'
import React, { useRef, useState,useEffect } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Feather, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import {useAuth} from '../context/authContext'

export default function signUp() {
    const router = useRouter();
    const {register} = useAuth();
    const [loading,setLoading] = useState(false);

    const emailRef = useRef("");
    const passwordRef = useRef("");
    const usernameRef = useRef("");
    const profileRef = useRef("");

    const handleRegister = async ()=> {
        if(!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current  ){
            Alert.alert('Sign Up', "Please fill all the fields!")
            return;
        }
         setLoading(true);

         let response = await register(emailRef.current, passwordRef.current,usernameRef.current, profileRef.current);
         setLoading(false)
 
          
         console.log('get results: ', response);
         if(!response.success){
            Alert.alert('Sign Up', response.msg);
         }
    }
     

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(5) }} // Add padding to the bottom
                keyboardShouldPersistTaps="handled"
            >
                <StatusBar style='dark' />
                <View style={{ paddingTop: hp(7), paddingHorizontal: wp(5), justifyContent: 'center' }}>
                    {/* Sign Up Image */}
                    <View style={{ alignItems: 'center' }}>
                        <Image style={{ height: hp(25) }} resizeMode='contain' source={require('../assets/images/login.jpg')} />
                    </View>

                    <View style={{ paddingHorizontal: wp(4) }}>
                        <Text style={{ fontSize: hp(4), fontWeight: 'bold', textAlign: 'center', marginBottom: hp(2) }}>Sign Up</Text>
                        {/* Inputs */}
                        <View style={{ marginBottom: hp(2) }}>
                            <View style={{ flexDirection: 'row', backgroundColor: '#E5E7EB', borderRadius: 10, alignItems: 'center', paddingHorizontal: wp(4), height: hp(7), marginBottom: hp(2) }}>
                                <Feather name="user" size={hp(2.7)} color="gray" />
                                <TextInput
                                    onChangeText={value => usernameRef.current = value}
                                    style={{ flex: 1, fontSize: hp(2), marginLeft: wp(2), color: 'black' }}
                                    placeholder='Username'
                                    placeholderTextColor={'gray'}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', backgroundColor: '#E5E7EB', borderRadius: 10, alignItems: 'center', paddingHorizontal: wp(4), height: hp(7), marginBottom: hp(2) }}>
                                <Octicons name="mail" size={hp(2.7)} color="gray" />
                                <TextInput
                                    onChangeText={value => emailRef.current = value}
                                    style={{ flex: 1, fontSize: hp(2), marginLeft: wp(2), color: 'black' }}
                                    placeholder='Email address'
                                    placeholderTextColor={'gray'}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', backgroundColor: '#E5E7EB', borderRadius: 10, alignItems: 'center', paddingHorizontal: wp(4), height: hp(7), marginBottom: hp(2) }}>
                                <Octicons name="lock" size={hp(2.7)} color="gray" />
                                <TextInput
                                    onChangeText={value => passwordRef.current = value}
                                    style={{ flex: 1, fontSize: hp(2), marginLeft: wp(2),  color: 'black' }}
                                    placeholder='Password'
                                    placeholderTextColor={'gray'}
                                    secureTextEntry
                                />
                            </View>

                            <View style={{ flexDirection: 'row', backgroundColor: '#E5E7EB', borderRadius: 10, alignItems: 'center', paddingHorizontal: wp(4), height: hp(7), marginBottom: hp(2) }}>
                                <Feather name="image" size={hp(2.7)} color="gray" />
                                <TextInput
                                    onChangeText={value => profileRef.current = value}
                                    style={{ flex: 1, fontSize: hp(2), marginLeft: wp(2),  color: 'black' }}
                                    placeholder='Profile url'
                                    placeholderTextColor={'gray'}
                                />
                            </View>
                        </View>

                        {/* Submit button */}
                        <TouchableOpacity
                            style={{ height: hp(6.5), backgroundColor: '#4F46E5', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: hp(2) }}
                            onPress={handleRegister}
                        >
                            <Text style={{ fontSize: hp(2.7), fontWeight: 'bold', color: 'white', textTransform: 'uppercase', textAlign: 'center' }}>Sign Up</Text>
                        </TouchableOpacity>

                        {/* Sign up text */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: hp(2) }}>
                            <Text style={{ fontSize: hp(1.8), color: '#444' }}>Already have an account? </Text>
                            <Pressable onPress={() => router.push('signIn')}>
                                <Text style={{ fontSize: hp(1.8), color: '#6366F1', fontWeight: 'bold' }}>Sign In</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
