import React, {useEffect} from 'react';

const MapComponentV3 = ({
                            data
                            , targetItem
                        }) => {



    useEffect(() => {

        let mapContainer = document.getElementById('map');
        mapContainer.innerHTML = '';


        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
        function makeOverListener(map, marker, infowindow) {
            return function() {
                infowindow.open(map, marker);
            };
        }

        // 인포윈도우를 닫는 클로저를 만드는 함수입니다
        function makeOutListener(infowindow) {
            return function() {
                infowindow.close();
            };
        }

        function makeSelectListener(map, marker, infowindow) {
            return function() {

                console.log("Checked click on marker")

                infowindow.setZIndex(99);

                let markerContent = infowindow.getContent();
                console.log(markerContent);
                // Replace 'numberCircle' with 'numberCircleActive'
                if (markerContent.includes('numberCircleBasic')) {
                    markerContent = markerContent.replace('numberCircleBasic', 'numberCircleActive');
                } else if (markerContent.includes('numberCircleActive')) {
                    markerContent = markerContent.replace('numberCircleActive', 'numberCircleBasic');
                }
                console.log(markerContent);
                infowindow.setContent(markerContent);
                infowindow.open(map, marker);
            };
        }

        if(data && data.results && data.results.length > 0 ){

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
            // let mapContainer = document.getElementById('map');
            let map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
            var _markerIndex = data.results.length;
            let positions = data.results
                .filter(result => result.lat && result.long) // Filter out results with empty lat/long values
                .map(result => ({
                    position: new window.kakao.maps.LatLng(result.lat.toFixed(6), result.long.toFixed(6)),
                    content: '<div class="title-with-icon" style="padding: 5px; margin-bottom: 0px"><div>' +
                        ((targetItem.rank && targetItem.rank === result.rank)
                            ? '<span id="' + result.rank + '" class="numberCircleActive">' + result.rank + ' </span>'
                            : '<span id="' + result.rank + '" class="numberCircleBasic">' + result.rank + ' </span>') +
                        '</div><div style="min-width: 130px">' + result.name +'</div></div>',
                    markerIndex: _markerIndex--,
                    selectedMarker: (targetItem.rank && targetItem.rank === result.rank) ? 99 : 0,
                    rank: result.rank
                }));

            for (var i = 0; i < positions.length; i ++) {
                // 마커를 생성합니다
                var marker = new window.kakao.maps.Marker({
                    map: map, // 마커를 표시할 지도
                    position: positions[i].position // 마커의 위치
                });

                // 마커에 표시할 인포윈도우를 생성합니다
                var infowindow = new window.kakao.maps.InfoWindow({
                    content: positions[i].content // 인포윈도우에 표시할 내용
                    // , map:map,
                    // position: positions[i].position
                });

                const markerIndex = positions[i].markerIndex;

                const selectedMarker = positions[i].selectedMarker;

                if(selectedMarker == 99){
                    infowindow.setZIndex(99);
                } else {
                    infowindow.setZIndex(markerIndex);
                }

                if(positions[i].rank === targetItem.rank) {
                    infowindow.open(map, marker);
                }

                window.kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
                window.kakao.maps.event.addListener(marker, 'click', makeSelectListener(map, marker, infowindow));
                window.kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

            }

        }

    }, [data, targetItem]);


    return <div id="map" style={{ width: '100%', height: '800px' }} />;
};

export default MapComponentV3;
