/*
    sticky navigation
*/
$(document).ready(function() {
    var stickyTop = $('#main-header').offset().top;

    var stickyNav = function(){
        var scrollTop = $(window).scrollTop();

        if (scrollTop > stickyTop) {
            $('html').addClass('sticky');
        } else {
            $('html').removeClass('sticky');
        }
    };

    $(window).scroll(function() {
        stickyNav();
    });
});

/*
    get json data for map
*/
$(document).ready(function() {
    $.ajax({
      url: 'assets/javascripts/leaflet-0.7.3/leaflet.js',
      dataType: 'script',
      cache: true,
      success: function() {
        var myIcon = L.icon({
            iconUrl: 'assets/images/freifunk-flensburg-map-icon.png',
            iconRetinaUrl: 'assets/images/freifunk-flensburg-map-icon.png',
            iconSize: [30, 32],
            iconAnchor: L.Point(30, 32),
            popupAnchor: L.Point(-15, -32)
        });

        var map = L.map('map', {
            icon: myIcon,
            scrollWheelZoom: true,
            center: [51.705092, 6.287471],
            zoom: 10
        });

        L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var setNodeToMap = function(node) {
            if(node.nodeinfo.location && node.flags.online) {
                L.marker([node.nodeinfo.location.latitude, node.nodeinfo.location.longitude], {icon: myIcon}).addTo(map).bindPopup('<h3>' + node.nodeinfo.hostname + '</h3>');
            }
        };

        $.ajax({
            cache: false,
            url: 'nodes.json',
            dataType: 'json',
            success: function(data) {
                var countNodes = 0;

                for (var node in data.nodes) {
                    setNodeToMap(data.nodes[node]);

                    if (data.nodes[node].flags.online && data.nodes[node].nodeinfo.hostname !== '') {
                        countNodes++;
                    }
                }

                $('#count-nodes').html(countNodes);
            }
        });

      }
    });

});

/*
    choose customer
*/
$(document).ready(function() {
    var $chooseCustomerItems = $('#choose-customer li');
    var $showCustomerItems = $('#show-customer article');

    $showCustomerItems.removeClass('active');
    $('#show-customer article:first-child').addClass('active');

    $chooseCustomerItems.click(function() {
        $chooseCustomerItems.removeClass('active');
        $showCustomerItems.removeClass('active');

        $(this).addClass('active');
        $('#'+$(this).data('show-customer')).addClass('active');
    });
});

/*
    firmware download
*/
$(document).ready(function() {
    $('#download-form').submit(function( event ) {
        event.preventDefault();

        var type = '',
            fileExtension = '',
            router,
            community = '';


        switch ($('#download-form-type').val()) {
            case '0':
                type = 'factory';
                break;
            case '1':
                type = 'sysupgrade';
                fileExtension = '-sysupgrade';
                break;
            default:
                type = 'factory';
        }

        switch ($('#download_form_choose_comunity').val()) {
            case '0':
                community = 'notset';
                break;
            case 'ffalpen':
                community = 'ffalpen';
                break;
            case 'ffbgh':
                community = 'ffbgh';
                break;
            case 'ffemm':
                community = 'ffemm';
                break;
            case 'fffl':
                community = 'fffl';
                break;
            case 'ffgel':
                community = 'ffgel';
                break;
            case 'ffgoch':
                community = 'ffgoch';
                break;
            case 'ffhnx':
                community = 'ffhnx';
                break;
            case 'ffkev':
                community = 'ffkev';
                break;
            case 'ffkkar':
                community = 'ffkkar';
                break;
            case 'ffkle':
                community = 'ffkle';
                break;
            case 'ffkra':
                community = 'ffkra';
                break;
            case 'ffree':
                community = 'ffree';
                break;
            case 'ffstr':
                community = 'ffstr';
                break;
            case 'ffwawa':
                community = 'ffwawa';
                break;
            case 'ffwes':
                community = 'ffwes';
                break;
            case 'ffxan':
                community = 'ffxan';
                break;
            default:
                community = 'notset';
        }

        router = $('#download-form-router').val();

        if(router === '-1') {
            window.alert('Bitte wähle eine Router aus. Den genauen Namen und die Version deines Routers findest du auf seiner Unterseite.');
         }
         else{
                if(community == 'notset'){
                    window.alert('Bitte gib eine Comunity an.');
                }
                else {
                    prefix = 'gluon-';
                    version = '0.7.3';
                    window.location.href = 'http://images.niederrhein.freifunk.ruhr/' + community + '/' + 'stable'  + '/' + type + '/' + prefix +  community + '-' + version + '+stable+'+ community + router + fileExtension + '.bin';
                }
        }

        return false;
    });
});

/*
    smooth scrolling
*/
$(function() {
    var $root = $('html, body');

    $('a').click(function() {
        var href = $.attr(this, 'href');
        $root.animate({
            scrollTop: $(href).offset().top
        }, 500);
        return false;
    });
});
