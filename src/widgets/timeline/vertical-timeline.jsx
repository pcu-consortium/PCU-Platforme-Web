import WidgetManager from '../widget-manager';
import { LayoutMixin } from 'widgets/core/cms';
import './vertical-timeline.css';

var VerticalTimeline = React.createClass({
    mixins: [LayoutMixin],

    getDefaultProps(){
        return {
            items: []
        }
    },

    render(){
        return (
            <ul className="vertical-timeline">
                {this.props.items.map(this.renderItem)}
            </ul>
        )
    },

    renderDateLabel(date){
        return <div className="vertical-timeline-date">{date}</div>;
    },

    renderItem(item, idx){
        var { icon, title, date, description, badgeStyle, actions, alignRight } = item;
        icon = icon || "calendar";
        var badgeClass = "vertical-timeline-badge";
        if (badgeStyle) badgeClass += " " + badgeStyle;
        var className = alignRight ? "vertical-timeline-inverted" : "";
        if (!title && !description && date){
            return this.renderDateLabel(date, idx);
        }
        return (
            <li key={idx} className={className}>
                <div className={badgeClass}><FAIcon icon={icon}/></div>
                <div className="vertical-timeline-panel">
                    <div className="vertical-timeline-heading">
                        <h4 className="vertical-timeline-title">{title}</h4>
                        {this.renderDate(date)}
                    </div>
                    <div className="vertical-timeline-body">
                        <p>{description}</p>
                        {actions ? <hr /> : undefined}
                        {this.renderActions(actions)}
                    </div>
                </div>
            </li>
        );
    },

    renderDate(date){
        if (!date) {
            return undefined;
        }
        return (
            <p>
                <small className="text-muted"><FAIcon icon="clock-o"/> {date}</small>
            </p>
        )
    },

    renderActions(actions){
        if (!actions){
            return undefined;
        }
        if (!Array.isArray(actions)){
            actions = [actions];
        }
        return (
            <ButtonGroup>
                {this.renderWidgets(actions)}
            </ButtonGroup>
        );
    }
});

WidgetManager.registerWidget("VerticalTimeline", {
    component: VerticalTimeline,
    icon: "ellipsis-v",
    config: [
    ],
    defaultValue: {type: 'VerticalTimeline', children: [ {type: 'Text', text: 'Edit me'}]}
});

module.exports = VerticalTimeline;
