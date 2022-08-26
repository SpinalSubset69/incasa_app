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

const Materials = ({ navigation, route }) => {

    const [fadeAnim, setFadeAnim] = React.useState(new Value(0));
    const [truckData, setTruckData] = React.useState(false);
    const [isSearch, setIsSearch] = React.useState(false);
    const [plate, setPlate] = React.useState('');
    const [driverName, setDriverName] = React.useState('');
    const [capacity, setCapacity] = React.useState('');
    const [priority, setPriority] = React.useState();


    async function obtainPriority() {
        setIsSearch(true);
        try {
            response = await api.getAttendancePriority();
            setPriority(response.plants);
            setIsSearch(false);
        } catch (e) {
        }
    }

    const loadComponents = () => {
        updateNewVehicles = setInterval(async () => {
            //setIsSearch(true);
            try {
                response = await api.getAttendancePriority();
                setPriority(response.plants);
                setIsSearch(false);
            } catch (e) {
            }
        }, 5000);
        //obtainPriority();
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

    renderItem = ({item, index}) => {        
        return (
            <ListItem.Accordion
                // button={true}
                roundAvatar
                bottomDivider={true}                
                // containerStyle={index==0?{backgroundColor:"rgba(0, 0, 255,0.4)"}:{}}
                icon={<Icon name={'truck'} size={20} />}
                content={
                    <>
                    <Avatar
                    rounded
                    source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
                    title={item.total}
                    />
                    <ListItem.Content style={{marginLeft:15}}>
                        <ListItem.Title><Text style={(index==0 && item.time!=null)?{fontWeight: 'bold', fontSize:20}:{}}>{item.nameBuilding}</Text></ListItem.Title>
                        <ListItem.Subtitle>{item.time}{item.time!=null?' minutos':''}</ListItem.Subtitle>                        
                    </ListItem.Content>  
                    {(item.isOnBuilding==1) &&
                        <Icon style={{ marginRight: '5%', color: '#0000FF' }} name={'truck'} size={20} />             
                    }
                    {(item.isOperator==1) &&
                        <Icon style={{ marginRight: '5%', color: '#FF0000' }} name={'truck'} size={20} />             
                    }
                    </>
                }
                isExpanded = {true}
                > 
                {item.v2plant.map((l, i) => (              
                <ListItem key={i}
                    containerStyle={{backgroundColor:"rgba(24, 30, 51,0.2)"}}
                >
                    <ListItem.Content>
                        {/* <ListItem.Title>{l.idTruck}</ListItem.Title> */}
                        {/* <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle> */}
                    </ListItem.Content>
                    <Text>{l.idTruck}</Text>
                </ListItem>
                ))}  
                {item.vInplant.map((l, i) => (              
                <ListItem key={i}
                    containerStyle={l.good==1?{backgroundColor:"rgba(0, 255, 0,0.5)"}:{backgroundColor:"rgba(255, 0, 0,0.5)"}}
                >
                    <ListItem.Content>
                        {/* <ListItem.Title>{l.idTruck}</ListItem.Title>                         */}
                        {/* <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle> */}
                    </ListItem.Content>
                    <Text>{l.idTruck}</Text>
                </ListItem>
                ))}
            </ListItem.Accordion>
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
        // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flex: 1 }}>
                <ImageBackground onLoadEnd={loadComponents} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch', backgroundColor: 'transparent', height: "35%" }} source={require('../assets/imgs/bg.jpg')}>
                    <Spinner visible={isSearch} />
                    <Animated.View style={{ opacity: fadeAnim, width: "100%", height: "100%" }}>
                        <LinearGradient colors={['rgba(24, 30, 51,0.2)', 'rgba(24, 30, 51,0.6)']} style={{ flex: 1, overflow: 'visible', width: "100%", height: "100%" }}>
                            <KeyboardAvoidingView keyboardVerticalOffset={keyboardVerticalOffset} behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ width: '100%', height: '100%' }}>
                                <View style={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: "flex-start", justifyContent: "flex-start" }}>
                                    <View style={{ width: "100%", height: "35%", flexDirection: 'column', justifyContent: "flex-end", alignItems: "flex-start" }}>
                                        <Text style={{ color: '#ffffff', fontSize: 40, paddingLeft: '2%', fontWeight: 'bold' }}>LISTA DE ATENCIÓN</Text>
                                    </View>
                                    <View style={{ width: "100%", height: "65%", backgroundColor: '#ffffff', flexDirection: 'column', justifyContent: "center", alignItems: "center" }}>
                                        <View style={{ width:"90%", height: '10%', flexDirection: 'row', alignItems: 'center' }}>                                            
                                            <Avatar containerStyle={{marginRight: 10}} size={20} rounded source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }} />
                                            <Text>Vehículos en Planta</Text>
                                            <Icon style={{ marginLeft: 15 ,marginRight: 10, color: '#0000FF' }} name={'truck'} size={20} />
                                            <Text>Posición actual</Text>                                            
                                            <Icon style={{ marginLeft: 15, marginRight: 10, color: '#FF0000' }} name={'truck'} size={20} />
                                            <Text>Otros operadores</Text>                                            
                                        </View>
                                        <View style={{ width: "100%", height: "80%", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>                                            
                                            <View style={{ width:"90%", height: '10%', backgroundColor: '#181e33', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ marginLeft: '5%', fontSize: 16, fontWeight: 'bold', height: 20, color: '#FFFFFF' }}>Plantas </Text>
                                                {/* <Icon style={{ marginRight: '5%', color: '#FFFFFF' }} name={'chevron-down'} size={20} /> */}
                                            </View>
                                            <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "#F5FCFF", width:"90%"}}>
                                                <FlatList
                                                    data={priority}
                                                    renderItem={renderItem}
                                                    keyExtractor={item => item.idBuilding}
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
        // </TouchableWithoutFeedback>
    );

}

export default Materials