/*
* -----------------------------------------------------------------------------
* Halfmoon JS
* Version: 1.1.0
* https://www.gethalfmoon.com
* Copyright, Halfmoon UI
* Licensed under MIT (https://www.gethalfmoon.com/license)
* -----------------------------------------------------------------------------
* The above notice must be included in its entirety when this file is used.
*/
// Polyfill for Element.matches()
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
// Polyfill for Element.closest()
if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}
// Polyfill for Element.classList (http://purl.eligrey.com/github/classList.js/blob/master/classList.js)
"document"in self&&("classList"in document.createElement("_")&&(!document.createElementNS||"classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))||!function(t){"use strict";if("Element"in t){var e="classList",n="prototype",i=t.Element[n],s=Object,r=String[n].trim||function(){return this.replace(/^\s+|\s+$/g,"")},o=Array[n].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1},c=function(t,e){this.name=t,this.code=DOMException[t],this.message=e},a=function(t,e){if(""===e)throw new c("SYNTAX_ERR","The token must not be empty.");if(/\s/.test(e))throw new c("INVALID_CHARACTER_ERR","The token must not contain space characters.");return o.call(t,e)},l=function(t){for(var e=r.call(t.getAttribute("class")||""),n=e?e.split(/\s+/):[],i=0,s=n.length;s>i;i++)this.push(n[i]);this._updateClassName=function(){t.setAttribute("class",this.toString())}},u=l[n]=[],h=function(){return new l(this)};if(c[n]=Error[n],u.item=function(t){return this[t]||null},u.contains=function(t){return~a(this,t+"")},u.add=function(){var t,e=arguments,n=0,i=e.length,s=!1;do t=e[n]+"",~a(this,t)||(this.push(t),s=!0);while(++n<i);s&&this._updateClassName()},u.remove=function(){var t,e,n=arguments,i=0,s=n.length,r=!1;do for(t=n[i]+"",e=a(this,t);~e;)this.splice(e,1),r=!0,e=a(this,t);while(++i<s);r&&this._updateClassName()},u.toggle=function(t,e){var n=this.contains(t),i=n?e!==!0&&"remove":e!==!1&&"add";return i&&this[i](t),e===!0||e===!1?e:!n},u.replace=function(t,e){var n=a(t+"");~n&&(this.splice(n,1,e),this._updateClassName())},u.toString=function(){return this.join(" ")},s.defineProperty){var f={get:h,enumerable:!0,configurable:!0};try{s.defineProperty(i,e,f)}catch(p){void 0!==p.number&&-2146823252!==p.number||(f.enumerable=!1,s.defineProperty(i,e,f))}}else s[n].__defineGetter__&&i.__defineGetter__(e,h)}}(self),function(){"use strict";var t=document.createElement("_");if(t.classList.add("c1","c2"),!t.classList.contains("c2")){var e=function(t){var e=DOMTokenList.prototype[t];DOMTokenList.prototype[t]=function(t){var n,i=arguments.length;for(n=0;i>n;n++)t=arguments[n],e.call(this,t)}};e("add"),e("remove")}if(t.classList.toggle("c3",!1),t.classList.contains("c3")){var n=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(t,e){return 1 in arguments&&!this.contains(t)==!e?e:n.call(this,t)}}"replace"in document.createElement("_").classList||(DOMTokenList.prototype.replace=function(t,e){var n=this.toString().split(" "),i=n.indexOf(t+"");~i&&(n=n.slice(i),this.remove.apply(this,n),this.add(e),this.add.apply(this,n.slice(1)))}),t=null}());
var halfmoon = {
    pageWrapper: document.getElementsByClassName("page-wrapper")[0],
    stickyAlerts: document.getElementsByClassName("sticky-alerts")[0],
    darkModeOn: false,
    // Create cookie
    createCookie: function(name, value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },
    // Read cookie
    readCookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for(var i=0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === " ") {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }
        return null;
    },
	
    // Erase cookie
    eraseCookie: function(name) {
        this.createCookie(name, "", -1);
    },
	
    // Toggle light/dark mode 
    toggleDarkMode: function() {
        if (document.body.classList.contains("dark-mode")) {
            document.body.classList.remove("dark-mode");
            this.darkModeOn = false;
            this.createCookie("halfmoon_preferredMode", "light-mode", 365);
        } else {
            document.body.classList.add("dark-mode");
            this.darkModeOn = true;
            this.createCookie("halfmoon_preferredMode", "dark-mode", 365);
        }
    },
	
    // Get preferred mode
    getPreferredMode: function() {
        if (this.readCookie("halfmoon_preferredMode")) {
            return this.readCookie("halfmoon_preferredMode");
        } else {
            return "not-set";
        }
    },

    // Toggles sidebar
    toggleSidebar: function() {
        if (this.pageWrapper) {
            if (this.pageWrapper.getAttribute("data-sidebar-hidden")) {
                this.pageWrapper.removeAttribute("data-sidebar-hidden");
				halfmoon.createCookie("halfmoon_sidebar", "show", 365); // Agregué esta linea para crear cookie
            } else {
                this.pageWrapper.setAttribute("data-sidebar-hidden", "hidden");
				halfmoon.createCookie("halfmoon_sidebar", "hidden", 365); // Agregué esta linea para crear cookie
            }
        }
    },

    // Deactivate all the dropdown toggles when another one is active
    deactivateAllDropdownToggles: function() {
        var activeDropdownToggles = document.querySelectorAll("[data-toggle='dropdown'].active");
        for (var i = 0; i < activeDropdownToggles.length; i++) {
            activeDropdownToggles[i].classList.remove("active");
            activeDropdownToggles[i].closest(".dropdown").classList.remove("show");
        }
    },

    // Toggle modal (using Javascript)
    toggleModal: function(modalId) {
        var modal = document.getElementById(modalId);

        if (modal) {
            modal.classList.toggle("show");
        }
    },

    // Make an ID for an element
    makeId: function(length) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },

    // Toast an alert (show, fade, dispose)
    toastAlert: function(alertId, timeShown) {
        var alertElement = document.getElementById(alertId);

        // Setting the default timeShown
        if (timeShown === undefined) {
            timeShown = 5000;
        }

        // Alert is only toasted if it does not have the .show class
        if (!alertElement.classList.contains("show")) {
            // Add .alert-block class if it does not exist
            if (!alertElement.classList.contains("alert-block")) {
                alertElement.classList.add("alert-block");
            }

            // Show the alert
            // The 0.25 seconds delay is for the animation
            setTimeout(function() {
                alertElement.classList.add("show");
            }, 250);

            // Wait some time (timeShown + 250) and fade out the alert
            var timeToFade = timeShown + 250;
            setTimeout(function() {
                alertElement.classList.add("fade");
            }, timeToFade);

            // Wait some more time (timeToFade + 500) and dispose the alert (by removing the .alert-block class)
            // Again, the extra delay is for the animation
            // Remove the .show and .fade classes (so the alert can be toasted again)
            var timeToDestroy = timeToFade + 500;
            setTimeout(function() {
                alertElement.classList.remove("alert-block");
                alertElement.classList.remove("show");
                alertElement.classList.remove("fade");
            }, timeToDestroy);
        }
    },

    // Create a sticky alert, display it, and then remove it
    initStickyAlert: function(param) {
        // Setting the variables from the param
        var content = ("content" in param) ? param.content: "";
        var title = ("title" in param) ? param.title: "";
        var alertType = ("alertType" in param) ? param.alertType: "";
        var fillType = ("fillType" in param) ? param.fillType: "";
        var hasDismissButton = ("hasDismissButton" in param) ? param.hasDismissButton: true;
        var timeShown = ("timeShown" in param) ? param.timeShown: 5000;

        // Create the alert element
        var alertElement = document.createElement("div");

        // Set ID to the alert element
        alertElement.setAttribute("id", this.makeId(6));

        // Add the title
        if (title) {
            content = "<h4 class='alert-heading'>" + title + "</h4>" + content;
        }

        // Add the classes to the alert element
        alertElement.classList.add("alert");
        if (alertType) {
            alertElement.classList.add(alertType);
        }
        if (fillType) {
            alertElement.classList.add(fillType);
        }

        // Add the close button to the content (if required)
        if (hasDismissButton) {
            content = "<button class='close' data-dismiss='alert' type='button' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" + content;
        }

        // Add the content to the alert element
        alertElement.innerHTML = content;

        // Append the alert element to the sticky alerts
        this.stickyAlerts.insertBefore(alertElement, this.stickyAlerts.childNodes[0]);

        // Toast the alert
        this.toastAlert(alertElement.getAttribute("id"), timeShown);
    },

    // Click handler that can be overridden by users if needed
    clickHandler: function(event) {},

    // Keydown handler that can be overridden by users if needed
    keydownHandler: function(event) {},
}


function halfmoonOnDOMContentLoaded() {
    // Re-initializing the required elements (to avoid issues with virtual DOM)
    if (!halfmoon.pageWrapper) {
        halfmoon.pageWrapper = document.getElementsByClassName("page-wrapper")[0];
    }
    if (!halfmoon.stickyAlerts) {
        halfmoon.stickyAlerts = document.getElementsByClassName("sticky-alerts")[0];
    }

    // Handle the cookie and variable for dark mode
    // 1. First preference is given to the cookie if it exists
    if (halfmoon.readCookie("halfmoon_preferredMode")) {
        if (halfmoon.readCookie("halfmoon_preferredMode") == "dark-mode") {
            halfmoon.darkModeOn = true;
        } else {
            halfmoon.darkModeOn = false;
        }
    } else {
        // 2. If cookie does not exist, next preference is for the dark mode setting
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            halfmoon.darkModeOn = true;
        } else {
            // 3. If all else fails, re-initialize the dark mode preference depending on the .dark-mode class
            if (document.body.classList.contains("dark-mode")) {
                halfmoon.darkModeOn = true;
            } else {
                halfmoon.darkModeOn = false;
            }
        }
    }

    // Automatically set preferred theme
    // But only if one of the data-attribute is provided
    if (document.body.getAttribute("data-set-preferred-mode-onload") || document.body.getAttribute("data-set-preferred-theme-onload")) {
        if (halfmoon.darkModeOn) {
			
            if (!document.body.classList.contains("dark-mode")) {
                document.body.classList.add("dark-mode");
				halfmoon.createCookie("halfmoon_preferredMode", "dark-mode", 365); // Agregué esta linea para crear cookie
            }
        } else {
            if (document.body.classList.contains("dark-mode")) {
                document.body.classList.remove("dark-mode");
            }
        }
    }

    // Hiding sidebar on first load on small screens (unless data-attribute provided)
    // Or on larger screens when sidebar type is overlayed-all
    if (document.documentElement.clientWidth <= 768) {
        if (halfmoon.pageWrapper) {
            if (!halfmoon.pageWrapper.getAttribute("data-show-sidebar-onload-sm-and-down")) {
                halfmoon.pageWrapper.setAttribute("data-sidebar-hidden", "hidden");
            }
        }
    } else {
        if (halfmoon.pageWrapper) {
            if (halfmoon.pageWrapper.getAttribute("data-sidebar-type") === "overlayed-all") {
                halfmoon.pageWrapper.setAttribute("data-sidebar-hidden", "hidden");
            }
        }
    }

    // Adding the click event listener
    document.addEventListener(
        "click",
        function(event) {
            var eventCopy = event;
            var target = event.target;

            // Handle clicks on dropdown toggles
            if (target.matches("[data-toggle='dropdown']") || target.matches("[data-toggle='dropdown'] *")) {
                if (target.matches("[data-toggle='dropdown'] *")) {
                    target = target.closest("[data-toggle='dropdown']");
                }
                if (target.classList.contains("active")) {
                    target.classList.remove("active");
                    target.closest(".dropdown").classList.remove("show");
                } else {
                    halfmoon.deactivateAllDropdownToggles();
                    target.classList.add("active");
                    target.closest(".dropdown").classList.add("show");
                }
            } else {
                if (!target.matches(".dropdown-menu *")) {
                    halfmoon.deactivateAllDropdownToggles();
                }
            }

            // Handle clicks on alert dismiss buttons
            if (target.matches(".alert [data-dismiss='alert']") || target.matches(".alert [data-dismiss='alert'] *")) {
                if (target.matches(".alert [data-dismiss='alert'] *")) {
                    target = target.closest(".alert [data-dismiss='alert']");
                }
                target.parentNode.classList.add("dispose");
            }

            // Handle clicks on modal toggles
            if (target.matches("[data-toggle='modal']") || target.matches("[data-toggle='modal'] *")) {
                if (target.matches("[data-toggle='modal'] *")) {
                    target = target.closest("[data-toggle='modal']");
                }
                var targetModal = document.getElementById(target.getAttribute("data-target"));
                if (targetModal) {
                    if (targetModal.classList.contains("modal")) {
                        halfmoon.toggleModal(target.getAttribute("data-target"));
                    }
                }
            }

            // Call the click handler method to handle any logic set by the user in their projects to handle clicks
            halfmoon.clickHandler(eventCopy);
        }, 
        false
    );

    // Adding the key down event listener (for shortcuts and accessibility)
    document.addEventListener(
        "keydown",
        function(event) {
            var eventCopy = event;

            // Handling other keydown events
            if (event.which === 27) {
                // Close dropdown menu (if one is open) when [esc] key is pressed
                if (document.querySelector("[data-toggle='dropdown'].active")) {
                    var elem = document.querySelector("[data-toggle='dropdown'].active");
                    elem.classList.remove("active");
                    elem.closest(".dropdown").classList.remove("show");
                    event.preventDefault();
                }
                // Close modal (if one is open, and if no dropdown menu is open) when [esc] key is pressed
                // Conditional on dropdowns so that dropdowns on modals can be closed with the keyboard without closing the modal
                else {
                    // Hash exists, so we check if it belongs to a modal
                    if (window.location.hash) {
                        var hash = window.location.hash.substring(1);
                        var elem = document.getElementById(hash);
                        if (elem) {
                            if (elem.classList.contains("modal")) {
                                if (!elem.getAttribute("data-esc-dismissal-disabled")) {
                                    window.location.hash = "#";
									$(".resp-iframe,.dynframe .img-fluid").detach();
                                    event.preventDefault();
                                }
                            }
                        }
                    }
                    // Check for a modal with the .show class
                    if (document.querySelector(".modal.show")) {
                        var elem = document.querySelector(".modal.show");
                        if (!elem.getAttribute("data-esc-dismissal-disabled")) {
                            elem.classList.remove("show");
							$(".resp-iframe,.dynframe .img-fluid").detach();
                            event.preventDefault();
                        }
                    }
                }
            }

            // Call the keydown handler method to handle any logic set by the user in their projects to handle keydown events
            halfmoon.keydownHandler(eventCopy);
        }
    );

    // Handling custom file inputs
    var halfmoonCustomFileInputs = document.querySelectorAll(".custom-file input");
    for (var i = 0; i < halfmoonCustomFileInputs.length; i++) {
        var customFile = halfmoonCustomFileInputs[i];
        // Create file name container element, add the class name, and set default value
        // Append it to the custom file element
        var fileNamesContainer = document.createElement("div");
        fileNamesContainer.classList.add("file-names");
        var dataDefaultValue = customFile.getAttribute("data-default-value");
        if (dataDefaultValue) {
            fileNamesContainer.innerHTML = dataDefaultValue;
        } else {
            fileNamesContainer.innerHTML = "No file chosen";
        }
        customFile.parentNode.appendChild(fileNamesContainer);

        // Add the event listener that will update the contents of the file name container element on change
        customFile.addEventListener(
            "change",
            function(event) {
                fileNamesContainer = event.target.parentNode.querySelector(".file-names");
                if (event.target.files.length === 1) {
                    fileNamesContainer.innerHTML = event.target.files[0].name;
                } else if (event.target.files.length > 1) {
                    fileNamesContainer.innerHTML = event.target.files.length + " archivos seleccionados";
                } else {
                    fileNamesContainer.innerHTML = "* Ningún archivo seleccionado";
                }
            }
        );
    }

    // Adding the .with-transitions class to the page-wrapper so that transitions are enabled
    // This way, the weird bug on Chrome is avoided, where the transitions run on load
    if (halfmoon.pageWrapper) {
        halfmoon.pageWrapper.classList.add("with-transitions");
    }
}

// Call the function when the DOM is loaded
document.addEventListener("DOMContentLoaded", halfmoonOnDOMContentLoaded);

$(document).ready(function() {
$('a[href*=".png"], a[href*=".gif"], a[href*=".jpg"], a[href*=".jpeg"]').addClass('modalimage').attr({"data-image-id":""});

	$(".modalimage").click(function(e) {
		e.preventDefault();
		var wth = "modal-content-media w-full";
		var url = $(this).attr("href");
		$("#adminmodal .modal-content").addClass(wth);
		$(".dynframe").prepend("<img src='"+url+"' class='img-fluid m-auto mh-s' alt='modal-img' id='image-gallery-image'>");
		halfmoon.toggleModal('adminmodal');
	});

	loadGallery(true, 'a.modalimage');
	/*This function disables buttons when needed*/
	function disableButtons(counter_max, counter_current) {
	  $('#show-previous-image, #show-next-image').show();
	  if (counter_max === counter_current) {
		$('#show-next-image').hide();
	  } else if (counter_current === 1) {
		$('#show-previous-image').hide();
	  }
	}
	function loadGallery(setIDs, setClickAttr) {
	  let current_image,selector,counter = 0;
	  $('#show-next-image, #show-previous-image').click(function () {
		  if ($(this).attr('id') === 'show-previous-image'){
			current_image--;
		  } else {
			current_image++;
		  }
		  selector = $('[data-image-id="' + current_image + '"]');
		  updateGallery(selector);
		});
	  function updateGallery(selector) {
		let $sel = selector;
		let $seln = $sel.attr('href');
		current_image = $sel.data('image-id');
		$('#image-gallery-image').attr('src', $seln);
		disableButtons(counter, $sel.data('image-id'));
	  }
	  if (setIDs == true) {
		$('[data-image-id]').each(function () {
			counter++;
			$(this).attr('data-image-id', counter);
		  });
	  }
	  $(setClickAttr).on('click', function () {
		  updateGallery($(this));
		});
	}

	// make it as accordion for smaller screens
	if ($(window).width() < 992) {
		$('.submenu').hide();
		$('.submenu .dropdown-menu').removeClass('dropdown-menu');
		$('.dropdown-menu a').click(function(e){
			
			  if($(this).next('.submenu').length){
				$(this).next('.submenu').toggle();
			  }
		});
	}

	$(document).keydown(function (e) {
	  if ( $('#image-gallery-image').is(":visible") ) {
		switch (e.which) {
		  case 37: /*left*/
			if ($('#show-previous-image').is(":visible")) {
			  $('#show-previous-image').click();
			}
			break;
		  case 39: /*right*/
			if ($('#show-next-image').is(":visible")) {
			  $('#show-next-image').click();
			}
			break;
		  default:
			return;
		}
		e.preventDefault();
	  }
	});

	$(".modalframe").click(function(e) {
		e.preventDefault();
		var url = $(this).attr("href");
		var wth = $(this).attr("data-width");
		var hgt = $(this).attr("data-height");
		$('#show-previous-image').hide();
		$('#show-next-image').hide();
		$('.bottom-0').removeClass('position-absolute');
		$('.modal-content').removeClass('d-flex align-items-center');
		if (hgt != undefined) { hgt = "style='height:"+hgt+"px'";} else {hgt = "";}

		$("#adminmodal .modal-content").addClass(wth);
		$(".dynframe").prepend("<div class='resp-iframe' "+hgt+"><iframe id='loadframe' frameborder='0' allowfullscreen='true' src='"+url+"'></iframe></div>");
		halfmoon.toggleModal('adminmodal');
	});

	$(".modalajax").click(function(e) {
		e.preventDefault();
		var url = $(this).attr("href");
		var wth = $(this).attr("data-width");
		$('#show-previous-image').hide();
		$('#show-next-image').hide();
		$('.bottom-0').removeClass('position-absolute');
		$('.modal-content').removeClass('d-flex align-items-center');
		$("#adminmodal .modal-content").addClass(wth+' bg-dark');
		$.ajax({
			type: "POST",
			url: url,
			data: $("#entrar").serialize(),
			success: function(response) {
				$('.dynframe').html(response);
			}
		});
		halfmoon.toggleModal('adminmodal');
	});

	$(".closeframe").click(function(e) {
		$("#adminmodal .modal-content").attr('class', 'modal-content p-0 d-flex align-items-center');
		$('.bottom-0').addClass('position-absolute');
		$(".resp-iframe,.dynframe .img-fluid,.dynframe .content").detach();
		$(".modal").removeClass('show');
	});

	$(function(){
		var laurl = location.href;
		$(".sidebar-link").each(function() {
				var tarurl = $(this).prop("href");
					if (tarurl == laurl) {
						$(this).addClass('active');
					}
		}); 
	});

	$("#submitc").click(function(){
		event.preventDefault();
		$.ajax({
			 type: 'POST',
			 url: "https://leadguitar.mx/contacto/index.php",
			 dataType : 'json',
			 data: $('#contacto').serialize(),
			 success: function(response) {
				function toastSecondaryAlert() {
					halfmoon.initStickyAlert({
					  content: response['cont'],
					  title: response['title'],
					  alertType: response['type'],
					  fillType: "filled",
					  hasDismissButton: true,
					  timeShown: 10000
					});
				}
				toastSecondaryAlert();
				
				if (response['type'] == "alert-primary"){
				var frm = document.getElementsByName('contacto')[0];
				var elbtn = document.getElementById('submitc');
				frm.reset();
				elbtn.disabled = true;
				}

			 },
			error: function() {
				alert("Hubo un problema al enviar el formulario : (");
			}
		 });
	});


	if($('#mpalert').length) {
		function mpalert() {
		halfmoon.initStickyAlert({
		content: "Tienes mensajes privados sin leer, da <a href='https://leadguitar.mx/mensajes/' class='text-white'>click aquí</a> para verlos.",
		title: "📧 Nuevo Mensaje Privado!",
		alertType: "alert-primary",
		fillType: "filled",
		hasDismissButton: true,
		timeShown: 10000
		});
		}
		var hours = 1;
		var now = new Date().getTime();
		var setupTime = localStorage.getItem('mp1');
		if (setupTime == null) {
			mpalert();
			localStorage.setItem('mp1', now)
		} else {
		if(now-setupTime > hours*60*60*1000) {
			mpalert();
			localStorage.clear()
			localStorage.setItem('mp1', now);
		}
		}
	}

});
$('.content-wrapper').on('scroll', function(){
    var scroll = $('.content-wrapper').scrollTop();
    if (scroll >= 500) {
		$(".gotop").removeClass("d-none");
    } else {
		$(".gotop").addClass("d-none");
	}
var $all_oembed_videos=$("iframe[src*='youtube']");$all_oembed_videos.each(function(){$(this).removeAttr('height').removeAttr('width').wrap("<div class='video-container'></div>");});
if(!$("#ablockercheck").is(":visible") && $('#ablockercheck').length){$("#ablockermsg").prepend("<div class='modal' id='ayudanos' tabindex='-1' role='dialog'><div class='modal-dialog' role='document'><div class='modal-content bg-dark text-light'><button class='close closeframe' data-dismiss='modal' type='button' aria-label='Close'><span aria-hidden='true'>&times;</span></button><h5 class='modal-title'>Hola ! 🙂</h5> <p>Por favor considera <b>desactivar el Blockeador de Publicidad para éste sitio </b>.</p><p>Ya que sin la publicidad no podemos mantenernos en linea.</p><p>Te prometo que no verás mucha publicidad ni popups molestos.</p><p>De antemano muchas gracias por ayudarnos. 😉 Saludos ! </p><div class='text-right mt-20'><button class='btn btn-primary closeframe' data-dismiss='modal' type='button'>OK entiendo</button></div></div></div>").show();halfmoon.toggleModal('ayudanos');}
/* Slider Unblock */
if($('.slider').length) {!function(e,t,n,i){function o(t,n,i){var o=this,s=o.checkElm(t)?e(t):e;i=o.checkFn(i)?i:function(){};var l={successLabelTip:"Desbloqueado!",duration:200,swipestart:!1,min:0,max:s.width(),index:0,IsOk:!1,lableIndex:0};l=e.extend(l,n||{}),o.elm=s,o.opts=l,o.swipestart=l.swipestart,o.min=l.min,o.max=l.max,o.index=l.index,o.isOk=l.isOk,o.labelWidth=o.elm.find(".slider_label").width(),o.sliderBg=o.elm.find(".slider_bg"),o.lableIndex=l.lableIndex,o.success=i}o.prototype.init=function(){var e=this;e.updateView(),e.elm.find(".slider_label").on("mousedown",function(n){var i=n||t.event;e.lableIndex=i.clientX-this.offsetLeft,e.handerIn()}).on("mousemove",function(t){e.handerMove(t)}).on("mouseup",function(t){e.handerOut()}).on("mouseout",function(t){e.handerOut()}).on("touchstart",function(n){var i=n||t.event;e.lableIndex=i.originalEvent.touches[0].pageX-this.offsetLeft,e.handerIn()}).on("touchmove",function(t){e.handerMove(t,"mobile")}).on("touchend",function(t){e.handerOut()})},o.prototype.handerIn=function(){this.swipestart=!0,this.min=0,this.max=this.elm.width()},o.prototype.handerOut=function(){this.swipestart=!1,this.index<this.max&&this.reset()},o.prototype.handerMove=function(e,n){var i=this;i.swipestart&&(e.preventDefault(),e=e||t.event,i.index="mobile"==n?e.originalEvent.touches[0].pageX-i.lableIndex:e.clientX-i.lableIndex,i.move())},o.prototype.move=function(){var e=this;e.index+e.labelWidth>=e.max&&(e.index=e.max-e.labelWidth-2,e.swipestart=!1,e.isOk=!0),e.index<0&&(e.index=e.min,e.isOk=!1),e.index+e.labelWidth+2==e.max&&e.max>0&&e.isOk&&(e.elm.find(".slider_label").unbind(),e.elm.find(".labelTip").text(e.opts.successLabelTip).css({color:"#fff"}),e.success()),e.updateView()},o.prototype.updateView=function(){this.sliderBg.css("width",this.index),this.elm.find(".slider_label").css("left",this.index+"px")},o.prototype.reset=function(){var e=this;e.index=0,e.sliderBg.animate({width:0},e.opts.duration),e.elm.find(".slider_label").animate({left:e.index},e.opts.duration).next(".lableTip").animate({opacity:1},e.opts.duration),e.updateView()},o.prototype.checkElm=function(t){if(e(t).length>0)return!0;throw"this element does not exist."},o.prototype.checkFn=function(e){if("function"==typeof e)return!0;throw"the param is not a function."},t.SliderUnlock=o}(jQuery,window,document),$(function(){new SliderUnlock(".slider",{},function(){$(".btn-lock").prop("disabled",!1)}).init()}),$(".slider2").length&&$(function(){new SliderUnlock(".slider2",{},function(){$(".btn-lock2").prop("disabled",!1)}).init()});}
/*! Wordpress comments */
window.addComment=function(p){var f,v,I,C=p.document,h={commentReplyClass:"comment-reply-link",commentReplyTitleId:"reply-title",cancelReplyId:"cancel-comment-reply-link",commentFormId:"commentform",temporaryFormId:"wp-temp-form-div",parentIdFieldId:"comment_parent",postIdFieldId:"comment_post_ID"},e=p.MutationObserver||p.WebKitMutationObserver||p.MozMutationObserver,i="querySelector"in C&&"addEventListener"in p,n=!!C.documentElement.dataset;function t(){r(),function(){if(!e)return;new e(o).observe(C.body,{childList:!0,subtree:!0})}()}function r(e){if(i&&(f=E(h.cancelReplyId),v=E(h.commentFormId),f)){f.addEventListener("touchstart",l),f.addEventListener("click",l);var t=function(e){if((e.metaKey||e.ctrlKey)&&13===e.keyCode)return v.removeEventListener("keydown",t),e.preventDefault(),v.submit.click(),!1};v&&v.addEventListener("keydown",t);for(var n,r=function(e){var t,n=h.commentReplyClass;e&&e.childNodes||(e=C);t=C.getElementsByClassName?e.getElementsByClassName(n):e.querySelectorAll("."+n);return t}(e),o=0,d=r.length;o<d;o++)(n=r[o]).addEventListener("touchstart",a),n.addEventListener("click",a)}}function l(e){var t=E(h.temporaryFormId);if(t&&I){E(h.parentIdFieldId).value="0";var n=t.textContent;t.parentNode.replaceChild(I,t),this.style.display="none";var r=E(h.commentReplyTitleId),o=r&&r.firstChild;o&&o.nodeType===Node.TEXT_NODE&&n&&(o.textContent=n),e.preventDefault()}}function a(e){var t=E(h.commentReplyTitleId),n=t&&t.firstChild.textContent,r=this,o=m(r,"belowelement"),d=m(r,"commentid"),i=m(r,"respondelement"),l=m(r,"postid"),a=m(r,"replyto")||n;o&&d&&i&&l&&!1===p.addComment.moveForm(o,d,i,l,a)&&e.preventDefault()}function o(e){for(var t=e.length;t--;)if(e[t].addedNodes.length)return void r()}function m(e,t){return n?e.dataset[t]:e.getAttribute("data-"+t)}function E(e){return C.getElementById(e)}return i&&"loading"!==C.readyState?t():i&&p.addEventListener("DOMContentLoaded",t,!1),{init:r,moveForm:function(e,t,n,r,o){var d=E(e);I=E(n);var i,l,a,m=E(h.parentIdFieldId),c=E(h.postIdFieldId),s=E(h.commentReplyTitleId),u=s&&s.firstChild;if(d&&I&&m){void 0===o&&(o=u&&u.textContent),function(e){var t=h.temporaryFormId,n=E(t),r=E(h.commentReplyTitleId),o=void 0!==r?r.firstChild.textContent:"";if(n)return;(n=C.createElement("div")).id=t,n.style.display="none",n.textContent=o,e.parentNode.insertBefore(n,e)}(I),r&&c&&(c.value=r),m.value=t,f.style.display="",d.parentNode.insertBefore(I,d.nextSibling),u.nodeType===Node.TEXT_NODE&&(u.textContent=o),f.onclick=function(){return!1};try{for(var y=0;y<v.elements.length;y++)if(i=v.elements[y],l=!1,"getComputedStyle"in p?a=p.getComputedStyle(i):C.documentElement.currentStyle&&(a=i.currentStyle),(i.offsetWidth<=0&&i.offsetHeight<=0||"hidden"===a.visibility)&&(l=!0),"hidden"!==i.type&&!i.disabled&&!l){i.focus();break}}catch(e){}return!1}}}}(window);
