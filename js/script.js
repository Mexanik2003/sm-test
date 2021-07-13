let viewport = $(".slider-viewport").width(); // Ширина видимой части
let slider = $("div.slider"); // Весь слайдер
let viewSlide = 0; // Номер слайда
 
$(".slider-buttons__btn-right").click(function () { 
    if (viewSlide < 4) {
        viewSlide++;
    } else {
        viewSlide = 0;
    }
    slider.animate({'left': -viewSlide * viewport + "px"}, {'duration': 500})  
});

$(".slider-buttons__btn-left").click(function () {
    if (viewSlide > 0) {
        viewSlide--;
    } else {
        viewSlide = 4;
    }
    slider.animate({'left': -viewSlide * viewport + "px"}, {'duration': 500})  
});