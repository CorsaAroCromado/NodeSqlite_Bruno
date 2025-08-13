import * as  SQLite from 'expo-sqlite';
import type { Usuario } from '../types/usuario';
import type { ApiResponse } from '../types/ApiResponse';

async function Conexao() {
    try {
        const db = await SQLite.openDatabaseAsync('PAM2');
        console.log('Banco Criado');
        return db;
    } catch (error) {
        console.log('erro ao criar o banco ' + error);
    }
}

// ------------------------------------------------

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

    //-------------------------------------------
async function createTable(db: SQLite.SQLiteDatabase): Promise<ApiResponse<null>> {
    try {
        await db.execAsync(
            `PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS USUARIO ( 
                    ID_US INTEGER PRIMARY KEY AUTOINCREMENT, 
                    NOME_US VARCHAR(100),
                    EMAIL_US VARCHAR(100)
                );`
        );
        console.log('Tabela Criada !!!');
        return { success: true, data: null, message: 'Tabela USUARIO criada com sucesso.' };

    } catch (erro) {
           console.log('Erro Tabela !!!' + erro);       
           return { success: false, data: null, message: 'Erro ao criar tabela USUARIO: ' + erro };    
    }
}
// -------------------------------------------
// inserir dados na tabela

async function inserirUsuario(db: SQLite.SQLiteDatabase, name:string, email:string): Promise<ApiResponse<null>> {

    try {
          await  db.runAsync(
            " INSERT INTO USUARIO ( NOME_US, EMAIL_US  ) VALUES(? , ?) ", name, email
          );
          console.log("Inserido com sucesso");
          return { success: true, data: null, message: 'Usuário inserido com sucesso.' };

    } catch (error) {
         console.log('Erro ao inserir usuario ' + error);
         return { success: false, data: null, message: 'Erro ao inserir usuário: ' + error };
    }

}

// ------------------------------------------
// exebir todos os usuario

async function selectUsuario(db:SQLite.SQLiteDatabase): Promise<Usuario[]> {
    try {
         const result: Usuario[] = await db.getAllAsync('SELECT * FROM USUARIO');
         console.log('Usuarios encontrados');
         return result;
    } catch (error) {
        console.log('Erros ao bucar usuarios');
        return [];
    }
}
// -------------------------------------------

// Filtrar usuario ID

async function selectUsuarioId(
  db: SQLite.SQLiteDatabase,
  id: number
): Promise<ApiResponse<Usuario | null>> {
  try {
    const result = await db.getFirstAsync(
      "SELECT * FROM USUARIO WHERE ID_US = ?",
      id
    );

    if (!result) {
      return { success: false, data: null, message: "Usuário não encontrado." };
    }

    const dados = result as Usuario;
    console.log("Filtro de Usuario por ID " + id);

    return {
      success: true,
      data: dados,
      message: "Usuário encontrado com sucesso."
    };
  } catch (error) {
    console.log("Erro ao buscar usuario " + error);
    return {
      success: false,
      data: null,
      message: "Erro ao buscar usuário: " + error
    };
  }
}


  //------------------------------------    

  async function deleteUsuario(db:SQLite.SQLiteDatabase, id:number): Promise<ApiResponse<null>> {
    try {
        await db.runAsync('DELETE FROM USUARIO WHERE ID_US = ?', id);
        console.log(`Usuário com ID ${id} excluído com sucesso.`);
        return { success: true, data: null, message: `Usuário com ID ${id} excluído com sucesso.` };
    } catch (error) {
        console.log(`Erro ao excluir usuário com ID ${id}: ` + error);
        return { success: false, data: null, message: `Erro ao excluir usuário com ID ${id}: ${error}` };
    }
  }
  //--------------------------------------

  async function updateUsuario(db:SQLite.SQLiteDatabase, id:number, name:string, email:string): Promise<ApiResponse<null>> {
    try {
        await db.runAsync('UPDATE USUARIO SET NOME_US = ?, EMAIL_US = ? WHERE ID_US = ?', name, email, id);
        console.log(`Usuário com ID ${id} atualizado com sucesso.`);
        return { success: true, data: null, message: `Usuário com ID ${id} atualizado com sucesso.` };
    } catch (error) {
        console.log(`Erro ao atualizar usuário com ID ${id}: ` + error);
        return { success: false, data: null, message: `Erro ao atualizar usuário com ID ${id}: ${error}` };
    }
  }



// -------------------------------------------

export { Conexao, createTable, inserirUsuario, selectUsuario, selectUsuarioId, dropTable, deleteUsuario, updateUsuario };
