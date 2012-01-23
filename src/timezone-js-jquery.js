/**
 * This file simply allows timezone-js to be consumed in a jquery application
 */
(function () {
    if(!timezoneJS || !timezoneJS.timezone) {
        throw new Error('Must include timezone-js/date.js before including jquery-timezone-js'); 
    }

    timezoneJS.timezone.loadZoneFile = function (fileName, opts) {
        if (typeof this.zoneFileBasePath == 'undefined') {
            throw new Error('Please define a base path to your zone file directory -- timezoneJS.timezone.zoneFileBasePath.');
        }

        var url = this.zoneFileBasePath + '/' + fileName;
        var self = this;
        jQuery.ajax({
            url: url,
            async: !!opts.async,
            dataType: 'text',
            success: function (str) {
                if (self.parseZones(str)) {
                    if (typeof opts.callback == 'function') {
                        opts.callback();
                    }
                }
                return true;
            },
            error: function () {
                throw new Error('Error retrieving "' + url + '" zoneinfo file.');
            }
        });
        self.loadedZones[fileName] = true;
    };
})();
