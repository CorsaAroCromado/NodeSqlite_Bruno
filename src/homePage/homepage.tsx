import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      
      <View style={styles.grid}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#000456" }]}
          onPress={() => navigation.navigate("Listar Carros")}
        >
          <Text style={styles.cardText}>Carros</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#ffcd00" }]}
          onPress={() => navigation.navigate("Novo Carro")}
        >
          <Text style={styles.cardText}>Adicionar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#df7d00" }]}
          onPress={() => navigation.navigate("Editar Carro")}
        >
          <Text style={styles.cardText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#e91e63" }]}
          onPress={() => navigation.navigate("Deletar Carro")}
        >
          <Text style={styles.cardText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#000456",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15, // só funciona no RN 0.71+, se não der certo usa margin
  },
  card: {
    width: 120,
    height: 120,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
