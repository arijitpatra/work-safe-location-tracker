import { Component, OnInit, ViewChild } from '@angular/core';
/// <reference types="@types/googlemaps" />

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;

  map: google.maps.Map;
  infoWindow: any;
  mapProp: any;


  constructor() { }

  ngOnInit() {
    setTimeout(x => {
      console.log('called');
      this.initMap();
    }, 2000);
  }

  initMap() {
    console.log('called2');
    this.mapProp = {
      center: {lat: -34.397, lng: 150.644},
      zoom: 21
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);
  
    this.infoWindow = new google.maps.InfoWindow;
    // this.infoWindow2 = new google.maps.InfoWindow;
  
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        // var mapTrack = firebase.database().ref('users/arijit/');
        // mapTrack.on('value', function(snapshot) {
        //   var pos = {
        //   lat: snapshot.val().latitude,
        //   lng: snapshot.val().longitude
        // };
        // navigator.geolocation.watchPosition(function(position) {
        // var posMine = {
        //   lat: position.coords.latitude,
        //   lng: position.coords.longitude
        // };
        //    var dist = getDistanceFromLatLonInKm(pos.lat, pos.lng, posMine.lat, posMine.lng);
        // dist = dist.toFixed(3);
        const pos = {
          lat: 18.5793,
          lng: 73.8143
        }
        this.infoWindow.setPosition(pos);
        // this.infoWindow.setContent('Your friend is here! ' + dist + ' km(s) away');
        this.infoWindow.open(this.map);
        this.map.setCenter(pos);
        //infoWindow2.setPosition(posMine);
        //infoWindow2.setContent('You are here! ' + dist + ' km(s) away');
        //infoWindow2.open(map);
      //   });
      // }, function() {
      //   this.handleLocationError(true, infoWindow, map.getCenter());
      // },{enableHighAccuracy: true});
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, this.infoWindow, this.map.getCenter());
    }
  }
  
  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed. Please enable location sharing on your browser.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(this.map);
  }

}






