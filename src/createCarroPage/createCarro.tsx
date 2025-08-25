import React, { useState } from "react";
import { Text, ScrollView, TextInput, View, StyleSheet, Alert } from "react-native";
import { getdb } from "../../Conf/ConnectionInstance";
import { inserirCarro } from "../../Conf/Banco";
import type { Carro } from "../../types/carro";
import { useNavigation } from "@react-navigation/native";
import styles from "../css/styles";
import { Button } from "react-native-paper";

export default function CreateCarro() {
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");
  const [preco, setPreco] = useState("");
  const [kmRodados, setKmRodados] = useState("");

  const navigation = useNavigation<any>(); 

  const handleSubmit = async () => {
    console.log("Cadastrando carro:", { nome, marca, ano, cor, preco, kmRodados });
    if (!nome || !marca || !ano || !cor || !preco || !kmRodados) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }else{
    const carro: Carro = {
      ID_CARRO: 0,
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
  }
  };

  const clearForm = () => {
    setNome("");
    setMarca("");
    setAno("");
    setCor("");
    setPreco("");
    setKmRodados("");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.divForm}>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex: Civic Type R" />

      <Text style={styles.label}>Marca</Text>
      <TextInput style={styles.input} value={marca} onChangeText={setMarca} placeholder="Ex: Honda" />

      <Text style={styles.label}>Ano</Text>
      <TextInput
        style={styles.input}
        value={ano}
        onChangeText={setAno}
        placeholder="Ex: 2022"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Cor</Text>
      <TextInput style={styles.input} value={cor} onChangeText={setCor} placeholder="Ex: Vermelho" />

      <Text style={styles.label}>Preço</Text>
      <TextInput
        style={styles.input}
        value={preco}
        onChangeText={setPreco}
        placeholder="Ex: 220000"
        keyboardType="numeric"
      />

      <Text style={styles.label}>KM Rodados</Text>
      <TextInput
        style={styles.input}
        value={kmRodados}
        onChangeText={setKmRodados}
        placeholder="Ex: 15000"
        keyboardType="numeric"
      />

      <View style={{ marginTop: 20, width: "100%", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
         <Button style={styles.buttonSubmit} icon="plus" mode="contained" onPress={() => handleSubmit()}>
          Cadastrar
          </Button>
         <Button style={styles.buttonClear} icon="" mode="contained" onPress={() => clearForm()}>
            Limpar
          </Button>
      </View>
      </View>
    </ScrollView>
  );
}


