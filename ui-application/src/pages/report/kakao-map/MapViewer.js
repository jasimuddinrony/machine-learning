import React, {useEffect} from 'react';
import {Map, MapMarker} from 'react-kakao-maps-sdk';

const MapViewer = ({
    data
                   }) => {

    const [mapData, setMapData] = React.useState([]);
    const [centerLat, setCenterLat] = React.useState(0);
    const [centerLong, setCenterLong] = React.useState(0);

    useEffect(() => {
        setMapData(data);
        if(data && data.results && data.results.length > 0) {
            const coordinates = data.results.map(result => ({
                lat: result.lat,
                lng: result.long
            }));
            calculateCenter(coordinates);
        }
    }, [data]);

    function calculateCenter(coordinates) {
        if (coordinates.length === 0) {
            return null; // Return null if the coordinates array is empty
        }
        setCenterLat(coordinates[0].lat);
        setCenterLong(coordinates[0].lng);
    }

    const getMapMarkers = (item, index) => {
        if(item && item.lat && item.long){
            return (
                <MapMarker
                    key={index}
                    position={{ lat: item.lat, lng: item.long }}
                    onClick={e=>{console.log("I am clicked from map marker " + index)}}
                >
                    <div style={{color:"#000", padding: "4px 5px 4px 5px"}}> <span className={"numberCircle"}>{item.rank}</span> {item.name}</div>
                </MapMarker>
            );
        } else {
            return (<></>);
        }
    }


  return (
      <Map
          center={{ lat: centerLat, lng: centerLong }}
          style={{ width: "100%", height: "650px" }}
          level={8}
      >
          {mapData && mapData.results && mapData.results.map((item, index) => (
            getMapMarkers(item, index)
          ))}

      </Map>
  );
}

export default MapViewer
