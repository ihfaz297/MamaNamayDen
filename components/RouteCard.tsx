import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import type { RouteItem } from "../App";

type Props = { route: RouteItem; onPress: () => void };

export default function RouteCard({ route, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{route.name}</Text>
        <Text style={styles.meta}>ID: {route.id} • Every {route.freqMins} mins</Text>
        <Text style={styles.stops} numberOfLines={1}>{route.stops.join(" → ")}</Text>
      </View>
      <Text style={styles.cta}>View</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 14, backgroundColor: "#121A2A" },
  name: { color: "white", fontWeight: "700" },
  meta: { color: "#8CA2C8", fontSize: 12, marginTop: 2 },
  stops: { color: "#BFD3FF", fontSize: 12, marginTop: 6 },
  cta: { color: "#9BB3FF", marginLeft: 12, fontWeight: "600" }
});
