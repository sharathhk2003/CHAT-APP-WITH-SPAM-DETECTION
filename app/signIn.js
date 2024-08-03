import { View, Text,Image, TextInput, Pressable ,TouchableOpacity, Alert,ScrollView, KeyboardAvoidingView,Platform} from 'react-native'
import React, { useRef, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import {useAuth} from '../context/authContext'

export default function signIn() {
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    const {login} = useAuth();
    const emailRef = useRef("");
    const passwordRef = useRef("");
      
    const handleLogin = async ()=> {
           if(!emailRef.current || !passwordRef.current){
                Alert.alert('Sign In', "Please fill all the fields!")
                   return;
              }

              setLoading(true);
           const response = await login(emailRef.current, passwordRef.current)
              setLoading(false);
           
              if(!response.success){
                 Alert.alert('Sign In', response.msg);
              }


           
           //login process
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
      <View style={{paddingTop: hp(8),paddingHorizontal: wp(5)}} className="flex-1 gap-12">
         {/* signIn Image*/} 
        <View className='items-center'>
           <Image style={{height: hp(25)}} resizeMode='contain' source={require('../assets/images/login.jpg')}  />
        </View>

        <View className='gap-18'>
           <Text style={{fontSize: hp(4)}} className="font-bold tracking-wider text-center text-neutral-800">Sign In</Text>
            {/* inputs */}
            <View style={{ height: hp(1) }} />

            <View className="gap-4">
            <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
               <Octicons name="mail" size={hp(2.7)} color="gray" />
            <TextInput 
              onChangeText={value=>emailRef.current=value}
             style={{fontSize: hp(2)}} className="flex-1 font-semibold text-neutral-700"
             placeholder='Email address' placeholderTextColor={'gray'}
            />
            </View>

           <View className="gap-3">
           <View style={{height: hp(7)}} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
               <Octicons name="lock" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={value=>passwordRef.current=value}
            style={{fontSize: hp(2)}} className="flex-1 font-semibold text-neutral-700"
             placeholder='Password' placeholderTextColor={'gray'}
             secureTextEntry
            />
            </View>
            <Text style={{fontSize:hp(1.8)}} className="font-semibold text-right text-neutral-500">Forgot password?</Text>
           </View>
          
          {/* submit button */}
           
          <View >
              {/* {
                 loading? (
                      <View className="flex-row justify-center">
                            <Loading  />
                      </View>                     
                  ) : ( */}
                   
          <TouchableOpacity  style={{ height: hp(6.5), backgroundColor: '#4F46E5', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}  onPress={handleLogin}>
          <Text style={{ fontSize: hp(2.7), fontWeight: 'bold', color: 'white', textTransform: 'uppercase', textAlign: 'center' }}>Sign In</Text>
             </TouchableOpacity>

                  {/* )
              } */}
          </View>


          {/* sign up text */}
           

           <View className="flex-row justify-center">
                <Text style={{fontSize:hp(1.8)}} className="font-semibold text-neutral-500">Don't have an account? </Text>
                <Pressable onPress={()=> router.push('signUp')}>
                <Text style={{fontSize:hp(1.8)}} className="font-semibold text-indigo-500" >Sign Up</Text>
                </Pressable>
           </View> 
           </View>
            </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
  )
}