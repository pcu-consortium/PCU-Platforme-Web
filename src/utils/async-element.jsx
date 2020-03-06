import React from 'react';

var AsyncElement = {
    loadedComponent: null,

    load: function () {
        if (this.constructor.loadedComponent)
            return;

        this.bundle(module => {
            if(this.bundleKey){
                this.constructor.loadedComponent = module[this.bundleKey];
            } else {
                this.constructor.loadedComponent = module;
            }
            this.forceUpdate();
        });
    },

    componentDidMount: function () {
        this.load();
        //setTimeout(this.load, 1000); // feel it good
    },

    render: function () {
        var Component = this.constructor.loadedComponent;
        if (Component) {
            return <Component {...this.props}/>;
        }
        return this.preRender();
    }
};

var AsyncModule = {
    loadedModule: null,

    loadModule: function () {
        if (this.constructor.loadedComponent)
            return;

        this.bundleModule(module => {
            this.constructor.loadedModule = module;
            this.forceUpdate();
        });
    },

    componentDidMount: function () {
        this.loadModule();
    }
};

module.exports = {
    AsyncElement,
    AsyncModule
};