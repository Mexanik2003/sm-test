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
        console.log("---start---");
        
        // создадим пустой объект
        var $data = {};
        // переберём все элементы input, textarea и select формы с id="myForm "
        $('#calc-form').find ('input, textearea, select').each(function() {
            $data[this.name] = $(this).val();
        });
        console.log($data);
    
    
    
    
    
    
    
    
        console.log("---end---");
    });



    jQuery(function() {
        var tarif = 6,
            result_outptut = jQuery("#revenue span"),
            client = 24,
            revenue = 0,
            check = 4000,
            time = 3;


        function recount() {
            revenue = (client+check+time)*tarif;
            result_outptut.html(revenue + ' руб/мес');
        };
        jQuery('#tarif').change(function() {
            tarif = jQuery('#tarif option:selected').val();
            recount();
        });
        $(document).on("change keyup", "#cargo-weight", function() {
            client = +$(this).val();
            $("#slider-range-min").slider("value", client);
            recount();
        });
        $(document).on("change keyup", "#amount2", function() {
            check = +$(this).val();
            $("#slider-range-min").slider("value", check);
            recount();
        });
        $(document).on("change keyup", "#amount3", function() {
            time = +$(this).val();
            $("#slider-range-min").slider("value", time);
            recount();
        });
    });


    $(function(){
        var handle = $("#slider-weight-value");
        var input = $("#weight");
        $("#slider-weight").slider({
            min: 1,
            max: 500,
            value: 300,
            range: "max",
            create: function() {
                handle.text($(this).slider("value") + " кг.");
                handle.css("left", $("#slider-weight-slider").css("left"));
                handle.css("transform", "translate(-50%,29px)");
                input.val($(this).slider("value"));
            },
            slide: function(event, ui) {
                handle.text( ui.value  + " кг.");
                handle.css("left", $("#slider-weight-slider").css("left"));
                handle.css("transform", "translate(-50%,29px)");
                input.val($(this).slider("value"));
            }
        });
    });
});
