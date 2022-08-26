import React, { Component } from 'react';
//import React

import { Platform, KeyboardAvoidingView, StyleSheet, Text, View, Image, Dimensions, ImageBackground, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
//import React Native basic components

import LinearGradient from 'react-native-linear-gradient';
//import LinearGradient Componet to make Linear Gradient

import { Input, Button } from 'react-native-elements'

import Spinner from 'react-native-loading-spinner-overlay';
//Spinner for the loading

import Icon from 'react-native-vector-icons/FontAwesome';
//import Icon Component to get the icons

//import md5 from "md5";
//MD5 encrypt the password

//import { sha256 } from 'react-native-sha256';
import sha256 from 'crypto-js/sha256';
//Sha-256 encrypt the password


import * as api from "../services/auth";
import { useAuth } from "../providers/auth";
//Context (useAuth) and the api to communincate with the web service

import * as Keychain from 'react-native-keychain';

const { width, height } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [passW, setPassW] = React.useState('');
  //const [password, setPassword] = React.useState('');
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [errorLogin, setErrorLogin] = React.useState('');


  const { handleLogin } = useAuth();

  const loadComponents = async () => {   
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log(credentials.username);
      console.log(credentials.password);
      setUsername(credentials.username);
      setPassW(credentials.password);
    }     
    //setNamesList([{name: "Alan"},{name:"Alberto"},{name:"Valeria"},{name:"Valentina"}]);
    //obtainDrivers();
    /*Animated.timing(
        fadeAnim,
        {
            toValue: 1,
            duration: 700,
            useNativeDriver: true
        }
    ).start()*/
  }

   //else {
      //setLoading(false);
  //}

  async function submit(state) {
    setIsConnecting(true);
    try {
      let password=sha256(passW).toString();
      let response = await api.login({ username, password });
      if(response.usertype==1 || response.usertype==5){
      //if(response.usertype==5 || response.usertype==1){
        setErrorLogin("El usuario no tiene permiso para acceder.")
        setIsConnecting(false);
        return;
      }
      await Keychain.setGenericPassword(username, passW);
      await handleLogin(response);
      setIsConnecting(false);
    } catch (e) {
      setErrorLogin("Usuario/Contraseña Incorrectos.")
      setIsConnecting(false);
    }

  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? -50 : 0;


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <ImageBackground onLoadEnd={loadComponents} style={styles.container} source={require('../assets/imgs/bg.jpg')}>
          <Spinner visible={isConnecting} />
          <LinearGradient
            colors={['rgba(24, 30, 51,0.2)', 'rgba(24, 30, 51,0.6)', 'rgba(27, 44, 65,0.9)', 'rgba(26, 43, 64,0.9)', 'rgb(24, 30, 51)']}
            style={{ flex: 1, overflow: 'visible', width: "100%", height: "100%" }}
          >

            <KeyboardAvoidingView keyboardVerticalOffset={keyboardVerticalOffset} behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ width: '100%', height: '100%', flexDirection: 'row', alignItems: "center", justifyContent: "flex-start" }}>
              <View style={{ width: '100%', height: '100%', flexDirection: 'row', alignItems: "center", top: "8.5%", justifyContent: "flex-start" }}>
                <View style={{ width: "60%", height: height * 0.5, backgroundColor: '#ffffff', flexDirection: 'column', justifyContent: "space-around", alignItems: "flex-start" }}>
                  <View style={{ width: "100%", height: "30%", left: "5%", justifyContent: "center", alignItems: "flex-start", flexDirection: "column" }}>

                    <Text style={{ fontWeight: 'bold', color: '#181e33', fontSize: 28, textAlign: 'left' }}>INICIO DE SESIÓN</Text>
                    <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 28, textAlign: 'left' }}>¡BIENVENIDO!</Text>

                  </View>
                  <View style={{ width: "100%", height: "50%", justifyContent: "center", alignItems: "center" }}>
                    <Input value={username} rightIcon={<Icon name={"user"} color={"gray"} size={24}></Icon>} placeholder="USUARIO" returnKeyType="next" underlineColorAndroid="transparent" style={{ flex: 1 }} onSubmitEditing={() => pass.focus()} onChangeText={setUsername} />
                    <Input value={passW} errorMessage={errorLogin} ref={ref => { pass = ref; }} rightIcon={<Icon name={"lock"} color={"gray"} size={24}></Icon>} placeholder="CONTRASEÑA" secureTextEntry={true} returnKeyType="done" underlineColorAndroid="transparent" style={{ flex: 1 }} onSubmitEditing={() => { submit() }} onChangeText={setPassW} />
                  </View>
                  <View style={{ width: "100%", height: "20%", justifyContent: "center", alignItems: "center" }}>
                    <Button buttonStyle={{backgroundColor:"rgba(27, 44, 65, 0.9)"}} title="ENTRAR" onPress={() => { submit() }} />
                  </View>
                </View>
                <View style={styles.triangleCorner}>
                </View>
              </View>
            </KeyboardAvoidingView>

          </LinearGradient>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',//TODO: Importate para que la imagen abarque toda la pantalla
    backgroundColor: 'transparent',
    height: height / 3,
  },
  buttonStyle: {
    top: '20%',
    backgroundColor: 'gray',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    marginHorizontal: '20%'
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },
  SectionStyle: {
    top: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',

    marginBottom: 30,

    height: 40,
    borderRadius: 5,
    margin: 10,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    overflow: 'visible',
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

  },
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 100,
    borderTopWidth: height * 0.5,
    borderRightColor: 'transparent',
    borderTopColor: '#ffffff'
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'flex-end'
  },
});