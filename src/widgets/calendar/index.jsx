
import WidgetManager from '../widget-manager';

//{ id: 999 title: "Repeating Event" start: "2015-02-09T16:00:00" },
//{ id: 999 title: "Repeating Event" start: "2015-02-16T16:00:00" },

var Calendar = React.createClass({

    getDefaultProps(){
        return {
            mini: false, // Mini mode
            editable: false,
            events: []
        }
    },

    //getEvents(start, end, timezone, callback){
    //    console.log('getEvents');
    //    return this.props.events;
    //},

    getHeader(){
        if (this.props.mini){
            return {
                left: 'prev',
                center: 'title',
                right: 'next'
            };
        } else {
            return {
                left: 'prev,next',//' today',
                center: 'title',
                right: 'month,agendaWeek'//,agendaDay'
            };
        }
    },

    onEventClick(e){
        if (WidgetManager){
            WidgetManager.updateFieldValue(this.props.type, this.props.id, "selected", e.original);
        }
    },

    cloneEvents(events){
        // FullCalendar copies events and adds/changes fields.
        // => clone event, add an "original" field with the contents,
        // it'll be copied over to the calendar event
        var cloneEvent = function(event){
            var clone = jQuery.extend(false, {}, event);
            clone.original = event;
            return clone;
        };
        return events.map(cloneEvent);
    },

    loadCalendar(){
        var node = this.refs.calendar;
        var eventMouseover;
        if (this.props.mini){
            // add event name to title attribute on mouseover
            eventMouseover = function(event, jsEvent, view) {
                if (view.name !== 'agendaDay') {
                    $(jsEvent.target).attr('title', event.title);
                }
            };
        }
        window.calendar = $(node).fullCalendar({
            header: this.getHeader(),
            aspectRatio: 0.9,
            //defaultDate: '2015-06-25',
            editable: this.props.editable,
            eventLimit: true, // allow "more" link when too many events
            events: (start, end, timezone, callback) => callback(this.cloneEvents(this.props.events)),
            //events: this.props.events,
            eventClick: this.onEventClick,
            eventMouseover: eventMouseover
        });
    },

    componentDidUpdate(){
        var node = this.refs.calendar;
        $(node).fullCalendar('refetchEvents');
    },

    shouldComponentUpdate(nextProps, nextState){
        var props = this.props;
        //console.log('update?', JSON.stringify(props) !== JSON.stringify(nextProps));
        return JSON.stringify(props) !== JSON.stringify(nextProps); // TODO : optimize ?
    },

    componentDidMount(){
        this.loadCalendar();
    },

    render(){
        var className = this.props.mini ? "mini-calendar" : "full-calendar";
        return <div className={className} ref="calendar"/>;
    }
});

var CalendarWidget = React.createClass({
    render(){
        // Force refresh when changing size
        if (this.props.mini){
            return <Calendar key="mini" {...this.props}/>
        } else {
            return <Calendar key="full" {...this.props}/>
        }
    }
});

WidgetManager.registerWidget("Calendar", {
    component: CalendarWidget,
    icon: "calendar",
    config: [
        {key: "mini", type: "boolean"},
        {key: "editable", type: "boolean"},
    ],
    defaultValue: {type: 'Calendar'}
});

module.export = {
    CalendarWidget
}
