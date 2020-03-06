import React from 'react';

/*
 * SearchBox - styled search input
 */
var SearchBox = React.createClass({
    //mixins: [URLFetcher],

    getInitialState(){
        return {
            value: this.props.defaultValue
        }
    },

    getDefaultProps(){
        return {
            width: '100%',
            maxWidth: '480px',
            placeholder: 'Rechercher',
            icon: 'search',
            iconPos: 'right',
            autoRefreshValue: true // Should the data-binded value auto-refresh ?
        };
    },

    onSearch(evt){
        if (evt){
            evt.preventDefault();
            evt.stopPropagation();
        }
        var searchValue = this.state.value || "";
        if (this.props.onSearch){
            this.props.onSearch(searchValue)
        }
        if (this.props.url){
            var url = this.props.url + encodeURIComponent(searchValue);
            console.log('search url:', url);
            window.location.href = url;
        }
        if (!this.props.autoRefreshValue){
            this.refreshWidgetValue(searchValue);
        }
    },

    handleChange(evt){
        var value = evt.target.value;
        if (this.props.autoRefreshValue){
            this.refreshWidgetValue(value);
        }
        this.setState({value: value});
        if (this.props.onChange){
            this.props.onChange(value);
        }
    },

    componentWillReceiveProps(nextProps){
        if (this.props.defaultValue !== nextProps.defaultValue){
            // Controlled value changed
            this.setState({value: nextProps.defaultValue});
        }
    },

    refreshWidgetValue(value){
        if (window.WidgetManager){
            WidgetManager.updateValue("SearchBox", this.props.id, value);
        }
    },

    render(){
        var style = {maxWidth: this.props.maxWidth, width: '100%'};
        return (
            <ButtonGroup justified={this.props.justified} style={style}>
                <form onSubmit={this.onSearch}>
                    <div className="input-group" style={{width: '100%'}}>
                        {this.renderButton('left')}
                        <input ref='search' type="text" className="form-control" onChange={this.handleChange}
                               placeholder={this.props.placeholder} value={this.state.value} />
                        {this.renderButton('right')}
                        {this.renderChildren()}
                    </div>
                </form>
            </ButtonGroup>
        )
    },

    renderButton(position){
        if ((position !== this.props.iconPos) || !this.props.icon || (this.props.icon === "")){
            return undefined;
        }
        return (
            <span className="input-group-btn">
                <Button fa={this.props.icon} handleClick={this.onSearch}/>
            </span>
        )
    },

    renderChildren(){
        if (this.props.children && (this.props.children.length > 0)){
            return (
                <span className="input-group-btn">
                    {this.props.children}
                </span>
            )
        }
    }
});

if (window){
    window.SearchBox = SearchBox;
}

module.exports = SearchBox;