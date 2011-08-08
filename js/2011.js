jQuery(function ($) {

    var isWorking = false;

    function loadPage(url) {
        if (!isWorking) {
            isWorking = true;
            scroll(0, 0);
            jQuery('#content').html('<center>loading...</center>');

            jQuery.get(url, function (r) {
                jQuery('#content').html(jQuery('#content', r).html());
                postLoad();
                isWorking = false;
            });
        }
    }

    function submitSearch(param) {
        if (!isWorking) {
            isWorking = true;
            scroll(0, 0);
            jQuery('#content').html('<center>loading...</center>');
            jQuery.get(window.location + param, function (r) {
                jQuery('#content').html(jQuery('#content', r).html());
                postLoad();
                isWorking = false;
            });
        }
    }

    function postLoad() {
        jQuery("a").unbind('click').click(function (e) {
            url = window.location.protocol + '//' + window.location.host + '/';
            var myHref = jQuery(this).attr('href');
            if ((myHref.indexOf(url) >= 0) && (myHref.indexOf('/wp-') < 0)) {
                e.preventDefault();
                jQuery(this).blur();
                loadPage(myHref);
            }
        });

        jQuery('#searchform').submit(function (e) {
            submitSearch('?s=' + jQuery('#s').val());
            e.preventDefault();
        });
    }

    var contentCache, searched = false;
    jQuery('#searchform').submit(function () {
        var s = jQuery(this).find('#s').val();
        if (s.length == 0) {
            return;
        }
        var submit = $('#searchsubmit');
        submit.attr('disabled', false);
        var url = jQuery(this).attr('action') + '?s=' + encodeURIComponent(s) + '&action=search_ajax'
        jQuery.ajax({
            url: url,
            type: 'get',
            dataType: 'html',
            beforeSend: function () {

                submit.attr('disabled', true).fadeTo('slow', 0.5);
                document.body.style.cursor = 'wait';
                var load = '<div id="content" role="main"><h1 class="page-title">Searching...</h1></div>';
                jQuery('#container').empty().html(load);
            },
            success: function (data) {
                submit.attr('disabled', false).fadeTo('slow', 1);
                document.body.style.cursor = 'auto';
                jQuery('#container').empty().html(data);
                jQuery('#ajaxback').click(function () {
                    jQuery('#container').empty().html(contentCache);
                });

            }

        });
        return false;
    });
    var timer, currentKey;
    jQuery('#s').keyup(function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            var sInput = jQuery('#s');
            var s = sInput.val();
            if (s.length == 0) {
                if (searched) {
                    jQuery('#container').empty().html(contentCache);
                    sInput.focus();
                    //jQuery('#search-form span.processing').remove();
                    searched = false;
                }
                currentKey = s;
            } else {
                if (s != currentKey) {
                    if (!searched) {
                        contentCache = jQuery('#container')[0].innerHTML;
                        searched = true;
                    }
                    currentKey = s;
                    if (s != ' ') {
                        jQuery('#searchform').submit();
			jQuery('#s').val("");
                    }
                }
            }
        }, 800);
    });

    jQuery(document).ready(function ($) {
        postLoad();
        jQuery('#postPagination a').live('click', function (e) {
            e.preventDefault();
            var link = jQuery(this).attr('href');
            jQuery('#content').html('Loading...');
            jQuery('#content').load(link + ' #contentInner');

        });

    });

});
