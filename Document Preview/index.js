(function(window, document, undefined) {
    'use strict';

    var body = document.body,
        gallery = document.getElementById('js-gallery'),
        galleryWidth = gallery.offsetWidth,
        galleryHeight = gallery.offsetHeight,
        document = document.getElementById('js-document'),
        documentWidth = document.offsetWidth,
        documentHeight = document.offsetHeight,
        documentPadding = '50';

    var requestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(callback) {
        return setTimeout(callback, 1000 / 60);
    };

    var throttle = function(callback, limit) {
        var wait = false;
        return function() {
            if (!wait) {
                callback.call();
                wait = true;
                setTimeout(function() {
                    wait = false;
                }, limit);
            }
        };
    };

    var resizedocument = function() {

        var scale;

        scale = Math.min(
            galleryWidth / documentWidth,
            galleryHeight / documentHeight
        );

				document.style[Modernizr.prefixed('transform')] = 'translate(-50%, -50%) ' + 'scale(' + scale + ')';

        requestAnimationFrame(resizedocument);
    };


    var onResize = throttle(function() {
        galleryWidth = gallery.offsetWidth - documentPadding;
        galleryHeight = gallery.offsetHeight - documentPadding;
        requestAnimationFrame(resizedocument);

    }, 100);


    galleryWidth = gallery.offsetWidth - documentPadding;
    galleryHeight = gallery.offsetHeight - documentPadding;
    requestAnimationFrame(resizedocument);
    window.addEventListener('resize', onResize, false);
})(window, document);
