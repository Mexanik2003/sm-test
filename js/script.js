$(document).ready(function() {


    let viewport = $(".slider-viewport").width(); // Ширина видимой части
    let slider = $("div.slider"); // Весь слайдер
    let viewSlide = 0; // Номер слайда

 
    $('.slider-buttons__btn-right').click(function() {
        if (viewSlide < 4) {
            viewSlide++;
        } else {
            viewSlide = 0;
        }
        slider.animate({'left': -viewSlide * viewport + "px"}, {'duration': 500})  
    });

    $('.slider-buttons__btn-left').click(function() {
        if (viewSlide > 0) {
            viewSlide--;
        } else {
            viewSlide = 4;
        }
        slider.animate({'left': -viewSlide * viewport + "px"}, {'duration': 500})  
    });



    $("#calc-form-submit").click(function(event) {
        event.preventDefault();
        calculate();
    });

    $("#from").on('change', function() {
        calculate();

    })

    $("#to").on('change', function() {
        calculate();

    })

    $("#get-variant1").on('change', function() {
        calculate();

    })

    $("#get-variant2").on('change', function() {
        calculate();

    })

    $("#insurance").on('change', function() {
        calculate();

    })


    function calculate() {
        let calc = {};
        calc.from=$('#from').val();
        calc.to=$('#to').val();

        // '1' Москва
        // '2' Санкт-Петербург
        // '3' Екатеринбург
        // Москва – Санкт-Петербург	712 км.
        // Москва – Екатеринбург	1795 км.
        // Екатеринбург – Санкт-Петербург	2301 км.

        let distanceArr=[
            [0,     0,      0,     0],
            [0,     0,      712,   1795],
            [0,     712,    0,     2301],
            [0,     1795,   2301,  0]
        ];

        calc.distance=distanceArr[calc.from][calc.to];

        calc.weight=$('#weight').val();
        if ($('#get-variant1').is(':checked')) {
            calc.var = 50;
        } else {
            calc.var = 0;
        }
    
        if ($('#insurance').is(':checked')) {
            calc.ins = 5;
        } else {
            calc.ins = 0;
        }
        calc.res =  calc.weight * (calc.distance*0.2 + calc.var + calc.ins);
        calc.res=Math.round(calc.res);
        $('#calc-sum-value__bigtext').text(calc.res.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    };


    $(function(){
        var handle = $("#slider-weight-value");
        var input = $("#weight");
        $("#slider-weight").slider({
            min: 1,
            max: 500,
            value: 300,
            range: "max",
            create: function() {
                input.val($(this).slider("value"));
                handle.text($(this).slider("value") + " кг.");
                handle.css("left", $("#slider-weight-slider").css("left"));
                handle.css("transform", "translate(-50%,29px)");
                calculate()
            },
            slide: function(event, ui) {
                input.val($(this).slider("value"));
                handle.text( $(this).slider("value")  + " кг.");
                handle.css("left", $("#slider-weight-slider").css("left"));
                handle.css("transform", "translate(-50%,29px)");
                calculate()
            }
        });
    });
});

function initMap() {
    const location = { lat: 56.8435859, lng: 60.5941851};

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: location,
    });

    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: "Екатеринбург",
    });
    marker.setIcon('../images/map_icon.png');
}