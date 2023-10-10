import { StyleSheet, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Weather from './Weather'
import * as Location from 'expo-location'


export default function Position() {
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [message, setMessage] = useState('Retrieving location...')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            console.log(status)
            try {
                if (status !== 'granted') {
                    setMessage('Location not permitted.')
                } else {
                    const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                    setMessage('Location retrieved')
                }
            } catch (error) {
                setMessage('Error retrieving location.')
                console.log(error)
            }
            setIsLoading(false)
        })()
    }, [])

    return (
        <View>
            <Text style={styles.coords}>{latitude.toFixed(3)}, {longitude.toFixed(3)}</Text>
            <Text style={styles.message}>{message}</Text>
            {isLoading === false &&
                <Weather latitude={latitude} longitude={longitude} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    coords: {
        fontSize: 18,
        marginBottom: 20,
    },
    message: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
