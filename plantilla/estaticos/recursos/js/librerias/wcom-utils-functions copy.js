/*******************************************************************************
 * Copyright (c) 2017 Iberdrola, S.A. Todos los derechos reservados.
 *******************************************************************************/
//----wcom - forms.js
//----wcom-cmb-utils.js
//----wcom - form - ajax - utils.js
//----formUtils.js
//Genera un trigger para los m?todos show/hide y poder crear listeners para ellos
//  $(item).on('show', function(){...})
//  $(item).on('hide', function(){...})

$(document).ready(function() {
    //Elimina los h de div de autoblock
    var observer = new MutationObserver(function(mutations, me) {
        // `mutations` is an array of mutations that occurred
        // `me` is the MutationObserver instance
        var cookies = document.getElementById('onetrust-pc-sdk');
        if (cookies) {
            OptanonWrapperHTML();
            me.disconnect(); // stop observing
            return;
        }
    });

    observer.observe(document, {
        childList: true,
        subtree: true
    });

    //Enlaces externos: se a?ade icono y texto 'Abre en ventana nueva'
    linksVentanaNueva();

    //Enlace Google Play/App Store
    enlaceAppStore();

});

(function($) {
    $.each(['show', 'hide'], function(i, ev) {
        var el = $.fn[ev];
        $.fn[ev] = function() {
            this.trigger(ev);
            return el.apply(this, arguments);
        };
    });
})(jQuery);

//Elimina los h de div de autoblock
function OptanonWrapperHTML() {
    const tagsBH2 = [...document.getElementById('onetrust-pc-sdk').getElementsByTagName('h2')];
    tagsBH2.forEach(tag => otreplace(tag, "ot-h2"));
    const tagsBH3 = [...document.getElementById('onetrust-pc-sdk').getElementsByTagName('h3')];
    tagsBH3.forEach(tag => otreplace(tag, "ot-h3"));
    const tagsBH4 = [...document.getElementById('onetrust-pc-sdk').getElementsByTagName('h4')];
    tagsBH4.forEach(tag => otreplace(tag, "ot-h4"));
    const tagsCH2 = [...document.getElementById('onetrust-consent-sdk').getElementsByTagName('h2')];
    tagsCH2.forEach(tag => otreplace(tag, "ot-h2"));
    const tagsCH3 = [...document.getElementById('onetrust-consent-sdk').getElementsByTagName('h3')];
    tagsCH3.forEach(tag => otreplace(tag, "ot-h3"));
    const tagsCH4 = [...document.getElementById('onetrust-consent-sdk').getElementsByTagName('h4')];
    tagsCH4.forEach(tag => otreplace(tag, "ot-h4"));

    function otreplace(tag, otclass) {
        const parent = tag.parentNode;
        const newElement = document.createElement("div");
        if (tag.id !== undefined) newElement.setAttribute("id", "" + tag.id + "");
        newElement.classList = tag.classList;
        newElement.classList.add(otclass);
        newElement.innerHTML = tag.innerHTML;
        parent.insertBefore(newElement, tag);
        parent.removeChild(tag);
    }
}

/*
 *  Buscador de inbenta
 *  Elimina capa que se queda visible al cerrar el buscador (vista mobile)
 */
$(document).on('click', '#navbar-search', function() {
    $(".botonera").removeClass("hidden");
    $(".navbar-toggle").parents(".contenedorCabecera .navbar-default").css("bottom", "auto");
});


/*
 *  Funcion que cambia el enlace a Google Play por un enlace a la App Store cuando se accede desde un dispositivo iOS
 */
function enlaceAppStore() {

    if (comprobarDispositivoIOS()) {

        //APP IBERDROLA CLIENTES
        $("a[href*='https://play.google.com/store/apps/details?id=com.iberdrola.clientes']").not(".contenedorFooter a").not(".btn-google-play").each(function() {
            $(this).attr('href', 'https://itunes.apple.com/es/app/iberdrola-clientes/id883078092');
        });

        //APP RIEGO INTELIGENTE
        $("a[href*='https://play.google.com/store/apps/details?id=com.greeniq.iberdrola']").not(".contenedorFooter a").not(".btn-google-play").each(function() {
            $(this).attr('href', 'https://itunes.apple.com/es/app/riego-inteligente-iberdrola/id1255065436');
        });
    }

}

/*
 *  Muestra el loader
 *  Si no se ha maquetado, genera la estructura
 */
function loaderIn() {
    if ($('.wcom-loader').length === 0) {
        $('<div>').attr('class', 'wcom-loader').append(
            $('<div>').attr('class', 'loader-circle')
        ).appendTo('body');
    }
    $('.wcom-loader').fadeIn("fast");
}

/*
 *  Oculta el loader
 */
function loaderOut() {
    $('.wcom-loader').fadeOut("fast");
}

/*
 *  Se anade la funcion addLoadEvent para los contenidos exitentes
 */
function addLoadEvent(func) {
    var oldonload = window.onload;
    $('meta[name=author]').attr('author', 'Iberdrola S.A.U.');
    if (typeof window.onload !== 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        };
    }
}

/*
 * Funcion para escapar el HTML
 * @param str. Cadena a escanear
 */
function escapeHtml(str) {
    return String(str).replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/\//g, "&#x2F;");
}

/*
 *  Realiza scroll hasta un punto concreto de la pantalla
 */
function scrollHastaAncla(id, delay, desplazamiento) {
    //Si no recibe como par?metro el delay, le aplica 200ms por defecto
    if (delay === null) {
        delay = 200;
    }
    //Obtiene la posici?n del ancla
    var pos = 0;
    var desplazamientoSuperior;
    switch (id) {
        case 'TOP':
            pos = 0;
            break;
        case 'BOTTOM':
            pos = $('body').height();
            break;
        default:
            if (desplazamiento === undefined) {
                desplazamientoSuperior = 0;
            } else {
                desplazamientoSuperior = desplazamiento;
            }
            pos = $("#" + id).offset().top - desplazamientoSuperior;
            break;
    }
    //Realiza el scroll
    $('html, body').animate({
        scrollTop: pos
    }, delay);
}

/*
 * Devuelve un array con los par?metros GET de la URL actual
 */
function obtenerParametrosGetURL() {
    var params = [];
    var url = window.location.search.replace('?', '');
    $.each(url.split('&'), function(k, v) {
        params[v.split('=')[0]] = v.split('=')[1];
    });
    return params;
}

/*
 * Comprueba si un dispositivo es iOS
 */
function comprobarDispositivoIOS() {
    return (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
}

/*
 * Marca errores en los campos de formulario y hace scroll hasta el primer campo con error
 */
function marcarErroresConAncla() {
    var detectadoPrimerError = false;
    $('.help-block').each(function() {
        if ($(this).html() !== '') {
            $(this).removeClass("hidden");
            $(this).parent().addClass('has-error');
            if (!detectadoPrimerError) {
                $(this).parent().find('.form-control').each(function() {
                    if ($(this).attr('id') !== undefined) {
                        scrollHastaAncla($(this).attr('id'), null, 50);
                        $(this).focus();
                        detectadoPrimerError = true;
                    }
                });
            }
        } else {
            $(this).addClass("hidden");
            $(this).parent().removeClass('has-error');
        }
    });
}

/*****************
 *  VALIDACIONES
 *****************/

/*
 *  Verifica que el CUPS sigue el patron LL DDDD CCCC CCCC CCCC EE NT
 *      LL                  Indicativos del pais (UNE-EN ISO 3166-1 alfa-2)
 *      DDDD                Distribuidora
 *      CCCC CCCC CCCC      Numero del suministro
 *      EE                  Letras de control
 *      NT (opcionales)     Identifica Puntos frontera, de medida o registradores
 */
function validaPatronCUPS(cups) {
    var RegExPattern = /^ES[0-9]{16}[a-zA-Z]{2}[0-9]{0,1}[a-zA-Z]{0,1}$/;
    return (cups.match(RegExPattern)) && (cups !== '');
}

/*
 *  Verifica que la longitud del CUPS es correcta (20/22)
 */
function validaLongitudCUPS(cups) {
    return (cups.length === 20 || cups.length === 22);
}

/*
 *  Verifica que las letras de control del CUPS son correctas
 */
function validaLetrasControlCUPS(cups) {
    //Letras de control
    var letras = Array('T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E');
    //Numero formado por la Distribuidora y el Numero del suministro (DDDD CCCC CCCC CCCC)
    var cups16 = cups.substr(2, 16);
    //Letras de control (EE)
    var ctrl1 = cups.substr(18, 1);
    var ctrl2 = cups.substr(19, 1);
    //Resto de la division del numero de suministro entre 529
    var mod = parseInt(Math.fmod(cups16, 529));
    //Parte entera del cociente y resto de la division del numero obtenido entre 23
    //Son las posiciones en el array de las letras de control
    var dc1 = Math.floor(mod / 23);
    var dc2 = mod % 23;
    //Compara las letras de control con las obtenidas
    return (ctrl1 === letras[dc1] && ctrl2 === letras[dc2]);
}

//Necesario para el calculo de las letras de control
Math.fmod = function(a, b) {
    return Number((a - (Math.floor(a / b) * b)).toPrecision(8));
};

function parsearFormulario(idformulario) {
    datos = {};
    $(idformulario + " input:not([type=file],[data-jsonignore])," + idformulario + " select," + idformulario + " textarea").each(function() {

        var nombre = $(this).attr("name")

        if (typeof nombre != "undefined" && nombre != null && nombre != "") {
            var nombreparts = nombre.split(".");
            var objexpr = "";
            for (n = 0; n < nombreparts.length; n++) {
                objexpr += "{\"" + nombreparts[n] + "\":"
            }
            objexpr += "\"" + parseaValorFormulario($(this)) + "\"";
            for (n = 0; n < nombreparts.length; n++) {
                objexpr += "}";
            }

            $.extend(true, datos, JSON.parse(objexpr));

        }
    });

    return datos;
}

function parseaValorFormulario(campo) {
    var valor = campo.val();
    valor = valor.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t").replace(/\\/g, "/").replace(/\"/g, "'");
    if (campo.prop("tagName") === 'INPUT' && campo.attr("type") === "checkbox") {
        if (campo.is(':checked')) {
            valor = "true";
        } else {
            valor = "false";
        }

    } else if (campo.prop("tagName") === 'INPUT' && campo.attr("type") === "radio") {
        var nombrecampo = campo.attr("name");
        valor = $('input[name="' + nombrecampo + '"]:checked').val();
    } else if (campo.prop("tagName") === 'SELECT') {
        valor = campo.children("option:selected").val();
    }

    if (typeof valor == "undefined") {
        valor = null;
    }
    return valor;
}

function parsearBooleanValue(valor) {
    if (valor == "1") {
        valor = "true";
    } else {
        valor = "false"
    }
    return valor;
}

function resetearFormulario(idFormulario) {
    $(idFormulario)[0].reset();
    $("span.help-block").html("")
    $("div").removeClass("has-error");
}

/**
 * tipadoTelefono
 * indica que en el campo telefono solo te permite escribir con las teclas numericas
 * idElemento : id del input telefono
 */
function tipadoTelefono(idElemento) {
    //solo permite escribir numeros en el campo telefono
    $(idElemento).keypress(function(tecla) {
        if (tecla.charCode < 48 || tecla.charCode > 57) return false;
    });
}

/**
 * validarTelefono
 * valida que el campo telefono tenga una longitud de 9 digitos
 * idElemento : id del input telefono
 * telefono : value del input telefono
 * mensaje : mensaje de error del span
 */
function validarTelefono(idElemento, telefono, mensaje, longitud) {
    if (telefono.length === longitud) {
        quitarErrorInput(idElemento);
        return true;
    }
    devolverErrorInput(idElemento, mensaje);
    return false;
}

/**
 * validarEmail
 * valida que el campo email que cumpla con el formato correcto mediante una expresion regular
 * idElemento : id del input telefono
 * email : value del input email
 * mensaje : mensaje de error del span
 */
function validarEmail(idElemento, email, mensaje) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regex.test(email)) {
        quitarErrorInput(idElemento);
        return true;
    }
    devolverErrorInput(idElemento, mensaje);
    return false;
}

/**
 * validarDni
 * valida que el campo dni que cumpla con el formato correcto mediante una expresion regular
 * idElemento : id del input telefono
 * dni : value del input dni
 * mensaje : mensaje de error del span
 */
function validarDni(idElemento, dni, mensaje) {
    if (validarDniAlgoritmo(dni)) {
        quitarErrorInput(idElemento);
        return true;
    }
    devolverErrorInput(idElemento, mensaje);
    return false;
}

/**
 * validarDniAlgoritmo
 * valida que el campo dni cumpla con las posibilidades de Espa�?�?�?¯�?�?�?¿�?�?�?�?a
 * NIF y NIE
 * idElemento : id del input telefono
 * dni : value del input dni
 * mensaje : mensaje de error del span
 */
function validarDniAlgoritmo(value) {
    var validChars = "TRWAGMYFPDXBNJZSQVHLCKET";
    var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    var nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    var str = value.toString().toUpperCase();

    if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

    var nie = str.replace(/^[X]/, "0").replace(/^[Y]/, "1").replace(/^[Z]/, "2");

    var letter = str.substr(-1);
    var charIndex = parseInt(nie.substr(0, 8)) % 23;

    if (validChars.charAt(charIndex) === letter) return true;

    return false;
}

/**
 * validarCheck
 * valida si esta checkeado el inputCheck
 * idElemento : id del input check
 */
function validarCheck(idElemento) {
    if ($(idElemento).prop("checked")) {
        quitarErrorCheck(idElemento);
        return true;
    }
    devolverErrorCheck(idElemento);
    return false;
}

/**
 * compararEmails
 * valida que los dos campos de email coinciden mediante una comparaciÃƒÂƒÃ‚Â¯ÃƒÂ‚Ã‚Â¿ÃƒÂ‚Ã‚Å“n estricta
 * idElemento : id del input email
 * email : value del input email
 * confEmail : value del input confEmail
 * mensaje : mensaje de error del span
 */
function compararEmails(idElemento, email, confEmail, mensaje) {
    if (email === confEmail) {
        quitarErrorInput(idElemento);
        return true;
    }
    devolverErrorInput(idElemento, mensaje);
    return false;
}

/**
 * devolverErrorInput
 * devuelve al html el error del input con su correspondiente mensaje
 * idElemento : id del input
 * mensaje : mensaje de error del span
 */
function devolverErrorInput(idElemento, mensaje) {
    var ErrorPadre = $(idElemento).parent();
    ErrorPadre.addClass("has-error");
    var ErrorHermano = $(idElemento).siblings("span");
    ErrorHermano.html(mensaje);
}

/**
 * quitarErrorInput
 * devuelve el input al estado inicial
 * idElemento : id del input
 */
function quitarErrorInput(idElemento) {
    var ErrorPadre = $(idElemento).parent();
    ErrorPadre.removeClass("has-error");
    var hermano = $(idElemento).siblings("span");
    hermano.html("");
}

/**
 * devolverErrorCheck
 * devuelve al html el error del check con su correspondiente mensaje
 * idElemento : id del input
 */
function devolverErrorCheck(idElemento) {
    var ErrorPadre = $(idElemento).parent();
    ErrorPadre.addClass("has-error");
}

/**
 * quitarErrorCheck
 * devuelve el check al estado inicial
 * idElemento : id del input
 */
function quitarErrorCheck(idElemento) {
    var ErrorPadre = $(idElemento).parent();
    ErrorPadre.removeClass("has-error");
}

/**
 * mostrarErroresHtml
 *
 * Funcion para marcar los errores de un formulario en un HTML
 *
 * @param {Errores del formulario} errors
 * @param {etiqueta ID del formulario} idForm
 */
function mostrarErroresHtmlAjax(errors, idForm) {
    //Quitamos los errores previos
    $(".has-error").children(".help-block").removeClass("hidden");
    $(".has-error").children(".help-block").html("");
    $(".has-error").removeClass("has-error");

    errors.forEach(function(error) {
        var campo = $(
            "input[name='" +
            error.field +
            "'],textarea[name='" +
            error.field +
            "'],select[name='" +
            error.field +
            "']"
        ).eq(0);
        if (campo.prop("tagName") == "INPUT" && campo.attr("type") == "checkbox") {
            var campoj = $("#" + idForm + " [name='" + error.field + "']").eq(0);
            addErrorInputAjax(campoj, error.defaultMessage, "check");
        } else if (campo.prop("tagName") == "SELECT") {
            var campoj = $("#" + idForm + " [name='" + error.field + "']").eq(0);
            addErrorInputAjax(campoj, error.defaultMessage, "combo");
        } else {
            var campoj = $("#" + idForm + " [name='" + error.field + "']").eq(0);
            addErrorInputAjax(campoj, error.defaultMessage, "input");
        }
    });

    marcarErroresConAnclaAjax();
}

function addErrorInputAjax(input, error, type) {
    etiquetacampo = input.siblings("label[for='" + input.attr("name") + "']");

    error = error.replace("{0}", etiquetacampo.text());

    switch (type) {
        case "input":
            $(input).parent().addClass("has-error");
            $(input).next().html(error);
            $(input).next().removeClass("hidden");
            break;
        case "combo":
            $(input).parents(".form-group").addClass("has-error");
            $(input).next().html(error);
            $(input).next().removeClass("hidden");
            break;
        case "check":
            $(input).parent().addClass("has-error");
            $(input).siblings("span").html(error);
            break;
        default:
    }
}

/**
 * marcarErroresConAncla
 *
 * Situa la pantalla en el primer error encontrado en el formulario
 *
 */
function marcarErroresConAnclaAjax() {
    var detectadoPrimerError = false;
    var errorDetectado = false;
    $("#contactaConsultasForm .help-block").each(function() {
        if ($(this).html() !== "") {
            $(this).removeClass("hidden");
            $(this).parent().addClass("has-error");
            if (!detectadoPrimerError) {
                $(this)
                    .parent()
                    .find(".form-control")
                    .each(function() {
                        if ($(this).attr("id") !== undefined) {
                            scrollHastaAncla($(this).attr("id"), null, 100);
                            $(this).focus();
                            detectadoPrimerError = true;
                        }
                    });
            }
            errorDetectado = true;
        } else {
            $(this).addClass("hidden");
            $(this).parent().removeClass("has-error");
        }
    });
    if (!errorDetectado) {
        $("input[type='checkbox']").each(function() {
            if (
                $(this).parent().hasClass("has-error") &&
                typeof $(this).attr("id") !== undefined &&
                $(this).attr("id") != ""
            ) {
                console.log("El id es " + $(this).attr("id"));
                if (!$(this).parents().hasClass("sticked")) {
                    scrollHastaAncla($(this).attr("id"), null, 100);
                }
            }
        });
    }
}

/**
 * mostrarModalAjax
 * Muestra el modal de respuesta con los parametros establecidos
 * idElemento : id del modal
 * mensaje : texto que se quiere establecer en el modal
 * imagen : imagen o ruta de la imagen que se quiere establecer en el modal
 */
function mostrarModalAjax(mensaje, imagen) {
    $("#modal-ajax-resp").modal("show");
    $("#msg-ajax-resp").empty();
    $("#msg-ajax-resp").html(mensaje);
    if (imagen === "ok") {
        $("#img-ajax-resp").attr("src", "/webclipb/img/iconos/ico-pago-ok.svg");
    } else if (imagen === "ko") {
        $("#img-ajax-resp").attr("src", "/webclipb/img/iconos/ico-pago-ko.svg");
    } else if (imagen !== "") {
        $("#img-ajax-resp").attr("src", imagen);
    } else {
        $("#img-ajax-resp").attr(
            "src",
            "/webclipb/gc/prod/adminwcm/img/smart-mobility/ico-copy.svg"
        );
    }
}

/*
estupendo plugin formularioAjax
*/
(function(jQuery) {
    jQuery.fn.formularioajax = function(opciones) {
        var _this = this;
        this.jsonData = "";

        var defaults = {
            gRecaptcha: {
                googleSiteKey: "",
                grecaptchaDiv: $(this).find("grecaptcha"),
            },
            btn_enviar: $(this).find(".form-ajax-send-btn"),
            preSendForm: function(json) {
                return JSON.stringify(this.jsonData);
            },
            onErrorsCallback: function(errors) {},
            onSuccessCallback: function(errors) {},
            preValidate: function(formularioData) {
                return [];
            },
            clearOnSuccess: true,
            resetOnSuccess: true,
            urlDest: $(this).attr("action"),
            formParams: {},
        };
        var ajustes = $.extend({}, defaults, opciones);

        $(_this).on("updateSettings", function(event, opciones) {
            ajustes = $.extend({}, ajustes, opciones);
        });

        var procesarFormulario = function(json) {
            if (typeof ajustes.preSendFormAsync == "function") {
                ajustes.preSendFormAsync(json, procesarFormularioConsolidado);
                return;
            }

            data = ajustes.preSendForm(json);
            procesarFormularioConsolidado(data);
        };

        var procesarFormularioConsolidado = function(data) {
            if (data != null) {
                var defaultFormParams = {
                    url: ajustes.urlDest,
                    data: data,
                    type: "POST",
                    contentType: "application/json",
                    success: function(data) {
                        loaderOut();
                        handlerSuccess(data);
                    },
                    error: function() {
                        loaderOut();
                        handlerError();
                    },
                };

                var formParams = $.extend({}, defaultFormParams, ajustes.formParams);
                $.ajax(formParams);
                $(_this).trigger("onFormSubmitted");
            }
        };

        this.enviarFormulario = function() {
            var json = {};

            try {
                json = parsearFormulario("#" + $(_this).attr("id"));
            } catch (error) {
                ajustes.onErrorsCallback(error);
                return;
            }

            var preErrors = ajustes.preValidate(json);
            if (preErrors != null && preErrors.length > 0) {
                mostrarErroresHtmlAjax(preErrors, $(_this).attr("id"));
                $(_this).trigger("onPreValidationErrors", { errors: preErrors });
                return;
            }

            $(_this).trigger("onPreValidationSuccess");
            if (typeof ajustes.gRecaptcha.v3action != "undefined") {
                loaderIn();
                if (typeof _this.captchaid != "undefined") {
                    grecaptcha
                        .execute(_this.captchaid, { action: ajustes.gRecaptcha.v3action })
                        .then(function(token) {
                            json["response"] = token;
                            delete json["g-recaptcha-response"];
                            procesarFormulario(json);
                        });
                } else {
                    grecaptcha
                        .execute(ajustes.gRecaptcha.googleSiteKey, {
                            action: ajustes.gRecaptcha.v3action,
                        })
                        .then(function(token) {
                            json["response"] = token;
                            procesarFormulario(json);
                        });
                }

                return;
            } else {
                if (
                    typeof _this.captchaid != "undefined" &&
                    grecaptcha.getResponse(_this.captchaid) == ""
                ) {
                    console.log("No hay captcha");
                    //ajustes.gRecaptcha.grecaptchaDiv.effect("pulsate")
                    grecaptcha.execute(_this.captchaid);
                    return;
                }

                if (typeof _this.captchaid != "undefined") {
                    json["response"] = grecaptcha.getResponse(_this.captchaid);
                }
                loaderIn();

                procesarFormulario(json);
            }
        };

        var handlerSuccess = function(data) {
            if (typeof _this.captchaid != "undefined") {
                grecaptcha.reset(_this.captchaid);
            }
            if (data.errores != null && data.errores.length > 0) {
                mostrarErroresHtmlAjax(data.errores, $(_this).attr("id"));

                ajustes.onErrorsCallback(data);
                $(_this).trigger("onErrorsResponse", data.errores);
            } else {
                if (ajustes.clearOnSuccess && ajustes.resetOnSuccess) {
                    $(_this).trigger("reset");
                }

                ajustes.onSuccessCallback(data);
                $(_this).trigger("onSuccessResponse", data);
            }
        };

        var handlerError = function(data) {};

        _this.onRecaptchaResponse = function(response) {
            console.log("OnrecaptchaResponse");

            return new Promise(function(resolve, reject) {
                _this.enviarFormulario();
                resolve();
            });
        };

        //inicializa el formulario
        ajustes.btn_enviar.on("click", function() {
            $(_this).trigger("onFormButtonClick", $(this));
            _this.enviarFormulario();
        });
        if (typeof $(_this).data("urlinitsession") != "undefined") {
            var formParams = {
                url: $(_this).data("urlinitsession"),
                data: $(_this).data("configuracionseguridad"),
                type: "POST",
                contentType: "application/json",
                success: function(data) {},
                error: function() {},
            };

            $.ajax(formParams);
        }
        $(this).on("recaptchaLoaded", function() {
            $(this).data("pending-recaptcha", false);
            if (ajustes.gRecaptcha.googleSiteKey != "") {
                //Tiene captcha
                var iddivcaptcha = ajustes.gRecaptcha.grecaptchaDiv.attr("id");
                if (
                    typeof iddivcaptcha == "undefined" ||
                    iddivcaptcha == null ||
                    iddivcaptcha == ""
                ) {
                    iddivcaptcha = _this.attr("id") + "_idrecaptcha";
                    ajustes.gRecaptcha.grecaptchaDiv.attr("id", iddivcaptcha);
                }
                if (typeof ajustes.gRecaptcha.v3action != "undefined") {
                    _this.captchaid = grecaptcha.render(iddivcaptcha, {
                        sitekey: ajustes.gRecaptcha.googleSiteKey,
                        size: "invisible",
                    });
                } else {
                    _this.captchaid = grecaptcha.render(iddivcaptcha, {
                        sitekey: ajustes.gRecaptcha.googleSiteKey,
                        size: "invisible",
                        callback: _this.onRecaptchaResponse,
                    });
                }
            }
        });

        $(this).on("reset", function() {
            $(_this)[0].reset();
            $(_this).find("span.help-block").html("");
            $(_this).find("div").removeClass("has-error");
        });
        if ($(this).data("pending-recaptcha") === true) {
            $(this).trigger("recaptchaLoaded");
        }

        return _this;
    };
})(jQuery);