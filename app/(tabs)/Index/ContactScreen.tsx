import React from "react";
import { View, Text, TextInput, TouchableOpacity, Linking, StyleSheet, ScrollView } from "react-native";
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

const ContactScreen = () => {
  const [fontsLoaded] = useFonts({
    'Abang': require('../../../assets/fonts/Abang.otf'), // Verifique se o caminho está certo
  });

  if (!fontsLoaded) {
    return null; // Pode colocar um loader aqui se quiser
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 40 }]}
   // 👈 isso aqui resolve!
>
  <LinearGradient
         colors={['#3871c1', 'transparent']}
         style={styles.gradientTop}
         pointerEvents="none"
       />
      <Text style={{ fontFamily: 'Abang',fontSize: 32, textAlign: "center", marginBottom: 20 }}>
        <Text style={{ fontFamily: 'Abang', color: "white" }}>OdontoClean</Text>
      </Text>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Fale conosco</Text>
        <Text style={{ fontSize: 16, color: "black", marginTop: 5 }}>
          Entre em contato para mais informações sobre nossos serviços de odontológia.
        </Text>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Telefone:</Text>
        <Text style={{ fontSize: 16 }}>+123-456-789</Text>
        <Text style={{ fontSize: 16 }}>+111-222-333</Text>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Email:</Text>
        <Text style={{ fontSize: 16 }}>info@odontoclean.com</Text>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Instagram:</Text>
        <Text style={{ fontSize: 16, color: "blue" }} onPress={() => Linking.openURL("https://www.instagram.com/odontoclean")}>
          https://www.instagram.com/odontoclean
        </Text>
      </View>

      <TextInput style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }} placeholder="Nome" />
      <TextInput style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }} placeholder="Email" keyboardType="email-address" />
      <TextInput style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }} placeholder="Assunto" />
      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
          height: 100,
          textAlignVertical: "top"
        }}
        placeholder="Mensagem"
        multiline
      />

      <TouchableOpacity style={{ backgroundColor: "'rgba(8, 238, 0, 0.92)'", padding: 15, borderRadius: 5, alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Enviar mensagem</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 0,
  },
  container: {
    padding: 20,
    backgroundColor: 'white',
    minHeight: '100%',
  },
});
export default ContactScreen;