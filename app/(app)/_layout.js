// _layout.js
import React from 'react';
import { Stack } from 'expo-router';
import HomeHeader from '../../components/HomeHeader';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="home" options={{ header: () => <HomeHeader /> }} />
        </Stack>
    );
}