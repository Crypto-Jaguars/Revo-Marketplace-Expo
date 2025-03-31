import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Props = {
  navigation: NavigationProp<any>;
};

const CheckoutScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Proceso de Pago</Text>
      {/* Aquí puedes agregar detalles del carrito y opciones de pago */}
      <Button
        title="Confirmar Pago"
        onPress={() => {
          // Lógica para confirmar el pago
          navigation.navigate('Authentication'); // Navegar a la pantalla de autenticación después del pago
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

export default CheckoutScreen;
