
var RameauStore = function(){

    var store = {};
    var callback;

    var idsToFetch = [];

    var getById = function(id){
        if (id in store) {
            return store[id];
        }
        store[id] = {id, _isTemp: true};

        idsToFetch.push(id);
        if(idsToFetch.length == 1){
            // First one, get next tick...
            setTimeout(() => {
                var url = '/test/api/rameau/_multiGet';
                var ids = idsToFetch;
                console.log('fetch', url);
                var onFinished = function(){
                    ids.forEach(id => {
                        store[id] = {id};
                    });
                };
                $.ajax({
                    //dataType: "json",
                    contentType: 'application/json',
                    url: url,
                    type: "PUT",
                    data: JSON.stringify(idsToFetch),
                    success: data => {
                        onFinished();
                        data.forEach(entry => {
                            if (entry){
                                store[entry.id] = entry;
                            }
                        });
                        notify();
                    },
                    error: msg => {
                        onFinished();
                        console.warn('FetchURL', url, 'failed', msg);
                    }
                });
                idsToFetch = [];
            });
        }
        return store[id];
    };

    var register = function(cb){
        callback = cb;
    };

    var unregister = function(){
        callback = undefined;
    };

    var notify = function(){
        if (callback){
            callback();
        }
    };

    return {
        getById,
        register, unregister
    };
};

module.exports = RameauStore;