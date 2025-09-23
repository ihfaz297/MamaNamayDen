import React, { useMemo, useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import RouteCard from "../components/RouteCard";
import routes from "../data/routes.json";
import type { RouteItem, RootStackParamList } from "../App";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const [q, setQ] = useState("");
  const data = routes as RouteItem[];

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return data;
    return data.filter(r =>
      r.name.toLowerCase().includes(needle) ||
      r.stops.join(" ").toLowerCase().includes(needle) ||
      r.id.toLowerCase().includes(needle)
    );
  }, [q, data]);

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
            onPress={() => navigation.navigate("RouteDetail", { routeData: item })}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
      <Text style={styles.footer}>GPS & offline cache — coming tomorrow</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F1A", padding: 16, paddingTop: 20 },
  input: {
    borderRadius: 12, borderWidth: 1, borderColor: "#223",
    paddingHorizontal: 14, paddingVertical: 10, color: "white", marginBottom: 12
  },
  footer: { color: "#6f84a8", textAlign: "center", marginTop: 8 }
});
