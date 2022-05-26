export function map() {
    mapboxgl.accessToken = 'pk.eyJ1IjoidGFsZWF0ZyIsImEiOiJja3UwNTZ4d20yM2NkMnFxbmg3YTh3YmhwIn0.G-rYGFP-XAT_YXcz0j-ZVA';

    const map = new mapboxgl.Map({
        container: 'map',
        center: [2.3363, 48.86091],
        zoom: 15.78,
        style: 'mapbox://styles/mapbox/light-v10',
    });

    var marker1 = new mapboxgl.Marker({
        color: "black",
        draggable: false,
    }).setLngLat([2.33638, 48.860845])
        .addTo(map);

    var marker2 = new mapboxgl.Marker({
        color: "grey",
        draggable: false,
    }).setLngLat([2.3333, 48.86014])
        .addTo(map);

    var marker2 = new mapboxgl.Marker({
        color: "grey",
        draggable: false,
    }).setLngLat( [2.33965, 48.86064])
        .addTo(map);

    var marker2 = new mapboxgl.Marker({
        color: "grey",
        draggable: false,
    }).setLngLat([2.3330, 48.86184])
        .addTo(map);

    var marker2 = new mapboxgl.Marker({
        color: "grey",
        draggable: false,
    }).setLngLat([2.33648, 48.86243])
        .addTo(map);

    map.addControl(new mapboxgl.NavigationControl());
}
