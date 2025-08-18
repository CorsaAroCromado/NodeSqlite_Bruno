import { Conexao } from "./Banco";

let dbInstance: Awaited<ReturnType<typeof Conexao>> | null = null;

export async function getdb() {
  if (!dbInstance) {
    dbInstance = await Conexao();
  }
  return dbInstance;
}