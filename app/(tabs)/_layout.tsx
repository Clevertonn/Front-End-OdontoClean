import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import LoginScreen from '../(tabs)/Login';
import RegistroUser from '../(tabs)/RegistroUser';
import GerenciamentoServico from '../(tabs)/../GerenciamentoServico';
import HomeScreen from './index';
import AboutScreen from './Index/AboutScreen';
import ServiceScreen from './Index/ServiceScreen';
import PortfolioScreen from './Index/PortfolioScreen';
import ContactScreen from './Index/ContactScreen';
import { RouteProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import CadastroAtendimento from '../(tabs)/CadastroAtendimento';
import GerenciamentoUser from '../(tabs)/../GerenciamentoUser'
import GerenciamentoAgendamento from '../(tabs)/../GerenciamentoAgendamento';
import GerenciamentoAgendamentoUser from '../(tabs)/../GerenciamentoAgendamentoUser';
import Relatorio from '../(tabs)/../Relatorio';
import AlterarSenhaScreen from '../(tabs)/AlterarSenha';
import RedefinirSenhaScreen from '../(tabs)/RedefinirSenha';
import { View, Text, Image, StyleSheet } from 'react-native';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';


type ColorScheme = 'light' | 'dark';

const DrawerNavigator = createDrawerNavigator();
const TabNavigator = createBottomTabNavigator();


type IconName =
  | 'home'
  | 'information'
  | 'construct'
  | 'briefcase'
  | 'people'
  | 'file-tray'
  | 'call';

  const Tab = createBottomTabNavigator();

  function CustomTabBarButton({ children, onPress }: { children: React.ReactNode; onPress?: (event: GestureResponderEvent) => void }) {
    return (
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: -20, // 🔹 Ajusta a elevação para centralizar melhor
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 8,
          backgroundColor: '#008cce',
          borderRadius: 35,
          width: 65,
          height: 65,
          shadowColor: 'white',
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 4 },
        }}
       onPress={(event) => onPress?.(event)}
      >
        {children}
      </TouchableOpacity>
    );
  }
  
  function Tabs() {
    return (
      <Tab.Navigator
      initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#3871c1',
            height: 50, // 🔹 Ajusta altura da barra
            borderTopWidth: 0,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 5, // 🔹 Garante espaçamento correto dos ícones
          },
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#8ddfff',
          tabBarInactiveTintColor: 'white',
        }}
      >
        <Tab.Screen
          name="Sobre Nós"
          component={AboutScreen}
          options={{
            headerStyle: {
              elevation: 0,
              backgroundColor: '#3871c1', // 🎨 Cor da barra superior
            },
            headerTintColor: '#fff', // 📝 Cor do texto (título)
            headerTitleAlign: 'center', // 👈 Centraliza o título
            tabBarIcon: ({ color, size }) => (
              <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="information-circle" size={32} color={color} />
              </View>
            ),
          }}
        />
  
        <Tab.Screen
          name="Nossos Serviços"
          component={ServiceScreen}
          options={{
            tabBarLabel: 'Serviços',
            headerStyle: {
              elevation: 0,
              backgroundColor: '#3871c1', // 🎨 Cor da barra superior
            },
            headerTintColor: '#fff', // 📝 Cor do texto (título)
            headerTitleAlign: 'center', // 👈 Centraliza o título
            tabBarIcon: ({ color, size }) => (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="construct" size={28} color={color} />
              </View>
            ),
          }}
        />
  
        {/* Botão Central - Home */}
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: {
              elevation: 0,
              backgroundColor: '#3871c1', // 🎨 Cor da barra superior
            },
            headerTintColor: '#fff', // 📝 Cor do texto (título)
            headerTitleAlign: 'center', // 👈 Centraliza o título
            tabBarIcon: ({ color }) => (
              <View style={{ justifyContent: 'center', alignItems: 'center', marginEnd: 0, marginTop: -5}}>
                <Ionicons name="home" size={32} color={color} />
              </View>
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
  
        <Tab.Screen
          name="Portfólio"
          component={PortfolioScreen}
          options={{
            headerStyle: {
              elevation: 0,
              backgroundColor: '#3871c1', // 🎨 Cor da barra superior
              
            },
            headerTintColor: '#fff', // 📝 Cor do texto (título)
            headerTitleAlign: 'center', // 👈 Centraliza o título
            tabBarIcon: ({ color, size }) => (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="briefcase" size={28} color={color} />
              </View>
            ),
          }}
        />
  
        <Tab.Screen
          name="Contatos"
          component={ContactScreen}
          options={{
            tabBarLabel: 'Contatos',
            headerStyle: {
              elevation: 0,
              backgroundColor: '#3871c1', // 🎨 Cor da barra superior
            },
            headerTintColor: 'white', // 📝 Cor do texto (título)
            headerTitleAlign: 'center', // 👈 Centraliza o título
            tabBarIcon: ({ color, size }) => (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="call" size={28} color={color} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  

export default function DrawerLayout() {
  const colorScheme = useColorScheme() as ColorScheme;
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    'Abang': require('../../assets/fonts/Abang.otf'),
  });

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const userTypeStored = await AsyncStorage.getItem('userType');
        if (userTypeStored) {
          setUserType(userTypeStored);
        }
      } catch (error) {
        console.error('Erro ao obter userType:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserType();
  }, []);

  if (!fontsLoaded || loading) {
    return null;
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('userName');
    await AsyncStorage.removeItem('userType');
    setUserType(null);
  };

  return (
    <DrawerNavigator.Navigator
      screenOptions={({ navigation }) => ({
        drawerStyle: {
          backgroundColor: '#3871c1', // Marrom claro
          width: 240,
        },
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'white',
        headerLeft: () => (
          <Pressable
            onPress={() => {
              // Verifica o userType no AsyncStorage quando o botão do menu é pressionado
              AsyncStorage.getItem('userType')
                .then((userTypeStored) => {
                  //console.log('userTypeStored:', userTypeStored); // Verifique o valor de userType
                  setUserType(userTypeStored); // Atualiza o estado com o valor do userType
                  setLoading(false); // Define o estado de loading como false
                  navigation.toggleDrawer(); // Abre ou fecha o drawer
                })
                .catch((error) => {
                  console.error('Erro ao obter userType:', error);
                  setLoading(false); // Em caso de erro, ainda define o loading como false
                });
            }}
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="menu" size={28} color= 'white' />
          </Pressable>
        ),
      })}
    >
      <DrawerNavigator.Screen
        name="Home"
        component={Tabs}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../../assets/images/Odonto.png')}
                style={{
                  width: 40,
                  height: 40,
                  marginRight: 8, // Adiciona um espaço entre a imagem e o texto
                  borderRadius: 20, // Define o raio da borda para arredondar a imagem
                }}
                resizeMode="contain"
              />
              <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'Abang' }}>
                OdontoClean
              </Text>
            </View>
          ),
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerBackground: () => (
            <LinearGradient
              colors={['#3871c1', '#3871c1']}
              style={{ flex: 1 }}
              start={[0, 0]}
              end={[1, 0]}
            />
          ),
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={28} color= 'white' />
          ),
        }}
      />

      {userType !== '0' && userType !== '1' && (
        <>
          <DrawerNavigator.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Login',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3871c1', '#3871c1']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <Ionicons name="log-in-outline" size={28} color= 'white' />
              ),
            }}
          />

          <DrawerNavigator.Screen
            name="RegistroUser"
            component={RegistroUser}
            options={{
              title: 'Cadastro de Usuário',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3871c1', '#3871c1']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <Ionicons name="person-add-outline" size={28} color= 'white' />
              ),
            }}
          />

        </>
      )}

      {userType === '0' && (
        <>
          <DrawerNavigator.Screen
            name="GerenciamentoUser"
            component={GerenciamentoUser}
            options={{
              title: 'Gerenciamento de Usuários',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3871c1', '#3871c1']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: 'white',
              drawerIcon: ({ color }) => (
                <Ionicons name="people" size={28} color= 'white' />
              ),
            }}
          />

          <DrawerNavigator.Screen
            name="GerenciamentoAgendamento"
            component={GerenciamentoAgendamento}
            options={{
              title: 'Gerenciamento de Agendamento',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3871c1', '#3871c1']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <Ionicons name="calendar-outline" size={28} color= 'white' />
              ),
            }}
          />

          <DrawerNavigator.Screen
            name="GerenciamentoServico"
            component={GerenciamentoServico}
            options={{
              title: 'Gerenciamento de Serviço',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3871c1', '#3871c1']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <Ionicons name="construct-outline" size={28} color= 'white' />
              ),
            }}
          />

          <DrawerNavigator.Screen
            name="Relatorio"
            component={Relatorio}
            options={{
              title: 'Relatório',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3871c1', '#3871c1']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <Ionicons name="document" size={28} color= 'white' />
              ),
            }}
          />
          <DrawerNavigator.Screen
            name="AlterarSenha"
            component={AlterarSenhaScreen}
            options={{
              title: 'Alterar Senha',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3871c1', '#3871c1']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <Ionicons name="key-outline" size={28} color= 'white' />
              ),
            }}
          />


          <DrawerNavigator.Screen
            name="RedefinirSenha"
            component={RedefinirSenhaScreen}
            options={{
              title: 'Redefinir Senha',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3871c1', '#3871c1']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <Ionicons name="lock-open-outline" size={28} color= 'white' />
              ),
            }}
          />

          <DrawerNavigator.Screen
            name="Sair"
            options={{
              title: 'Sair',
              drawerIcon: ({ color }) => <Ionicons name="log-out-outline" size={28} color= 'white' />,
            }}
            listeners={{
              focus: () => {
                console.log('userType:', userType);
                handleLogout();
              },
            }}
            component={() => null} // Componente vazio, já que você não quer mudar de tela
          />
        </>
      )}

      {userType === '1' && (
        <>
          <DrawerNavigator.Screen
            name="GerenciamentoAgendamento"
            component={GerenciamentoAgendamentoUser}
            options={{
              title: 'Gerenciamento de Agendamento',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3871c1', '#3871c1']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <Ionicons name="calendar-outline" size={28} color= 'white' />
              ),
            }}
          />

          <DrawerNavigator.Screen
            name="CadastroAtendimento"
            component={CadastroAtendimento}
            options={{
              title: 'Cadastro do Atendimento',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3871c1', '#3871c1']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <Ionicons name="person-add-outline" size={28} color= 'white' />
              ),
            }}
          />

          <DrawerNavigator.Screen
            name="AlterarSenha"
            component={AlterarSenhaScreen}
            options={{
              title: 'Alterar Senha',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3871c1', '#3871c1']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <Ionicons name="key-outline" size={28} color= 'white' />
              ),
            }}
          />

          <DrawerNavigator.Screen
            name="RedefinirSenha"
            component={RedefinirSenhaScreen}
            options={{
              title: 'Redefinir Senha',
              headerBackground: () => (
                <LinearGradient
                  colors={['#3871c1', '#3871c1']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <Ionicons name="lock-open-outline" size={28} color= 'white' />
              ),
            }}
          />



          <DrawerNavigator.Screen
            name="Sair"
            options={{
              title: 'Sair',
              drawerIcon: ({ color }) => <Ionicons name="log-out-outline" size={28} color= 'white' />,
            }}
            listeners={{
              focus: () => {
                console.log('userType:', userType);
                handleLogout();
              },
            }}
            component={() => null} // Componente vazio, já que você não quer mudar de tela
          />
        </>
      )}
    </DrawerNavigator.Navigator>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    flex: 1,
  },
  headerTitleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  headerTitleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


