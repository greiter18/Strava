import React from 'react';
import ReactDOM from 'react-dom';
import { Map, GoogleApiWrapper , InfoWindow, Marker} from 'google-maps-react';
// let myLatlng = new google.maps.LatLng(40.630087000,-74.107730000);
// let marker = new google.maps.Marker({
//   position: myLatlng,
// })
class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marks: []
    }
    this.points = this.state.marks;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.geocoder = new google.maps.Geocoder();
    this.renderMarkers = this.renderMarkers.bind(this);
    this.removeLastPoint = this.removeLastPoint.bind(this);
    this.removeAllPoints = this.removeAllPoints.bind(this);
  }

  componentDidMount(){
    const options = {
      center: {lat: 40.6302923, lng: -74.1077045},
      zoom: 15,
      mapId: '2cf9dff401d20cef',
      clickableIcons: false,
      maxZoom: 16
    };
    this.map = new google.maps.Map(this.mapstart, options);
    this.directionsRenderer.setMap(this.map)
    //          where the map is going / options
    this.map.addListener("click", (e) => {
			// adds lat/lng object to waypoints array
			this.points.push({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      console.log("points----------",this.points)
			this.renderMarkers();
		});
  }

  renderMarkers(){
    const beginPoint = this.points[0];
    console.log('beginpoint--------------',beginPoint)
    let endPoint = this.points[this.points.length - 1];
    console.log('endpoint--------------',endPoint)
    this.setState({["marks"]: this.points})

    this.directionsService.route({
      origin: beginPoint,
      destination: endPoint,
      travelMode: google.maps.TravelMode.WALKING,
      unitSystem: google.maps.UnitSystem.IMPERIAL
    },
    (response, status) => {
      if (status === 'OK') {
        // const distance = response.routes[0].legs[0].distance.text;
        // // let thumbnail = this.getThumbnailUrl(response);
        // let bounds = response.routes[0].bounds;

        this.directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request faile due to " + status);
      }
    })
  }

  searchAddress(address) {
		this.geocoder.geocode({ address: address }, (res, status) => {
			const locationName = res[0];
			if (status === "OK") {
				this.map.setCenter(res[0].geometry.location);
				this.setState({ ["location"]: res[0] });
			}
		});
	}

  removeLastPoint(){
    this.points.pop();
    this.renderMarkers();
    console.log('removelastpoint-----------',this.points)
  }

  removeAllPoints(){
    if (this.points.length > 0){
      this.points = []
    }
    this.directionsRenderer.setDirections({ routes: [] });
    
  }


  render(){
    return(
      <div>
        	{/* <form
								className="cr-search-bar"
								onSubmit={() => this.searchAddress(address)}
							>
								<label>Choose map location</label>
								<input
									className="input geocoder"
									type="text"
									placeholder="Enter location"
									// value={this.state.address}
									// onChange={this.update("address")}
								/>
								<button id="geocoder-submit">Search</button>
							</form> */}
      <div className="removelast">
        <h1 onClick={() => this.removeLastPoint()}><i className="fas fa-undo-alt"></i></h1>
        <h1 onClick={() => this.removeAllPoints()}><i className="fas fa-trash-alt"></i></h1>
      </div>
      
      
        <div id='map' ref={(map) => (this.mapstart = map)}></div> 
      </div>
    )
  }
}

export default Maps;