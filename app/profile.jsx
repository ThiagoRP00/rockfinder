import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const USER_DATA = {
  name: 'Lucas Carvalho',
  username: '@lucas.rock',
  avatar: require('../assets/images/profile.jpg'),
  memberSince: 2024,
  stats: {
    savedEvents: 23,
    favoriteBands: 15,
    favoriteLocations: 8,
  },
};

const FAVORITE_GENRES = [
  { id: '1', name: 'Rock', icon: 'guitar' },
  { id: '2', name: 'Metal', icon: 'skull' },
  { id: '3', name: 'Punk', icon: 'alert' },
  { id: '4', name: 'Hard Rock', icon: 'lightning-bolt' },
];

const SAVED_EVENTS = [
  {
    id: '1',
    band: 'Iron Maiden',
    date: '24',
    month: 'MAI',
    location: 'Allianz Parque • SP',
    image: require('../assets/images/highlight2.jpg'),
  },
  {
    id: '2',
    band: 'Rock in Rio 2024',
    date: '07',
    month: 'JUN',
    location: 'Cidade do Rock • RJ',
    image: require('../assets/images/highlight2.jpg'),
  },
  {
    id: '3',
    band: 'The Offspring',
    date: '15',
    month: 'JUN',
    location: 'Vibra SP • SP',
    image: require('../assets/images/highlight2.jpg'),
  },
  {
    id: '4',
    band: 'Slipknot',
    date: '29',
    month: 'JUN',
    location: 'Espanha',
    image: require('../assets/images/highlight2.jpg'),
  },
];

const MENU_ITEMS = [
  {
    id: '1',
    label: 'Ingressos comprados',
    icon: 'ticket',
    color: '#E50914',
  },
  {
    id: '2',
    label: 'Histórico de pesquisas',
    icon: 'history',
    color: '#E50914',
  },
  {
    id: '3',
    label: 'Notificações',
    icon: 'bell',
    color: '#E50914',
  },
  {
    id: '4',
    label: 'Configurações',
    icon: 'cog',
    color: '#E50914',
  },
  {
    id: '5',
    label: 'Ajuda e suporte',
    icon: 'help-circle',
    color: '#E50914',
  },
];

export default function ProfileScreen() {
  const [editingGenres, setEditingGenres] = useState(false);

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

          <Text style={styles.logo}>Meu Perfil</Text>

          <View style={styles.profileSection}>
            {/* Avatar circular com botão de câmera */}
            <View style={styles.avatarContainer}>
              <Image
                source={USER_DATA.avatar}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.cameraButton}>
                <MaterialCommunityIcons
                  name="camera"
                  size={18}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            {/* Informações do usuário */}
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{USER_DATA.name}</Text>
              <Text style={styles.userUsername}>{USER_DATA.username}</Text>

              {/* Badge de membro desde */}
              <View style={styles.memberBadge}>
                <MaterialCommunityIcons
                  name="star"
                  size={14}
                  color="#E50914"
                />
                <Text style={styles.memberText}>
                  Membro desde {USER_DATA.memberSince}
                </Text>
              </View>
            </View>
          </View>

          {/* ===== SEÇÃO: ESTATÍSTICAS ===== */}
          {/* Cards com números de eventos, bandas e locais */}
          <View style={styles.statsContainer}>
            {/* Eventos salvos */}
            <View style={styles.statCard}>
              <MaterialCommunityIcons
                name="ticket"
                size={28}
                color="#E50914"
              />
              <Text style={styles.statNumber}>{USER_DATA.stats.savedEvents}</Text>
              <Text style={styles.statLabel}>Eventos salvos</Text>
            </View>

            {/* Bandas favoritas */}
            <View style={styles.statCard}>
              <MaterialCommunityIcons
                name="heart"
                size={28}
                color="#E50914"
              />
              <Text style={styles.statNumber}>{USER_DATA.stats.favoriteBands}</Text>
              <Text style={styles.statLabel}>Bandas favoritas</Text>
            </View>

            {/* Locais favoritos */}
            <View style={styles.statCard}>
              <MaterialCommunityIcons
                name="map-marker"
                size={28}
                color="#E50914"
              />
              <Text style={styles.statNumber}>{USER_DATA.stats.favoriteLocations}</Text>
              <Text style={styles.statLabel}>Locais favoritos</Text>
            </View>
          </View>

          {/* ===== SEÇÃO: GÊNEROS FAVORITOS ===== */}
          {/* Gêneros de música que o usuário gosta */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Gêneros favoritos</Text>
              <TouchableOpacity onPress={() => setEditingGenres(!editingGenres)}>
                <Text style={styles.editLink}>Editar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.genresContainer}>
              {FAVORITE_GENRES.map((genre) => (
                <TouchableOpacity
                  key={genre.id}
                  style={styles.genreTag}>
                  <MaterialCommunityIcons
                    name={genre.icon}
                    size={16}
                    color="#E50914"
                  />
                  <Text style={styles.genreTagText}>{genre.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Eventos salvos</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>Ver todos</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              horizontal // Renderização horizontal
              data={SAVED_EVENTS}
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

          {/* ===== SEÇÃO: MENU DE OPÇÕES ===== */}
          {/* Links para diferentes funcionalidades */}
          <View style={styles.section}>
            {MENU_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}>
                {/* Ícone e label do menu */}
                <View style={styles.menuItemContent}>
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={24}
                    color={item.color}
                  />
                  <Text style={styles.menuItemLabel}>{item.label}</Text>
                </View>
                {/* Seta indicando que é clicável */}
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Espaçamento inferior para acomodar a barra de navegação */}
          <View style={{ height: 80 }} />
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

// ===== ESTILOS =====
// Definição de todos os estilos usando StyleSheet para otimização de performance
const styles = StyleSheet.create({
  // Container principal com fundo preto padrão
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
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

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  // Ícone de notificação com badge
  notificationIcon: {
    position: 'relative',
  },

  // Badge com número de notificações
  notificationBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#E50914',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Número dentro do badge
  badgeNumber: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },

  profileSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 24,
    alignItems: 'flex-start',
    gap: 16,
  },

  // Container do avatar com botão de câmera
  avatarContainer: {
    position: 'relative',
    width: 120,
    height: 120,
  },

  // Imagem do avatar circular
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#666',
  },

  // Botão de câmera flutuante
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#0a0a0a',
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Container das informações do usuário
  userInfo: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  // Nome do usuário
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  // Username (@)
  userUsername: {
    color: '#B3B3B3',
    fontSize: 14,
    marginBottom: 12,
  },

  // Badge de membro
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(229, 9, 20, 0.1)',
    borderWidth: 1,
    borderColor: '#E50914',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },

  // Texto do badge de membro
  memberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  // ===== STATS SECTION =====
  // Container das estatísticas
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },

  // Card individual de estatística
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },

  // Número da estatística
  statNumber: {
    color: '#E50914',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },

  // Label da estatística
  statLabel: {
    color: '#B3B3B3',
    fontSize: 11,
    textAlign: 'center',
  },

  // ===== SECTIONS =====
  // Container das seções
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },

  // Header da seção (título + ação)
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
    fontWeight: 'bold',
  },

  // Link "Editar" ou "Ver todos"
  editLink: {
    color: '#E50914',
    fontSize: 12,
    fontWeight: '600',
  },

  // Link "Ver todos"
  seeAll: {
    color: '#E50914',
    fontSize: 12,
    fontWeight: '600',
  },

  // ===== GENRES =====
  // Container dos gêneros favoritos
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  // Tag de gênero individual
  genreTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },

  // Texto da tag
  genreTagText: {
    color: '#fff',
    fontSize: 12,
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

  // ===== MENU =====
  // Item individual do menu
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    backgroundColor: '#1A1A1A',

  },

  // Container do conteúdo do item
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  // Label do item do menu
  menuItemLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
