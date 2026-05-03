import { MetalMania_400Regular, useFonts } from "@expo-google-fonts/metal-mania";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

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
      <StatusBar style="auto"/>
      <Tabs>
        <Tabs.Screen name="Início" />
        <Tabs.Screen name="Buscar" />
        <Tabs.Screen name="Favoritos" />
        <Tabs.Screen name="Perfil" />
      </Tabs>
    </React.Fragment>
  );
}
