

if (window){
    window.initRootReactInstance = (rootInstance) => {
        console.log('initRootReactInstance', rootInstance);
        if (module.hot && rootInstance) {
            require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
                getRootInstances: function () {
                    // Help React Hot Loader figure out the root component instances on the page:
                    return [rootInstance];
                }
            });
        }
    }
}
