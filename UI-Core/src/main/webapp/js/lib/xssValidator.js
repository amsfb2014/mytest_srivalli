/*! xssValidator */
function xssClean(str) {
        var never_allowed_str = {
            'document.cookie': '',
            'document.write': '',
            '.parentNode': '',
            '.innerHTML': '',
            'window.location': '',
            '-moz-binding': '',
            '<!--': '&lt;!--',
            '-->': '--&gt;',
            '<![CDATA[': '&lt;![CDATA['
        };

        var never_allowed_regex = {
            'javascript\\s*:': '',
            'expression\\s*(\\(|&\\#40;)': '',
            'vbscript\\s*:': '',
            'Redirect\\s+302': ''
        };

        var non_displayables = [
            /%0[0-8bcef]/g, // url encoded 00-08, 11, 12, 14, 15
            /%1[0-9a-f]/g, // url encoded 16-31
            /[\x00-\x08]/g, // 00-08
            /\x0b/g, /\x0c/g, // 11,12
            /[\x0e-\x1f]/g // 14-31
        ];

        var compact_words = ['javascript', 'expression', 'vbscript', 'script', 'applet', 'alert', 'document', 'write', 'cookie', 'window'];

        //Remove invisible characters
        str = remove_invisible_characters(str);
        
        //Validate standard character entities - add a semicolon if missing.  We do this to enable
        //the conversion of entities to ASCII later.
        str = str.replace(/(&\#?[0-9a-z]{2,})([\x00-\x20])*;?/i, '$1;$2');

        //Validate UTF16 two byte encoding (x00) - just as above, adds a semicolon if missing.
        str = str.replace(/(&\#x?)([0-9A-F]+);?/i, '$1;$2');
        
        //Decode just in case stuff like this is submitted:
        //<a href="http://%77%77%77%2E%67%6F%6F%67%6C%65%2E%63%6F%6D">Asurion</a>
        try {
          str = decodeURIComponent(str);
        } catch (e) {
          // str was not actually URI-encoded
        }

        //Convert character entities to ASCII - this permits our tests below to work reliably.
        //We only convert entities that are within tags since these are the ones that will pose security problems.
        str = str.replace(/[a-z]+=([\'\"]).*?\1/gi, function(m, match) {
            return m.replace(match, convert_attribute(match));
        });

        //Convert tabs to spaces
        str = str.replace('\t', ' ');

        //Remove strings that are never allowed
        for (var i in never_allowed_str) {
            str = str.replace(i, never_allowed_str[i]);
        }

        //Remove regex patterns that are never allowed
        for (var i in never_allowed_regex) {
            str = str.replace(new RegExp(i, 'i'), never_allowed_regex[i]);
        }

        // Compact any exploded words like:  j a v a s c r i p t
        // We only want to do this when it is followed by a non-word character
        for (var i in compact_words) {
            var spacified = compact_words[i].split('').join('\\s*') + '\\s*';

            str = str.replace(new RegExp('(' + spacified + ')(\\W)', 'ig'), function(m, compat, after) {
                return compat.replace(/\s+/g, '') + after;
            });
        }

        //Sanitize naughty HTML elements
        //If a tag containing any of the words in the list
        //below is found, the tag gets converted to entities.
        //So this: <blink>
        //Becomes: &lt;blink&gt;
        var naughty = 'alert|applet|audio|basefont|base|behavior|bgsound|blink|body|embed|expression|form|frameset|frame|head|html|ilayer|iframe|input|isindex|layer|link|meta|object|plaintext|style|script|textarea|title|video|xml|xss';
        str = str.replace(new RegExp('<(/*\\s*)(' + naughty + ')([^><]*)([><]*)', 'gi'), function(m, a, b, c, d) {
            return '&lt;' + a + b + c + d.replace('>', '&gt;').replace('<', '&lt;');
        });

        //Sanitize naughty scripting elements Similar to above, only instead of looking for
        //tags it looks for PHP and JavaScript commands that are disallowed.  Rather than removing the
        //code, it simply converts the parenthesis to entities rendering the code un-executable.
        //For example:    eval('some code')
        //Becomes:        eval&#40;'some code'&#41;
        str = str.replace(/(alert|cmd|passthru|eval|exec|expression|system|fopen|fsockopen|file|file_get_contents|readfile|unlink)(\s*)\((.*?)\)/gi, '$1$2&#40;$3&#41;');

        if (str.match(/<a/i)) {
            str = str.replace(/<a\s+([^>]*?)(>|$)/gi, function(m, attributes, end_tag) {
                attributes = filter_attributes(attributes.replace('<', '').replace('>', ''));
                return m.replace(attributes, attributes.replace(/href=.*?(alert\(|alert&\#40;|javascript\:|charset\=|window\.|document\.|\.cookie|<script|<xss|base64\s*,)/gi, ''));
            });
        }

        if (str.match(/<img/i)) {
            str = str.replace(/<img\s+([^>]*?)(\s?\/?>|$)/gi, function(m, attributes, end_tag) {
                attributes = filter_attributes(attributes.replace('<', '').replace('>', ''));
                return m.replace(attributes, attributes.replace(/src=.*?(alert\(|alert&\#40;|javascript\:|charset\=|window\.|document\.|\.cookie|<script|<xss|base64\s*,)/gi, ''));
            });
        }

        if (str.match(/script/i) || str.match(/xss/i)) {
            str = str.replace(/<(\/*)(script|xss)(.*?)\>/gi, '');
        }

        function remove_invisible_characters(str) {
            for (var i in non_displayables) {
                str = str.replace(non_displayables[i], '');
            }
            return str;
        }

        function convert_attribute(str) {
            return str.replace('>', '&gt;').replace('<', '&lt;').replace('\\', '\\\\');
        }


        //Filter Attributes - filters tag attributes for consistency and safety
        function filter_attributes(str) {
            var comments = /\/\*.*?\*\//g;
            return str.replace(/\s*[a-z-]+\s*=\s*'[^']*'/gi, function(m) {
                return m.replace(comments, '');
            }).replace(/\s*[a-z-]+\s*=\s*"[^"]*"/gi, function(m) {
                return m.replace(comments, '');
            }).replace(/\s*[a-z-]+\s*=\s*[^\s]+/gi, function(m) {
                return m.replace(comments, '');
            });
        }

        return str;
    }
