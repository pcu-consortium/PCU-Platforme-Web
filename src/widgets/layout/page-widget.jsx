
import WidgetManager from '../widget-manager';
import WidgetMixin from 'widgets/widget-mixin';
import { LayoutMixin } from 'widgets/core/cms';
import { Row, Col } from 'react-bootstrap';
import AutoAffix from 'react-overlays/lib/AutoAffix';

const inputStyle = {
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  minWidth: 300
};


function hasHeaders(children){
  for(var child of children){
    if (child.header) return true;
  }
  return false;
}

function findMainBlock(children){
  if (!children) return null;
  if (hasHeaders(children)) return children;
  for(var child of children){
    let block = findMainBlock(child.children);
    if (block) return block; 
  }
  return null;
}

var PageToc = React.createClass({
  mixins: [WidgetMixin], 

	scrollTo(evt, hash){
	  var target = $(hash);
	  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	  if (target.length) {
			$('html,body').animate({
			  scrollTop: target.offset().top
			}, 500);
			evt.preventDefault();
	  }
	},

  getEntries(){
    var { entries } = this.props;
    if (!entries) entries = this.context.master.getPage().children;
    return findMainBlock(entries) || [];
  },

	render(){
		const entries = this.getEntries();
		return (
			<div className="cms-toc">
				<h4>Table des matières</h4>
				{entries.map((w, idx) => {
					if (!w.header) return undefined;
					const hash = '#' + idx;
					return (
						<h4 key={idx} style={{paddingLeft: '16px'}}>
							<a href={hash} onClick={evt => this.scrollTo(evt, hash)}>{w.header}</a>
						</h4>
					);
				})}
			</div>
		);
	}
});


var PageWidget = React.createClass({
	mixins: [WidgetMixin, LayoutMixin],

	hasTOC(){
		const { widget } = this.props;
		return widget.showTOC && (findMainBlock(widget.children) != null);
	},

  toggleTOC(){
    const { widget } = this.props;
    widget.showTOC = !widget.showTOC;
    this.forceUpdate();
  },

  handleTitleChange(evt){
		const { widget } = this.props;
    widget.title = evt.target.value;
    this.forceUpdate();
  },

	render() {
		//return false;
		const { widget } = this.props;
		return (
			<div className="cms-page">
				{this.renderToggleTOC()}
        <h3 id='page-start'>{this.renderTitle()}</h3>
				{this.renderContents()}
			</div>
		);
	},

  renderTitle(){
  	const { widget } = this.props;
    if (this.context.editing){
      return <input onChange={this.handleTitleChange} placeholder="Titre de la page" value={widget.title} style={inputStyle}/>;
    }
    return widget.title;
  },

	renderContents(){
		const { widget } = this.props;
		var contents = this.renderWidgets(widget.children);
		if (this.hasTOC()){
			return (
				<Row>
					<Col sm={3} smPush={9}>{this.renderTOC()}</Col>
					<Col sm={9} smPull={3}>{contents}</Col>
				</Row>
			);
		} else {
			return (
				<Row>
					{false}
					<Col sm={12}>{contents}</Col>
				</Row>
			);
		}
	},

	renderToggleTOC(){
    if (!this.context.editing) return undefined;
    const { widget } = this.props;
		return (
			<div className="checkbox" style={{float: 'right'}}>
  			<label>
  			  <input type="checkbox" checked={widget.showTOC} onChange={this.toggleTOC} /> Table des matières
  			</label>
		  </div>
		);
	},

	renderTOC() {
		const { widget } = this.props;
		const entries = widget.children;
		if (!widget.showTOC || !entries || (entries.length == 0)){
			return undefined;
		}

		return (
			<AutoAffix viewportOffsetTop={15} container={this}>
				{/* using intermediate "div" to make AutoAffix work... */}
				<div><PageToc entries={entries} /></div>
			</AutoAffix>
		)
	}
});

WidgetManager.registerWidget("Page", {
  component: PageWidget,
  config: [
  ]
});

WidgetManager.registerWidget("TOC", {
  label: "Table of contents",
  component: PageToc,
  config: [
  ],
  icon: 'list'
});

module.exports = PageWidget;
