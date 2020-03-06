import { SEQ_UPDATE_TIME } from 'actions/action-types';



var mapLayers = function(analysis){
    var extractTime = function(str, regex){
        if (!str) return undefined;

        var matched = str.match(regex);
        if (matched){
            var hours = parseInt(matched[1], 10);
            var minutes = parseInt(matched[2], 10);
            var seconds = parseInt(matched[3], 10);
            var fraction = parseInt(matched[4], 10); // /!\ Fraction has a variable length
            return hours*3600+minutes*60+seconds+fraction*(Math.pow(0.1, matched[4].length));
        }
        return undefined;
    };
    var timeOf = function(timestamp){
        // ex : "T00:00:00:0F14112000"
        return extractTime(timestamp, /^T(\d+):(\d+):(\d+):(\d+)F.*$/);
    };
    var durationOf = function(duration){
        // ex : "PT00H04M22S13641600N14112000F"
        return extractTime(duration, /^PT(\d+)H(\d+)M(\d+)S(\d+)N.*$/);
    };

    var unescapeFr = function(str){
        if (!str) return undefined;
        var matched = str.match(/^"(.*)"@[a-z]+/);
        return matched ? matched[1] : str;
    }

    return analysis.layer.map(layer => {
        return {
            ...layer,
            segment: null,
            segments: layer.segment
              .filter(segment => segment.duration)
              .map(segment => {
                var begin = timeOf(segment.beginTime);
                var end = begin + durationOf(segment.duration);
                return {
                  id: segment.id,
                  label: unescapeFr(segment.label) || segment.id,
                  data: segment,
                  begin, end
                };
            })
        }
    });
}


var initialLayers = mapLayers(window.__data__.content.videoAnalysis);

function updateArray(array, updater){
    var changed = false;
    var newArray = array.map(it => {
        var newIt = updater(it);
        changed |= (it != newIt);
        return newIt;
    });
    return changed ? newArray : array;
}

function updateObject(object, key, updater){
    var value = object[key];
    var newValue = updater(value);
    if (newValue === value){
        return object; // Didn't change
    }
    return {
        ...object,
        [key]: newValue
    };
}

function extractTimeInfo(time){
  var seconds = Math.floor(time);
  var microseconds = Math.floor((time-seconds)*1000000);
  var minutes = Math.floor(seconds/60);
  var hours = Math.floor(minutes/60);
  return {
    h: hours%24,
    m: minutes%60,
    s: seconds%60,
    micro: microseconds
  }
}

function pad(number, length=2) {
  var r = String(number);
  while ( r.length < length ) {
    r = '0' + r;
  }
  return r;
}

function formatBeginTime(time){
  // T00:21:10:10348800F14112000
  const { h, m, s, micro } = extractTimeInfo(time);
  return `T${pad(h)}:${pad(m)}:${pad(s)}:${pad(micro, 6)}`;
}

function formatDuration(duration){
  // PT00H23M11S8467200N14112000F
  const { h, m, s, micro } = extractTimeInfo(duration);
  return `PT${pad(h)}H${pad(m)}M${pad(s)}S${pad(micro, 6)}F`;
}

function updateSegmentTime(layers, {id, begin, end}){
    return updateArray(layers, layer => {
        return updateObject(layer, "segments", segments => {
            return updateArray(segments, segment => {
                if (segment.id != id) return segment;
                return {
                    ...segment,
                    begin, end,
                    data: {
                      ...segment.data,
                      beginTime: formatBeginTime(begin),
                      duration: formatDuration(end-begin)
                    }
                }
            });
        });
    });
}

export default function layers(state = initialLayers, action={}){
    switch(action.type){
        case SEQ_UPDATE_TIME:
            return updateSegmentTime(state, action);
        default:
            return state;
    }
}

