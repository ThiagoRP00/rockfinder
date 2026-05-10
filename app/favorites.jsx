import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Dados dos próximos eventos favoritos
const UPCOMING_FAVORITES = [
  {
    id: '1',
    band: 'SLAYER',
    event: 'WORLD TOUR 2024',
    date: '24 AGO 2024',
    time: '20:00',
    location: 'Allianz Parque • São Paulo, SP',
    image: require('../assets/images/highlight1.jpg'),
    isFavorite: true,
  },
  {
    id: '2',
    band: 'MEGADETH',
    event: 'CRUSH THE WORLD TOUR',
    date: '15 SET 2024',
    time: '19:30',
    location: 'Vibra São Paulo • São Paulo, SP',
    image: require('../assets/images/highlight1.jpg'),
    isFavorite: true,
  },
  {
    id: '3',
    band: 'ROCK FEST 2024',
    event: '3 DIAS DE MUITO ROCK!',
    date: '08 NOV - 10 NOV 2024',
    time: '-',
    location: 'Interlagos • São Paulo, SP',
    image: require('../assets/images/highlight1.jpg'),
    isFavorite: true,
  },
];

// Dados dos eventos passados favoritos
const PAST_FAVORITES = [
  {
    id: '1',
    band: 'BLACK SABBATH',
    event: 'THE END',
    date: '10 DEZ 2023',
    time: '19:00',
    location: 'Allianz Parque • São Paulo, SP',
    image: require('../assets/images/highlight1.jpg'),
    isFavorite: true,
  },
];

export default function FavoritesScreen() {
  // Estado para controlar qual filtro de abas está selecionado
  const [activeTab, setActiveTab] = useState('events');

  // Dados para cada aba de filtro
  const filterTabs = [
    { id: 'events', label: 'EVENTOS', icon: 'ticket' },
    { id: 'bands', label: 'BANDAS', icon: 'guitar-acoustic' },
    { id: 'locations', label: 'LOCAIS', icon: 'map-marker' },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/background.png')}
        style={styles.mainBackground}
        resizeMode="cover">
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}>

          <Text style={styles.logo}>Meus Favoritos</Text>

          <View style={styles.tabsContainer}>
            {filterTabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tabButton,
                  activeTab === tab.id && styles.tabButtonActive,
                ]}
                onPress={() => setActiveTab(tab.id)}>
                <MaterialCommunityIcons
                  name={tab.icon}
                  size={20}
                  color={activeTab === tab.id ? '#E50914' : '#666'}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    activeTab === tab.id && styles.tabLabelActive,
                  ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {activeTab === 'events' && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Próximos shows</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}>Ver todos</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                scrollEnabled={false}
                data={UPCOMING_FAVORITES}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.favoriteCard}>
                    {/* Imagem do evento/banda */}
                    <ImageBackground
                      source={item.image}
                      style={styles.cardImage}
                      resizeMode="cover">
                      <View style={styles.imageOverlay} />
                    </ImageBackground>

                    <View style={styles.cardInfo}>
                      <View style={styles.cardHeader}>
                        <View style={styles.bandInfo}>
                          <Text style={styles.bandName}>{item.band}</Text>
                          <Text style={styles.eventName}>{item.event}</Text>
                        </View>
                        <View style={styles.cardActions}>
                          <TouchableOpacity>
                            <MaterialCommunityIcons
                              name="heart"
                              size={24}
                              color="#E50914"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.menuButton}>
                            <MaterialCommunityIcons
                              name="dots-vertical"
                              size={24}
                              color="#B3B3B3"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>

                      {/* Data e horário com ícone */}
                      <View style={styles.eventDetails}>
                        <MaterialCommunityIcons
                          name="calendar"
                          size={16}
                          color="#B3B3B3"
                        />
                        <Text style={styles.eventDate}>
                          {item.date} • {item.time}
                        </Text>
                      </View>

                      {/* Localização com ícone */}
                      <View style={styles.eventDetails}>
                        <MaterialCommunityIcons
                          name="map-marker"
                          size={16}
                          color="#B3B3B3"
                        />
                        <Text style={styles.eventLocation}>{item.location}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          {activeTab === 'events' && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Eventos passados</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}>Ver todos</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                scrollEnabled={false}
                data={PAST_FAVORITES}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.favoriteCard}>
                    {/* Imagem do evento/banda */}
                    <ImageBackground
                      source={item.image}
                      style={styles.cardImage}
                      resizeMode="cover">
                      <View style={styles.imageOverlay} />
                    </ImageBackground>

                    {/* Informações do evento */}
                    <View style={styles.cardInfo}>
                      <View style={styles.cardHeader}>
                        <View style={styles.bandInfo}>
                          <Text style={styles.bandName}>{item.band}</Text>
                          <Text style={styles.eventName}>{item.event}</Text>
                        </View>
                        <View style={styles.cardActions}>
                          <TouchableOpacity>
                            <MaterialCommunityIcons
                              name="heart"
                              size={24}
                              color="#E50914"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.menuButton}>
                            <MaterialCommunityIcons
                              name="dots-vertical"
                              size={24}
                              color="#B3B3B3"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>

                      {/* Data e horário com ícone */}
                      <View style={styles.eventDetails}>
                        <MaterialCommunityIcons
                          name="calendar"
                          size={16}
                          color="#B3B3B3"
                        />
                        <Text style={styles.eventDate}>
                          {item.date} • {item.time}
                        </Text>
                      </View>

                      {/* Localização com ícone */}
                      <View style={styles.eventDetails}>
                        <MaterialCommunityIcons
                          name="map-marker"
                          size={16}
                          color="#B3B3B3"
                        />
                        <Text style={styles.eventLocation}>{item.location}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          <View style={{ height: 80 }} />
        </ScrollView>
      </ImageBackground>
    </View >
  );
}

const styles = StyleSheet.create({
  // Container principal com fundo preto padrão
  container: {
    flex: 1,
  },

  mainBackground: {
    flex: 1,
  },

  // ScrollView para rolar o conteúdo
  scrollView: {
    flex: 1,
  },

  logo: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'MetalMania_400Regular',
    textAlign: 'center',
    width: '100%',
    marginVertical: 20,
  },

  // ===== HEADER =====
  // Seção do título principal com ícone
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },

  // Título principal
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  // ===== ABAS =====
  // Container das abas de filtro
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },

  // Botão individual da aba
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    backgroundColor: '#0a0a0a',
  },

  // Botão ativo com cor vermelha
  tabButtonActive: {
    borderColor: '#E50914',
    backgroundColor: 'rgba(229, 9, 20, 0.1)',
  },

  // Label da aba
  tabLabel: {
    color: '#666',
    fontSize: 13,
    fontWeight: '600',
  },

  // Label ativo com cor vermelha
  tabLabelActive: {
    color: '#E50914',
  },

  // ===== SEÇÕES =====
  // Container das seções
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },

  // Header da seção (título + ver todos)
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  // Título da seção
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Link "Ver todos"
  seeAll: {
    color: '#E50914',
    fontSize: 12,
    fontWeight: '600',
  },

  // ===== CARDS DE FAVORITOS =====
  // Card individual do favorito
  favoriteCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    height: 140,
  },

  // Imagem do card
  cardImage: {
    width: 140,
    height: 140,
  },

  // Overlay escuro sobre a imagem
  imageOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },

  // Container das informações do card
  cardInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },

  // Header do card (nome banda + ações)
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  // Informações da banda
  bandInfo: {
    flex: 1,
  },

  // Nome da banda
  bandName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  // Nome do evento
  eventName: {
    color: '#B3B3B3',
    fontSize: 12,
  },

  // Ações do card (favorito + menu)
  cardActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },

  // Botão do menu
  menuButton: {
    padding: 4,
  },

  // Detalhes do evento (data/localização)
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
});
