import React, { useEffect , useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Image} from 'expo-image'
import { formatDate, getRoomId } from '../utils/common';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function ChatItem({ item, router, noBorder, currentUser }) {
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    const [lastMessage,setLastMessage] = useState(undefined)

    useEffect(()=> {
           
         let roomId  = getRoomId(currentUser?.userId,item?.userId)
         const docRef = doc(db,"rooms",roomId);
         const messagesRef = collection(docRef,"messages");
         const q =query(messagesRef, orderBy('createdAt','desc'));
  
         let unsub = onSnapshot(q,(snapshot)=> {
             let allMessages = snapshot.docs.map(doc=> {
                   return doc.data();
             });
              setLastMessage(allMessages[0]?allMessages[0]:null);
         })
       return unsub;
     },[])









    const openChatRoom = () => {
        router.push({ pathname: '/chatRoom', params: item });
    };

   const renderTime = () => {
     if(lastMessage){
        let date  = lastMessage?.createdAt;
        return formatDate(new Date(date?.seconds * 1000 ));
     }

   }

   const renderLastMessage = () => {
      if(typeof lastMessage == 'undefined') 
        return 'Loading...';
      
      if(lastMessage){
           if(currentUser?.userId == lastMessage?.userId) return "You: "+lastMessage?.text;
           return lastMessage?.text;
      }
      else {
         return 'Say Hi 👋';
      }


   }





    return (
        <TouchableOpacity onPress={openChatRoom} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: wp(4), marginBottom: hp(4), paddingBottom: hp(2), borderBottomWidth: noBorder ? 0 : 1, borderBottomColor: '#E2E8F0' }}>
            <Image
                style={{ height: hp(6), width: hp(6), borderRadius: hp(3) }}
                source={item?.profileUrl}
                placeholder={blurhash}
                transition={500}
            />

            <View style={{ flex: 1, marginLeft: wp(4) }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: hp(1.8), fontWeight: 'bold', color: '#2D3748' }}>{item?.username}</Text>
                    <Text style={{ fontSize: hp(1.6), color: '#4A5568' }}>{renderTime()}</Text>
                </View>
                <Text style={{ fontSize: hp(1.6), color: '#4A5568' }}>{renderLastMessage()}</Text>
            </View>
        </TouchableOpacity>
    );
}
