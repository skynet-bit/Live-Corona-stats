   $.fn.resizeText = function () {
    var width = $(this).innerWidth();
    var height = $(this).innerHeight();
    var html =  $(this).html();
    var newElem = $("<div>", {
        html: html,
        style: "display: inline-block;overflow:hidden;font-size:0.1em;padding:0;margin:0;border:0;outline:0"
    });

    $(this).html(newElem);
    $.resizeText.increaseSize(10, 0.1, newElem, width, height);

    $(window).resize(function () {
        if ($.resizeText.interval)
            clearTimeout($.resizeText.interval)

        $.resizeText.interval = setTimeout(function () {
            elem.html(elem.find("div.createdResizeObject").first().html());
            elem.resizeText();
        }, 300);
    });
}

$.resizeText = {
    increaseSize: function (increment, start, newElem, width, height) {
        var fontSize = start;

        while (newElem.outerWidth() <= width && newElem.outerHeight() <= height) {
            fontSize += increment;
            newElem.css("font-size", fontSize + "em");
        }

        if (newElem.outerWidth() > width || newElem.outerHeight() > height) {
            fontSize -= increment;
            newElem.css("font-size", fontSize + "em");
            if (increment > 0.1) {
                $.resizeText.increaseSize(increment / 10, fontSize, newElem, width, height);
            }
        }
    }
};