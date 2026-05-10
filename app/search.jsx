import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SEARCH_RESULTS = [
  {
    id: '1',
    name: 'Slayer World Tour',
    type: 'SHOW',
    date: '24 MAI',
    day: 'SÁB',
    time: '20:00',
    location: 'Allianz Parque • São Paulo, SP',
    genres: ['Metal'],
    image: require('../assets/images/highlight2.jpg'),
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Rock in Rio 2024',
    type: 'FESTIVAL',
    date: '13 SET',
    day: 'SEX',
    time: '14:00',
    location: 'Cidade do Rock • Rio de Janeiro, RJ',
    genres: ['Rock', 'Pop Rock', 'Alternativo'],
    image: require('../assets/images/highlight2.jpg'),
    isFavorite: false,
  },
  {
    id: '3',
    name: 'The Offspring',
    type: 'SHOW',
    date: '07 JUN',
    day: 'SEX',
    time: '21:00',
    location: 'Espaço das Américas • São Paulo, SP',
    genres: ['Punk Rock', 'Punk'],
    image: require('../assets/images/highlight2.jpg'),
    isFavorite: false,
  },
  {
    id: '4',
    name: 'Sepultura',
    type: 'SHOW',
    date: '18 MAI',
    day: 'SÁB',
    time: '19:00',
    location: 'Audio • São Paulo, SP',
    genres: ['Metal'],
    image: require('../assets/images/highlight2.jpg'),
    isFavorite: false,
  },
];

export default function SearchScreen() {
  // Estados para controlar filtros e busca
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('São Paulo');
  const [selectedDate, setSelectedDate] = useState('Data');
  const [selectedGenre, setSelectedGenre] = useState('Gênero');
  const [selectedType, setSelectedType] = useState('Tipo');
  const [sortBy, setSortBy] = useState('Mais próximos');
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (eventId) => {
    setFavorites(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  return (
    <View style={styles.container}>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}>

        <ImageBackground
          source={require('../assets/images/background.png')}
          style={styles.mainBackground}
          resizeMode="cover">

          <View style={styles.searchSection}>
            <View style={styles.searchBox}>
              <MaterialCommunityIcons name="magnify" size={20} color="#B3B3B3" />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar por evento, banda ou local..."
                placeholderTextColor="#B3B3B3"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity style={styles.filterButton}>
                <MaterialCommunityIcons name="tune" size={20} color="#B3B3B3" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.filtersSection}>
            {/* Filtro de localização (selecionado) */}
            <TouchableOpacity
              style={[styles.filterPill, styles.filterPillActive]}>
              <MaterialCommunityIcons name="map-marker" size={16} color="#E50914" />
              <Text style={styles.filterPillTextActive}>{selectedLocation}</Text>
              <MaterialCommunityIcons name="chevron-down" size={16} color="#E50914" />
            </TouchableOpacity>

            {/* Filtro de data */}
            <TouchableOpacity style={styles.filterPill}>
              <MaterialCommunityIcons name="calendar" size={16} color="#B3B3B3" />
              <Text style={styles.filterPillText}>{selectedDate}</Text>
              <MaterialCommunityIcons name="chevron-down" size={16} color="#B3B3B3" />
            </TouchableOpacity>

            {/* Filtro de gênero */}
            <TouchableOpacity style={styles.filterPill}>
              <MaterialCommunityIcons name="guitar-acoustic" size={16} color="#B3B3B3" />
              <Text style={styles.filterPillText}>{selectedGenre}</Text>
              <MaterialCommunityIcons name="chevron-down" size={16} color="#B3B3B3" />
            </TouchableOpacity>

            {/* Filtro de tipo */}
            <TouchableOpacity style={styles.filterPill}>
              <MaterialCommunityIcons name="ticket" size={16} color="#B3B3B3" />
              <Text style={styles.filterPillText}>{selectedType}</Text>
              <MaterialCommunityIcons name="chevron-down" size={16} color="#B3B3B3" />
            </TouchableOpacity>
          </View>

          {/* ===== SEÇÃO: RESULTADOS ===== */}
          {/* Contagem de resultados e ordenação */}
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsCount}>
              {SEARCH_RESULTS.length} eventos encontrados
            </Text>
            <TouchableOpacity style={styles.sortButton}>
              <MaterialCommunityIcons name="swap-vertical" size={16} color="#fff" />
              <Text style={styles.sortLabel}>{sortBy}</Text>
              <MaterialCommunityIcons name="chevron-down" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* ===== SEÇÃO: LISTA DE EVENTOS ===== */}
          {/* Cards com os resultados de busca */}
          <View style={styles.eventsSection}>
            <FlatList
              scrollEnabled={false}
              data={SEARCH_RESULTS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.eventCard}>
                  {/* Imagem do evento */}
                  <ImageBackground
                    source={item.image}
                    style={styles.eventImage}
                    resizeMode="cover">
                    <View style={styles.imageOverlay} />
                  </ImageBackground>

                  {/* Informações do evento */}
                  <View style={styles.eventInfo}>
                    {/* Tipo de evento (SHOW/FESTIVAL) */}
                    <Text style={styles.eventType}>{item.type}</Text>

                    {/* Nome do evento */}
                    <Text style={styles.eventName}>{item.name}</Text>

                    {/* Data e horário com ícone */}
                    <View style={styles.eventDetails}>
                      <MaterialCommunityIcons
                        name="calendar"
                        size={14}
                        color="#B3B3B3"
                      />
                      <Text style={styles.eventDate}>
                        {item.date} • {item.day} {item.time}
                      </Text>
                    </View>

                    {/* Localização com ícone */}
                    <View style={styles.eventDetails}>
                      <MaterialCommunityIcons
                        name="map-marker"
                        size={14}
                        color="#B3B3B3"
                      />
                      <Text style={styles.eventLocation}>{item.location}</Text>
                    </View>

                    {/* Gêneros em tags */}
                    <View style={styles.genresTags}>
                      {item.genres.map((genre, index) => (
                        <Text key={index} style={styles.genreTag}>
                          {genre}
                        </Text>
                      ))}
                    </View>
                  </View>

                  {/* Botão de favorito */}
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => toggleFavorite(item.id)}>
                    <MaterialCommunityIcons
                      name={favorites[item.id] ? 'heart' : 'heart-outline'}
                      size={24}
                      color="#E50914"
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Espaçamento inferior para acomodar a barra de navegação */}
          <View style={{ height: 80 }} />
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

// ===== ESTILOS =====
// Definição de todos os estilos usando StyleSheet para otimização de performance
const styles = StyleSheet.create({
  // Container principal com fundo preto padrão
  container: {
    flex: 1,
  },

  // ScrollView para rolar o conteúdo
  scrollView: {
    flex: 1,
  },

  mainBackground: {
    flex: 1,
  },

  // ===== TOP BAR =====
  // Barra superior com ícone de mapa
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },

  // Label da barra superior
  topBarLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },

  // ===== HEADER =====
  // Seção do título principal
  headerSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  // Título principal
  headerTitle: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  // Subtítulo
  headerSubtitle: {
    color: '#B3B3B3',
    fontSize: 14,
  },

  // ===== SEARCH =====
  // Seção da barra de busca
  searchSection: {
    paddingHorizontal: 16,
    marginTop: 50,
    marginBottom: 20,
  },

  // Container da barra de busca
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    gap: 8,
  },

  // Input de busca
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },

  // Botão de filtro avançado
  filterButton: {
    padding: 4,
  },

  // ===== FILTROS =====
  // Seção dos filtros
  filtersSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  // Pill individual de filtro
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 20,
    backgroundColor: '#0a0a0a',
  },

  // Pill de filtro ativo (selecionado)
  filterPillActive: {
    borderColor: '#E50914',
    backgroundColor: 'rgba(229, 9, 20, 0.1)',
  },

  // Texto do filtro
  filterPillText: {
    color: '#B3B3B3',
    fontSize: 12,
    fontWeight: '500',
  },

  // Texto do filtro ativo
  filterPillTextActive: {
    color: '#E50914',
    fontSize: 12,
    fontWeight: '600',
  },

  // ===== RESULTS =====
  // Header dos resultados (contagem + ordenação)
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  // Contagem de eventos encontrados
  resultsCount: {
    color: '#B3B3B3',
    fontSize: 13,
  },

  // Botão de ordenação
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  // Label do botão de ordenação
  sortLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },

  // ===== EVENTS =====
  // Seção da lista de eventos
  eventsSection: {
    paddingHorizontal: 16,
  },

  // Card individual de evento
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    height: 140,
    position: 'relative',
  },

  // Imagem do evento
  eventImage: {
    width: 130,
    height: 140,
  },

  // Overlay escuro sobre a imagem
  imageOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },

  // Container das informações
  eventInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
    paddingRight: 40,
  },

  // Tipo de evento (SHOW/FESTIVAL)
  eventType: {
    color: '#E50914',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  // Nome do evento
  eventName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 4,
  },

  // Detalhes do evento (data/localização)
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 3,
  },

  // Data do evento
  eventDate: {
    color: '#B3B3B3',
    fontSize: 11,
  },

  // Localização do evento
  eventLocation: {
    color: '#B3B3B3',
    fontSize: 11,
  },

  // Container dos gêneros
  genresTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },

  // Tag de gênero
  genreTag: {
    color: '#B3B3B3',
    fontSize: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },

  // Botão de favorito
  favoriteButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 10,
  },
});
