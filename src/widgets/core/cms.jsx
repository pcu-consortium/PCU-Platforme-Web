
import WidgetMixin from 'widgets/widget-mixin';
import WidgetManager from 'widgets/widget-manager';
import { CmsToolbar } from 'apps/cms/cms-toolbar';
import { WidgetEditHeader } from './widget-edit-header';
import { DropdownButton, MenuItem, Tooltip, OverlayTrigger } from 'react-bootstrap';

var CmsEditToolbar = React.createClass({

  generateWidgetInfo(widget){
    let w = (typeof widget === "string") ? {name: widget} : widget;
    var widgetInfo = WidgetManager.getWidget(w.name) || {};
    return {
      ...w,
      label: w.label || widgetInfo.label,
      icon: w.icon || widgetInfo.icon || 'plus',
      defaultWidget: w.widget || widgetInfo.defaultValue || {type: w.name}
    };
  },

	render(){
		const { widgets, hasPaste, site, master, idx } = this.props;
		var toolbar = CmsToolbar.getToolbar(site);

		// Wraps in 2 button groups to fix browser bug on button elements ! TODO: find cleaner fix...
		return (
			<div className="toolbar-hidden" style={{paddingTop: '8px', paddingBottom: '8px'}}>
				<ButtonGroup justified>
					{toolbar.map(this.renderButton)}
					<ButtonGroup bsSize="xs">
						<Button onClick={() => master.pasteWidget(widgets, idx)}
								bsStyle={hasPaste ? "success" : undefined}
								data-toggle="tooltip" data-placement="top" data-action="Paste"
								icon="paste" title="Paste" disabled={!hasPaste}
							/>
					</ButtonGroup>
				</ButtonGroup>
			</div>
		);
	},

	renderButton(widget, idx){
    const { widgets, master, idx: widgetIdx } = this.props;
		let w = this.generateWidgetInfo(widget);
    let children = w.children;
    if (!children){
      // Normal button
  		return (
  			<ButtonGroup key={idx} bsSize="xs">
  				<Button onClick={() => master.addWidget(w.defaultWidget, widgets, widgetIdx)}
  						data-toggle="tooltip" data-placement="top" data-action={w.name}
  						icon={w.icon} title={w.name} />
  			</ButtonGroup>
  		);
    } else {
      // Menu button
      let id = "menu-" + widgetIdx + "-" + w.name;
      let tooltip = <Tooltip id={"tooltip-" + id}>{w.name}</Tooltip>;
      return (
        <OverlayTrigger key={idx} placement="top" overlay={tooltip}>
          <DropdownButton 
                          bsSize="xs" 
                          title={<FAIcon icon={w.icon} />} 
                          id={"toolbar-" + id}
                          onSelect={(evt, idx) => {
                            let w = this.generateWidgetInfo(children[idx]);
                            console.log('add', w);
                            master.addWidget(w.defaultWidget, widgets, widgetIdx);
                          }}
                          >
            {children.map(this.renderMenuItem)}
          </DropdownButton>
        </OverlayTrigger>
      );
    }
	},

  renderMenuItem(widget, idx){
    let w = this.generateWidgetInfo(widget);
    return <MenuItem key={idx} eventKey={idx}><FAIcon icon={w.icon} /> {w.label || w.name}</MenuItem>;
  }
});

var renderWidget = function(props){
	var { widget, parent } = props;
	if (!widget.type){
		return false;
	}
	var widgetInfo = WidgetManager.getWidget(widget.type);
	// Patch trailing "Widget". (VocabWidget, VocabAppWidget ???)
	if (!widgetInfo){
		var match = widget.type.match(/^([a-zA-Z]+)Widget$/);
		if (match){
			widget.type = match[1];
		}
	}

	try {
		var Component = WidgetManager.getWidgetComponent(widget.type);
		widget = WidgetManager.evalProps(widget); // Data-binding magic...
		if (Component){
			return <Component key={props.key} {...widget} widget={widget} parent={parent} />;
		}
		console.warn('unknown widget type', widget.type);
		return undefined;

	} catch(e){
		window.e = e;
		return <Alert bsStyle="danger">{e.stack}</Alert>;
	}
};

var LayoutMixin = {
	mixins: [WidgetMixin],

	getMaster(){
		return this.context.master || this; // Page is it's own master...
	},

	renderWidgets(widgets, hideButtons){
		if (!widgets){
			return undefined;
		}
		return (
			<div>
				{hideButtons ? undefined : this.renderAddButtons(widgets, 0)}
				{widgets.map((page, idx) => this.renderWidgetSlot(widgets, page, idx, hideButtons))}
			</div>
		);
	},

	renderWidgetSlot(pages, widget, idx, hideButtons) {
		// Datawidget can't be edited
		if (!this.context.editing || (WidgetManager.getWidget(widget.type) && WidgetManager.getWidget(widget.type).isDataWidget)){
			return (
				<div id={idx} key={idx} className="widget-column-entry">
					{this.renderHeader(widget)}
					{this.renderWidget(widget, idx)}
				</div>
			);
		}
		if (!widget._id && this.props.useUUID){
			widget._id = generateUUID();
		}
		var key = widget._id || idx;
		return (
			<div id={idx} key={key} className="widget-column-entry">
				<div className="editing">
					{this.renderSettingsButton(widget)}
					{this.renderHeader(widget)}
					{this.renderWidget(widget, idx)}
				</div>
				{hideButtons ? undefined : this.renderAddButtons(pages, idx+1)}
			</div>
		);
	},

	renderSettingsButton(widget) {
		if (!this.context.editing) {
			return undefined;
		}
		var master = this.getMaster();
		return (
			<WidgetEditHeader widget={widget} onChange={master.onChange}
							  onDelete={master.removeWidget} onCopy={master.copyWidget} onCut={master.cutWidget}/>
		)
	},

	renderHeader(widget) {
		if (widget.header && !this.context.editing) {
			var header = WidgetManager.eval(widget.header);
			return <h4>{header}</h4>;
		}
		return undefined;
	},

	renderWidget(child, idx){
		var { widget } = this.props;
		return renderWidget({key: idx,  widget: child, parent: widget});
	},

	renderAddButtons(widgets, idx){
		if (!this.context.editing){
			return undefined;
		}
		return <CmsEditToolbar site={this.props.site} widgets={widgets} idx={idx}
							   hasPaste={this.getMaster().state.pasteCount != 0}
							   master={this.getMaster()} />
	}
};

module.exports = {
	LayoutMixin,
	renderWidget
};
