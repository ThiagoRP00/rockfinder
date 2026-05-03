import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.mainBackground}
      resizeMode="cover">
      <View>
        <Text style={styles.logo}>Rock<Text style={{ color: 'red' }}>Finder</Text></Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
  },

  logo: {
    fontFamily: 'MetalMania_400Regular',
    fontSize: 52,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },

});
