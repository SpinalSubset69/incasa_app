import React from "react";

import { Text, Alert } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAuth } from "../providers/auth";

import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont()

const Tab = createBottomTabNavigator();


//import PaleroAttendance from "../screens/PaleroAttendance";
import Operator from "../screens/Operator";
import SignOut from "../screens/SignOut"

import * as api from "../services/auth";

const HomePalero = ({ navigation }) => {

  const { state, handleLogout } = useAuth();

  const AsyncAlert = () => {
    return new Promise((resolve, reject) => {
        Alert.alert(
            'Alerta!',
            'No puede cerrar sesión hasta no haber detenido el servicio.',
            [
                {text: 'OK', onPress: () => resolve('YES') }
            ],
            { cancelable: false }
        )
    })
}    

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      unmountOnBlur: true,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Operador') {
          iconName = focused ? 'list' : 'list';
        } else if (route.name === 'Cerrar Sesión') {
          iconName = focused ? 'sign-out' : 'sign-out';
          color = 'tomato';
        }
        if (route.name === "Cerrar Sesión")
          return <Icon name={iconName} size={size} color={color} />;
        else
          return <Icon name={iconName} size={size} color={color} />;
      }
    })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Operador" component={Operator} />
      <Tab.Screen name="Cerrar Sesión"
        options={{
          tabBarLabel: ({ color, size }) => (<Text style={{ color: 'tomato', backgroundColor:'transparent', marginLeft: 20, marginTop: 3, fontSize: 13, textAlign: 'center' }}>Cerrar Sesión</Text>),
        }}
        listeners={{
            tabPress: e => {
              e.preventDefault();
              handleLogout();
            },
        }}
        component={SignOut}
      />
    </Tab.Navigator>
  );
}


export default HomePalero;