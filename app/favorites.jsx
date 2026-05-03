import { ImageBackground, StyleSheet } from 'react-native';

export default function FavoritesScreen() {
  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.mainBackground}
      resizeMode="cover">
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
  },
});
