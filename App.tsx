import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useEffect } from 'react';
import {
  Conexao,
  createTable,
  inserirUsuario,
  selectUsuario,
  selectUsuarioId,
  dropTable,
  deleteUsuario,
  updateUsuario
} from './Conf/Banco';
import * as SQLite from 'expo-sqlite';

export default function App() {
  useEffect(() => {
    async function Main() {
      const db = await Conexao();

      if (!db) {
        console.error("Erro: Conexão com o banco não estabelecida.");
        return;
      }

      // Exemplo de uso
      // await createTable(db);
      // await dropTable(db, 'USUARIO');
      // await inserirUsuario(db, "Ricardo", "@Giovanna");

      // Buscar todos os usuários
      const registro = await selectUsuario(db);

      registro?.forEach((linhas: any) => {
        console.log(linhas.ID_US, linhas.NOME_US, linhas.EMAIL_US);
      });

      console.log("/------------------------------------------------------");

      // Buscar usuário por ID
      const nome = await selectUsuarioId(db, 5);
      if (nome.success && nome.data) {
        console.log(nome.data.ID_US, nome.data.NOME_US, nome.data.EMAIL_US);
      }

      console.log("/------------------------------------------------------");
      // await deleteUsuario(db, 3);

      console.log("/------------------------------------------------------");
      // await updateUsuario(db, 5, "ellen", "@ellen.com");
    }

    Main();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        icon="account-alert"
        mode="contained"
        onPress={() => console.log('Pressed')}
      >
        Inserir
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
