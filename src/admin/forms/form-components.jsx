import React from 'react';
import classNames from 'classnames';
import { OverlayTrigger, Popover } from 'react-bootstrap';

var Input = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    getDefaultProps: function(){
        return {
            type: "text",
            inline: true
        };
    },

    render: function(){
        const { help, label, error, leftButton, rightButton, leftIcon, rightIcon, style, inline, subtype, bsSize } = this.props;

        var inputGroup = this.renderInput();
        // Only wrap in input-group if it has buttons, breaks width !!
        if (leftButton || rightButton || leftIcon || rightIcon || (label && inline)){

            let className = classNames("input-group", {
                // "form-group-xs": (bsSize == "xs"),
                // "form-group-sm": (bsSize == "sm"),
                // "form-group-lg": (bsSize == "lg")
            });
            inputGroup = (
                <div className={className}>
                    {this.renderButton(leftButton)}
                    {this.renderIcon(leftIcon)}
                    {inputGroup}
                    {this.renderButton(rightButton)}
                    {this.renderIcon(rightIcon)}
                </div>
            );
        }
        let className = classNames("form-group", {
            "has-error has-feedback": error,
            "form-group-xs": (bsSize == "xs"),
            "form-group-sm": (bsSize == "sm"),
            "form-group-lg": (bsSize == "lg")
        });
        inputGroup = (
            <div className={className} style={style}>
                {this.renderHelp(help)}
                {this.renderLabel(label)}
                {inputGroup}
                {this.renderHelpBlock()}
                {this.renderErrors()}
            </div>
        );
        if (label && inline){
            return <div className={inline ? "form-inline" : ""}>{inputGroup}</div>;
        }
        return inputGroup;
    },

    renderHelp(help){
        if (!help) {
            return undefined;
        }
        return (
            <OverlayTrigger trigger={['hover', 'focus']} placement='left' overlay={<Popover>{help}</Popover>}>
                <FAIcon className="pull-right control-label" icon="question-circle"/>
            </OverlayTrigger>
        );
    },

    renderLabel(label){
        if (!label){
            return undefined;
        }
        return <label className="control-label" htmlFor={this.props.name} >{label}</label>;
    },

    renderInput(){
        const { name, type="text", onKeyUp, label, disabled, value, placeholder, tabIndex, onChange, subtype } = this.props;
        var inputClass = classNames({
            "form-control": ((type === "text") || (type === "number") || (type === "date") || (type === "list"))
        });
        var style = {};
        if (label){
            style = {width: '100%'};
        }
        if (type === "list"){
            return this.renderSelect();
        }
        var Component = subtype ? "textarea" : "input";
        //if (subtype){
        //    style.height = '100%';
        //}
        return (
            <Component className={inputClass}
                   id={name}
                   name={name}
                   disabled={disabled}
                   type={(type == "date" || type == "list") ? "text" : type}
                   value={value}
                   placeholder={placeholder}
                   tabIndex={tabIndex}
                   onChange={onChange}
                   onKeyUp={onKeyUp}
                   style={style} />
        );
    },

    renderSelect(){
        const { value, values=[], disabled, style, onChange } = this.props;
        return (
            <select className="form-control"
                    id={name}
                    name={name}
                    value={value} disabled={disabled}
                    style={style} onChange={onChange}>
                {values.map((value, idx) => {
                    if ("string" === typeof value) {
                        return <option key={idx} value={value}>{value}</option>;
                    } else {
                        return <option key={idx} value={value.id}>{value.label}</option>;
                    }
                })}
            </select>
        );
    },

    renderButton(button){
        if (!button){
            return undefined;
        }
        return (
            <span className="input-group-btn">
                {button}
            </span>
        )
    },

    renderIcon(icon){
        if (!icon){
            return undefined;
        }
        return (
            <span className="input-group-addon">
                <FAIcon icon={icon}/>
            </span>
        )
    },

    renderHelpBlock(){
        if (!this.props.helpBlock){
            return undefined;
        }
        return <p className="help-block">{this.props.helpBlock}</p>
    },

    renderErrors(){
        if (!this.props.error){
            return undefined;
        }
        var right = (this.props.rightButton || this.props.rightIcon) ? 40 : undefined; // Fix position when using a right button
        return [
            <FAIcon key="0" className="form-control-feedback" icon="remove" defaultWidth style={{right}} />,
            <p key="1" className="help-block">{this.props.error}</p>,
            <span key="2" className="sr-only">(error: {this.props.error})</span>
        ]
    }
});

module.exports = {
    Input
}