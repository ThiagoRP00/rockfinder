import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function EventDetails() {

  const { id } = useLocalSearchParams();
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    carregarEvento();
  }, []);

  async function carregarEvento() {
    const valor = await AsyncStorage.getItem('eventos_key');

    if (!valor) return;

    const eventos = JSON.parse(valor);

    const encontrado = eventos.find(
      item => item.id == id
    );

    setEvento(encontrado);
  }

  if (!evento) {
    return (
      <View style={styles.loading}>
        <Text style={{ color: '#FFF' }}>
          Carregando...
        </Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.title}>
          {evento.nome}
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Bandas</Text>
          <Text style={styles.text}>
            {evento.bandas}
          </Text>

          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Data</Text>
              <Text style={styles.text}>
                {evento.data}
              </Text>
            </View>
            <View>
              <Text style={styles.label}>Horário</Text>
              <Text style={styles.text}>
                {evento.horario}
              </Text>
            </View>

          </View>

          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Cidade</Text>
              <Text style={styles.text}>
                {evento.cidade}
              </Text>
            </View>
            <View>
              <Text style={styles.label}>Local</Text>
              <Text style={styles.text}>
                {evento.local}
              </Text>
            </View>
          </View>

          <Text style={styles.label}>Descrição</Text>
          <Text style={styles.text}>
            {evento.descricao}
          </Text>

        </View>

      </ScrollView>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  container: {
    padding: 20,

  },

  loading: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 32,
    color: '#E50914',
    fontWeight: 'bold',
    marginBottom: 20,
    letterSpacing: 0.5,
  },

  card: {
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    padding: 10,
    borderRadius: 12,
    gap: 10,
  },

  row: {
    flexDirection: 'row',
    gap: 100,
  },

  label: {
    color: '#E50914',
    fontWeight: 'bold',
    fontSize: 18,
  },

  text: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 10,
  },
});