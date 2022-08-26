import React from 'react'
//import React

import { CommonActions } from '@react-navigation/native';

import StyleSheet from 'react-native-media-query';

import { TouchableOpacity, Alert, Animated, View, Dimensions, ImageBackground, KeyboardAvoidingView, SafeAreaView, FlatList, TouchableWithoutFeedback, Keyboard, TextInput, ScrollView, Pressable } from 'react-native'
//import React Native basic components

import LinearGradient from 'react-native-linear-gradient';
//import LinearGradient Componet to make Linear Gradient

import { Input, Button, Text } from 'react-native-elements'
//import for the form

import Icon from 'react-native-vector-icons/FontAwesome';
//import Icon Component to get the icons

import Spinner from 'react-native-loading-spinner-overlay';
//Spinner for the loading

import Autocomplete from 'react-native-autocomplete-input';
//Autocomplete for name

import { ListItem, Avatar } from 'react-native-elements';

import * as api from "../services/auth";

import { useAuth } from "../providers/auth";
import InputComponent from '../components/inputComponent';

const {
    Value
} = Animated;



const Entrance = ({ navigation, route }) => {

    const [fadeAnim, setFadeAnim] = React.useState(new Value(0));
    const [truckData, setTruckData] = React.useState(false);
    const [BtnSaveExit, setBtnSaveExit] = React.useState(false);
    const [selectedMaterial, setSelectedMaterial] = React.useState(null);
    const [isSearch, setIsSearch] = React.useState(false);
    const [plate, setPlate] = React.useState('');
    const [driverName, setDriverName] = React.useState('');
    const [GPS, setGPS] = React.useState('');
    const [mica, setMica] = React.useState('');
    const [remision, setRemision]= React.useState('');
    const [observaciones, setObervaciones]= React.useState('');
    const [companyName, setCompanyName] = React.useState('');
    const [bedColor, setBedColor] = React.useState('');
    const [truckColor, setTruckColor] = React.useState('');
    const [truckType, setTruckType] = React.useState('');
    const [seeMaterials, setSeeMaterials] = React.useState(false);
    const [materials, setMaterials] = React.useState();
    const [errorPlate, setErrorPlate] = React.useState('');
    const [idLog, setIdLog] = React.useState('');
    const [errorDriver, setErrorDriver]= React.useState('');
    const [errorCompany, setErrorCompany]= React.useState('');
    const [errorGPS, setErrorGPS]= React.useState('');    
    const [errorRemision, setErrorRemision]= React.useState('');

    const [endForm, setEndForm] = React.useState(false)

    const [namesList, setNamesList]= React.useState([]);
    const [filteredNames, setFilteredNames]= React.useState([]);
    const [companiesList, setCompaniesList]= React.useState([]);
    const [filteredCompanies, setFilteredCompanies]= React.useState([]);
    const [validRemision, setValidRemision]= React.useState(false);

    //const [selectedName, setSelectedName]= React.useState('');

    //const { width, height } = Dimensions.get('window');
    //const [widthAutoComplete, setWidthAutoComplete]= React.useState(width<=480?"100%":"33%");


    const keyboardVerticalOffset = Platform.OS === 'ios' ? -50 : 0;
   

    /*Dimensions.addEventListener('change', () => {
        const { width, height } = Dimensions.get('window');
        setWidthAutoComplete(width<=480?"100%":"33%");
    });*/

    async function obtainDrivers() {        
        setIsSearch(true);
        try {
            response = await api.getDrivers();
            //console.log(response);
            setNamesList(response.drivers);
            setCompaniesList(response.companies);
            setIsSearch(false);
        } catch (e) {
        }
    }

    const loadComponents = () => {        
        //setNamesList([{name: "Alan"},{name:"Alberto"},{name:"Valeria"},{name:"Valentina"}]);
        obtainDrivers();
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 700,
                useNativeDriver: true
            }
        ).start()
    }

    async function search(state) {
        setIsSearch(true);
        setSeeMaterials(false);        
        if (state == '' || plate == '') {
            setTruckData(false);
            setIsSearch(false);
        }
        try {            
            if (state == undefined){                
                response = await api.isLeavingTruck({ plate: plate })
            }
                
            else {
                response = await api.isLeavingTruck({ 'plate': state })
            }            
                        
            setTruckType(response["type"]);
            setBedColor(response["bedColor"]);
            setTruckColor(response["truckColor"]);    
            setDriverName("");
            setCompanyName("");        
            if (response.isExit == 1) {
                //Activar el boton
                if(response["gps"]==plate){//Dieron el gps
                    setPlate(response["plate"]);
                }
                console.log(response)
                setIdLog(response.idLog);
                setDriverName(response["driver"]);
                setCompanyName(response["company"]);
                setGPS(response["gps"]);
                setMica(response['mica'])
                setBtnSaveExit(true);
            } else {
                response = await api.getAvailableMaterials();
                setMaterials(response.materials);
                setBtnSaveExit(false);                
            }
            setTruckData(true);
            setErrorPlate("");
            setErrorCompany("");
            setErrorDriver("");
            setErrorGPS("");
            setIsSearch(false);
        } catch (e) {
            setTruckData(false);
            setIsSearch(false);
            setErrorPlate(e.message);
            setTruckType("");
            setBedColor("");
            setTruckColor("");
            setErrorCompany("");
            setErrorDriver("");
            setErrorGPS("");
        }        

    }

    async function searchGPS(){
        if (GPS == '')
            setErrorGPS("El GPS no puede estar vacio");
        else{
            setIsSearch(true);
            response = await api.existGPS({ gps: GPS });            
            /*if (response.exist){
                setErrorGPS("");
            }else{
                setErrorGPS("El GPS no existe");
            }*/
            setErrorGPS(response.exist);
            setIsSearch(false);
        }
    }

    const AsyncAlertSalida = () => {
        return new Promise((resolve, reject) => {
            Alert.alert(
                'Retirar GPS!',
                'FAVOR DE RETIRAR GPS.',
                [
                    { text: 'OK', onPress: () => resolve('YES') }
                ],
                { cancelable: false }
            )
        })
    }

    const AsyncAlert = () => {
        return new Promise((resolve, reject) => {
            Alert.alert(
                'Salida registrada!',
                'La salida del vehiculo fue registrada exitosamente.',
                [
                    { text: 'OK', onPress: () => resolve('YES') }
                ],
                { cancelable: false }
            )
        })
    }

    const AsyncAlertEntrada = () => {
        return new Promise((resolve, reject) => {
            Alert.alert(
                'Entrada registrada!',
                'La entrada del vehiculo fue registrada exitosamente.',
                [
                    { text: 'OK', onPress: () => resolve('YES') }
                ],
                { cancelable: false }
            )
        })
    }

    async function saveExit() {
        //setIsSearch(true);
        let existError = false;
        if (plate == '') {
            setErrorPlate("Debe ingresar la placa del camión");
            existError = true;
        }
        if(remision == ''){
            setErrorRemision('Se debe proporcionar un número de remisión');
        }
        if (!existError) {
            /* Enviar a guardar la hora */
            try {
                await AsyncAlertSalida();                
                const response = await api.saveExit({ idLog: idLog, remision: remision, observaciones: observaciones });                
                await AsyncAlert();
                //Enviar a ...
                //navigation.navigate("Entradas",{screen: 'Escaner', params:{plateX: plate}})
                navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Entradas' }], }));
            } catch (e) {                
            }
        }


    }

    async function goTo(idMaterial) {
        if(!selectedMaterial) return;
        setIsSearch(true);
        try {
            let response = await api.registerArrival({ plate, idMaterial, driverName, companyName, GPS, mica })
            setIsSearch(false);
            await AsyncAlertEntrada();
            navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Entradas' }], }));
            //navigation.navigate("GotoBuilding", { building: response.building, plate: plate, nameMaterial: response.nameMaterial })            
        } catch (e) {
            setIsSearch(false);
        }
    }

    //FETCH ENTRADA
    //goTo(item.idMaterial)
    const renderItem = ({ item }) => {
        return (
           <View style={{ width: "100%", justifyContent: "center", alignItems: "center"}}>
            <TouchableOpacity
            style={ { backgroundColor: item.idMaterial === selectedMaterial ? "grey" : "white", flexDirection: 'row', padding: 15, alignItems: "center", borderRadius: 5, width: "80%" } }
                onPress={() =>  setSelectedMaterial(item.idMaterial)}>
                    <Avatar
                        rounded
                        source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
                        title={item.nameMaterial.substring(0, 2)}
                    />
                    <Text style={{ fontSize: 16, marginLeft: 10}}>{ item.nameMaterial }</Text>
            </TouchableOpacity>
           </View>
        );
    }

    async function chooseMaterial (){        
        let existError = false;
        if(driverName==''){
            setErrorDriver('El nombre del conductor no puede estar vacio');
            existError=true;
        }
        if(companyName==''){
            setErrorCompany("El nombre de la compañia fletera no puede estar vacio");
            existError=true;
        }
        if(GPS==''){
            setErrorGPS("El GPS no puede estar vacio");
            existError=true;
        } 
        const response = await api.existGPS({ gps: GPS });
        if (response.exist!=""){
            setErrorGPS("El GPS no existe");
            existError=true;
        }      
        if(!existError)
            setSeeMaterials(true);
    }

    navigateToScanner = () => {
        navigation.navigate('PlateDetection', { toRoute: "Escaner" })
    }

    React.useEffect(() => {                
        if (route.params?.plateX != undefined && route.params?.plateX != '') {
            setPlate(route.params?.plateX);
            search(route.params?.plateX);
        } else {
            setPlate('');
        }
    }, [route.params?.plateX]);

    const findName = (query) => {
        setDriverName(query);
        // Method called every time when we change the value of the input
        if (query) {
          // Making a case insensitive regular expression
          const regex = new RegExp(`${query.trim()}`, 'i');
          // Setting the filtered film array according the query
          setFilteredNames(
              namesList.filter((item) => item.name.search(regex) >= 0)
          );
        } else {
          // If the query is null then return blank
          setFilteredNames([]);
        }
      };

      const findCompany = (query) => {
        setCompanyName(query);
        // Method called every time when we change the value of the input
        if (query) {
          // Making a case insensitive regular expression
          const regex = new RegExp(`${query.trim()}`, 'i');
          // Setting the filtered film array according the query
          setFilteredCompanies(
              companiesList.filter((item) => item.name.search(regex) >= 0)
          );
        } else {
          // If the query is null then return blank
          setFilteredCompanies([]);
        }
      };


      const validateRemision = () => {             
            const testReg = /[0-9]/.test(remision)
                                    
            if(!testReg){                
                setErrorRemision("Remisión debe ser solo números")                
                setValidRemision(false)
                return
            }

            if(testReg && remision.length < 1){
                setErrorRemision("Remisión debe ser al menos 1 número hasta 10")
                setValidRemision(false)
                return
            }      
            if(testReg && remision.length > 10){
                setErrorRemision("Remisión no debe ser mayor a 10 números")
                setValidRemision(false)
                return
            }                  
            if(testReg && remision.length >= 1 && remision.length <= 10){
                setErrorRemision('')
                setValidRemision(true)
            }
      }



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flex: 1 }}>
                <ImageBackground onLoadEnd={loadComponents} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch', backgroundColor: 'transparent', height: "35%" }} source={require('../assets/imgs/bg.jpg')}>
                    <Spinner visible={isSearch} />
                    <Animated.View style={{ opacity: fadeAnim, width: "100%", height: "100%" }}>
                        <LinearGradient colors={['rgba(24, 30, 51,0.2)', 'rgba(24, 30, 51,0.6)']} style={{ flex: 1, overflow: 'visible', width: "100%", height: "100%" }}>
                            <KeyboardAvoidingView keyboardVerticalOffset={keyboardVerticalOffset} behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ width: '100%', height: '100%' }}>
                                <View style={{ width: '100%', height: '100%' }}>
                                    <View style={{ width: "100%", height: "35%", flexDirection: 'column', justifyContent: "flex-end", alignItems: "flex-start" }}>
                                        <Text style={{ color: '#ffffff', fontSize: 40, paddingLeft: '2%', fontWeight: 'bold' }}>ENTRADAS/SALIDAS</Text>
                                    </View>
                                    <View style={{ width: "100%", height: "100%", backgroundColor: '#ffffff', flexDirection: 'column', flex: 1 }}>                                        
                                        <ScrollView  style={{ width: "100%", height: "100%", marginBottom: 10, marginTop: 10, flex: 1}} keyboardShouldPersistTaps="always">                                                                                        
                                        <Input errorMessage={errorPlate} value={plate} placeholder='XXXNNNX' onChangeText={setPlate} label="Placa/GPS" returnKeyType="next" onBlur={() => { search() }} leftIcon={<Icon name={"credit-card"} color={"gray"} size={14}></Icon>}  />                                            
                                                {truckData == true && seeMaterials == false &&
                                                        <>                                                    
                                                            <View style={[styles.autocompleteContainer1, {width: "100%", marginBottom: 20}]}>
                                                                <Text style={{lineHeight:40, paddingHorizontal: 10, bottom:30, fontSize:16, color:"#86939e", fontWeight:"bold"}}>Nombre Conductor</Text>
                                                                <Autocomplete                                                                                                                                                       
                                                                    containerStyle={{width:"100%", paddingHorizontal:10, position: 'absolute', zIndex:2,}}
                                                                    disabled={BtnSaveExit}
                                                                    onBlur={() => {setFilteredNames([]); (driverName == '') ? setErrorDriver("El nombre del conductor no puede estar vacio") : setErrorDriver("") }}
                                                                    //ref={ref => { drivert = ref; }} 
                                                                    returnKeyType="next"                                                                    
                                                                    onSubmitEditing={() => {setFilteredNames([]);/*companyt.focus();*/}}
                                                                    // renderTextInput={ () => (<TextInput style={{color:"blue"}}/>) }
                                                                    inputContainerStyle={styles.autoCompleteInput}
                                                                    data={filteredNames}
                                                                    placeholder={"Nombre Conductor"}  
                                                                    placeholderTextColor="#86939e"
                                                                    style={{fontSize: 18, color:"black"}}
                                                                    onChangeText={(text) => findName(text)}
                                                                    value={driverName}
                                                                    flatListProps={{
                                                                        keyboardShouldPersistTaps: 'always',
                                                                        keyExtractor: (_, idx) => idx,
                                                                        renderItem: ({ item}) => (
                                                                        <TouchableOpacity 
                                                                            onPress={() => {
                                                                                setDriverName(item.name);
                                                                                setFilteredNames([]);
                                                                            }}            
                                                                        >
                                                                            <Text>{item.name}</Text>
                                                                        </TouchableOpacity>
                                                                        ),
                                                                    }}                                                                                                                         
                                                                />
                                                                <Text style={{margin: 5, paddingHorizontal:10, top:5,fontSize:12, color:"#ff190c"}}>{errorDriver==''?'  ':errorDriver}</Text>
                                                            </View>  
                                                            <View style={[styles.autocompleteContainer2, {width: "100%"}]}>
                                                                <Text style={{paddingHorizontal: 10, bottom:30, lineHeight:40, fontSize:16, color:"#86939e", fontWeight:"bold"}}>Empresa fletera</Text>
                                                                <Autocomplete                                                                                                                                                                                                                                  
                                                                    containerStyle={{width:"100%", paddingHorizontal:10, position: 'absolute', zIndex:1}}
                                                                    disabled={BtnSaveExit}
                                                                    onBlur={() => {setFilteredCompanies([]); (companyName == '') ? setErrorCompany("El nombre de la compañia fletera no puede estar vacio") : setErrorCompany("") }}
                                                                    //ref={ref => { companyt = ref; }}
                                                                    returnKeyType="next" 
                                                                    onSubmitEditing={() => {setFilteredCompanies([]);}}
                                                                    inputContainerStyle={styles.autoCompleteInput}
                                                                    data={filteredCompanies}
                                                                    placeholder={"Empresa fletera"}  
                                                                    placeholderTextColor="#86939e"
                                                                    style={{fontSize: 18, color:"black"}}
                                                                    onChangeText={(text) => findCompany(text)}
                                                                    value={companyName}
                                                                    
                                                                    flatListProps={{
                                                                        keyboardShouldPersistTaps: 'always',
                                                                        keyExtractor: (_, idx) => idx,
                                                                        renderItem: ({ item}) => (
                                                                        <TouchableOpacity 
                                                                            onPress={() => {
                                                                                setCompanyName(item.name);
                                                                                setFilteredCompanies([]);
                                                                            }}
                                                                        >
                                                                            <Text>{item.name}</Text>
                                                                        </TouchableOpacity>
                                                                        ),
                                                                    }}                                                                                                                         
                                                                />
                                                                <Text style={{margin: 5, paddingHorizontal:10, top:5, fontSize:12, color:"#ff190c"}}>{errorCompany==''?'  ':errorCompany}</Text>
                                                            </View>                                                            
                                                    {/* <Input disabled={BtnSaveExit} value={driverName} onBlur={() => { (driverName == '') ? setErrorDriver("El nombre del conductor no puede estar vacio") : setErrorDriver("") }} errorMessage={errorDriver} ref={ref => { drivert = ref; }} returnKeyType="next" onSubmitEditing={() => companyt.focus()} placeholder='Conductor' onChangeText={setDriverName} label="Conductor" /> */}
                                                    {/* <Input disabled={BtnSaveExit} value={companyName} onBlur={() => { (companyName == '') ? setErrorCompany("El nombre de la compañia fletera no puede estar vacio") : setErrorCompany("") }} errorMessage={errorCompany} ref={ref => { companyt = ref; }} returnKeyType="next" placeholder='Empresa fletera' onChangeText={setCompanyName} label="Empresa fletera"  onSubmitEditing={() => gpst.focus()}/> */}                                                                                                        
                                                    { BtnSaveExit ?  <Input  disabled={!BtnSaveExit} value={remision} onBlur={() => { validateRemision() }} errorMessage={errorRemision} placeholder='Remisión' onChangeText={setRemision} label="Remisión" /> : null}
                                                    { BtnSaveExit ?  <Input  disabled={!BtnSaveExit} value={observaciones}  placeholder='Observaciones' onChangeText={setObervaciones} label="Observaciones" /> : null }                                                                                                        

                                                    <Input disabled={BtnSaveExit} value={mica} returnKeyType="next"  placeholder='Mica' onChangeText={setMica} label="Mica" />
                                                    <Input disabled={BtnSaveExit} value={GPS} onBlur={() => { searchGPS() }} errorMessage={errorGPS} returnKeyType="done" onSubmitEditing={() => chooseMaterial()} placeholder='GPS' onChangeText={setGPS} label="GPS" />                                                    

                                                    {!BtnSaveExit && !validRemision ? <Button icon={<Icon name={BtnSaveExit==false?"arrow-right":"save"} color={"white"} size={17}></Icon>} title= "Siguiente"    iconRight onPress={chooseMaterial} /> : null}
                                                    {BtnSaveExit ? <Button disabled={!validRemision} icon={<Icon name="save" color={"white"} size={17}></Icon>} title="Guardar" iconRight onPress={saveExit} /> : null}
                                                </>
                                            }
                                            {truckData == true && seeMaterials == true &&
                                                <>                                                                                                        
                                                                                                    
                                                            <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}> 
                                                                <View style={{ flexDirection: 'row', backgroundColor: 'rgb(24, 30, 51)', padding: 10, width:"80%"  }}>                                                                    
                                                                    <Text style={{ marginLeft: '5%', fontSize: 16, fontWeight: 'bold', height: 20, color: '#ffffff' }}>Selecciona un material: </Text>                                                                
                                                                </View>
                                                                <FlatList
                                                                    style={{ width: "100%"}}
                                                                    data={materials}
                                                                    renderItem={renderItem}
                                                                    keyExtractor={item => item.idMaterial}
                                                                    extraData = {
                                                                        selectedMaterial
                                                                    }
                                                                />         
                                                                { !selectedMaterial ? <Text style={{ color: "red", fontSize: 16 }}>Seleccione un Material</Text> : null}
                                                            </View>          

                                                            <View style={ {alignItems: 'center', justifyContent: 'center' } }>                                                                
                                                                <View style={{ marginBottom: 10, marginTop: 10, width: '80%'}}>
                                                                    <Button disabled={!selectedMaterial}  icon={  <Icon name='save' color='white' size={17}/>} title="Guardar Entrada" onPress={() => goTo(selectedMaterial)}/>
                                                                </View>
                                                                <View style={{width: '80%'}}>
                                                                <Button  icon={  <Icon name='arrow-left' color='white' size={17}/>} title="Regresar" onPress={() => setSeeMaterials(false)}/>
                                                                </View>
                                                                
                                                            </View>                                                                                            
                                                                                                            
                                                </>

                                            }
                                        </ScrollView>
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


//   flex: 1,
    //   left: 0,
    //   position: 'absolute',
    //   right: 0,
    //   top: 0,
    //   

const {ids, styles} = StyleSheet.create({
    autocompleteContainer1: {
        //marginBottom: 15
        //zIndex: 2
    },
    autocompleteContainer2: {
        //marginBottom: 15
        //zIndex: 1
    },
    autoCompleteInput: {
        borderWidth: 0, 
        borderBottomWidth: 1,
        borderColor: "#86939e",        
        //paddingHorizontal: 10
    },
    listAutoComplete:{
        backgroundColor:"red"
    },
    selectedItem: {
        backgroundColor: "red"
    }

  });


  const inputsStyles = StyleSheet.create({
    inputContainer: {
        marginBottom: 10
    },    
  })

  const materielItemStyle = (id, selectedId) => {    
    return StyleSheet.create({
        backgroundColor: id === selectedId ? "gray" : "white",
        flexDirection: "row"
    })
  }

export default Entrance
