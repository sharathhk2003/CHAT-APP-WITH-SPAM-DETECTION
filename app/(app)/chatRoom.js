import { View, Text, TouchableOpacity, Platform, TextInput, KeyboardAvoidingView, ScrollView, Alert, Keyboard } from 'react-native'
import React, { useState , useEffect,useRef } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import {useAuth} from '../../context/authContext'
import { getRoomId } from '../../utils/common';
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function ChatRoom() {
    const item = useLocalSearchParams(); //second user
    const {user} = useAuth(); //logged-in-user
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const textRef=  useRef('')
    const inputRef = useRef(null)
    const scrollViewRef = useRef(null);


   useEffect(()=> {
      createRoomIfNotExists();
         
       let roomId  = getRoomId(user?.userId,item?.userId)
       const docRef = doc(db,"rooms",roomId);
       const messagesRef = collection(docRef,"messages");
       const q =query(messagesRef, orderBy('createdAt','asc'));

       let unsub = onSnapshot(q,(snapshot)=> {
           let allMessages = snapshot.docs.map(doc=> {
                 return doc.data();
           });
            setMessages([...allMessages]);
       })

       const KeyboardDidShowListener = Keyboard.addListener(
         'keyboardDidShow',updateScrollView
       )
      
       return ()=> {
            unsub();
            KeyboardDidShowListener.remove();
       }

   },[])

   useEffect(()=> {
      updateScrollView();
   },[messages])

   const updateScrollView = () => {
       setTimeout(()=> {
             scrollViewRef?.current?.scrollToEnd({animated: true})
       },100)
   }

   const createRoomIfNotExists = async()=> {
         // roomId 
         let roomId=  getRoomId(user?.userId,item?.userId);
         await setDoc(doc(db,"rooms",roomId), {
              roomId,
              createdAt: Timestamp.fromDate(new Date())

         });
   }
  

   const handleSendMessage = async()=> {
      let message = textRef.current.trim();
      if(!message) return;
      try {
         let roomId = getRoomId(user?.userId,item?.userId);
          const docRef =  doc(db, 'rooms' , roomId);
          const messagesRef = collection(docRef,"messages");
          textRef.current = "";

          if(inputRef) inputRef?.current?.clear();


          const newDoc = await addDoc(messagesRef, {
             userId:user?.userId,
             text:message,
             profileUrl: user?.profileUrl,
             senderName: user?.username,
             createdAt: Timestamp.fromDate(new Date())
          })


        //  console.log('new message id: ', newDoc.id);

      } catch(err){
        Alert.alert('Message',err.message)
      }
   }



    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={90}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }} // Add padding to the bottom
                bounces={false}
                keyboardShouldPersistTaps="handled"
                showVerticalScrollIndicator={false}
            >
                <View className="flex-1 bg-white">
                    <StatusBar style='dark' />
                    <ChatRoomHeader
                        user={item}
                        router={router} />
                    <View className="h-3 border-b border-neutral-300" />
                    <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
                        <View className="flex-1">
                            <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user} />
                        </View>
                        <View style={{ marginBottom: hp(2.7) }} className="pt-2">
                            <View className="flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
                                <TextInput
                                   ref = {inputRef}
                                    onChangeText={value=> textRef.current = value}
                                    placeholder="Type message..."
                                    style={{ fontSize: hp(2), flex: 1, marginRight: hp(2) }}
                                />
                                <TouchableOpacity onPress={handleSendMessage} style={{ padding: hp(1), borderRadius: hp(1.5), backgroundColor: '#D3D3D3' }}>
                                    <Feather name="send" size={hp(2.5)} color="#737373" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
