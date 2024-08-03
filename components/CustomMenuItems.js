import React from 'react';
import { Text, View } from 'react-native';
import { MenuOption } from 'react-native-popup-menu';
import { hp } from 'react-native-responsive-screen';
import { Feather, AntDesign } from '@expo/vector-icons';

export const MenuItem = ({ text, action, value, icon }) => {
    return (
        <MenuOption onSelect={() => action(value)}>
            <View style={{ paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: hp(1.7), fontWeight: 'bold', color: '#737373' }}>{text}</Text>
                {icon}
            </View>
        </MenuOption>
    );
};

