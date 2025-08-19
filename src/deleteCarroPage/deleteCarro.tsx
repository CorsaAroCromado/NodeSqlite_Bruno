import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { ScrollView, View, Text, StyleSheet, Button } from "react-native";
import { selectAllCarros, deleteCarro } from "../../Conf/Banco";
import { getdb } from "../../Conf/ConnectionInstance";
import type { Carro } from "../../types/carro";
import style from "../css/styles";
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
    <ScrollView contentContainerStyle={style.scrollContainer}>
      {carros.map((carro) => (
        <View key={carro.ID_CARRO} style={style.card}>
        <View>
          <Text style={style.nome}>{carro.NOME}</Text>
          <Text style={style.nome}>{carro.NOME}</Text>
          <Text style={style.info}>Marca: {carro.MARCA}</Text>
          <Text style={style.info}>Ano: {carro.ANO}</Text>
          <Text style={style.info}>Cor: {carro.COR}</Text>
          <Text style={style.info}>
            Preço: R$ {carro.PRECO.toLocaleString("pt-BR")}
          </Text>
          <Text style={style.info}>
            KM Rodados: {carro.KM_RODADOS.toLocaleString("pt-BR")} km
          </Text>
          </View>
          <View>
            <Button title="Excluir"></Button>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}


