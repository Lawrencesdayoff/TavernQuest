import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { validEmail } from "../../components/regex.jsx";

const RegisterForm = () => {
    const [user_firstname, setFirstname] = useState("");
    const [user_lastname, setLastname] = useState("");
    const [user_username, setUsername] = useState("");
    const [user_email, setEmail] = useState("");
    const [user_password, setPassword] = useState("");
    const [invalidform, setSubmitState] = useState(true);

    const [user_firstnameError, setFirstnameError] = useState("");
    const [user_lastnameError, setLastnameError] = useState("");
    const [user_usernameError, setUsernameError] = useState("");
    const [user_emailError, setEmailError] = useState("");
    const [user_passwordError, setPasswordError] = useState("");

    const [Emails, checkEmails] = useState([]);

    const handleUserName = (e) => {
        setUsername(e);
        if (!e) {
            setUsernameError("User name must be at least 1 character long");
        } else {
            setUsernameError(false);
        }
    };

    const handleUserFirstName = (e) => {
        setFirstname(e);
        if (e.length < 2) {
            setFirstnameError("First name must be at least 1 character long");
        } else {
            setFirstnameError(false);
        }
    };

    const handleUserLastName = (e) => {
        setLastname(e);
        if (e.length < 2) {
            setLastnameError("Last name must be at least 1 character long");
        } else {
            setLastnameError(false);
        }
    };

    const handleUserEmail = (e) => {
        setEmail(e);
        if (!validEmail.test(e)) {
            setEmailError("Invalid email format");
        } else {
            setEmailError(false);
        }
    };

    const handleUserPassword = (e) => {
        setPassword(e);
        if (e.length < 8) {
            setPasswordError("Password must be longer than 8 characters");
        } else {
            setPasswordError(false);
        }
    };

    const isFormValid = () => {
        if (
            user_usernameError ||
            user_emailError ||
            user_lastnameError ||
            user_passwordError ||
            user_firstnameError
        ) {
            setSubmitState(true);
        } else {
            setSubmitState(false);
        }
    };

    const checkEmail = async () => {
        try {
            const response = await axios.get("http://localhost:9999/api/getallUsers");
            const listofemails = response.data.map((res) => res.user_email);
            checkEmails(listofemails);
        } catch (error) {
            Alert.alert("Error", "Failed to fetch emails");
        }
    };

    const createUser = async () => {
        if (invalidform) {
            Alert.alert("Error", "Please fill in all fields correctly.");
            return;
        }

        await checkEmail();
        if (Emails.includes(user_email.trim())) {
            Alert.alert(
                "Error",
                "Email is already taken. Please use another email address."
            );
            return;
        }

        try {
            await axios.post("http://localhost:9999/api/newUser", {
                user_username,
                user_firstname,
                user_lastname,
                user_email,
                user_password,
            });
            Alert.alert("Success", "Account created successfully!");
            //   navigation.navigate("Dashboard"); // Assuming "Dashboard" is a screen in your navigator
        } catch (error) {
            Alert.alert("Error", "Failed to register user");
        }
    };

    useEffect(() => {
        isFormValid();
    }, [user_username, user_email, user_lastname, user_password, user_firstname]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={user_firstname}
                onChangeText={handleUserFirstName}
            />
            {user_firstnameError ? <Text style={styles.error}>{user_firstnameError}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={user_lastname}
                onChangeText={handleUserLastName}
            />
            {user_lastnameError ? <Text style={styles.error}>{user_lastnameError}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={user_email}
                onChangeText={handleUserEmail}
            />
            {user_emailError ? <Text style={styles.error}>{user_emailError}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={user_username}
                onChangeText={handleUserName}
            />
            {user_usernameError ? <Text style={styles.error}>{user_usernameError}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={user_password}
                onChangeText={handleUserPassword}
            />
            {user_passwordError ? <Text style={styles.error}>{user_passwordError}</Text> : null}

            <Button
                title="Register"
                onPress={createUser}
                disabled={invalidform}
                color="#007bff"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 50,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    error: {
        color: "red",
        marginBottom: 10,
    },
});

export default RegisterForm;
