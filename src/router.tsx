import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import style from "../src/css/styles"
// pages
import Home from "./homePage/homepage";
import GetCarros from "./getCarrosPage/getCarros";
import CreateCarro from "./createCarroPage/createCarro";
import EditarCarro from "./putCarroPage/putCarros";
import DeletarCarro from "./deleteCarroPage/deleteCarro";

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
   <Tab.Navigator
  screenOptions={{
    tabBarActiveTintColor: "#fff",
    tabBarInactiveTintColor: "#e91e63",
    tabBarLabelStyle: { fontSize: 12 },
    tabBarStyle: {
      backgroundColor: "#121212",
      borderColor: "transparent",
      paddingBottom: 30,
      paddingTop: 6,
      height: 110,
    },
    
  }}
   initialRouteName="Home"
>
  <Tab.Screen
    name="Listar Carros"
    component={GetCarros}
    options={{
      tabBarIcon: ({ color, size, focused }) => (
        <MaterialCommunityIcons
          name="car-multiple"
          color={color}
          size={focused ? size + 8 : size}
          style={style.icons}
        />
      ),
    }}
  />
  <Tab.Screen
    name="Novo Carro"
    component={CreateCarro}
    options={{
      tabBarIcon: ({ color, size, focused }) => (
        <MaterialCommunityIcons
          name="plus"
          color={color}
          size={focused ? size + 13 : size + 5}
          style={style.icons}
        />
      ),
    }}
  />
  <Tab.Screen
    name="Home"
    component={Home}
    options={{
      tabBarIcon: ({ color, size, focused }) => (
        <MaterialCommunityIcons
          name="home"
          color={color}
          size={focused ? size + 8 : size}
          style={style.icons}
        />
      ),
    }}
  />
  <Tab.Screen
    name="Editar Carro"
    component={EditarCarro}
    options={{
      tabBarIcon: ({ color, size, focused }) => (
        <MaterialCommunityIcons
          name="pencil"
          color={color}
          size={focused ? size + 8 : size}
          style={style.icons}
        />
      ),
    }}
  />
  <Tab.Screen
    name="Deletar Carro"
    component={DeletarCarro}
    options={{
      tabBarIcon: ({ color, size, focused }) => (
        <MaterialCommunityIcons
          name="car-brake-alert"
          color={color}
          size={focused ? size + 8 : size}
          style={style.icons}
        />
      ),
    }}
  />
    </Tab.Navigator>

  );
}
