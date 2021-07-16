$(document).ready(function() {


    let viewport = $(".slider-viewport").width(); // Ширина видимой части
    let slider = $("div.slider"); // Весь слайдер
    let viewSlide = 0; // Номер слайда

    const cycle = setInterval(slideToRight, 3000);

    function slideToRight() {
        if (viewSlide < 4) {
            viewSlide++;
        } else {
            viewSlide = 0;
        }
        slider.animate({'left': -viewSlide * viewport + "px"}, {'duration': 500})  
    }

    $('.slider-buttons__btn-right').click(function() {
        clearInterval(cycle); 
        slideToRight();
    });

    $('.slider-buttons__btn-left').click(function() {
        clearInterval(cycle); 
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
            value: 10,
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

    $('#callback-form').submit(function(e) {
        e.preventDefault();
        const form={};
        form.name = $('#callback-name').val();
        form.phone = $('#callback-phone').val();
        form.email = $('#callback-email').val();
        form.text = $('#callback-text').val();
        let validationFlag=true;


        if (form.name.length < 1) {
            $('#callback-name-error').css('visibility','initial');
            $('#callback-name').addClass('callback-form__input_highlight')
            validationFlag=false;
        } else {
            $('#callback-name-error').css('visibility','hidden');
            $('#callback-name').removeClass('callback-form__input_highlight')
        }

        var regEx = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
        var validEmail = regEx.test(form.email);
        if (form.email.length < 6 || !validEmail) {
            $('#callback-email-error').css('visibility','initial');
            $('#callback-email').addClass('callback-form__input_highlight')
            validationFlag=false;
        } else {
            $('#callback-email-error').css('visibility','hidden');
            $('#callback-email').removeClass('callback-form__input_highlight')
        }

        if (form.phone.length < 10) {
            $('#callback-phone-error').css('visibility','initial');
            $('#callback-phone').addClass('callback-form__input_highlight')
            validationFlag=false;
        } else {
            $('#callback-phone-error').css('visibility','hidden');
            $('#callback-phone').removeClass('callback-form__input_highlight')
        }

        if (form.text.length < 1) {
            $('#callback-text-error').css('visibility','initial');
            $('#callback-text').addClass('callback-form__input_highlight')
            validationFlag=false;
        } else {
            $('#callback-text-error').css('visibility','hidden');
            $('#callback-text').removeClass('callback-form__input_highlight')
        }

        if (validationFlag) {
            // отправляем куда-нибудь запрос;
        };


    });
    
    $('#popup-form').submit(function(e) {
        e.preventDefault();
        const form={};
        form.name = $('#popup-name').val();
        form.phone = $('#popup-phone').val();
        let validationFlag=true;

        if (form.name.length < 1) {
            $('#popup-name-error').css('visibility','initial');
            $('#popup-name').addClass('callback-form__input_highlight')
            validationFlag=false;
        } else {
            $('#popup-name-error').css('visibility','hidden');
            $('#popup-name').removeClass('callback-form__input_highlight')
        }

        if (form.phone.length < 10) {
            $('#popup-phone-error').css('visibility','initial');
            $('#popup-phone').addClass('callback-form__input_highlight')
            validationFlag=false;
        } else {
            $('#popup-phone-error').css('visibility','hidden');
            $('#popup-phone').removeClass('callback-form__input_highlight')
        }
        if (validationFlag) {
            closePopupForm();
            // + отправляем куда-нибудь запрос;
        }

    });
    
    $("#popup-phone").mask("+7 (999) 999-99-99");
    $("#callback-phone").mask("+7 (999) 999-99-99");

    $("#contacts-callbtn").click(function(event) {
        event.preventDefault();
        $("#popup-form-container").addClass('popup-form-container_opened');
    });

    $("#popup__close-button").click(closePopupForm);
    $("#popup-form-container").click(closePopupFormByOver);
    
    function closePopupForm() {
        $('#popup-form-container').removeClass('popup-form-container_opened');
        $('#popup-name-error').css('visibility','hidden');
        $('#popup-phone-error').css('visibility','hidden');
    }

    function closePopupFormByOver(evt) {
        if(evt.target.classList.contains('popup-form-container')){
            closePopupForm();
        }
    }


    let viewportNews = $(".news-viewport").width(); // Ширина видимой части
    let sliderNews = $("div.news-container"); // Весь слайдер
    let viewSlideNews = 0; // Номер слайда


    $('.newslist__btn-right').click(function() {
        if (viewSlideNews < 2) {
            viewSlideNews++;
        } else {
            viewSlideNews = 0;
        }
        sliderNews.animate({'left': -viewSlideNews * viewportNews + "px"}, {'duration': 500})  
    });

    $('.newslist__btn-left').click(function() {
        clearInterval(cycle); 
        if (viewSlideNews > 0) {
            viewSlideNews--;
        } else {
            viewSlideNews = 2;
        }
        sliderNews.animate({'left': -viewSlideNews * viewportNews + "px"}, {'duration': 500})  
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