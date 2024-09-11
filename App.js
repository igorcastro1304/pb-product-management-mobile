import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './contexts/AuthContext';  // Importe o AuthProvider
import { useAuth } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </AuthProvider>
  );
}

const TestComponent = () => {
  const { teste } = useAuth();
  
  console.log(teste);

  return (
    <Text>Valor do teste: {teste}</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});