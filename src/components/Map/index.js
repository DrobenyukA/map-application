import { useEffect } from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { useSelector } from 'react-redux';

import './styles.css';

const defaultPosition = [51.505, -0.09];

const Map = ({ position = defaultPosition }) => {
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        // Fixed issue with react leaflet icons
        const styles = document.createElement('link');
        styles.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
        styles.rel = 'stylesheet';
        styles.integrity = 'sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==';
        styles.crossOrigin = '';
        document.head.appendChild(styles);

        return () => document.head.removeChild(styles);
    }, []);

    return ((
        <MapContainer className="map" center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {user && (
                <Marker position={position}>
                <Popup>
                    Hello, {user.name}.
                </Popup>
            </Marker>
            )}
        </MapContainer>
    ))
};

export default Map;
