import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import './Styles/styles.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MarkerPopup from "./MarkerPopup";
import DateRangePicker from "./DateRangePicker";
import { authContext } from "./authConext";
import 'leaflet-rotatedmarker';
import 'react-datepicker/dist/react-datepicker.css'
import getMarkerIcon from './utilities/markerIconUtlities';
import bearing from "./utilities/markerRotaionUtilities";

const Home = () => {

    const fillBlueOptions = { fillColor: 'blue' }
    const [objects, setObjects] = useState([]);
    const [filteredObjects, setFilteredObjects] = useState([]);
    const usenavigate = useNavigate();
    const [date, setDate] = useState(new Date());
    const [searchTypeName, setSearchTypeName] = useState();
    const [objectDetail, setObjectDetail] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const { logged, setLogged, role, setRole } = useContext(authContext);

    const navigate = useNavigate();

    const checkLogin = () => {
        if (!localStorage.getItem('token')) {
            setLogged(false);
            navigate('/');
        }
    }
    useEffect(() => {
        checkLogin();
    }, []);

    useEffect(() => {
        fetch(process.env.REACT_APP_BASE_URL +"objects", {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            if (Object.keys(resp).length === 0) {
                alert('Main screen failed, invalid credentials');
            } else {

                setObjects(resp);

                let clone = { ...resp };
                var response = [];
                response = clone[0].map(a => { return { ...a } });
                setFilteredObjects([response]);
            }
        }).catch((err) => {});
    }, []);

    //get users
    useEffect(() => {
        fetch(process.env.REACT_APP_BASE_URL + "users", {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            if (Object.keys(resp).length === 0) {
                alert('Getting object types, invalid credentials');
            } else {
                setUsers(resp.users);
            }
        }).catch((err) => {});
    }, []);

    const onDateChange = (date) => {
        setDate(date);
        var newObjects = [...objects];
        var objectsArray = [...objects[0]];
        if (newObjects != undefined && objects.length > 0) {
            objectsArray.map(element => {
                var newLocations = [...element.locations]; // make a separate copy of the array
                element.locations.map(location => {
                    var locationDate = new Date(location.date_and_time);
                    if (locationDate > date) {
                        var index = newLocations.indexOf(location)
                        if (index !== -1) {
                            newLocations.splice(index, 1);
                        }
                    }
                })
                var index = filteredObjects[0].map(function (e) { return e.id; }).indexOf(element.id);
                if (index != -1) {

                    filteredObjects[0][index].locations = newLocations;
                    setFilteredObjects(filteredObjects);
                }
            });
        }
    };

    var createReactClass = require('create-react-class');
    var Mrk = createReactClass({
        render: function () {
            return <Marker position={this.props.location} icon={getMarkerIcon(this.props.icon)} rotationOrigin="center" rotationAngle={this.props.rotation}>
                <MarkerPopup image={this.props.icon} filteredObjects={this.props.filteredObjects} line={this.props.line}></MarkerPopup>
            </Marker>
        }
    }); 

    const filterObjects = (objectName) => {
        setSearchTypeName(objectName);
        var newObjects = [...objects[0]];
        var objectsArray = [];
        objectsArray = newObjects.map(a => { return { ...a } });
        if (objects != undefined) {
            objectsArray.forEach(element => {
                if (element.name != objectName) {
                    objectsArray = objectsArray.filter(function (obj) {
                        return obj.name.includes(objectName);
                    })
                }
            });
            setFilteredObjects([objectsArray]);
        };
    };

    const onDatesChange = (startDate, endDate) => {
        if (startDate != null && endDate != null) {
            setObjectDetail(true);
        }
        else { setObjectDetail(false); }

        var newObjects = [...objects];
        var objectsArray = [...objects[0]];
        if (newObjects != undefined && objects.length > 0) {
            objectsArray.map(element => {
                var array = [...element.locations];
                element.locations.map(location => {
                    var locationDate = new Date(location.date_and_time);
                    if (locationDate < startDate || locationDate > endDate) {
                        var index = array.indexOf(location)
                        if (index !== -1) {
                            array.splice(index, 1);
                        }
                    }
                })
                var index = filteredObjects[0].map(function (e) { return e.id; }).indexOf(element.id);
                if (index != -1) {
                    filteredObjects[0][index].locations = array;
                    setFilteredObjects(filteredObjects);
                }
            });
        }
    };

    const handleLogout = async () => {
        fetch(process.env.REACT_APP_BASE_URL + "logout", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            if (res.status == 200) {
                setLogged(false);
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                navigate('/');
            }
        }).catch((err) => { });
    }


    return (
        <div className="bodyFont">
            <div style={{ textAlign: 'center', padding: '10px', backgroundColor: 'orange' }}>
                <h3 className="headerText" >Vizuelizacija kretanja objekata</h3>
                <button className="logoutButton" onClick={handleLogout}>Odjavi se</button>
            </div>
            <div style={{ display: 'flex' }}>
                <div className="leftPanel">

                    <div style={{ margin: '5px 10px', display: 'inline-block' }}>
                        <label style={{ display: 'inline-block' }}>Prikaži objekte prije datuma:  </label>
                        <div style={{ display: 'inline-block', padding: '3px 0px' }}>
                            <DatePicker selected={date} onChange={(date) => onDateChange(date)} isClearable={true} />
                        </div>
                    </div>

                    <div>
                        <div className="objectPanel">
                            <label>Pretražite objekat po imenu: </label>
                            <div style={{ display: 'inline-block', padding: '3px 0px' }}>
                                <input value={searchTypeName} onChange={e => filterObjects(e.target.value)}></input>
                            </div>

                            <div>
                                <label>Izaberite vremenski opseg:  </label>
                                <div style={{ display: 'inline-block', padding: '3px 0px' }}>
                                    <DateRangePicker onDatesChange={onDatesChange}></DateRangePicker>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div style={{ display: 'inline-block', margin: 'auto' }}>

                    {localStorage.getItem('role') == 'administrator'? 
                    <div style={{ margin: 'auto' }}>
                        <div className="form-group" style={{ display: 'inline-block', marginBottom: '10px' }}>
                            <label>Vlasnik objekta: </label>
                            <select className="form-control" style={{ width: '250px' }} onChange={e => setSelectedUser(e.target.value)}>
                                <option value={0}>Prikazi sve</option>
                                {
                                    users?.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
                                }
                            </select>
                        </div>

                        <div className="createButtonsDiv">
                            <button className="createButtons" onClick={() => usenavigate('/newObjectType')} style={{ margin: "3px" }}>Novi tip objekta</button>
                            <button className="createButtons" onClick={() => usenavigate('/newObject')}>Novi objekat</button>
                        </div>
                    </div> : 
                    <></>
                    }


                    <div className="mapContainer" >
                        <MapContainer className="main" center={[51.505, -0.09]} zoom={8} >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {
                                filteredObjects[0]?.map(element => {
                                    let line = [];
                                    element.locations.map(location => {
                                        line.push([location.lat, location.long])
                                    });

                                    if (element.locations.length > 0) {

                                        var definedTime = 60 * 60 * 1000 * process.env.REACT_APP_DEFAULT_TIME_IN_HOURS;
                                        var useDefaultIcon = false;
                                        if (new Date() - new Date(element.locations[element.locations.length - 1].date_and_time) > definedTime) {
                                            useDefaultIcon = true;
                                        }
                                        if (objectDetail)
                                            return [(
                                                <div>
                                                    {
                                                        line.map((loc, i) => {
                                                            if (i + 1 <= line.length - 1) {
                                                                return ([<Mrk location={loc} icon={element.object_type.image} rotation={bearing(line[i][0], line[i][1], line[i + 1][0], line[i + 1][1])}></Mrk>,
                                                                ])
                                                            }
                
                                                        })
                                                    }
                                                    <Mrk location={line[line.length - 1]} icon={element.object_type.image}></Mrk>
                                                    <Polyline pathOptions={fillBlueOptions} positions={line} />
                                                </div>
                                            )]
                                        else
                                            if (selectedUser == undefined || selectedUser == 0 || element.userId == selectedUser)
                                                return [(
                                                    <Marker position={[element.locations[element.locations.length - 1].lat, element.locations[element.locations.length - 1].long]} icon={getMarkerIcon(element.object_type.image, useDefaultIcon)}>
                                                        <MarkerPopup line={line} icon={element.object_type.image} objectTitle={element.name} locTime={element.locations[element.locations.length - 1].date_and_time} />
                                                    </Marker>

                                                )]
                                    }
                                })
                            }
                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

