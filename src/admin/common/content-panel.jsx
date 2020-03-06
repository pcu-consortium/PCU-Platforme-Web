import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { SiteBreadcrumb } from './breadcrumb';

var ContentPanel = React.createClass({
    render(){
        const { showPanel, sidePanel, widePanel, className, onClick, routes } = this.props;
        var contentClass = classNames(className, "panel-main-content", {
            "has-right-panel": showPanel,
            "wide": widePanel
        });
        return (
            <div className="panel-container" >
                <div className={contentClass} onClick={onClick}>
                    <SiteBreadcrumb links={[{label: "Fonds"}]} routes={routes} />
                    {/*<h1>{this.props.title}</h1>
                    <hr />*/}
                    {this.props.children}
                </div>
                {sidePanel}
            </div>
        );
    }
});

module.exports = ContentPanel;
