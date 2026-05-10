import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { FlatList, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// ===== DADOS MOCK =====
// Estes dados devem ser substituídos por dados reais de uma API

// Dados dos destaques (carousel principal)
const HIGHLIGHTS_DATA = [
  {
    id: '1',
    band: 'SLAYER',
    event: 'WORLD TOUR 2026',
    date: '18 DE JULHO',
    location: 'ALLIANZ PARQUE - SP',
    image: require('../assets/images/highlight1.jpg'),
  },
  {
    id: '2',
    band: 'METALLICA',
    event: 'WORLD TOUR 2026',
    date: '25 DE JULHO',
    location: 'ESTÁDIO DO MORUMBI - SP',
    image: require('../assets/images/highlight2.jpg'),
  },
];

// Dados dos próximos shows (lista horizontal scrollável)
const UPCOMING_SHOWS = [
  {
    id: '1',
    band: 'SEPULTURA',
    date: '24',
    month: 'MAI',
    location: 'Vibra SP - São Paulo',
    time: '20:00',
    image: require('../assets/images/upcoming1.jpg'),
  },
  {
    id: '2',
    band: 'AVENGED SEVENFOLD',
    date: '27',
    month: 'MAI',
    location: 'Jeunesse Arena - RJ',
    time: '21:00',
    image: require('../assets/images/upcoming2.jpeg'),
  },
  {
    id: '3',
    band: 'BRING ME THE HORIZON',
    date: '02',
    month: 'JUN',
    location: 'Audio Club - SP',
    time: '19:30',
    image: require('../assets/images/background.png'),
  },
];

// Dados dos eventos em alta (cards grandes com botão de detalhes)
const TRENDING = [
  {
    id: '1',
    band: 'AC/DC',
    event: 'POWER UP TOUR',
    date: '10 DE AGO • 2024',
    location: 'MORUMBIS - SP',
    image: require('../assets/images/background.png'),
  },
  {
    id: '2',
    band: 'IRON MAIDEN',
    event: 'LEGACY OF THE BEAST',
    date: '15 DE AGO • 2024',
    location: 'ESTÁDIO DO MORUMBI - SP',
    image: require('../assets/images/background.png'),
  },
];

// Dados dos festivais (cards com ícone de favorito)
const FESTIVALS = [
  {
    id: '1',
    name: 'ROCK IN RIO',
    dates: '13, 14, 15 E 19, 20, 21 SET',
    location: 'RIO DE JANEIRO - RJ',
    image: require('../assets/images/background.png'),
  },
  {
    id: '2',
    name: 'MAXIMUS FESTIVAL',
    dates: '16 E 17 DE NOV',
    location: 'INTERLAGOS - SP',
    image: require('../assets/images/background.png'),
  },
  {
    id: '3',
    name: 'LOLLAPALOOZA BRASIL',
    dates: '22, 23 E 24 DE MAR',
    location: 'INTERLAGOS - SP',
    image: require('../assets/images/background.png'),
  },
];

// ===== COMPONENTE PRINCIPAL =====
export default function HomeScreen() {
  // Estado para controlar o slide atual do carousel de destaques
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);

  // Função para atualizar o índice do slide ao fazer scroll horizontal
  const handleScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    setCurrentSlide(slide);
  };

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

          <View flexDirection="row" >
            <Text style={styles.logo}>Rock<Text style={{ color: '#E50914' }}>Finder</Text></Text>
          </View>

          {/* ===== SEÇÃO: CAROUSEL DE DESTAQUES ===== */}
          {/* Carousel com paginação controlada e indicadores de dots */}
          <View style={styles.highlightsSection}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled // Faz o scroll parar em múltiplos da largura da tela
              onScroll={handleScroll} // Atualiza currentSlide ao fazer scroll
              scrollEventThrottle={16}>
              {HIGHLIGHTS_DATA.map((item) => (
                <View key={item.id} style={styles.highlightCard}>
                  {/* Imagem de fundo com overlay escuro */}
                  <ImageBackground
                    source={item.image}
                    style={styles.highlightImage}
                    resizeMode="cover">
                    <View style={styles.highlightOverlay}>
                      <Text style={styles.highlightLabel}>DESTAQUE</Text>
                      <Text style={styles.highlightBand}>{item.band}</Text>
                      <Text style={styles.highlightEvent}>{item.event}</Text>
                      <View style={styles.highlightInfo}>
                        <MaterialCommunityIcons name="calendar" size={16} color="#fff" />
                        <Text style={styles.highlightDetail}>{item.date}</Text>
                      </View>
                      <View style={styles.highlightInfo}>
                        <MaterialCommunityIcons name="map-marker" size={16} color="#fff" />
                        <Text style={styles.highlightDetail}>{item.location}</Text>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              ))}
            </ScrollView>
            {/* Indicadores de slides (dots) */}
            <View style={styles.dotsContainer}>
              {HIGHLIGHTS_DATA.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    { backgroundColor: currentSlide === index ? '#E50914' : '#666' }, // Dot ativo é vermelho
                  ]}
                />
              ))}
            </View>
          </View>

          {/* ===== SEÇÃO: PRÓXIMOS SHOWS ===== */}
          {/* Lista horizontal com cards de shows próximos */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Próximos shows</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>Ver todos</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal // Renderização horizontal
              data={UPCOMING_SHOWS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.eventCard}>
                  {/* Card com imagem de fundo e data */}
                  <ImageBackground
                    source={item.image}
                    style={styles.eventImage}
                    resizeMode="cover">

                    <TouchableOpacity style={styles.favoriteButton}>
                      <MaterialCommunityIcons name="heart-outline" size={20} color="#E50914" />
                    </TouchableOpacity>
                    
                    <View style={styles.eventOverlay}>
                      {/* Box com data do evento */}
                      <View style={styles.dateBox}>
                        <Text style={styles.dateDay}>{item.date}</Text>
                        <Text style={styles.dateMonth}>{item.month}</Text>
                      </View>
                    </View>
                  </ImageBackground>
                  {/* Informações do show abaixo da imagem */}
                  <View style={styles.eventInfo}>

                    <Text style={styles.bandName}>{item.band}</Text>
                    {/* Localização com ícone */}
                    <View style={styles.locationRow}>
                      <MaterialCommunityIcons name="map-marker" size={14} color="#B3B3B3" />
                      <Text style={styles.location}>{item.location}</Text>
                    </View>
                    {/* Horário com ícone */}
                    <View style={styles.timeRow}>
                      <MaterialCommunityIcons name="clock" size={14} color="#B3B3B3" />
                      <Text style={styles.time}>{item.time}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* ===== SEÇÃO: EM ALTA ===== */}
          {/* Cards grandes com informações de eventos em destaque */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Em alta</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>Ver todos</Text>
              </TouchableOpacity>
            </View>
            {TRENDING.map((item) => (
              <TouchableOpacity key={item.id} style={styles.trendingCard}>
                {/* Imagem de fundo com overlay */}
                <ImageBackground
                  source={item.image}
                  style={styles.trendingImage}
                  resizeMode="cover">
                  <View style={styles.trendingOverlay} />
                </ImageBackground>
                <View style={styles.trendingInfo}>
                  <Text style={styles.trendingBand}>{item.band}</Text>
                  <Text style={styles.trendingEvent}>{item.event}</Text>
                  <View style={styles.trendingDetails}>
                    <Text style={styles.trendingDate}>{item.date}</Text>
                    {/* Separador visual entre data e localização */}
                    <View style={styles.detailSeparator} />
                    <MaterialCommunityIcons name="map-marker" size={14} color="#E50914" />
                    <Text style={styles.trendingLocation}>{item.location}</Text>
                  </View>
                </View>
                {/* Botão "VER DETALHES" no canto superior direito */}
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>VER DETALHES</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>

          {/* ===== SEÇÃO: FESTIVAIS ===== */}
          {/* Lista horizontal de festivais com botão de favorito */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Festivais</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>Ver todos</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={FESTIVALS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.festivalCard}>
                  {/* Card com imagem e informações do festival */}
                  <ImageBackground
                    source={item.image}
                    style={styles.festivalImage}
                    resizeMode="cover">
                    <View style={styles.festivalOverlay}>
                      <Text style={styles.festivalName}>{item.name}</Text>
                      <Text style={styles.festivalDates}>{item.dates}</Text>
                      {/* Localização com ícone */}
                      <View style={styles.festivalLocation}>
                        <MaterialCommunityIcons name="map-marker" size={14} color="#E50914" />
                        <Text style={styles.festivalLocationText}>{item.location}</Text>
                      </View>
                    </View>
                  </ImageBackground>
                  {/* Botão de favorito flutuante no canto inferior direito */}
                  <TouchableOpacity style={styles.festivalFavorite}>
                    <MaterialCommunityIcons name="heart-outline" size={24} color="#E50914" />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* Espaçamento inferior para acomodar a barra de navegação abaixo (tab bar) */}
          <View style={{ height: 80 }} />

        </ScrollView>
      </ImageBackground>
    </View>
  );
}

// ===== ESTILOS =====
// Definição de todos os estilos usando StyleSheet para otimização de performance
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mainBackground: {
    flex: 1,
  },

  logo: {
    fontSize: 52,
    color: '#fff',
    fontFamily: 'MetalMania_400Regular',
    textAlign: 'center',
    width: '100%',
    marginVertical: 20,
  },

  scrollView: {
    flex: 1,
  },

  // notificationButton: {
  //   position: 'relative',
  // },

  // notificationBadge: {
  //   position: 'absolute',
  //   top: -8,
  //   right: -8,
  //   backgroundColor: '#E50914',
  //   borderRadius: 10,
  //   width: 20,
  //   height: 20,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },

  highlightsSection: {
    marginBottom: 24,
  },

  highlightCard: {
    width: 360,
    height: 280,
    marginRight: 0,
  },

  highlightImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  highlightOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 14,
    gap: 5,
  },

  highlightLabel: {
    color: '#E50914',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  highlightBand: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },

  highlightEvent: {
    color: '#fff',
    fontSize: 14,
  },

  highlightInfo: {
    flexDirection: 'row',
    gap: 8,
  },

  highlightDetail: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  seeAll: {
    color: '#E50914',
    fontSize: 14,
    fontWeight: '500',
  },

  eventCard: {
    width: 160,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },

  eventImage: {
    width: '100%',
    height: 140,
    justifyContent: 'flex-end',
  },

  eventOverlay: {
    padding: 8,
  },

  dateBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },

  dateDay: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  dateMonth: {
    color: '#fff',
    fontSize: 12,
  },

  eventInfo: {
    padding: 12,
    flex: 1,
  },

  favoriteButton: {
    position: 'absolute',
    top: 1,
    right: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  bandName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  location: {
    color: '#999',
    fontSize: 11,
    marginLeft: 4,
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  time: {
    color: '#999',
    fontSize: 11,
    marginLeft: 4,
  },

  // TRENDING
  trendingCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    height: 160,
  },

  trendingImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  trendingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  trendingInfo: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  trendingBand: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  trendingEvent: {
    color: '#B3B3B3',
    fontSize: 12,
    marginBottom: 8,
  },

  trendingDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  trendingDate: {
    color: '#999',
    fontSize: 11,
  },

  detailSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E50914',
    marginHorizontal: 8,
  },

  trendingLocation: {
    color: '#999',
    fontSize: 11,
    marginLeft: 4,
  },

  detailsButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    borderWidth: 1.5,
    borderColor: '#E50914',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },

  detailsButtonText: {
    color: '#E50914',
    fontSize: 10,
    fontWeight: 'bold',
  },

  // FESTIVALS
  festivalCard: {
    width: 160,
    height: 200,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },

  festivalImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  festivalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
  },

  festivalName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  festivalDates: {
    color: '#B3B3B3',
    fontSize: 11,
    marginBottom: 8,
  },

  festivalLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  festivalLocationText: {
    color: '#999',
    fontSize: 10,
    marginLeft: 4,
  },

  festivalFavorite: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
