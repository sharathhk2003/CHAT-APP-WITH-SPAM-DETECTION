import { View, Text } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function MessageItem({ message, currentUser }) {

    if (currentUser?.userId === message?.userId) {
        // My message
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: hp(1), marginRight: wp(5) }}>
                <View style={{ maxWidth: wp(80) }}>
                    <View style={{ alignSelf: 'flex-end', padding: hp(1.5), borderRadius: hp(2), backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0' }}>
                        <Text style={{ fontSize: hp(1.9) }}>
                            {message?.text}
                        </Text>
                    </View>
                </View>
            </View>
        )
    } else {
        // Other user's message
        return (
            <View style={{ flexDirection: 'row', marginBottom: hp(1), marginLeft: wp(5) }}>
                <View style={{ maxWidth: wp(80) }}>
                    <View style={{ padding: hp(1.5), paddingLeft: hp(2), borderRadius: hp(2), backgroundColor: '#5C6BC0', borderWidth: 1, borderColor: '#CBD5E0' }}>
                        <Text style={{ fontSize: hp(1.9), color: '#FFFFFF' }}>
                            {message?.text}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}
