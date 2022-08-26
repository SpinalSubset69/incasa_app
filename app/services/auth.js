import axios from 'axios';

import * as c from '../constants';

export async function register(data) {
    try {
        let res = await axios.post(c.REGISTER, data);

        return res.data;
    } catch (e) {
        throw handler(e)
    }
}

export async function login(data) {
    try {
        let res = await axios.post(c.LOGIN, data);
        return res.data;        
    } catch (e) {     
        throw handler(e);
    }
}

export async function isLeavingTruck(data) {
    try {
        let res = await axios.post(c.IS_LEAVING_TRUCK, data);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function getGPS() {    
    try {
        let res = await axios.post(c.GET_GPS);
        console.log(res.data);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function getAvailableMaterials() {    
    try {
        let res = await axios.post(c.GET_AVAILABLE_MATERIALS);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function getAttendancePriority() {    
    try {
        let res = await axios.post(c.GET_ATTENDANCE_PRIORITY);
        console.log("Attendance");
        console.log(res.data);
        return res.data;        
    } catch (e) {
        console.log("Error");
        console.log(e);
        throw handler(e);
    }
}

export async function getDrivers() {    
    try {
        let res = await axios.post(c.GET_DRIVERS);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function existGPS(data) {
    try {
        let res = await axios.post(c.EXIST_GPS, data);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function registerArrival(data) {
    try {
        let res = await axios.post(c.REGISTER_ARRAIVAL, data);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function saveExit(data) {
    try {
        let res = await axios.post(c.SAVE_EXIT, data);
        return res.data;        
    } catch (e) {        
        throw handler(e);
    }
}

/*
export async function searchTruck(data) {
    console.log("Search Truck ... ");
    try {
        let res = await axios.post(c.GET_TRUCK, data);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}



export async function wasLoaded(data) {
    console.log("Was Loaded ... ");
    try {
        let res = await axios.post(c.WAS_LOADED, data);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function saveExit(data) {
    console.log("Save Exit ... ");
    try {
        let res = await axios.post(c.SAVE_EXIT, data);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function isTruckInService(data) {
    console.log("Is Truck in Service ... ");
    try {
        let res = await axios.post(c.IS_TRUCK_SERVICE, data);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function addIncidency(data) {
    console.log("add Incidency ... ");
    try {
        let res = await axios.post(c.ADD_INCIDENCY, data);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function addTruck(data) {
    console.log("Add Truck ... ");
    try {
        let res = await axios.post(c.ADD_TRUCK, data);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function getBuildings() {
    console.log("Get Buildings ... ");
    try {
        let res = await axios.post(c.GET_BUILDINGS);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function getMaterialsBuildings(data) {
    console.log("Get Materials Buildings ... ");
    try {
        let res = await axios.post(c.GET_MATERIALS_BUILDINGS, data);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function getOperatorsBuildings(data) {
    console.log("Get Operators Buildings ... ");
    try {
        let res = await axios.post(c.GET_OPERATORS_BUILDINGS, data);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function isBuildingAssigned() {
    console.log("Is Building Assigned ... ");
    try {
        let res = await axios.post(c.IS_BUILDING_ASSIGNED);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function addWeighed(data) {
    console.log("Add Weighed ... ");
    try {
        let res = await axios.post(c.ADD_WEIGHED, data);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function getOperators() {
    console.log("Get Operators ... ");
    try {
        let res = await axios.post(c.GET_OPERATORS);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function changeActiveMaterial(data) {
    console.log("Change Active Material ... ");
    try {
        let res = await axios.post(c.CHANGE_ACTIVE_MATERIAL, data);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function changeActiveBuilding(data) {
    console.log("Change Active Building ... ");
    try {
        let res = await axios.post(c.CHANGE_ACTIVE_BUILDING, data);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}


export async function addMaterial(data) {
    console.log("Add Material ... ");
    try {
        let res = await axios.post(c.ADD_MATERIAL, data);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function addPlant(data) {
    console.log("Add Plant ... ");
    try {
        let res = await axios.post(c.ADD_PLANT, data);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function getTrucksInside() {
    console.log("Get Trucks Inside ...");
    try {
        let res = await axios.post(c.GET_TRUCKS_INSIDE);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function startService() {
    console.log("Start Service ... ");
    try {
        let res = await axios.post(c.START_SERVICE);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function stopService() {
    console.log("Stop Service ... ");
    try {
        let res = await axios.post(c.STOP_SERVICE);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function nextService(data) {
    console.log("Next Service ... ");
    try {
        let res = await axios.post(c.NEXT_SERVICE, data);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}

export async function omitService(data) {
    console.log("Omit service ... ");
    try {
        let res = await axios.post(c.OMIT_SERVICE, data);
        return res.data;        
    } catch (e) {
        throw handler(e);
    }
}
*/




export function handler(err) {
    let error = err;

    if (err.response && err.response.data.hasOwnProperty("msg"))
        error = err.response.data;
    else if (!err.hasOwnProperty("msg")) error = err.toJSON();

    return new Error(error.msg);
}