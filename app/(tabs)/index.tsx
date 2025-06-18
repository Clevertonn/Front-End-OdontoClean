import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, View, Text, Image, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient'; // ✅ IMPORT CERTO

export default function HomeScreen() {
  const [typingText, setTypingText] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [imageAnim] = useState(new Animated.Value(0));
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Abang: require('../../assets/fonts/Abang.otf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    const typeStrings = [
      'Clareamento Dental',
      'Implantes Dentários',
      'Limpeza e Prevenção',
      'Tratamento de Canal',
      'Próteses Dentárias',
      'Lentes de Contato',
    ];

    let index = 0;
    const typeInterval = setInterval(() => {
      setTypingText(typeStrings[index]);
      index = (index + 1) % typeStrings.length;
    }, 3000);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(imageAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  if (!fontsLoaded) {
    return <Text style={{ marginTop: 50 }}>Carregando fonte...</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      {/* ✅ Degradê no topo */}
      <LinearGradient
        colors={['#3871c1', 'transparent']}
        style={styles.gradientTop}
      />

      <Animated.View
        style={[
          styles.imageWrapper,
          { opacity: imageAnim, transform: [{ scale: imageAnim }] },
        ]}
      >
        <Image
          source={require('../../assets/images/Odonto.png')}
          style={styles.image}
        />
      </Animated.View>

      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.title}>
          Bem-vindo à <Text style={styles.brand}>OdontoClean</Text>
        </Text>

        <Text style={styles.subtitle}>
          Nós Somos Especialistas em <Text style={styles.typingText}>{typingText}</Text>
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // fundo da tela branco
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200, // 🔥 altura do degradê
    zIndex: 0,
  },
  imageWrapper: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    transform: [{ scaleX: 1.2 }, { scaleY: 0.9 }],
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  title: {
    fontSize: 32,
    color: '#008cce',
    textAlign: 'center',
    marginBottom: 30,
    zIndex: 1,
  },
  brand: {
    fontFamily: 'Abang',
    fontSize: 32,
    color: '#008cce',
  },
  subtitle: {
    fontSize: 28,
    marginTop: 0,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  typingText: {
    color: '#8ddfff',
    fontSize: 36,
    fontFamily: 'bold',
  },
});
