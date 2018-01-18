import React from 'react';
import './index.css';

const google = window.google;

export default class App2 extends React.Component {
    /*  constructor(props) {
     super(props);
     this.state = {};

     }

     componentDidMount() {
     this.initAutocomplete();

     let componentForm = {
     street_number: 'short_name',
     route: 'long_name',
     locality: 'long_name',
     administrative_area_level_1: 'short_name',
     country: 'long_name',
     postal_code: 'short_name'
     };

     let autocomplete = new google.maps.places.Autocomplete(
     (document.getElementById('autocomplete')),
     {types: ['geocode']});

     let place = new google.autocomplete.getPlace();
     for (let component in componentForm) {
     document.getElementById(component).value = '';
     document.getElementById(component).disabled = false;
     }


     for (let i = 0; i < place.address_components.length; i++) {
     let addressType = place.address_components[i].types[0];
     if (componentForm[addressType]) {
     let val = place.address_components[i][componentForm[addressType]];
     document.getElementById(addressType).value = val;
     }
     }


     */
    static propTypes = {}

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initAutocomplete();
    }


    initAutocomplete() {
        this.autocomplete = new google.maps.places.Autocomplete((this.refs.autoCompletePlaces), {types: ['geocode']});

        this.autocomplete.addListener('place_changed', this.fillInAddress);

    }

    geolocate() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
            });
        }

    }

    fillInAddress() {
        this.componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
        };
        // Get the place details from the autocomplete object.
        this.place = this.autocomplete.getPlace();
        for (let component in this.componentForm) {
            this.refs.component.value = '';
            this.refs.component.disabled = false;
        }

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (let i = 0; i < this.place.address_components.length; i++) {
            const addressType = this.place.address_components[i].types[0];
            if (this.componentForm[addressType]) {
                const val = this.place.address_components[i][this.componentForm[addressType]];
                this.refs.addressType.value = val;
            }
        }
    }


    render() {
        return (
            <div>
                <div id="locationField">
                    <input id="autocomplete" placeholder="Enter your address"
                           onFocus="geolocate()" type="text"></input>
                </div>

                <table id="address">
                    <tr>
                        <td class="label">Street address</td>
                        <td class="slimField"><input class="field" id="street_number"
                                                     disabled="true"></input></td>
                        <td class="wideField" colspan="2"><input class="field" id="route"
                                                                 disabled="true"></input></td>
                    </tr>
                    <tr>
                        <td class="label">City</td>

                        <td class="wideField" colspan="3"><input class="field" id="locality"
                                                                 disabled="true"></input></td>
                    </tr>
                    <tr>
                        <td class="label">State</td>
                        <td class="slimField"><input class="field"
                                                     id="administrative_area_level_1" disabled="true"></input></td>
                        <td class="label">Zip code</td>
                        <td class="wideField"><input class="field" id="postal_code"
                                                     disabled="true"></input></td>
                    </tr>
                    <tr>
                        <td class="label">Country</td>
                        <td class="wideField" colspan="3"><input class="field"
                                                                 id="country" disabled="true"></input></td>
                    </tr>
                </table>


            </div>
        );
    }
}