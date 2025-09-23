import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "RouteDetail">;

export default function RouteDetailScreen({ route }: Props) {
  const { routeData } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{routeData.name}</Text>
      <Text style={styles.meta}>
        First: {routeData.firstBus} • Last: {routeData.lastBus} • Every {routeData.freqMins} mins
      </Text>
      <Text style={styles.h3}>Stops</Text>
      {routeData.stops.map((s, i) => (
        <Text key={i} style={styles.stop}>• {s}</Text>
      ))}
      <View style={styles.mapPlaceholder}>
        <Text style={{ color: "#9BB3FF" }}>Map placeholder (web demo)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F1A", padding: 16, gap: 6 },
  title: { color: "white", fontSize: 22, fontWeight: "700" },
  meta: { color: "#A4B0C0", marginBottom: 8 },
  h3: { color: "#CDE0FF", marginTop: 8, marginBottom: 4, fontWeight: "600" },
  stop: { color: "white", opacity: 0.9 },
  mapPlaceholder: {
    marginTop: 16, borderWidth: 1, borderColor: "#233", borderStyle: "dashed",
    borderRadius: 12, height: 160, alignItems: "center", justifyContent: "center", backgroundColor: "#0D1526"
  }
});
