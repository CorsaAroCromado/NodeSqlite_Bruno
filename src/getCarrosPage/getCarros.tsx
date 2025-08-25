import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { ScrollView, View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { selectAllCarros } from "../../Conf/Banco";
import { getdb } from "../../Conf/ConnectionInstance";
import type { Carro } from "../../types/carro";
import Spinner from "../utils/spinner";

export default function GetCarros() {
  const [carros, setCarros] = useState<Carro[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // estados do modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCarro, setSelectedCarro] = useState<Carro | null>(null);

  const navigation = useNavigation<any>();
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

  useFocusEffect(
    useCallback(() => {
      fetchApiCarros();
    }, [])
  );

  const abrirModal = (carro: Carro) => {
    setSelectedCarro(carro);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setSelectedCarro(null);
  };

  if (loading) {
    return (
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "center" }}>
        <Spinner />
      </ScrollView>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={cardStyles.scrollContainer}>
        {carros.map((carro) => (
          <View key={carro.ID_CARRO} style={cardStyles.card}>
            <Text style={cardStyles.nome}>{carro.NOME}</Text>
            <Text style={cardStyles.info}>Id: {carro.ID_CARRO}</Text>
            <Text style={cardStyles.info}>Marca: {carro.MARCA}</Text>
            <Text style={cardStyles.info}>Ano: {carro.ANO}</Text>
            <Text style={cardStyles.info}>Cor: {carro.COR}</Text>
            <Text style={cardStyles.info}>Preço: R$ {carro.PRECO}</Text>
            <Text style={cardStyles.info}>
              KM Rodados: {carro.KM_RODADOS} km
            </Text>
          <View style={{ flexDirection: "row" }}>
            <Button
              style={{ marginTop: 10, marginRight: 10, width: "48%" }}
              icon="eye"
              mode="contained"
              onPress={() => abrirModal(carro)}
            >
              Detalhes
            </Button>
            <Button
              style={{ marginTop: 10, width: "49%", backgroundColor:"#e91e63ff" }}
              icon="eye"
              mode="contained"
              onPress={() => navigation.navigate("Editar Carro", { id: carro.ID_CARRO })}
            >
              Editar
            </Button>
          </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal de Detalhes */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={fecharModal}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.content}>
            {selectedCarro && (
              <>
                <Text style={modalStyles.title}>{selectedCarro.NOME}</Text>
                <Text>Id: {selectedCarro.ID_CARRO}</Text>
                <Text>Marca: {selectedCarro.MARCA}</Text>
                <Text>Ano: {selectedCarro.ANO}</Text>
                <Text>Cor: {selectedCarro.COR}</Text>
                <Text>Preço: R$ {selectedCarro.PRECO}</Text>
                <Text>KM Rodados: {selectedCarro.KM_RODADOS} km</Text>

                <Pressable style={modalStyles.closeButton} onPress={fecharModal}>
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>Fechar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
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
    elevation: 4,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#000456",
  },
  info: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // fundo escuro
  },
  content: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "85%",
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#000456",
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#e91e63ff",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
});
