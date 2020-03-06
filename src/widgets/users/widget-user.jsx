import WidgetManager from '../widget-manager';
import { LayoutMixin } from 'widgets/core/cms';
import './users.css';

var defaultUser = {
    lastname: 'Jottreau',
    firstname: 'Florent',
    role: 'PCU',
    img: "/images/fj.jpg",
    address: {
        street: '46bis, Rue de la République',
        city: 'Vanves',
        zipcode: '92170',
        country: 'France'
    }
};


var ProfileImage = React.createClass({

    render() {
        var style = {backgroundImage: 'url(' + this.props.img + ')'};
        if (this.props.imgSize){
            style['width'] = this.props.imgSize;
            style['height'] = this.props.imgSize;
        }
        return <div className="square-image img-circle" style={style}></div>;
    }
});

var UserAddress = React.createClass({
    mixins: [ React.addons.PureRenderMixin ],

    render(){
        const { street, city, zipcode, country, email, mobile } = this.props;
        return (
            <address>
                <a href={"mailto:" + email}>{email}</a><br />
                {street}<br/>
                {zipcode} {city}<br/>
                {country}<br/>
                <abbr title="Téléphone">Tel.:</abbr> {mobile}
            </address>
        );
    }
});

var UserData = React.createClass({
    render(){
        const { title, icon } = this.props;
        var titleEl;
        if (icon){
            titleEl = (
                <div className="header"><FAIcon icon={icon} /> {title}</div>
            );
        } else {
            titleEl = <div className="header">{title}</div>;
        }
        return (
            <div className="user-data">
                {titleEl}
                <hr />
                <div className="user-info">
                    {this.props.children}
                </div>
            </div>
        );
    },
});

var UserProfile = React.createClass({
    mixins: [ React.addons.PureRenderMixin ],

    getDefaultProps(){
        return {
            imgSize: 64
        }
    },

    render(){
        const { imgSize } = this.props;
        const { firstname, lastname, role, img, address, email, mobile } = this.props;
        return (
            <div className="user-profile">
                <Container>
                    <Row className="user-top-info" style={{marginBottom: 8}}>
                        <Col xs={4}>
                            <ProfileImage img={img} imgSize={imgSize}/>
                        </Col>
                        <Col xs={8}>
                            <h4>{firstname} {lastname}</h4>
                            <h5>{role}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            {this.props.children}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
});

var UserInfo = React.createClass({
    render(){
        const { icon, label, address, mobile, email, items } = this.props;
        if (address){
            return (
                <UserData title={label} icon={icon}>
                    <UserAddress {...address} email={email} mobile={mobile}/>
                </UserData>
            )
        } else {
            return (
                <UserData title={label} icon={icon}>
                    <ul className="list-unstyled">
                        {(items||[]).map(this.renderListItem)}
                    </ul>
                </UserData>
            );
        }
    },

    renderListItem(it, idx){
        const { title, subtitle, icon } = it;
        if (icon){
            return <li key={idx}><FAIcon icon={icon} />{title} <small>{subtitle}</small></li>;
        }
        return <li key={idx}>{title} <small>{subtitle}</small></li>;
    }
});

var UserProfileWidget = React.createClass({
    mixins: [LayoutMixin],

    render(){
        var user = this.props.user || defaultUser;
        return (
            <UserProfile {...this.props} {...user}>
                {this.renderWidgets(this.props.widget.children)}
            </UserProfile>
        );
    }
});


WidgetManager.registerWidget("UserProfile", {
    component: UserProfileWidget,
    icon: "user",
    config: [
    ],
    defaultValue: {
        type: 'UserProfile'
    }
});

WidgetManager.registerWidget("UserInfo", {
    component: UserInfo,
    icon: "user",
    config: [
    ],
    defaultValue: {
        type: 'UserInfo'
    }
});

module.exports = {
  UserProfile, UserInfo, UserProfileWidget
};

