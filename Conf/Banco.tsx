import * as SQLite from "expo-sqlite";
import type { Carro } from '../types/usuario';
import type { ApiResponse } from '../types/ApiResponse';

//Conexão e criação de tabelas

async function Conexao() {
    try {
        const db = await SQLite.openDatabaseAsync('PAM2');
        console.log('Banco Criado');
        return db;
    } catch (error) {
        console.log('erro ao criar o banco ' + error);
    }
}
async function dropTable(db: SQLite.SQLiteDatabase, tableName: string): Promise<ApiResponse<null>> {
  try { 
      await db.execAsync(`DROP TABLE IF EXISTS ${tableName};`);
      console.log(`Tabela ${tableName} excluída com sucesso.`);
      return { success: true, data: null, message: `Tabela ${tableName} excluída com sucesso.` };
  }    catch (error) {
    console.log(`Erro ao excluir a tabela ${tableName}: ` + error);
    return { success: false, data: null, message: `Erro ao excluir a tabela ${tableName}: ${error}` };
  }
}
async function createTable(db: SQLite.SQLiteDatabase): Promise<ApiResponse<null>> {
  try {
    await db.execAsync(
      `PRAGMA journal_mode = WAL;
       CREATE TABLE IF NOT EXISTS CARROS (
         ID_CARRO INTEGER PRIMARY KEY AUTOINCREMENT,
         NOME VARCHAR(100),
         MARCA VARCHAR(50),
         ANO INTEGER,
         COR VARCHAR(30),
         PRECO REAL,
         KM_RODADOS INTEGER
       );`
    );
    console.log('Tabela CARROS criada com sucesso!');
    return { success: true, data: null, message: 'Tabela CARROS criada com sucesso.' };
  } catch (erro) {
    console.log('Erro ao criar tabela CARROS: ' + erro);
    return { success: false, data: null, message: 'Erro ao criar tabela CARROS: ' + erro };
  }
}

//CRUD de carros

async function inserirCarro(db: SQLite.SQLiteDatabase, carro: Carro): Promise<ApiResponse<null>> {

    try {
          const response = await db.runAsync(
            " INSERT INTO CARRO ( NOME, MARCA, ANO, COR, PRECO, KM_RODADOS  ) VALUES(?, ?, ?, ?, ?, ?) ", 
            carro.NOME,
            carro.MARCA,
            carro.ANO,
            carro.COR,
            carro.PRECO,
            carro.KM_RODADOS
          );
          console.log(response);
          return { success: true, data: null, message: 'Usuário inserido com sucesso.' };

    } catch (error) {
         console.log('Erro ao inserir usuario ', error);
         return { success: false, data: null, message: 'Erro ao inserir usuário: ' + error };
    }

}
async function selectAllCarros(db:SQLite.SQLiteDatabase): Promise<ApiResponse<Carro[] | null>> {
    try {
         const result: Carro[] = await db.getAllAsync('SELECT * FROM CARROS');
         console.log('Carros encontrados');
         return { success: true, data: result, message: 'Carros encontrados com sucesso.' };
    } catch (error) {
        console.log("error ao buscar carros", error);
        return { success: false, data: null, message: 'Erro ao buscar carros: ' + error };
    }
}
async function selectCarroId(db: SQLite.SQLiteDatabase, id: number): Promise<ApiResponse<Carro | null>> {
  try {
    const result = await db.getFirstAsync( //result can be null
      "SELECT * FROM CARRO WHERE ID_US = ?",
      id
    );

    if (!result) {
      return { success: false, data: null, message: "Usuário não encontrado." };
    }

    const dados = result as Carro; //typed here if exists
    console.log("Filtro de Usuario por ID " + id);

    return {
      success: true,
      data: dados,
      message: "Usuário encontrado com sucesso."
    };
  } catch (error) {
    console.log("Erro ao buscar usuario ", error);
    return {
      success: false,
      data: null,
      message: "Erro ao buscar usuário: " + error
    };
  }
}
async function deleteUsuario(db:SQLite.SQLiteDatabase, id:number): Promise<ApiResponse<null>> {
  try {
      await db.runAsync('DELETE FROM CARROS WHERE ID_CARRO = ?', id);
      console.log(`Carro com ID ${id} excluído com sucesso.`);
      return { success: true, data: null, message: `Usuário com ID ${id} excluído com sucesso.` };
  } catch (error) {
      console.log(`Erro ao excluir usuário com ID ${id}: ` + error);
      return { success: false, data: null, message: `Erro ao excluir usuário com ID ${id}: ${error}` };
  }
}
async function updateUsuario(db:SQLite.SQLiteDatabase, id:number, carro: Carro): Promise<ApiResponse<null>> {
  try {
      await db.runAsync('UPDATE CARRO SET NOME = ?, MARCA = ?, ANO = ?, COR = ?, PRECO = ?, KM_RODADOS = ? WHERE ID_CARRO = ?',
          carro.NOME,
          carro.MARCA,
          carro.ANO,
          carro.COR,
          carro.PRECO,
          carro.KM_RODADOS,
          id
        );
      console.log(`Carro com ID ${id} atualizado com sucesso.`);
      return { success: true, data: null, message: `Usuário com ID ${id} atualizado com sucesso.` };
  } catch (error) {
      console.log(`Erro ao atualizar usuário com ID ${id}: ` + error);
      return { success: false, data: null, message: `Erro ao atualizar usuário com ID ${id}: ${error}` };
  }
}


//EXPORTS

export { 
  Conexao, 
  createTable, 
  inserirCarro, 
  selectAllCarros, 
  selectCarroId, 
  dropTable, 
  deleteUsuario, 
  updateUsuario 
};
