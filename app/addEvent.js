import { useCallback, useEffect, useState } from "react";
import {
	Alert,
	ImageBackground,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";


import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";


export default function AddEventsScreen() {
	const [nome, setNome] = useState("");
	const [bandas, setBandas] = useState("");
	const [data, setData] = useState("");
	const [horario, setHorario] = useState("");
	const [cidade, setCidade] = useState("");
	const [local, setLocal] = useState("");
	const [eventos, setEventos] = useState([]);

	const dadosIniciais = "Nenhum evento encontrado";

	useEffect(() => {
		carregarEventosExistentes();
	}, []);

	useFocusEffect(
		useCallback(() => {
			carregarEventosExistentes();
		}, [])
	);

	const carregarEventosExistentes = async () => {
		try {
			const valor = await AsyncStorage.getItem('eventos_key');
			if (valor !== null) {
				const jsonValue = JSON.parse(valor);
				setEventos(jsonValue);
			} else {
				setEventos([]);
			}
		} catch (e) {
			Alert.alert("Erro", "Não foi possível carregar os dados.");
		}
	}

	const salvarNoDispositivo = async (listaEventos) => {
		try {
			const jsonValue = JSON.stringify(listaEventos);
			await AsyncStorage.setItem('eventos_key', jsonValue);
		} catch (e) {
			Alert.alert("Erro ao salvar", "Não foi possível salvar os dados.");
		}
	}

	async function adicionarEvento() {
		if (!nome || !bandas || !data || !cidade || !local) {
			Alert.alert("Erro", "Preencha todos os campos!");
			return;
		}

		const novoItem = { nome, bandas, data, horario, cidade, local };
		const novosEventos = [...eventos, novoItem];

		setEventos(novosEventos);

		await salvarNoDispositivo(novosEventos);

		setNome("");
		setBandas("");
		setData("");
		setHorario("");
		setCidade("");
		setLocal("");
		Keyboard.dismiss();

		Alert.alert("Sucesso", "Evento adicionado!");
	}

	return (
		<ImageBackground
			source={require('../assets/images/background.png')}
			style={styles.mainBackground}
			resizeMode="cover">
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<SafeAreaView>
					<ScrollView contentContainerStyle={styles.container}>

						<Text style={styles.title}>Adicionar evento</Text>

						<View style={styles.form}>
							<TextInput
								style={styles.input}
								placeholder="Nome do Evento"
								value={nome}
								onChangeText={setNome}
							/>

							<TextInput
								style={styles.input}
								placeholder="Bandas"
								value={bandas}
								onChangeText={setBandas}
							/>

							<TextInput
								style={styles.input}
								placeholder="DD/MM/YYYY"
								value={data}
								onChangeText={setData}
							/>

							<TextInput
								style={styles.input}
								placeholder="00:00"
								value={horario}
								onChangeText={setHorario}
							/>

							<TextInput
								style={styles.input}
								placeholder="Cidade"
								value={cidade}
								onChangeText={setCidade}
							/>

							<TextInput
								style={styles.input}
								placeholder="Local do evento"
								value={local}
								onChangeText={setLocal}
							/>

							<TouchableOpacity style={styles.button} onPress={adicionarEvento}>
								<Text style={styles.buttonText}>Adicionar</Text>
							</TouchableOpacity>
						</View>


					</ScrollView>
				</SafeAreaView>
			</KeyboardAvoidingView>
		</ImageBackground>

	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		paddingHorizontal: 20,
	},

	mainBackground: {
		flex: 1,
	},

	title: {
		fontFamily: 'MetalMania_400Regular',
		fontSize: 32,
		marginBottom: 20,
		textAlign: 'center',
		color: '#FFF',
	},

	form: {
		backgroundColor: '#2A2A2A',
		padding: 20,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.1,
		shadowRadius: 4
	},

	input: {
		borderWidth: 1,
		borderColor: "#1A1A1A",
		padding: 12,
		marginBottom: 15,
		borderRadius: 8,
		backgroundColor: '#fff'
	},

	button: {
		backgroundColor: "#E50914",
		padding: 15,
		borderRadius: 8
	},

	buttonText: {
		color: "#fff",
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 16
	},
});