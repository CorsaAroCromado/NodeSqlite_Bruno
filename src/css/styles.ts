import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons:{
    position: "absolute",
    bottom: 2
  },
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
    display: "flex"
  },
  CardDelete:{
    flexDirection: "row", // lado a lado
    justifyContent: "space-between", // espaço entre os blocos
    alignItems: "flex-start", // alinha pelo topo
  },
  buttonDelete:{
    marginTop: 10,
    backgroundColor: "#ae0f44ff"
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#000456", // azul da tua paleta,
    textAlign: "center"
  },
  info: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 12,
    color: "#000456",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    backgroundColor: "#fff",
    width:"93%"
  },
  inputIdPesquisar:{
    width:"50%",
    backgroundColor: "#fff",
    padding: 10,
    borderWidth: 1,
    marginRight: 10,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  buttonSearchId:{
    backgroundColor: "#0b129dff",
    borderRadius: 8,
  },
  divForm: {
     backgroundColor: "#efededff",
    width: "100%",
    justifyContent: "center", 
    alignItems: "center",

},
  buttonSubmit:{
    backgroundColor: "#000456",
    width: "48%",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonClear:{
    backgroundColor: "#ae0f44ff",
    width: "48%",
    marginTop: 10,
    marginBottom: 10,
  }
});