import React from 'react';

//API URL
export const API_URL = 'https://incasapac.com/api';
//export const API_URL = 'http://192.168.0.3:80/api';

//API End Points
export const LOGIN = `${API_URL}/login`; // Login usuario
export const IS_LEAVING_TRUCK = `${API_URL}/isLeavingTruck`; //Buscar si hay un vehiculo saliendo
export const GET_AVAILABLE_MATERIALS = `${API_URL}/getAvailableMaterials`; //Obtener los materiales disponibles en una pedrera
export const GET_GPS = `${API_URL}/getGPS`; //Obtener los materiales disponibles en una pedrera
export const EXIST_GPS = `${API_URL}/existGPS`; //Obtener los materiales disponibles en una pedrera
export const REGISTER_ARRAIVAL = `${API_URL}/registerArraival`; //Registrar llegada de un vehiculo
export const SAVE_EXIT = `${API_URL}/saveExit`; //Registrar salida de vehiculo
export const GET_DRIVERS = `${API_URL}/getDrivers`; //Obtener los materiales disponibles en una pedrera
export const GET_ATTENDANCE_PRIORITY = `${API_URL}/getAttendancePriority`; //Obtener la prioridad para un operador

/*
export const GET_TRUCK = `${API_URL}/getTruck`;
export const ADD_TRUCK = `${API_URL}/addTruck`;
export const START_SERVICE = `${API_URL}/startService`;
export const STOP_SERVICE = `${API_URL}/stopService`;
export const NEXT_SERVICE = `${API_URL}/nextService`;
export const OMIT_SERVICE = `${API_URL}/omitService`;
export const IS_TRUCK_SERVICE = `${API_URL}/isTruckService`;
export const ADD_INCIDENCY = `${API_URL}/addIncidency`;
export const GET_BUILDINGS = `${API_URL}/getBuildings`;
export const GET_OPERATORS = `${API_URL}/getOperators`;
export const GET_MATERIALS_BUILDINGS = `${API_URL}/getMaterialsBuildings`;
export const GET_OPERATORS_BUILDINGS = `${API_URL}/getOperatorsBuildings`;
export const CHANGE_ACTIVE_MATERIAL = `${API_URL}/changeActiveMaterial`;
export const CHANGE_ACTIVE_BUILDING = `${API_URL}/changeActiveBuilding`;
export const IS_BUILDING_ASSIGNED = `${API_URL}/isBuildingAssigned`;
export const ADD_WEIGHED = `${API_URL}/addWeighed`;
export const SAVE_EXIT = `${API_URL}/saveExit`;
export const WAS_LOADED = `${API_URL}/wasLoaded`;
export const GET_TRUCKS_INSIDE = `${API_URL}/getTrucksInside`;
export const ADD_PLANT = `${API_URL}/addPlant`;
export const ADD_MATERIAL = `${API_URL}/addMaterial`;
*/
