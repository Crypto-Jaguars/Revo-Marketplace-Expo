import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Props = {
  navigation: NavigationProp<any>;
};

const AuthScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Autenticación</Text>
      {/* Aquí puedes agregar formularios de inicio de sesión o registro */}
      <Button
        title="Iniciar Sesión"
        onPress={() => {
          // Lógica para iniciar sesión
          navigation.goBack(); // Regresar a la pantalla anterior
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AuthScreen;
