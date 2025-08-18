import React, { useState } from "react";
import { Text, ScrollView, TextInput, Button, View, StyleSheet, Alert } from "react-native";
import styles from "../css/styles";
import { getdb } from "../../Conf/ConnectionInstance";
import { inserirCarro } from "../../Conf/Banco";
import type { Carro } from "../../types/carro";
import { useNavigation } from "@react-navigation/native";

export default function CreateCarro() {
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");
  const [preco, setPreco] = useState("");
  const [kmRodados, setKmRodados] = useState("");

  const navigation = useNavigation<any>(); 

  const handleSubmit = async () => {
    if (!nome || !marca || !ano || !cor || !preco || !kmRodados) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    const carro: Carro = {
      NOME: nome,
      MARCA: marca,
      ANO: parseInt(ano),
      COR: cor,
      PRECO: parseFloat(preco),
      KM_RODADOS: parseInt(kmRodados),
    };

    try {
      const db = await getdb();
      if (db) {
            const response = await inserirCarro(db, carro);
            if(response.success) {
              Alert.alert("Sucesso", "Carro inserido com sucesso!");
              setNome("");
              setMarca("");
              setAno("");
              setCor("");
              setPreco("");
              setKmRodados("");

              navigation.navigate("Listar Carros");
            }
      }
    } catch (error) {
      console.error("Erro ao inserir carro:", error);
      Alert.alert("Erro", "Não foi possível inserir o carro.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={formStyles.label}>Nome</Text>
      <TextInput style={formStyles.input} value={nome} onChangeText={setNome} placeholder="Ex: Civic Type R" />

      <Text style={formStyles.label}>Marca</Text>
      <TextInput style={formStyles.input} value={marca} onChangeText={setMarca} placeholder="Ex: Honda" />

      <Text style={formStyles.label}>Ano</Text>
      <TextInput
        style={formStyles.input}
        value={ano}
        onChangeText={setAno}
        placeholder="Ex: 2022"
        keyboardType="numeric"
      />

      <Text style={formStyles.label}>Cor</Text>
      <TextInput style={formStyles.input} value={cor} onChangeText={setCor} placeholder="Ex: Vermelho" />

      <Text style={formStyles.label}>Preço</Text>
      <TextInput
        style={formStyles.input}
        value={preco}
        onChangeText={setPreco}
        placeholder="Ex: 220000"
        keyboardType="numeric"
      />

      <Text style={formStyles.label}>KM Rodados</Text>
      <TextInput
        style={formStyles.input}
        value={kmRodados}
        onChangeText={setKmRodados}
        placeholder="Ex: 15000"
        keyboardType="numeric"
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Salvar Carro" color="#000456" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const formStyles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 12,
    color: "#000456",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    backgroundColor: "#fff",
  },
});
