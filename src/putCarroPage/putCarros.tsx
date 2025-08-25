import React, { useState, useEffect } from "react";
import { Text, ScrollView, TextInput, View, StyleSheet, Alert } from "react-native";
import { getdb } from "../../Conf/ConnectionInstance";
import { updateUsuario, selectCarroId } from "../../Conf/Banco";
import type { Carro } from "../../types/carro";
import { useNavigation } from "@react-navigation/native";
import styles from "../css/styles";
import { Button } from "react-native-paper";
import { useRoute } from "@react-navigation/native";

export default function CreateCarro() {
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");
  const [preco, setPreco] = useState("");
  const [kmRodados, setKmRodados] = useState("");
  const [idPesquisar, setIdPesquisar] = useState("");
  const [carro, setCarro] = useState<Carro>({} as Carro);

  const navigation = useNavigation<any>(); 
  const route = useRoute();

    const getCarrosInfo = async (id: number) => {
  try {
    const db = await getdb();
    if (db) {
      const response = await selectCarroId(db, id);
      if (response.success && response.data) {
        const carroEncontrado = response.data;
        setCarro(carroEncontrado); // 👈 atualiza o estado carro
        setNome(carroEncontrado.NOME);
        setMarca(carroEncontrado.MARCA);
        setAno(carroEncontrado.ANO.toString());
        setCor(carroEncontrado.COR);
        setPreco(carroEncontrado.PRECO.toString());
        setKmRodados(carroEncontrado.KM_RODADOS.toString());
      } else {
        setCarro({} as Carro); // 👈 limpa para esconder o form
        Alert.alert("Atenção", "Nenhum carro encontrado com esse ID.");
      }
    }
  } catch (error) {
    console.error("Erro ao obter informações dos carros:", error);
    Alert.alert("Erro", "Não foi possível obter as informações do carro.");
  }
};

 const confirmarEdicao = (id: number) => {
  Alert.alert(
    "Confirmar Edição",
    "Tem certeza que deseja editar este carro?",
    [
      {
        text: "Cancelar",
        style: "cancel", // botão padrão de cancelar
      },
      {
        text: "confirmar",
        style: "destructive", // deixa o botão em vermelho no iOS
        onPress: () => handleSubmit(), // chama a função de exclusão
      },
    ],
    { cancelable: true }
  );
};


  const handleSubmit = async () => {
    console.log("Cadastrando carro:", carro);
    if (!nome || !marca || !ano || !cor || !preco || !kmRodados) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    try {
      const db = await getdb();
      if (db) {
                const carro: Carro = {
                ID_CARRO: 0,
                NOME: nome,
                MARCA: marca,
                ANO: parseInt(ano),
                COR: cor,
                PRECO: parseFloat(preco),
                KM_RODADOS: parseInt(kmRodados),
                };
            const response = await updateUsuario(db,Number(idPesquisar), carro);
            if(response.success) {
              Alert.alert("Sucesso", "Carro editado com sucesso!");
                setIdPesquisar("");
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

  const clearForm = () => {
    setIdPesquisar("");
    setNome("");
    setMarca("");
    setAno("");
    setCor("");
    setPreco("");
    setKmRodados("");
  }

  useEffect(() => {
    const { id } = route.params;
    console.log(id);
    if (id) {
      getCarrosInfo(id);
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.divForm}>
       <Text style={styles.label}>Insira o ID do carro</Text>
         <View style={{ marginBottom: 20, marginTop:15 ,width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row" }}> 
           
             
            <TextInput
                style={styles.inputIdPesquisar}
                value={idPesquisar}
                onChangeText={setIdPesquisar}
                placeholder="Ex: 1"
                />
            <Button onPress={() => getCarrosInfo(Number(idPesquisar))} style={styles.buttonSearchId} icon="plus" mode="contained">
            Buscar Carro
            </Button>
            
        </View>

   {carro && Object.keys(carro).length > 0 && (
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

    <View
      style={{
        marginTop: 20,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <Button style={styles.buttonSubmit} icon="pencil" mode="contained" onPress={() => confirmarEdicao(Number(idPesquisar))}>
        Editar
      </Button>
      <Button style={styles.buttonClear} mode="contained" onPress={clearForm}>
        Cancelar
      </Button>
    </View>
  </View>
)}

    </View>
    </ScrollView>
  );
}


