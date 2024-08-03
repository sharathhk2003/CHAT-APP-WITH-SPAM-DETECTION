import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
export default function Loading() {
  return (
    <View style={{height: size, aspectRatio:1}}>
       <LottieView style={{flex: 1}} source={require('../assets/Animation - 1717919157148.json')} autoPlay loop />
    </View>
  )
}