import WidgetManager from '../widget-manager';
import { LayoutMixin } from 'widgets/core/cms';
import { DropdownButton, MenuItem, Input } from 'react-bootstrap';
import Rtab from 'react-rtab'
import Select from 'react-select';
import './MultiSelectblue.css';
import './bootstrap-theme.css';
import {UserProfile,UserInfo,UserProfileWidget} from '../users/widget-user.jsx';



var TextInputWidget = React.createClass({
  getInitialState() {
    return {
      value: this.props.value
    };
  },  
  render() {
    return (
      <Input type="text" align="right" label={this.props.name} onChange={this.handleChange} ref="input" value={this.state.value}/>
    );
  },
  handleChange() {
    this.setState({
      value: this.refs.input.getValue()
    });
  }
});




var CheckboxWidget = React.createClass({
  render() {
    return (
      <Input style={{marginTop:'-10px', marginLeft:'0px' }} type="checkbox" align="right" label={this.props.name}/>
    );
  }
});




var DropDownWidget = React.createClass({
  getInitialState() {
    return {
      value: this.props.name
    };
  },
  DropDownItemrender(btn,idx) {
    return (<MenuItem eventKey={btn.name}>{btn.name}</MenuItem>);

  },
  handleChange(event,idx){
    this.setState({value: idx});
  },
  render() {
    var dropdownchildren = (this.props.children || []).map(this.DropDownItemrender);
    return (
    <DropdownButton onSelect={this.handleChange} title={this.state.value} {...this.props}>
    	{dropdownchildren}
    </DropdownButton>
    );
  }
});


var VTabsWidget= React.createClass({
  mixins: [LayoutMixin],
  render() {
    let models = [{
      tab: "Tab 1",
      panel: [{
        firstname: "Laurent1",
        lastname: "Bel1",
        mobile:'12112121',
        email:'fdsqfsd@armadillo.com'
      }]
    }, {
      tab: "Tab 2",
      panel: [{
        firstname: "Laurent2",
        lastname: "Bel2",
        mobile:'67823723',
        email:'laurent@gmail.com'
      }]
    },
    {
      tab: "Tab 3",
      panel: [{
        firstname: "Laurent3",
        lastname: "Bel3",
        mobile:'099877',
        email:'gregory@gmail.com'
      }]
    },
    {
      tab: "Tab 4",
      panel: [{
        firstname: "Laurent4",
        lastname: "Bel4",
        mobile:'09876567',
        email:'qsfdsq@gmail.com'
      }]
    }

    ]

    let panelRenderer = (panelModel) => {

      return panelModel.map((data) => {
        var userinfo=[{title:'firstname', subtitle:data.firstname} , {title:'lastname', subtitle:data.lastname}];
        var profileinfo={lastname: data.lastname, firstname: data.firstname, role: "ARMADILLO", img: "/images/laurent_bel.jpg"};
        return ([    
          <div>      
          <UserProfileWidget {...this.props} user={profileinfo} imgSize={64}>
          </UserProfileWidget>
          <UserInfo label= "Mes coordonnées" icon= "globe" mobile= {data.mobile} email= {data.email} address= {{street: "46bis, Rue de la République", city: "Vanves", zipcode: "92170", country: "France"}} items={userinfo}>
          </UserInfo>    
          <UserInfo label= "Mes coordonnées" icon= "globe" items={userinfo}>
          </UserInfo>
          </div>
        ])
      })
    }
    let tabRenderer = (tabModel) => {
      return <a>{tabModel}</a>
    }
    return (
      <Rtab
        models={models}
        panelRenderer={panelRenderer}
        tabRenderer={tabRenderer}
        tabPosition="left"
      />
    )
  }
});




var SelectboxWidget = React.createClass({
  SelectItemrender(btn,idx) {
    return (
        <option value="other">{btn.name}</option>
      );
  },
  render() {
    var selectchildren = (this.props.children || []).map(this.SelectItemrender);
    return (
      <Input type="select" label={this.props.name} placeholder="">
        {selectchildren}
      </Input>
    );
  }
});


var MultiSelectWidget = React.createClass({
  SelectOptionLoader(entry,idx)
  {
    return {value: entry.name, label:entry.name};
  },
  handleChange(val){
    //alert("Selected: " + val);
  },
  render() {
    //var options = [{ value: 'one', label: 'One' },{ value: 'two', label: 'Two' },{ value: 'three', label: 'Three' }];
    var options=(this.props.children || []).map(this.SelectOptionLoader);
    return (
      <Select name="form-field-name" value={this.props.value} multi={true} options={options} onChange={this.handleChange}/>    
    );
  }
});


WidgetManager.registerWidget("DropDown", {
    component: DropDownWidget,
    config: [
    ]
}
);


WidgetManager.registerWidget("Checkbox", {
    component: CheckboxWidget,
    config: [
    ]
}
);

WidgetManager.registerWidget("Selectbox", {
    component: SelectboxWidget,
    config: [
    ]
}
);

WidgetManager.registerWidget("MultiSelect", {
    component: MultiSelectWidget,
    config: [
    ]
}
);


WidgetManager.registerWidget("TextInput", {
    component: TextInputWidget,
    config: [
    ]
}
);

WidgetManager.registerWidget("VTabs", {
    component: VTabsWidget,
    config: [
    ]
}
);



module.exports = {
  SelectboxWidget, DropDownWidget
};


