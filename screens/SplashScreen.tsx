import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace("Home"), 1200);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mama Namay Den</Text>
      <Text style={styles.subtitle}>Student Bus Route Planner</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B1220", alignItems: "center", justifyContent: "center", gap: 10 },
  title: { color: "white", fontSize: 28, fontWeight: "700", letterSpacing: 1 },
  subtitle: { color: "#9BB3FF" }
});
