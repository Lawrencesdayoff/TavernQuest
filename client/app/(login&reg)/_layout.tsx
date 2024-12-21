import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="login" options={{ title: 'Log in', headerShown:false }} />
            <Tabs.Screen name="register" options={{ title: 'Sign Up', headerShown:false }} />


        </Tabs>
    );
}
