import { MetalMania_400Regular, useFonts } from "@expo-google-fonts/metal-mania";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

SplashScreen.preventAutoHideAsync();

function Logo() {
  return (
    <View flexDirection="row">
      <Text style={styles.logo}>Rock<Text style={{ color: '#E50914' }}>Finder</Text></Text>
    </View>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    MetalMania_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Tabs screenOptions={{
        headerTitleAlign: "center",
        headerTransparent: true,
        tabBarActiveTintColor: "#E50914",
        tabBarInactiveTintColor: "#B3B3B3",
        tabBarStyle: { backgroundColor: "#1A1A1A", height: 90 },

      }}>
        <Tabs.Screen name="index"
          options={{
            headerTitle: () => <Logo />,
            tabBarLabel: "Início",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="home-sharp"
                size={size}
                color={color}
              />
            ),
          }} />
        <Tabs.Screen name="search"
          options={{
            headerShown: false,
            tabBarLabel: "Buscar",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="search-sharp"
                size={size}
                color={color}
              />
            ),
          }} />
        <Tabs.Screen name="favorites"
          options={{
            headerTitle: "Meus Favoritos",
            headerTitleStyle: { fontFamily: 'MetalMania_400Regular', fontSize: 32, color: '#fff' },
            tabBarLabel: "Favoritos",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="heart"
                size={size}
                color={color}
              />
            ),
          }} />
        <Tabs.Screen name="profile"
          options={{
            headerTitle: "Meu Perfil",
            headerTitleStyle: { fontFamily: 'MetalMania_400Regular', fontSize: 32, color: '#fff' },
            tabBarLabel: "Perfil",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="person"
                size={size}
                color={color}
              />

            ),
          }} />
      </Tabs>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  logo: {
    fontSize: 52,
    color: '#fff',
    fontFamily: 'MetalMania_400Regular',
  },

});

