$(document).ready(function() {
    $("#btn-login").on("click", function() {
        comprobarLogin();
    });


    var owl = $('.owl-carousel');
    owl.owlCarousel({
        margin: 10,
        nav: true,
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 2
            }
        }
    })
});

function comprobarLogin() {
    var defaultFormParams = {
        url: "https://jsonplaceholder.typicode.com/users",
        type: "GET",
        contentType: "application/json",
        success: function(data) {

            loaderOut();
            if (undefined != data.find(usuarios => usuarios.username == $("#usuario").val())) {
                $("#formulario-consulta").removeClass("d-none");
                $("#formulario-login").addClass("d-none");
                $("#usuario").css("border", "solid 1px green");
            } else {
                console.log("error de busqueda")
                $("#usuario").css("border", "solid 1px red");
                $("#usuario").parent().find("span").html("*nombre incorrecto")
                $("#usuario").parent().find("span").css("color", "red")
            }

        },
        error: function() {
            console.log("error del servicio")
            $("#modal-error").modal("show");
            //levantar el modal cuanto falle el servicio
            loaderOut();
        },
    };

    $.ajax(defaultFormParams);
}