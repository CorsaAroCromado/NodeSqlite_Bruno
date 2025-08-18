import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { selectAllCarros, deleteCarro } from "../../Conf/Banco";
import { getdb } from "../../Conf/ConnectionInstance";
import type { Carro } from "../../types/carro";
import Spinner from "../utils/spinner";
import { Alert } from "react-native";

export default function GetCarros() {
  const [carros, setCarros] = useState<Carro[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchApiCarros = async () => {
    try {
      setLoading(true);
      const db = await getdb();

      if (db) {
        const response = await selectAllCarros(db);
        if (response.success && response.data) {
          setCarros(response.data);
        } else {
          setCarros([]);
        }
      }
    } catch (error) {
      console.log("Erro ao buscar carros", error);
      setCarros([]);
    } finally {
      setLoading(false);
    }
  };

  const deletarCarro = async (id: number) => {
    try {
      const db = await getdb();
      if (db) {
        const response = await deleteCarro(db, id);
        if (response.success) {
          Alert.alert("Sucesso", "Carro excluído com sucesso!");
          fetchApiCarros();
        } else {
          Alert.alert("Erro", response.message);
        }
      }
    } catch (error) {
      console.error("Erro ao excluir carro:", error);
      Alert.alert("Erro", "Não foi possível excluir o carro.");
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchApiCarros();
    }, [])
  );

  if (loading) {
    return (
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "center" }}>
        <Spinner />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={cardStyles.scrollContainer}>
      {carros.map((carro) => (
        <View key={carro.ID_CARRO} style={cardStyles.card}>
          <Text style={cardStyles.nome}>{carro.NOME}</Text>
          <Text style={cardStyles.info}>Marca: {carro.MARCA}</Text>
          <Text style={cardStyles.info}>Ano: {carro.ANO}</Text>
          <Text style={cardStyles.info}>Cor: {carro.COR}</Text>
          <Text style={cardStyles.info}>
            Preço: R$ {carro.PRECO.toLocaleString("pt-BR")}
          </Text>
          <Text style={cardStyles.info}>
            KM Rodados: {carro.KM_RODADOS.toLocaleString("pt-BR")} km
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const cardStyles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, // sombra Android
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#000456", // azul da tua paleta
  },
  info: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
});
