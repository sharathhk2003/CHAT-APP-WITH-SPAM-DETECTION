import { View, Text, Platform } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/authContext';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Feather, AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ios = Platform.OS === 'ios';
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function HomeHeader() {
    const { user, logout } = useAuth();
    const { top } = useSafeAreaInsets();

    const handleProfile = () => {
        // Add profile handling logic
    };

    const handleLogout = async () => {
        await logout();
    };

    return (
        <View style={{ paddingTop: ios ? top : top + 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, backgroundColor: '#4F46E5', paddingBottom: 10, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Chats</Text>
            <Menu>
                <MenuTrigger>
                    <Image
                        style={{ height: hp(4.3), aspectRatio: 1 , borderRadius:100 }}
                        source={user?.profileUrl}
                    placeholder={{ blurhash }}
                   transition={500}
                    />
                    
                </MenuTrigger>
                <MenuOptions 
                       customStyles={{
                         optionsContainer: {
                            borderRadius: 10,
                            borderCurve: 'continuous',
                            marginTop:30,
                            marginLeft: -30,
                            backgroundColor: 'white',
                            shadowOpacity: 0.2,
                            shadowOffset: {width:0,height: 0},
                            width: 160
                         }
                       }}>
                    <MenuOption onSelect={handleProfile}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                            <Feather name="user" size={20} color="#737373" />
                            <Text style={{ marginLeft: 10 }}>Profile</Text>
                        </View>
                    </MenuOption>
                    <View style={{ height: 1, width: '100%', backgroundColor: '#4f4c45' }} />
                    <MenuOption onSelect={handleLogout}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                            <AntDesign name="logout" size={20} color="#737373" />
                            <Text style={{ marginLeft: 10 }}>Sign Out</Text>
                        </View>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    );
}

