import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Routes from "./src/router"
import { useEffect } from 'react';
import {
  Conexao,
  createTable,
} from './Conf/Banco';

export default function App() {
  useEffect(() => {
    async function Main() {
      const db = await Conexao();
      if (!db) {
        console.error("Erro: Conexão com o banco não estabelecida.");
        return;
      }
      const createTableCarro = await createTable(db);

      if(!createTableCarro.success){
         console.error("Erro: Problema em criar a tabela.");
        return;
      }
    }
    Main();
  }, []);

  return (
    <NavigationContainer>
        <Routes/>
    </NavigationContainer>
  );
}
