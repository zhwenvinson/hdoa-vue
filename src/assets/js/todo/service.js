function addSoapEnvelope (soapAction, parameter, namespace) {
  var result =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap:Envelope ' +
    'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
    'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
    'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ' +
    'xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<soap:Body>' +
    '<' + soapAction + ' xmlns="' + namespace + '">' +
    soapSerializeParameter(parameter) +
    '</' + soapAction + '></soap:Body></soap:Envelope>';
  return result;
}

function soapSerializeParameter (parameter) {
  var result = '';
  switch (typeof (parameter)) {
    case 'string':
      result += parameter.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); break;
    case 'number':
    case 'boolean':
      result += parameter.toString(); break;
    case 'object':
      if (parameter.constructor.toString().indexOf('function Date()') > -1) {
        var year = parameter.getFullYear().toString();
        var month = (parameter.getMonth() + 1).toString(); month = (month.length === 1) ? '0' + month : month;
        var date = parameter.getDate().toString(); date = (date.length === 1) ? '0' + date : date;
        var hours = parameter.getHours().toString(); hours = (hours.length === 1) ? '0' + hours : hours;
        var minutes = parameter.getMinutes().toString(); minutes = (minutes.length === 1) ? '0' + minutes : minutes;
        var seconds = parameter.getSeconds().toString(); seconds = (seconds.length === 1) ? '0' + seconds : seconds;
        var milliseconds = parameter.getMilliseconds().toString();
        var tzminutes = Math.abs(parameter.getTimezoneOffset());
        var tzhours = 0;
        while (tzminutes >= 60) {
          tzhours++;
          tzminutes -= 60;
        }
        tzminutes = (tzminutes.toString().length === 1) ? '0' + tzminutes.toString() : tzminutes.toString();
        tzhours = (tzhours.toString().length === 1) ? '0' + tzhours.toString() : tzhours.toString();
        var timezone = ((parameter.getTimezoneOffset() < 0) ? '+' : '-') + tzhours + ':' + tzminutes;
        result += year + '-' + month + '-' + date + 'T' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds + timezone;
      } else if (parameter.constructor.toString().indexOf('function Array()') > -1) {
        for (var p in parameter) {
          if (!isNaN(p)) { // linear array
            (/function\s+(\w*)\s*\(/ig).exec(parameter[p].constructor.toString());
            var type = RegExp.$1;
            switch (type) {
              case '':
                type = typeof (parameter[p]);
              /* falls through */
              case 'String':
                type = 'string'; break;
              case 'Number':
                type = 'int'; break;
              case 'Boolean':
                type = 'bool'; break;
              case 'Date':
                type = 'DateTime'; break;
            }
            result += '<' + type + '>' + soapSerializeParameter(parameter[p]) + '</' + type + '>';
          } else {
            // associative array
            result += '<' + p + '>' + soapSerializeParameter(parameter[p]) + '</' + p + '>';
          }
        }
      } else {
        for (var property in parameter) {
          if (property !== 'indiatts') {
            result += '<' + property + '>' + soapSerializeParameter(parameter[property]) + '</' + property + '>';
          } else {
            result += parameter[property];
          }
        }
      }
      break;
    default:
      break; // throw new Error(500, 'serviceInstance.soapSerializeParameter: type "' + typeof(o) + '" is not supported');
  }
  return result;
}

function getSoapResult (value, $x2js) {
  if (!value) return value;
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(value, 'text/xml');
  if (xmlDoc.documentElement.tagName.toLowerCase() !== 'soapenv:envelope') {
    return value;
  }
  var fault = xmlDoc.querySelector('Body > Fault');
  if (fault) {
    throw new Error(fault.textContent.trim());
  }
  var strResult = xmlDoc.querySelector('Body > * > *').textContent;
  var firstStr = strResult.substr(0, 1);
  if (firstStr === '<') {
    // eslint-disable-next-line new-cap
    var ret = $x2js.xml2js(strResult);
    ret = _toString(ret);
    return ret;
  } else if (firstStr === '[' || firstStr === '{') {
    try {
      return JSON.parse(strResult);
    } catch (e) {
      return JSON.parse(strResult.replace(/("[^"]*?"):\s*,/, '$1: "",'));
    }
  } else {
    return strResult;
  }
}

function _toString (src) {
  var ret = src;
  if (Array.isArray(src)) {
    ret = src.map(function (item) {
      return _toString(item);
    });
  } else if (src && src.constructor === Object) {
    var keys = Object.keys(src);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] === '__cdata') {
        ret = src[keys[i]];
        break;
      } else {
        ret[keys[i]] = _toString(src[keys[i]]);
      }
    };
  }
  return ret;
}

export default {
  invoke: ($axios, $x2js, url, wsfn, data) => {
    return $axios({
      url: url,
      method: 'post',
      headers: {
        'SOAPAction': wsfn
      },
      transformResponse: [function (data) {
        try {
          return getSoapResult(data, $x2js);
        } catch (e) {
          throw e;
        }
      }],
      data: addSoapEnvelope(wsfn, data, '')
    });
  }
};
