import React from "react";

import { Text, Dimensions, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAuth } from "../providers/auth";


import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont()

const Tab = createBottomTabNavigator();


//import Incidents from "./IncidentsStack";
import Arrivals from "./arrivals";
//import Register from "./register";
import Materials from "../screens/Materials";
import Gps from "../screens/Gps";
import SignOut from "../screens/SignOut"


const { width, height } = Dimensions.get('screen');

const Home = ({ navigation }) => {
 

  const { state, handleLogout } = useAuth();
  const [witdh, setWidth] = React.useState(width);
  const [height, setHeight] = React.useState(height);
  

/*Dimensions.addEventListener('change', () => {
  const { width, height } = Dimensions.get('window');  
  setWidth(width);
  setHeight(height);
});*/

  

  return (    
    <Tab.Navigator screenOptions={({ route }) => ({
      unmountOnBlur: true,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Incidencias') {
          iconName = focused ? 'warning' : 'warning';
        } else if (route.name === 'Entradas') {
          iconName = focused ? 'clock-o' : 'clock-o';
        } else if (route.name === 'Registro') {
          iconName = focused ? 'truck' : 'truck';
        } else if (route.name === 'Materiales') {
          iconName = focused ? 'home' : 'home';
        } else if (route.name === 'GPS') {
          iconName = focused ? 'battery' : 'battery';
        } else if (route.name === 'Cerrar Sesión') {
          iconName = focused ? 'sign-out' : 'sign-out';
          color = 'tomato';
        }
        if (route.name === "Cerrar Sesión")
          return <Icon name={iconName} size={size} color={color} />;
        else
          return <Icon name={iconName} size={size} color={color} />;
      }})}

      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Entradas" component={Arrivals} 
        listeners={{
          tabPress: e => {
            e.preventDefault();
            //navigation.dispatch(CommonActions.reset({index: 0, routes: [{ name: 'Escaner' }],}));
            /*
              marginLeft: 20
              fontSize: 12

              fontSize: 11
              marginBottom: 1.5

            */
            navigation.navigate("Entradas",{screen: 'Escaner', params:{plateX: ''}})
          },
        }}
      />      
      {/*
      <Tab.Screen name="Registro" component={Register} />
      */}
      {/* <Tab.Screen name="Incidencias" component={Incidents} /> */}
      <Tab.Screen name="Materiales" component={Materials} />
      <Tab.Screen name="GPS" component={Gps} />
      <Tab.Screen  name="Cerrar Sesión"
         options={{
         tabBarLabel: ({ color, size }) => {return <Text style={{ color: 'tomato', marginBottom: (witdh<500)?1.5:0 ,fontSize: (witdh<500)?11:12, textAlign:"center", marginLeft:(witdh<500)?0:20}}>Cerrar Sesión</Text>},
         //tabBarLabel: ({ color, size }) => {return <Text style={{ color: 'tomato', fontSize: 11, textAlign:"center", bottom:(orientation=='landscape')?0:"4%", left:(orientation=='landscape')?"30%":0 }}>Cerrar Sesión</Text>},
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


export default Home;