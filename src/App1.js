import React from 'react';
import './index.css';


export default class App1 extends React.Component {
    constructor() {
        super();
        this.state = {
            zoom: 13,
            maptype: 'roadmap',
            place_formatted: '',
            place_id: '',
            place_location: '',
        };
    }

    componentDidMount() {
        let map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat:35.227085, lng:-80.843124},
            zoom: 13,
            mapTypeId: 'roadmap',
        });

        let marker = new window.google.maps.Marker({
            map: map,
            position: {lat:35.227085, lng:-80.843124},
        });

// initialize the autocomplete functionality using the #pac-input input box
        let inputNode = document.getElementById('pac-input');
        map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputNode);
        let autoComplete = new window.google.maps.places.Autocomplete(inputNode);

        autoComplete.addListener('place_changed', () => {
            let place = autoComplete.getPlace();
            let location = place.geometry.location;

            this.setState({
                place_formatted: place.formatted_address,
                place_id: place.place_id,
                place_location: location.toString(),
            });

            // bring the selected place in view on the map
            map.fitBounds(place.geometry.viewport);
            map.setCenter(location);

            marker.setPlace({
                placeId: place.place_id,
                location: location,
            });
        });

        map.addListener('zoom_changed', () => {
            this.setState({
                zoom: map.getZoom(),
            });
        });

        map.addListener('maptypeid_changed', () => {
            this.setState({
                maptype: map.getMapTypeId(),
            });
        });
    }

    render() {
        return (
            <div id='app'>
               <div id='map' />
                <div id='pac-container'>
                    <input id='pac-input' type='text' placeholder='Enter a location' />
                </div>
                <div id='state'>
                    <h1>State</h1>
                    <p>Place: {this.state.place_formatted}</p>
                  {/*  <p>Place ID: {this.state.place_id}</p>*/}
                    <p>Location: {this.state.place_location}</p>
                    <p>
                        Zoom level: {this.state.zoom}<br />
                        Map type: {this.state.maptype}
                    </p>
                </div>
            </div>
        );
    }
};
