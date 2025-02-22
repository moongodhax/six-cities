import leaflet, { LayerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { City, Offer } from '../../mocks/offers';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedOffer?: Offer | null;
  className?: string;
};

function Map({ city, offers, selectedOffer, className = '' }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const markersLayerRef = useRef<LayerGroup>(new leaflet.LayerGroup());

  useEffect(() => {
    if (mapRef.current) {
      const map = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        zoom: city.location.zoom
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          }
        )
        .addTo(map);

      markersLayerRef.current.addTo(map);

      return () => {
        map.remove();
      };
    }
  }, [city]);

  useEffect(() => {
    const markerLayer = markersLayerRef.current;
    markerLayer.clearLayers();

    const defaultCustomIcon = leaflet.icon({
      iconUrl: URL_MARKER_DEFAULT,
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });

    const currentCustomIcon = leaflet.icon({
      iconUrl: URL_MARKER_CURRENT,
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });

    offers.forEach((offer) => {
      const marker = new Marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude
      });

      marker
        .setIcon(
          selectedOffer && offer.id === selectedOffer.id
            ? currentCustomIcon
            : defaultCustomIcon
        )
        .addTo(markerLayer);
    });
  }, [offers, selectedOffer]);

  return <section className={`map ${className}`} ref={mapRef}></section>;
}

export default Map;
