import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient'; // Importa o degradê

const AboutScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    'Abang': require('../../../assets/fonts/Abang.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 40 }]}>
        <LinearGradient
       colors={['#3871c1', 'transparent']}
       style={styles.gradientTop}
       pointerEvents="none"
     />
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/Odonto.png')}
            style={styles.image}
          />
        </View>
 {/* 🔹 Degradê no topo */}
        <View style={styles.content}>
          <Text style={styles.title}>OdontoClean</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.info}>Fundação: <Text style={styles.highlight}>2015</Text></Text>
            <Text style={styles.info}>Especialidade: <Text style={styles.highlight}>Odontologia</Text></Text>
            <Text style={styles.info}>Localização: <Text style={styles.highlight}>Brasília, Brasil</Text></Text>
            <Text style={styles.info}>Disponibilidade: <Text style={styles.highlight}>De Segunda a Sábado</Text></Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Conheça Mais</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>10+</Text>
            <Text style={styles.statText}>Anos de Experiência</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>1000+</Text>
            <Text style={styles.statText}>Clientes Satisfeitos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>2000+</Text>
            <Text style={styles.statText}>Procedimentos Realizados</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statText}>Prêmios e Reconhecimentos</Text>
          </View>
        </View>

        {/* Modal de Saiba Mais */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sobre a OdontoClean</Text>
              <Text style={styles.modalDescription}>
                Na OdontoClean, acreditamos que um sorriso saudável transforma vidas.
                Somos uma clínica odontológica especializada em oferecer tratamentos
                de alta qualidade, unindo tecnologia, conforto e um atendimento humanizado.
              </Text>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
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
    alignItems: 'center',
    minHeight: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  content: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 32,
    color: '#3871c1',
    marginBottom: 10,
    fontFamily: 'Abang',
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#008cce',
  },
  button: {
    backgroundColor: '#3871c1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  statBox: {
    backgroundColor: '#3871c1',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    elevation: 2,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  statText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    maxHeight: '80%',
    overflow: 'scroll',
    borderWidth: 6,
    borderColor: '#3871c1',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3871c1',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#3871c1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AboutScreen;
