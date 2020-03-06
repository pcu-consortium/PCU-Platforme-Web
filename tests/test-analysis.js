
var baseTitle = 'CAMPUS AAR - ';

var baseUrl = 'http://127.0.0.1:3000';

if (casper.cli.has('host')) {
	baseUrl = casper.cli.get('host');
}

casper.test.begin('Analysis', function suite(test) {

    casper.on("page.error", function(msg, trace) {
        var msgStack = ["page.error: " + msg];
        if (trace && trace.length) {
            msgStack.push('TRACE:');
            trace.forEach(function(t) {
                msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
            });
        }
        this.echo(msgStack.join('\n'), "ERROR");
    });
	casper.on('page.initialized', function(){
		this.evaluate(function(){
			var isFunction = function(o) {
				return typeof o == 'function';
			};

			var bind,
				slice = [].slice,
				proto = Function.prototype,
				featureMap;

			featureMap = {
				'function-bind': 'bind'
			};

			function has(feature) {
				var prop = featureMap[feature];
				return isFunction(proto[prop]);
			}

			// check for missing features
			if (!has('function-bind')) {
				// adapted from Mozilla Developer Network example at
				// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
				bind = function bind(obj) {
					var args = slice.call(arguments, 1),
						self = this,
						nop = function() {
						},
						bound = function() {
							return self.apply(this instanceof nop ? this : (obj || {}), args.concat(slice.call(arguments)));
						};
					nop.prototype = this.prototype || {}; // Firefox cries sometimes if prototype is undefined
					bound.prototype = new nop();
					return bound;
				};
				proto.bind = bind;
			}


      // Add Array.find
      (function(){
        if (Array.prototype.find) return;

        var find = function(predicate) {
          var list = Object(this);
          var length = list.length < 0 ? 0 : list.length >>> 0; // ES.ToUint32;
          if (length === 0) return undefined;
          if (typeof predicate !== 'function' || Object.prototype.toString.call(predicate) !== '[object Function]') {
            throw new TypeError('Array#find: predicate must be a function');
          }
          var thisArg = arguments[1];
          for (var i = 0, value; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) return value;
          }
          return undefined;
        };

        if (Object.defineProperty) {
          try {
            Object.defineProperty(Array.prototype, 'find', {
              value: find, configurable: true, enumerable: false, writable: true
            });
          } catch(e) {}
        }

        if (!Array.prototype.find) {
          Array.prototype.find = find;
        }
      })();
		});
	});

    // Test default site
	casper.start(baseUrl + '/agora/analysis', function() {
        test.assertHttpStatus(404);
	}).thenOpen(baseUrl + '/agora/analysis/fmsh:...', function () {
		test.assertHttpStatus(200);
	});


	casper.run(function() {
		test.done();
	});
});