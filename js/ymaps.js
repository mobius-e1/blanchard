ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
        center: [55.758463, 37.601079],
        zoom: 14,
        controls: []
    });

    var myGeoObjects = [];

    myGeoObjects = new ymaps.Placemark([55.758463, 37.601079], {
        balloonContentBody: 'Художественная галерея Blanchard<br>Шоурум №4<br>Леонтьевский переулок, дом 5/1<br>',
    }, {
        iconLayout: 'default#image',
        iconImageHref: '../img/mapmark.svg',
        iconImageSize: [20, 20],
        iconImageOffset: [-12, -1],
        hideIconOnBalloonOpen: false,
    });

    var clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: false
    });

    clusterer.add(myGeoObjects);
    myMap.geoObjects.add(clusterer);
    myMap.behaviors.disable('scrollZoom');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        myMap.behaviors.disable('drag');
    }

}

// myMap.geoObjects.add(myGeoObject);