import React from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';
import './Styles/styles.css';
import getMarkerIcon from './utilities/markerIconUtlities';
import bearing from "./utilities/markerRotaionUtilities";

const MarkerPopup = (props) => {

    const fillBlueOptions = { fillColor: 'blue' }
    var createReactClass = require('create-react-class');
    var Mrk = createReactClass({
        render: function () {
            console.log(this.props.rotation)
            return <Marker position={this.props.location} icon={getMarkerIcon(this.props.icon)} rotationOrigin='center' rotationAngle={this.props.rotation}  />
        }
    });

    if (props.line == undefined)
        return (<></>);


    return (
        // Important! Always set the container height explicitly
        <div className="bodyFont">
            <Popup maxWidth="auto">
                <div className="popupDiv">
                    <h4>{props.objectTitle}</h4>
                    <h5>Datum i vrijeme poslednje lokacije: {props.locTime}</h5>
                    <MapContainer className="main" center={props.line[props.line.length - 1]} zoom={8} >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <div>
                            {
                                props.line.map((element, i) => {
                                    if (i + 1 <= props.line.length - 1) {

                                        return ([<Mrk location={element} icon={props.icon} rotation={bearing(props.line[i][0], props.line[i][1], props.line[i + 1][0], props.line[i + 1][1])}></Mrk>,
                                        ])
                                    }
                        /*             else {
                                        return ([<Mrk location={element} icon={props.icon} rotation={bearing(props.line[i - 1][0], props.line[i - 1][1], props.line[i][0], props.line[i][1])}></Mrk>,
                                        ])
                                    } */
                                })

                            }
                            <Mrk location={props.line[props.line.length - 1]} icon={props.icon}></Mrk>
                            <Polyline pathOptions={fillBlueOptions} positions={props.line} />
                        </div>
                    </MapContainer>
                </div>
            </Popup>
        </div>
    );
}

export default MarkerPopup;
