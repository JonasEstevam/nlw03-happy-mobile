import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE, Callout} from 'react-native-maps';
import {Feather} from '@expo/vector-icons';
import {StyleSheet, Text, View} from 'react-native';
import mapMarker from '../images/map-marker.png';
import {useNavigation} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';
import api from '../services/api';

interface OrphanageITem {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
}
export default function OrphanagesMap() {
	const [orphanages, setOrphanages] = useState<OrphanageITem[]>([]);
	const navigation = useNavigation();

	useEffect(() => {
		api.get('orphanages').then((response) => {
			setOrphanages(response.data);
		});
	}, []);

	function handleNavigateToOrphanateDetails(id: number) {
		navigation.navigate('OrphanageDetails', {id});
	}
	function handleNavigateToCreateOrphanage() {
		navigation.navigate('SelectMapPosition');
	}
	return (
		<View style={styles.container}>
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				initialRegion={{
					latitude: -23.6925514,
					longitude: -46.5836981,
					longitudeDelta: 0.05,
					latitudeDelta: 0.05,
				}}
			>
				{orphanages.map((orphanage) => {
					return (
						<Marker
							key={orphanage.id}
							calloutAnchor={{
								x: 2.7,
								y: 0.8,
							}}
							icon={mapMarker}
							coordinate={{
								latitude: orphanage.latitude,
								longitude: orphanage.longitude,
							}}
						>
							<Callout
								onPress={() => handleNavigateToOrphanateDetails(orphanage.id)}
								tooltip={true}
							>
								<View style={styles.calloutContainer}>
									<Text style={styles.calloutText}>{orphanage.name}</Text>
								</View>
							</Callout>
						</Marker>
					);
				})}
			</MapView>

			<View style={styles.footer}>
				<Text style={styles.footerText}>
					{orphanages.length} orfanatos encontrados
				</Text>

				<RectButton
					style={styles.createOrphanageButton}
					onPress={handleNavigateToCreateOrphanage}
				>
					<Feather name='plus' size={20} color='#FFF' />
				</RectButton>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: '100%',

		height: '100%',
	},
	calloutContainer: {
		width: 160,
		height: 46,
		paddingHorizontal: 16,
		backgroundColor: 'rgba(255,255,255,0.8)',
		borderRadius: 16,
		justifyContent: 'center',
	},
	calloutText: {
		color: '#0089a5',
		fontSize: 14,
		fontFamily: 'Nunito_700Bold',
	},
	footer: {
		position: 'absolute',
		left: 24,
		right: 24,
		bottom: 32,
		backgroundColor: '#FFF',
		borderRadius: 20,
		height: 56,
		paddingLeft: 24,

		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		elevation: 5,
	},
	footerText: {
		fontFamily: 'Nunito_700Bold',
		color: '#8fa7b3',
	},
	createOrphanageButton: {
		width: 56,
		height: 56,
		backgroundColor: '#15c3d6',
		borderRadius: 20,

		justifyContent: 'center',
		alignItems: 'center',
	},
});
