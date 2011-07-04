/*!
 * jQuery EasyValidate v1.1 Bob Zhu
 * Licensed under the MIT license.
 */
$.extend({
    easyvalidate: {
        checkError: function(dom) {
            if (dom.find(".error").length == 0) {
                $(".form_tip").css("visibility", "hidden").html("&nbsp;");
                return true
            }
            return false
        },
        addError: function(dom) {
            dom.addClass('error');
            $(".form_tip").css("visibility", "visible").html("Please correct the errors below.")
        },
        deleteError: function(dom) {
            dom.removeClass('error')
        }
    }
});
(function($) {
    $.fn.easyvalidate = function(options) {
        $.fn.easyvalidate.defaults = {
            Name: /^\D{2,15}$/,
            Phone: /^[\d -]{8,12}$/,
            Email: /^([a-zA-Z0-9_\.\-])+\@([a-zA-Z0-9\.\-])+(\.[a-zA-Z]{2,3})+$/,
            Time: /^[0-2]{1}\d{1}:\d{2}$/,
            Date: /^\d{2}-\d{2}-\d{4}/
        };
        var options = $.extend($.fn.easyvalidate.defaults, options),
        t = $(this),
        c = false;
        function validate(v, d) {
            c = !v.reg ? false: !options[v.reg].test(d.val());
            if (v.required) {
                c = !d.val() || c
            } else {
                c = d.val() && c
            }
            if (c) {
                $.easyvalidate.addError(d)
            } else {
                $.easyvalidate.deleteError(d);
                $.easyvalidate.checkError(t)
            }
        }
        return this.each(function() {
            $.each(options.config, 
            function(i, v) {
                $(i).blur(function() {
                    validate(v, $(this))
                })
            });
            $(this).submit(function() {
                $.each(options.config, 
                function(i, v) {
                    validate(v, $(i))
                });
                if (!$.easyvalidate.checkError(t)) {
                    return false
                } else {
                    $("#submit").val("Processing...").attr('disabled', 'disabled')
                }
            })
        })
    }
})(jQuery);