import React from 'react'
//import React

import { Animated, View, Text, StyleSheet, Button, Dimensions, ImageBackground, KeyboardAvoidingView, TouchableOpacity, FlatList, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native'
//import React Native basic components

import LinearGradient from 'react-native-linear-gradient';
//import LinearGradient Componet to make Linear Gradient

import Icon from 'react-native-vector-icons/FontAwesome';
//import Icon Component to get the icons

import Spinner from 'react-native-loading-spinner-overlay';
//Spinner for the loading

import { ListItem, Avatar } from 'react-native-elements';

import * as api from "../services/auth";

const keyboardVerticalOffset = Platform.OS === 'ios' ? -50 : 0

const {
    Value
} = Animated;

const { width, height } = Dimensions.get('window');

const Gps = ({ navigation, route }) => {

    const [fadeAnim, setFadeAnim] = React.useState(new Value(0));
    const [truckData, setTruckData] = React.useState(false);
    const [isSearch, setIsSearch] = React.useState(false);
    const [plate, setPlate] = React.useState('');
    const [driverName, setDriverName] = React.useState('');
    const [capacity, setCapacity] = React.useState('');
    const [materials, setMaterials] = React.useState();


    async function obtainMaterials() {
        setIsSearch(true);
        try {
            const response = await api.getGPS();
            setMaterials(response.gps);
            setIsSearch(false);
        } catch (e) {
        }
    }

    const loadComponents = () => {
        obtainMaterials();
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 700,
                useNativeDriver: true
            }
        ).start()
    }



    async function goTo(idMaterial) {
        console.log("We are here");
    }

    renderItem = ({ item }) => {        
        return (

            <ListItem
                button={true}
                roundAvatar
                bottomDivider={true}
            >
                <Avatar
                    rounded
                    source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
                    title={item.idGPS.substring(0, 2)}
                />
                <ListItem.Content>
                    <ListItem.Title>{item.idGPS}</ListItem.Title>
                    <ListItem.Subtitle>{item.batt!=null?item.batt+"%":""}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    }

    navigateToScanner = () => {
        navigation.navigate('PlateDetection', { toRoute: "Escaner" })
    }

    React.useEffect(() => {        
        if (route.params?.plateX != undefined) {
            setPlate(route.params?.plateX);
            search(route.params?.plateX);
        }
    }, [route.params?.plateX]);



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flex: 1 }}>
                <ImageBackground onLoadEnd={loadComponents} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch', backgroundColor: 'transparent', height: "35%" }} source={require('../assets/imgs/bg.jpg')}>
                    <Spinner visible={isSearch} />
                    <Animated.View style={{ opacity: fadeAnim, width: "100%", height: "100%" }}>
                        <LinearGradient colors={['rgba(24, 30, 51,0.2)', 'rgba(24, 30, 51,0.6)']} style={{ flex: 1, overflow: 'visible', width: "100%", height: "100%" }}>
                            <KeyboardAvoidingView keyboardVerticalOffset={keyboardVerticalOffset} behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ width: '100%', height: '100%' }}>
                                <View style={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: "flex-start", justifyContent: "flex-start" }}>
                                    <View style={{ width: "100%", height: "35%", flexDirection: 'column', justifyContent: "flex-end", alignItems: "flex-start" }}>
                                        <Text style={{ color: '#ffffff', fontSize: 40, paddingLeft: '2%', fontWeight: 'bold' }}>GPS</Text>
                                    </View>
                                    <View style={{ width: "100%", height: "65%", backgroundColor: '#ffffff', flexDirection: 'column', justifyContent: "center", alignItems: "center" }}>
                                        <View style={{ width: "100%", height: "80%", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                            <View style={{ width:"90%", height: '10%', backgroundColor: '#181e33', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ marginLeft: '5%', fontSize: 16, fontWeight: 'bold', height: 20, color: '#FFFFFF' }}>Lista de GPS: </Text>
                                                <Icon style={{ marginRight: '5%', color: '#FFFFFF' }} name={'chevron-down'} size={20} />
                                            </View>
                                            <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "#F5FCFF", width:"90%"}}>
                                                <FlatList
                                                    data={materials}
                                                    renderItem={renderItem}
                                                    keyExtractor={item => item.idGPS}
                                                />
                                            </SafeAreaView>
                                        </View>
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        </LinearGradient>
                    </Animated.View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );

}

export default Gps