import React, { useEffect } from 'react';
import { Map, Marker, InfoWindow } from 'react-kakao-maps-sdk';

const MapComponentV2 = ({
                            data
    , targetItem
                        }) => {

    useEffect(() => {
        if(data && data.results && data.results.length > 0){
            let firstRankMapData = data.results[0];
            let centerLat = firstRankMapData.lat?firstRankMapData.lat : 35.221748;
            let centerLong = firstRankMapData.long?firstRankMapData.long : 128.667344;
            if(targetItem && targetItem.lat && targetItem.long){
                centerLat = targetItem.lat;
                centerLong = targetItem.long;
            }

            const mapOption = {
                center: new window.kakao.maps.LatLng(centerLat.toFixed(6), centerLong.toFixed(6)), // 지도의 중심좌표
                level: 6 // 지도의 확대 레벨
            };

            // 지도를 표시할 div
            let mapContainer = document.getElementById('map');
            const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
            var _markerIndex = data.results.length;
            const markers = data.results
                .filter(result => result.lat && result.long) // Filter out results with empty lat/long values
                .map(result => ({
                    position: new window.kakao.maps.LatLng(result.lat.toFixed(6), result.long.toFixed(6)),
                    content: '<div class="title-with-icon" style="padding: 5px; margin-bottom: 0px"><div>' +
                        ((targetItem.rank && targetItem.rank === result.rank)
                            ? '<span id="' + result.rank + '" class="numberCircleActive">' + result.rank + ' </span>'
                            : '<span id="' + result.rank + '" class="numberCircleBasic">' + result.rank + ' </span>') +
                        '</div><div style="min-width: 130px">' + result.name + '</div></div>',
                    markerIndex: _markerIndex--,
                    selectedMarker: (targetItem.rank && targetItem.rank === result.rank) ? 99 : 0,
                    rank: result.rank
                }));

            markers.forEach((markerInfo) => {
                const marker = new window.kakao.maps.Marker({
                    position: markerInfo.position,
                });
                marker.setMap(map);

                const infowindow = new window.kakao.maps.InfoWindow({
                    content: markerInfo.content
                });

                const markerIndex = markerInfo.markerIndex;

                const selectedMarker = markerInfo.selectedMarker;

                infowindow.open(map, marker);
                if(selectedMarker == 99){
                    infowindow.setZIndex(99);
                } else {
                    infowindow.setZIndex(markerIndex);
                }


                window.kakao.maps.event.addListener(marker, 'mouseover', function () {
                    infowindow.setZIndex(99);
                });

                window.kakao.maps.event.addListener(marker, 'mouseout', function () {
                    infowindow.setZIndex(markerIndex);
                });

                window.kakao.maps.event.addListener(marker, 'click', function () {

                    console.log("Checked click on marker")

                    infowindow.setZIndex(99);

                    let markerContent = markerInfo.content;
                    console.log(markerContent);
                    // Replace 'numberCircle' with 'numberCircleActive'
                    if (markerContent.includes('numberCircleBasic')) {
                        markerContent = markerContent.replace('numberCircleBasic', 'numberCircleActive');
                    } else if (markerContent.includes('numberCircleActive')) {
                        markerContent = markerContent.replace('numberCircleActive', 'numberCircleBasic');
                    }
                    console.log(markerContent);
                    infowindow.setContent(markerContent);

                });

            });


        }

    }, [data, targetItem]);

    return <div id="map" style={{ width: '100%', height: '800px' }} />;
};

export default MapComponentV2;
