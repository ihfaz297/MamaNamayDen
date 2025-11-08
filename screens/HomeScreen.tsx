import React, { useMemo, useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import RouteCard from "../components/RouteCard";

import type { RouteItem, RootStackParamList } from "../App";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

// 🔹 Our static display data (you already had this inline)
const routes: RouteItem[] = [
  {
    id: "SUST-01",
    name: "SUST ⇄ Madina Market",
    stops: ["SUST Main Gate", "Akhalia", "Sobhanighat", "Chowhatta", "Madina Market"],
    firstBus: "07:00",
    lastBus: "21:30",
    freqMins: 10,
  },
  {
    id: "SUST-02",
    name: "SUST ⇄ Ambarkhana",
    stops: ["SUST Main Gate", "Akhalia", "Ambarkhana"],
    firstBus: "07:15",
    lastBus: "21:45",
    freqMins: 12,
  },
  {
    id: "SUST-03",
    name: "SUST ⇄ Zindabazar",
    stops: ["SUST Main Gate", "Chowhatta", "Bondor", "Zindabazar"],
    firstBus: "07:30",
    lastBus: "22:00",
    freqMins: 15,
  },
];

// 🔹 NEW: import the algorithm
import { findBestRoute } from "../src/routing/routeAlgo";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const [q, setQ] = useState("");
  const data = routes;

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return data;
    return data.filter((r) =>
      r.name.toLowerCase().includes(needle) ||
      r.stops.join(" ").toLowerCase().includes(needle) ||
      r.id.toLowerCase().includes(needle)
    );
  }, [q, data]);

  // 🔹 NEW: demo route on the UI – SUST → ZINDABAZAR
  const demoResult = useMemo(
    () => findBestRoute("SUST", "ZINDABAZAR"),
    []
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search route, stop, or ID..."
        placeholderTextColor="#778"
        value={q}
        onChangeText={setQ}
        style={styles.input}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RouteCard
            route={item}
            onPress={() =>
              navigation.navigate("RouteDetail", { routeData: item })
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingBottom: 24 }}
      />

      {demoResult && (
        <View style={styles.debugBox}>
          <Text style={styles.debugTitle}>
            Best route (demo): SUST → ZINDABAZAR
          </Text>
          <Text style={styles.debugLine}>
            Bus time: {demoResult.totalBusTime} min | Local time:{" "}
            {demoResult.totalLocalTime} min | Total: {demoResult.totalTime} min
          </Text>
          {demoResult.path.map((leg, idx) => (
            <Text key={idx} style={styles.debugLine}>
              {idx + 1}. {leg.from} → {leg.to} ({leg.mode}, {leg.timeMins} min)
            </Text>
          ))}
        </View>
      )}

      <Text style={styles.footer}>GPS & offline cache — coming tomorrow</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F1A",
    padding: 16,
    paddingTop: 20,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#223",
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "white",
    marginBottom: 12,
  },
  footer: {
    color: "#6f84a8",
    textAlign: "center",
    marginTop: 8,
  },
  debugBox: {
    marginTop: 16,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#223",
    backgroundColor: "#0F172A",
  },
  debugTitle: {
    color: "#e5e7eb",
    fontWeight: "600",
    marginBottom: 4,
  },
  debugLine: {
    color: "#9ca3af",
    fontSize: 12,
  },
});
