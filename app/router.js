import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AuthProvider from "./providers/auth";
import AuthStack from "./routes/auth";



export default function Router(props) {
    return (
        <AuthProvider>
          <NavigationContainer>
            <AuthStack />
          </NavigationContainer>
        </AuthProvider>
      );
}
