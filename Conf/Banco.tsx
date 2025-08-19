import * as SQLite from "expo-sqlite";
import type { Carro } from '../types/carro';
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

    const rows: any[] = await db.getAllAsync('SELECT * from CARROS;');

    if (rows.length === 0) {
      await db.execAsync(`
        INSERT INTO CARROS (NOME, MARCA, ANO, COR, PRECO, KM_RODADOS) VALUES
        ('Civic Type R', 'Honda', 2022, 'Vermelho', 220000.00, 12000),
        ('Supra GR', 'Toyota', 2021, 'Branco', 350000.00, 8000),
        ('GT-R R35', 'Nissan', 2020, 'Cinza', 600000.00, 15000),
        ('Impreza WRX STI', 'Subaru', 2019, 'Azul', 280000.00, 30000),
        ('Lancer Evolution X', 'Mitsubishi', 2018, 'Preto', 250000.00, 45000),
        ('RX-7 Spirit R', 'Mazda', 2002, 'Amarelo', 700000.00, 55000),
        ('NSX', 'Honda', 2017, 'Prata', 750000.00, 22000),
        ('370Z Nismo', 'Nissan', 2019, 'Branco', 260000.00, 28000),
        ('LC 500', 'Lexus', 2021, 'Preto', 520000.00, 10000),
        ('86 GT', 'Toyota', 2020, 'Laranja', 190000.00, 25000);
      `);
    }



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
            " INSERT INTO CARROS ( NOME, MARCA, ANO, COR, PRECO, KM_RODADOS  ) VALUES(?, ?, ?, ?, ?, ?) ", 
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
      "SELECT * FROM CARROS WHERE ID_CARRO = ?",
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
async function deleteCarro(db:SQLite.SQLiteDatabase, id:number): Promise<ApiResponse<null>> {
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
      await db.runAsync('UPDATE CARROS SET NOME = ?, MARCA = ?, ANO = ?, COR = ?, PRECO = ?, KM_RODADOS = ? WHERE ID_CARRO = ?',
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
  deleteCarro, 
  updateUsuario 
};
