import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { City, Offer } from '../../mocks/offers';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedOffer: Offer | null;
};

function Map({ city, offers, selectedOffer }: MapProps): JSX.Element {
  const mapRef = useRef(null);

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
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          }
        )
        .addTo(map);

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
        leaflet
          .marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude
            },
            {
              icon:
                offer.id === selectedOffer?.id
                  ? currentCustomIcon
                  : defaultCustomIcon
            }
          )
          .addTo(map);
      });

      return () => {
        map.remove();
      };
    }
  }, [city, offers, selectedOffer]);

  return <div className="cities__map map" ref={mapRef}></div>;
}

export default Map;
