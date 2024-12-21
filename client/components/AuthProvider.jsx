import React, { createContext, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const navigation = useNavigation();

    const getCurrentTime = () => {
        const now = new Date();
        const isoString = now.toISOString();
        const timeZoneOffset = -now.getTimezoneOffset();
        const sign = timeZoneOffset >= 0 ? "+" : "-";
        const hours = String(Math.floor(Math.abs(timeZoneOffset) / 60)).padStart(2, "0");
        const minutes = String(Math.abs(timeZoneOffset) % 60).padStart(2, "0");
        return `${isoString.slice(0, -1)}${sign}${hours}:${minutes}`;
    };

    const loginAction = async (data) => {
        try {
            const res = await axios.post("http://localhost:9999/api/checkLogin", {
                user_email: data.user_email,
                user_password: data.user_password,
                Logged_in: true,
            });

            if (res.data) {
                const { user_username, _id } = res.data;

                setUser(user_username);
                setToken(_id);

                await AsyncStorage.setItem("user", user_username);
                await AsyncStorage.setItem("token", _id);

                console.log("Redirecting to dashboard...");
                navigation.navigate("Dashboard"); // Adjust to your dashboard screen name
                return;
            }

            throw new Error(res.message);
        } catch (err) {
            console.error(err);
        }
    };

    const logOut = async () => {
        try {
            await axios.patch(`http://localhost:9999/api/logout/${token}`, {
                last_logout: getCurrentTime(),
                Logged_in: false,
            });

            setUser(null);
            setToken(null);

            await AsyncStorage.clear();
            navigation.navigate("Login"); // Adjust to your login screen name
        } catch (err) {
            console.error("Error logging out:", err);
        }
    };

    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
