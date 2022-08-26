import React, {useEffect} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
//import { StackActions } from '@react-navigation/native';

import { useAuth } from "../providers/auth";


const Loading = ({navigation}) => {	

  const { getAuthState } = useAuth();

    useEffect(() => {
        initialize()
    }, []);
  

    async function initialize() {
      try {
          const {user} = await getAuthState();

      } catch (e) {
          //navigate('Auth');
      }
  }

	return (		
		<View style={{backgroundColor: "#fff", alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator/>
            <Text>{"Loading User Data"}</Text>
        </View>
	)
}


export default Loading