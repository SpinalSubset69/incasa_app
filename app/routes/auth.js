import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeEntrada from "./homeEntrada";
import HomePalero from "./homePalero";
import Login from "../screens/Login";
import Loading from "../screens/Loading";
// import HomePalero from "./homePalero"
// import HomeSupervisor from "./homeSupervisor"
// import HomeBascula from "./homeBascula"
// import HomeNuevo from "./HomeNuevo"

import { useAuth } from "../providers/auth";

const Stack = createStackNavigator();


const Auth = ({ navigation }) => {

  const { state } = useAuth();

  return (
    <Stack.Navigator >
      {state.isLoading == true ? (
        <Stack.Screen options={{ headerShown: false }} name="Loading" component={Loading} />
      ) : 
      state.isLoggedIn == false ? (
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      ) : 
      state.usertype==2? //Entrada
      (
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeEntrada} />
      ): 
      state.usertype==3?//Palero
      (
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomePalero} />
      ): (<></>)
    //   state.usertype==4?//Supervisor
    //   (
    //     <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeSupervisor} />
    //   ): state.usertype==1?//Bascula
    //   (        
    //     <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeNuevo} />
    //   ):(//
    //     <>
    //     </>
    //   )
      }
    </Stack.Navigator>
  );
}

export default Auth;