import React from "react";

import { createStackNavigator } from '@react-navigation/stack';


import Entrance from "../screens/Entrance";
// import PlateDetection from "../screens/PlateDetection";
import GotoBuilding from "../screens/GotoBuilding";

const Stack = createStackNavigator();

const Arrivals = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Escaner" component={Entrance} options={{ headerShown: false }} />
      {/* <Stack.Screen name="PlateDetection" component={PlateDetection} options={{ title: 'Capturar datos de placa' }}/> */}
      <Stack.Screen name="GotoBuilding" component={GotoBuilding} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default Arrivals;