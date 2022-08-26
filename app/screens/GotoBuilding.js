import React from 'react'

import { CommonActions } from '@react-navigation/native';

import { Animated, View, Text, StyleSheet, Dimensions, ImageBackground, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

import { Button, Card } from 'react-native-elements';

import LinearGradient from 'react-native-linear-gradient';
//import LinearGradient Componet to make Linear Gradient

import { Avatar } from 'react-native-elements';

const keyboardVerticalOffset = Platform.OS === 'ios' ? -50 : 0


const {
	Value
} = Animated;

const { width, height } = Dimensions.get('window');

const GotoBuilding = ({route, navigation}) => {    
    const { building } = route.params;
    const { plate } = route.params;
    const { nameMaterial } = route.params;

    const [fadeAnim, setFadeAnim] = React.useState(new Value(0));

    const loadComponents = () => {
		Animated.timing(
			fadeAnim,
			{
				toValue: 1,
				duration: 700,
				useNativeDriver: true
			}
		).start()
    }
    
    returnToArrivals = () =>{	
		navigation.dispatch(CommonActions.reset({index: 0, routes: [{ name: 'Escaner' }],}));	
	}

	return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flex: 1 }}>
                <ImageBackground onLoadEnd={loadComponents} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch', backgroundColor: 'transparent', height: "35%" }} source={require('../assets/imgs/bg.jpg')}>                    
                    <Animated.View style={{ opacity: fadeAnim, width: "100%", height: "100%" }}>
                        <LinearGradient colors={['rgba(24, 30, 51,0.2)', 'rgba(24, 30, 51,0.6)']} style={{ flex: 1, overflow: 'visible', width: "100%", height: "100%" }}>
                            <KeyboardAvoidingView keyboardVerticalOffset={keyboardVerticalOffset} behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ width: '100%', height: '100%' }}>
                                <View style={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: "flex-start", justifyContent: "flex-start" }}>
                                    <View style={{ width: "100%", height: "35%", flexDirection: 'column', justifyContent: "flex-end", alignItems: "flex-start" }}>
                                        <Text style={{ color: '#ffffff', fontSize: 40, paddingLeft: '2%', fontWeight: 'bold' }}>INFORMACIÓN</Text>
                                    </View>
                                    <View style={{ width: "100%", height: "65%", backgroundColor: '#ffffff', flexDirection: 'column', justifyContent: "center", alignItems: "center" }}>
									<View style={{width:"100%", height:"3%", flexDirection:"row", alignItems:"center", justifyContent:"center"}}></View>
                        <View style={{width:"80%", height:"70%", flexDirection:"column", alignItems:"flex-start", backgroundColor:"rgba(24, 30, 51,0.3)", borderRadius:10}}>
                            <View style={{width:"100%", height:"30%", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                                <View style={{width:"30%", alignItems:"center", justifyContent:"flex-end"}}>
                                    <Icon style={{}} name={'building-o'} size={40} />
                                </View> 
                                <View style={{width:"10%"}}></View>                           
                                <View style={{width:"60%", alignItems:"flex-start", justifyContent:"flex-start"}}>
                                    <Text style={{fontSize:30}}>{building}</Text>
                                </View>                            
                            </View>     
                            <View style={{width:"100%", height:"5%", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>         
                                <View style={{borderBottomColor: 'gray', borderBottomWidth: 4, width:"90%"}}/>   
                            </View>
                            <View style={{width:"100%", height:"30%", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                                <View style={{width:"30%", alignItems:"center", justifyContent:"flex-end"}}>
                                    <Icon style={{}} name={'truck'} size={40} />
                                </View> 
                                <View style={{width:"10%"}}></View>                           
                                <View style={{width:"60%", alignItems:"flex-start", justifyContent:"flex-start"}}>
                                    <Text style={{fontSize:30}}>{plate}</Text>
                                </View>                        
                            </View> 
                            <View style={{width:"100%", height:"5%", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>         
                                <View style={{borderBottomColor: 'gray', borderBottomWidth: 4, width:"90%"}}/>   
                            </View>                                                      
                            <View style={{width:"100%", height:"30%", flexDirection:"row", alignItems:"center", justifyContent:"space-around"}}>
                                <View style={{width:"30%", alignItems:"center", justifyContent:"flex-end"}}>
                                    <Avatar size={60} source={{uri: 'https://incasapac.com/assets2/imgs/gravel.png'}}/>                                
                                </View> 
                                <View style={{width:"10%"}}></View>                           
                                <View style={{width:"60%", alignItems:"flex-start", justifyContent:"flex-start"}}>
                                    <Text style={{fontSize:30}}>{nameMaterial}</Text>
                                </View>  
                            </View>  
                        </View>                                                     
                        <View style={{width:"100%", height:"20%", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                            <Button onPress={returnToArrivals} title="Aceptar" color="#841584"/>
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

	// return (
	// 	<View style={styles.container}>
	// 		<ImageBackground onLoadEnd={loadComponents} style={styles.image} source={require('../assets/imgs/bg.jpg')}>
	// 			<Animated.View style={{ opacity: fadeAnim }}>
	// 				<LinearGradient colors={['rgba(24, 30, 51,0.2)', 'rgba(24, 30, 51,0.6)']} style={{ flex: 1, height: height / 3, width: width, alignItems: 'flex-end', justifyContent: 'space-between', flexDirection: 'row' }}>
	// 					<Text style={{ color: '#ffffff', fontSize: 40, paddingLeft: '5%', fontWeight: 'bold' }}>INFORMACIÓN</Text>
	// 				</LinearGradient>
	// 				<View style={styles.content}>	                        
    //                     <View style={{width:"100%", height:"3%", flexDirection:"row", alignItems:"center", justifyContent:"center"}}></View>
    //                     <View style={{width:"80%", height:"70%", flexDirection:"column", alignItems:"flex-start", backgroundColor:"rgba(24, 30, 51,0.3)", borderRadius:10}}>
    //                         <View style={{width:"100%", height:"30%", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
    //                             <View style={{width:"30%", alignItems:"center", justifyContent:"flex-end"}}>
    //                                 <Icon style={{}} name={'building-o'} size={40} />
    //                             </View> 
    //                             <View style={{width:"10%"}}></View>                           
    //                             <View style={{width:"60%", alignItems:"flex-start", justifyContent:"flex-start"}}>
    //                                 <Text style={{fontSize:30}}>{building}</Text>
    //                             </View>                            
    //                         </View>     
    //                         <View style={{width:"100%", height:"5%", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>         
    //                             <View style={{borderBottomColor: 'gray', borderBottomWidth: 4, width:"90%"}}/>   
    //                         </View>
    //                         <View style={{width:"100%", height:"30%", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
    //                             <View style={{width:"30%", alignItems:"center", justifyContent:"flex-end"}}>
    //                                 <Icon style={{}} name={'truck'} size={40} />
    //                             </View> 
    //                             <View style={{width:"10%"}}></View>                           
    //                             <View style={{width:"60%", alignItems:"flex-start", justifyContent:"flex-start"}}>
    //                                 <Text style={{fontSize:30}}>{plate}</Text>
    //                             </View>                        
    //                         </View> 
    //                         <View style={{width:"100%", height:"5%", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>         
    //                             <View style={{borderBottomColor: 'gray', borderBottomWidth: 4, width:"90%"}}/>   
    //                         </View>                                                      
    //                         <View style={{width:"100%", height:"30%", flexDirection:"row", alignItems:"center", justifyContent:"space-around"}}>
    //                             <View style={{width:"30%", alignItems:"center", justifyContent:"flex-end"}}>
    //                                 <Avatar size={60} source={{uri: 'https://incasapac.com/assets2/imgs/gravel.png'}}/>                                
    //                             </View> 
    //                             <View style={{width:"10%"}}></View>                           
    //                             <View style={{width:"60%", alignItems:"flex-start", justifyContent:"flex-start"}}>
    //                                 <Text style={{fontSize:30}}>{nameMaterial}</Text>
    //                             </View>  
    //                         </View>  
    //                     </View>                                                     
    //                     <View style={{width:"100%", height:"20%", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
    //                         <Button onPress={returnToArrivals} title="Aceptar" color="#841584"/>
    //                     </View>
	// 				</View>
	// 			</Animated.View>
	// 		</ImageBackground>
	// 	</View>
	// );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
		flexDirection: 'column',
		justifyContent: 'flex-end',
	},
	image: {
		flex: 1,
		width: width,
		height: height / 3,
		alignSelf: 'stretch',
		resizeMode: 'stretch',
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
	},
	content: {
		height: height * 0.6,
		width: width,
		backgroundColor: '#FFFFFF',
		flexDirection: 'column',
		justifyContent: 'space-around',
        alignItems: 'center'
	}
});


export default GotoBuilding