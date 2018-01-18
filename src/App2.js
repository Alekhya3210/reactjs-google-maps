import React from 'react';
import './index.css';

const google = window.google;

export default class App2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    componentDidMount() {
        let map = new google.maps.Map(this.refs.map, {
            zoom: 13,
            center:{lat:23.124467,lng:113.39553899999999}
        });
        let searchBox = new google.maps.places.SearchBox(this.refs.city);

        let marker = {setMap: () => {}};
        searchBox.addListener('places_changed', () => {
            let places = searchBox.getPlaces();
            if (places.length == 0) {
                return;
            }
            let place = places[0];
            marker.setMap(null);
            marker = new google.maps.Marker({
                map: map
            });
            map.setZoom(11);
            map.setCenter(place.geometry.location);
            // Set the position of the marker using the place ID and location.
            marker.setPlace({
                placeId: place.place_id,
                location: place.geometry.location
            });
            marker.setVisible(true);

            let postalCodes = place.address_components.filter(function (it) { return it.types.indexOf('postal_code') != -1;}).map(function (it) {return it.long_name;});
            this.zipCodeChanged(postalCodes[0]);
        });
    }

    zipCodeChanged = (postalCode) => {
        this.setState({
            city: this.refs.city.value,
            postalCode: postalCode || '',
            error: !postalCode && 'Please choose a detailed address!',
            enabled: postalCode != null
        });
    };

    render() {
        var {postalCode, enabled, city, error}=this.state;
        return (
            <form>
                <h2>Choose city to enable form for submit</h2>
                Postal Code:{error ? <span className="error">{error}</span> : null}
                <input name="zipcode" value={postalCode} readOnly placeholder="Updated by city input!"/>
                City:
                <input name="city" ref="city"/>
                <div className="map" ref="map"></div>
                <button type="submit" disabled={!enabled}>Submit</button>
            </form>
        );
    }
}

/*
ReactDOM.render(<Form/>, document.getElementById('content'));


    }*/
