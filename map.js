var mousex = 0;
var mousey = 0;
var mapCenterx = 0;
var mapCentery = 0;

function openPano(d,h){
  console.log(d)
  //http://www.fullcirclethinking.com/VillasAtMonarchBeach/
  document.getElementById('panoFrame').src = 'panos/'+d+'_'+h+'_Pano'+'.html'
  $('#panoContain').css('display','block');

}
function setMouse(event){
  mousex = event.clientX;
  mousey = event.clientY;
  console.log(mousex,mousey);
}
//document.addEventListener("click",setMouse)
const styles = {
  default: [],
  hide: [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
  ],
};
var map;
function myMap() {
    var mapProp= {
    center:new google.maps.LatLng( 33.478413, -117.715661),
    zoom:19,
    //maxZoom: 20,
    minZoom: 13,
    mapTypeId: 'hybrid',
    tilt:45,
    disableDefaultUI: true
    };
    map = new google.maps.Map(document.getElementById("myMap"),mapProp);
    map.setOptions({ styles: styles["hide"] });
    var iconBase =
    'https://developers.google.com/maps/documentation/javascript/examples/full/images/';

    var icons = {
    garage: {
        icon: '/VillasAtMonarchBeach/pano1.png'
    },
    parking: {
        icon: '/VillasAtMonarchBeach/pano2.png'
    },
    backyard: {
        icon: 'pano3.png'
    }
    };
    var markers = [
        {
          name: 'View 1',
          info: '1',
            position: new google.maps.LatLng(  33.477272, -117.715318),
            type: 'backyard',
        },
        {
          name: 'View 2',
          info: '2',
            position: new google.maps.LatLng( 33.477902, -117.716597),
            type: 'backyard'
        },
        {
          name: 'View 3',
          info: '3',
            position: new google.maps.LatLng( 33.478624, -117.716970),
            type: 'backyard'
        },
        {
          name: 'View 4',
          info: '4',
            position: new google.maps.LatLng( 33.479298, -117.715994),
            type: 'backyard'
        },
        {
          name: 'View 5',
          info: '5',
            position: new google.maps.LatLng( 33.479336, -117.715130),
            type: 'backyard'
        },
        {
          name: 'View 6',
          info: '6',
            position: new google.maps.LatLng( 33.478902, -117.714306),
            type: 'backyard'
        },
        {
          name: 'View 7',
          info: '7',
            position: new google.maps.LatLng( 33.478140, -117.714544),
            type: 'backyard',
        },

    ]
    map.addListener('dragstart',function(){
    document.getElementById('markerCard').style.visibility = 'hidden';
    })

    map.addListener('zoom_changed',function(){
        document.getElementById('markerCard').style.visibility = 'hidden';
    })

    map.addListener('click',function(){
    document.getElementById('markerCard').style.visibility = 'hidden';
    })

    function latlng2point(position){
    
    var scale = Math.pow(2, map.getZoom());
    var proj = map.getProjection();
    var bounds = map.getBounds();

    var nw = proj.fromLatLngToPoint(
    new google.maps.LatLng(
      bounds.getNorthEast().lat(),
      bounds.getSouthWest().lng()
    ));
    var point = proj.fromLatLngToPoint(position);

    return new google.maps.Point(
    Math.floor((point.x - nw.x) * scale),
    Math.floor((point.y - nw.y) * scale));
    }

    for (var i = 0; i < markers.length; i++) {
        var marker = new google.maps.Marker({
          position: markers[i].position,
          icon: icons[markers[i].type].icon,
          map: map,
          label: markers[i].info,
          name: markers[i].name,
          info: markers[i].info
          
        });
        
    google.maps.event.addListener( marker, 'click', function() {
      //openPano(this.info)
      p = latlng2point(this.getPosition());
      var w = document.getElementById('markerCard').clientWidth*.5;
      var h = document.getElementById('markerCard').clientHeight*.5;
            //bound checking
            var l = p.x-w;
            var t = p.y;
            if (l < 0){l = 5;}
            if (l > (document.getElementById('overlay').clientWidth-(w*2))){l = document.getElementById('overlay').clientWidth-(w*2)-5;}
            if (t < 0){t = 5;}
            if (t > (document.getElementById('overlay').clientHeight-(h*2))){t = document.getElementById('overlay').clientHeight-(h*2)-5;}

      document.getElementById('markerCard').style.left = (l).toString()+'px';
      document.getElementById('markerCard').style.top = (t).toString()+'px';     
      document.getElementById('markerCard').style.visibility = 'visible';
      document.getElementById('markerCard').style.opacity = 0;
      
      document.getElementById("markerTitle").innerHTML = this.name;
      document.getElementById("markerTitle").title = this.info;

      //document.getElementById('markerCard').setAttribute( "onClick","javascript: openPano(document.getElementById('markerTitle').innerHTML,'High')")

      u = "url('https://fullcirclethinking.com/MaunaKea/images/"+this.info+".JPG')"
          
      document.getElementById('markerCard').style.backgroundImage = u;
      document.getElementById('markerCard').style.backgroundSize = "300px 300px";
      document.getElementById('markerCard').style.backgroundPosition = "0 -50px";
      document.getElementById("markerTitle").innerHTML = this.name;
      
      document.getElementById("markerTitle").style.top = '100px';
      
      document.getElementById("markerTitle").style.opacity = '0';
      $(".markerAnimate").animate({top:"0px",opacity:"1"},750)
      $("#markerCard").animate({opacity:"1"},750)
    
    });

    
  
      };
      
}

//document.getElementById('markerCard').setAttribute( "onClick","javascript: openPano(document.getElementById('markerTitle').title)")
document.getElementById('v25').setAttribute( "onClick","javascript: openPano(document.getElementById('markerTitle').title,'25')")
document.getElementById('v35').setAttribute( "onClick","javascript: openPano(document.getElementById('markerTitle').title,'35')")
document.getElementById('v45').setAttribute( "onClick","javascript: openPano(document.getElementById('markerTitle').title,'45')")
