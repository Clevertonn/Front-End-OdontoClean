import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Modal, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // ✅ IMPORT CERTO

type FilterType = 'all' | 'web' | 'design' | 'photography';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Estado para imagem selecionada
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar a visibilidade do modal

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  const portfolioItems = [
    { id: '1', imgSrc: require('../../../assets/images/limpeza (1).png'), category: 'web', title: 'Limpeza Dental', description: 'Profilaxia com remoção de placa e aplicação de flúor.' },
    { id: '2', imgSrc: require('../../../assets/images/clareamento.png'), category: 'web', title: 'Clareamento Dental', description: 'Procedimento estético para branqueamento dos dentes.' },
    { id: '3', imgSrc: require('../../../assets/images/implante.png'), category: 'design', title: 'Implante Dentário', description: 'Substituição de dentes perdidos com pinos de titânio.' },
    { id: '4', imgSrc: require('../../../assets/images/lente.png'), category: 'design', title: 'Lentes de Contato', description: 'Correção estética com lâminas ultrafinas nos dentes.' },
    { id: '5', imgSrc: require('../../../assets/images/tratamento.jpg'), category: 'photography', title: 'Tratamento de Canal', description: 'Procedimento para remover infecções na polpa do dente.' },
    { id: '6', imgSrc: require('../../../assets/images/protese.png'), category: 'photography', title: 'Prótese Dentária', description: 'Reabilitação com coroas, pontes ou dentaduras' },
  ];

  const filteredItems = portfolioItems.filter(item => activeFilter === 'all' || item.category === activeFilter);

  const openImageModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalVisible(true);
  };
  
  const closeImageModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };
  
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#3871c1', 'transparent']}
        style={styles.gradientTop}
        pointerEvents="none"
        />
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <View style={styles.portfolioItem}>
            <Image source={item.imgSrc} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <TouchableOpacity style={styles.viewButton} onPress={() => openImageModal(item.imgSrc)}>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.scrollContent}
        
        />
  
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
    flex: 0,
    padding: 0,
    backgroundColor: 'white',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 20,
  },
  heading: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headingText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  spanText: {
    color: '#3498db',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  filterButton: {
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeFilter: {
    backgroundColor: '#3498db',
    borderColor: '#2980b9',
  },
  filterText: {
    fontSize: 16,
    color: '#000',
  },
  portfolioItem: {
    width: '30%',
    marginBottom: 20,
    marginRight: '3%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  content: {
    backgroundColor: '#8ddfff',
    padding: 10,
    borderRadius: 5,
    height: 250,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 14,
    color: '#fff',
  },
  viewButton: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#3871c1',
    borderRadius: 5,
  },
  viewButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 204, 255, 0.42)',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    padding: 10,
    backgroundColor: '#3871c1',
    borderRadius: 50,
  },
  modalCloseText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
});

export default Portfolio;
