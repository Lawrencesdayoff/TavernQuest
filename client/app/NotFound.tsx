import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; // Ensure this is properly imported and installed

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <Link href="/" style={styles.link}>
        Go to home screen!
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});