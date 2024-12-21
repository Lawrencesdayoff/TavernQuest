import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { validEmail } from "../../components/regex.jsx";


export default function LoginScreen() {
  const [user_email, setEmail] = useState('');
  const [user_password, setPassword] = useState('');

  const [user_emailError, setEmailError] = useState('');
  const [user_passwordError, setPasswordError] = useState("");

  const [loginError, setLoginError] = useState("")
  const handleLogin = () => {
    // Add your login logic here
    if (email === 'test@example.com' && password === 'password') {
      Alert.alert('Login Success', 'Welcome back!');
    } else {
      Alert.alert('Login Failed', 'Invalid email or password.');
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

  // const handleUserPassword = (e) => {
  //   setPassword(e);
  //   if (e.length < 8) {
  //     setPasswordError("Password must be longer than 8 characters");
  //   } else {
  //     setPasswordError(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lawrence's Big Idle RPG</Text>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={user_email}
        onChangeText={handleUserEmail}
      />
      {user_emailError ? <Text style={styles.error}> {user_emailError} </Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={user_password}
        onChangeText={setPassword}
      />
      {loginError ? <Text style = {styles.error}> Log in failed! Please check your log in information again !</Text>: null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: "red",
    marginBottom: 10,
},
});
