
var Grid = React.createClass({
    render(){
        const { xs, sm, md, lg } = this.props;
        var sizes = { xs, sm, md, lg };
        return (
            <Row>
                {React.Children.map(this.props.children, (c, idx) => <Col key={idx} {...sizes}>{c}</Col>)}
            </Row>
        )
    }
});

module.exports = Grid;