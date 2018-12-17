import React, { Component } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

export default class App extends Component {

	state = {
		region: {
			latitude: 37.78825,
			longitude: -122.4324,
			latitudeDelta: 0.05,
			longitudeDelta: 0.05 * ASPECT_RATIO
		}
	}

	_watchID = null

	componentDidMount = () => {
		this._watchID = navigator.geolocation.watchPosition(p => {
			const { latitude, longitude } = p.coords
			this.setState({
				region: {
					latitude,
					longitude,
					latitudeDelta: 0.05,
					longitudeDelta: 0.05 * ASPECT_RATIO
				}
			})
		})
	}

	componentWillUnmount = () => {
		navigator.geolocation.clearWatch(this._watchID)
	}

	handleUpdateUserLocation(center) {
		this._map && this._map.moveTo([center.coords.longitude, center.coords.latitude])
	}

	render() {
		return (
			<MapView
				provider={PROVIDER_GOOGLE}
				showsUserLocation={true}
				showsMyLocationButton={true}
				style={styles.container}
				region={this.state.region}
				center={this.state.region}
			/>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})