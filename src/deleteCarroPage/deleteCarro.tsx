import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { ScrollView, View, Text, StyleSheet, Alert } from "react-native";
import { selectAllCarros, deleteCarro } from "../../Conf/Banco";
import { getdb } from "../../Conf/ConnectionInstance";
import type { Carro } from "../../types/carro";
import style from "../css/styles";
import Spinner from "../utils/spinner";
import { Button } from 'react-native-paper';


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

  const confirmarExclusao = (id: number) => {
  Alert.alert(
    "Confirmar Exclusão",
    "Tem certeza que deseja excluir este carro?",
    [
      {
        text: "Cancelar",
        style: "cancel", // botão padrão de cancelar
      },
      {
        text: "Excluir",
        style: "destructive", // deixa o botão em vermelho no iOS
        onPress: () => deletarCarro(id), // chama a função de exclusão
      },
    ],
    { cancelable: true }
  );
};

  const deletarCarro = async (id: number) => {
    try {
      const db = await getdb();
      if (db) {
        if(id >= 0){
        const response = await deleteCarro(db, id);
        if (response.success) {
          console.log("deletando");
          Alert.alert("Sucesso", "Carro excluído com sucesso!");
          fetchApiCarros();
        } else {
          Alert.alert("Erro", response.message);
        }
      }else{
      Alert.alert("Id não fornecido um mal formatado")
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
          <Text style={style.nome}>{carro.NOME}</Text>
        <View style={style.CardDelete}>
           
          <View>
          <Text style={style.info}>Marca: {carro.MARCA}</Text>
          <Text style={style.info}>Ano: {carro.ANO}</Text>
      
          </View>
          <View> 
          <Text style={style.info}>
            Preço: R$ {carro.PRECO}
          </Text>
          <Text style={style.info}>
            KM Rodados: {carro.KM_RODADOS} km
          </Text>
          </View>
        </View>
          <View>
            <Button style={style.buttonDelete} icon="delete" mode="contained" onPress={() => confirmarExclusao(carro.ID_CARRO)}>
              Excluir
            </Button>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}


