
var SaveButton = React.createClass({

    getDefaultProps(){
        return {
            saving: false,
            icon: "save"
        };
    },

    render: function(){
        const { saving } = this.props;
        if (saving){
            return <Button {...this.props} disabled icon="refresh" glyphSpin>{this.props.children}</Button>;
        } else {
            return <Button {...this.props}>{this.props.children}</Button>;
        }
    }
});

module.exports = SaveButton;
