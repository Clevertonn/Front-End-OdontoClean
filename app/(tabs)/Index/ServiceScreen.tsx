import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

// Importa suas telas filhas
import Login from '../Login';
import CadastroAtendimento from '../CadastroAtendimento';
import GerenciamentoAgendamento from '../../GerenciamentoAgendamento';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ServiceItemProps {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
   title: string;
  description: string;
}

type ViewKey = 'services' | 'login' | 'cadastro' | 'gerenciamento' | null;

export default function ServicesScreen() {
  const [modalView, setModalView] = useState<ViewKey>(null);

  const handleAgendar = async () => {
    const userType = await AsyncStorage.getItem('userType');

    // Fecha o modal atual (caso esteja aberto)
    setModalView(null);

    // Aguarda 300ms para garantir que o modal anterior se feche
    setTimeout(() => {
      if (userType === '1') setModalView('cadastro');
      else if (userType === '0') setModalView('gerenciamento');
      else setModalView('login');
    }, 300);
  };

  const renderModalContent = () => {
    switch (modalView) {
      case 'login':
        return <Login />;
      case 'cadastro':
        return <CadastroAtendimento />;
      case 'gerenciamento':
        return <GerenciamentoAgendamento />;
      default:
        return null;
    }
  };

  return (
    <>
      <LinearGradient
       colors={['#3871c1', 'transparent']}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.serviceContainer}>
          <View style={styles.serviceContainer}>
                   <ServiceItem icon="toothbrush" title="Limpeza e Prevenção" description="Inclui profilaxia dental, aplicação de flúor, raspagem de tártaro e orientações sobre higiene bucal." />
                   <ServiceItem icon="tooth-outline" title="Clareamento Dental" description="Procedimento estético para remoção de manchas e branqueamento dos dentes." />
                   <ServiceItem icon="swap-vertical" title="Implantes Dentários" description="Substituição de dentes perdidos por implantes de titânio que servem como raízes artificiais." />
                   <ServiceItem icon="medical-bag" title="Tratamento de Canal" description="Procedimento endodôntico para tratar infecções ou inflamações na polpa do dente." />
                   <ServiceItem icon="tooth" title="Próteses Dentárias" description="Reabilitação com coroas, pontes ou dentaduras para restaurar a função mastigatória e estética." />
                   <ServiceItem icon="toothbrush-paste" title="Lentes de Contato" description="Procedimento odontológico que pode melhorar significativamente a aparência e a saúde bucal dos pacientes." />
                 </View> 
        </ScrollView>
        
        <View style={styles.fixedButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleAgendar}>
              <Text style={styles.buttonText}>Agendar</Text>
            </TouchableOpacity>
          </View>
      </LinearGradient>

      <Modal
        visible={modalView !== null}
        animationType="slide"
        onRequestClose={() => setModalView(null)}
      >
        <View style={{ flex: 1 }}>
          {/* Botão de Voltar */}
          <TouchableOpacity
            style={{
              padding: 12,
              backgroundColor: '#3871c1',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => setModalView(null)}
          >
            <FontAwesome name="arrow-left" size={20} color="white" />
            <Text style={{ color: 'white', marginLeft: 10, fontSize: 16 }}>Voltar</Text>
          </TouchableOpacity>

          {/* Conteúdo do Modal */}
          <View style={{ flex: 1 }}>{renderModalContent()}</View>
        </View>
      </Modal>

    </>
  );
}

// Componente ServiceItem separado, se precisar
export function ServiceItem({ icon, title, description }: ServiceItemProps) {

return (
    <View style={styles.serviceItem}>
      <MaterialCommunityIcons name={icon} size={40} color="#008cce" style={styles.icon} />
      <Text style={styles.serviceTitle}>{title}</Text>
      <Text style={styles.serviceDescription}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    padding: 10,
    paddingBottom: 100, // espaço extra para o botão não cobrir conteúdo
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 0,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3871c1',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  serviceContainer: {
    marginTop: 10,
        padding: 10,
    paddingBottom: 70,
  },
  serviceItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3871c1',
    marginBottom: 10,
  },
  serviceDescription: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});
