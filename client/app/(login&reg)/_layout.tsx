import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: 'Login', headerShown:false }} />
            <Tabs.Screen name="register" options={{ title: 'Sign Up', headerShown:false }} />


        </Tabs>
    );
}
