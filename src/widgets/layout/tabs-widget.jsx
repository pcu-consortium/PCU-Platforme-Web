
import WidgetManager from '../widget-manager';
import WidgetMixin from 'widgets/widget-mixin';
import { LayoutMixin } from 'widgets/core/cms';

var TabsWidget = React.createClass({
    mixins: [WidgetMixin, LayoutMixin],

    render: function(){
        var { widget } = this.props;
        if (!widget.children){
            widget.children = [];
        }
        var tabs = widget.children.map(tab => {
            if (!tab.children){
                tab.children = [];
            }
            return {
                id: tab.title,
                label: tab.title,
                render: (() => {
                    return (
                        <div>
                            {this.renderWidgets(tab.children)}
                        </div>
                    );
                })
            }
        });
        var onClickPlus = undefined;
        var onChangeTab= undefined;
        var self=this;
        if (this.context.editing){
            onClickPlus = () => {
                widget.children.push({
                    type: 'Tab',
                    title: 'Tab' + (widget.children.length+1),
                    children: []
                });
                this.getMaster().forceUpdate();
            };
            onChangeTab = function(idx)  {
                var newtitle = prompt("Renommer l'onglet", widget.children[idx].title);
                widget.children[idx].title=newtitle||widget.children[idx].title;
                self.forceUpdate();
            }
        }
        // /!\ The children are widgets and not react components.
        // => explicit children flush (children={undefined})
        return <Tabs {...widget} tabs={tabs} children={undefined} onClickPlus={onClickPlus} onChangeTab={onChangeTab}
                                 tabLeft={widget.position === "left"} tabRight={widget.position === "right" } />;
    }

});

WidgetManager.registerWidget("Tabs", {
    component: TabsWidget,
    icon: "folder-o",
    config: [
        {key: "tabStyle", type: "selector", values: ["tabs", "pills", "light", "categories"]}
    ],
    defaultValue: {type: 'Tabs', children: [
        {type: 'Tab', title: 'Tab1', children: []},
        {type: 'Tab', title: 'Tab2', children: []}
    ]}
});

module.exports = TabsWidget;