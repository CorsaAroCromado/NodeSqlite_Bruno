import React, { useEffect, useState } from "react";
import {Text, View} from "react-native";
import styles from "../css/styles"
import {selectAllCarros} from "../../Conf/Banco";
import {getdb} from "../../Conf/ConnectionInstance";
import type { Carro } from "../../types/usuario";
import Spinner from "../utils/spinner";
export default function GetCarros(){
    const[carros, setCarros] = useState<Carro[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const fetchApiCarros = async () =>{
        try{
            setLoading(true);
            const db = await getdb();
            if(db){
            const response = await selectAllCarros(db);
                if(response.success && response.data){
                    setCarros(response.data);
                }else{
                    setCarros([]);
                }
            }
        }catch(error){
            console.log("Erro ao buscar carros", error);
            setCarros([]);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchApiCarros();
    }, []);

    if(loading){
        return(
            <View style={styles.container}>
                <Spinner/>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <Text>get Carros</Text>
        </View>
    )
}

