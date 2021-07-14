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
        var data = {};
        let arr=[];
        // переберём все элементы input, textarea и select формы с id="myForm "
        $('#calc-form').find ('input, textearea, select').each(function() {
            data = {
                id: this.id,
                name: this.name,
                val: $(this).val(),
                check: $(this).prop('checked')
            }
            arr.push(data);
        });
        console.log(arr);
        
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
    
        console.log(calc);

        calc.res =  calc.weight * (calc.distance*0.2 + 50 + calc.ins);
        calc.res=Math.round(calc.res);

        $('#calc-sum-value__bigtext').text(calc.res.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        
    
    
    
    
    
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
