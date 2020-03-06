import React from 'react';
import Router, { Route, IndexRoute } from 'react-router';

import { LinkButton, ContentPanel, RightLabel } from 'admin/common/components.jsx';
import { FilteredEntityList, DataTableColumn } from 'admin/entities/entity-list';
import Lang from 'utils/lang';
import { Nav, NavItem } from 'react-bootstrap';
import classNames from 'classnames';
import SearchBox from 'components/search/search-box';


import RameauVocab from './rameau-vocab';

import './rameau.css';

var RameauStore = require('./rameau-store')();


var Breadcrumb = React.createClass({

    render(){
        var links = this.props.links || [];
        var onClick = (e, idx) => {};
        if (this.props.onClickLink){
            onClick = (e, idx) => {
                e.preventDefault();
                e.stopPropagation();
                this.props.onClickLink(links[idx], idx);
            };
        }
        return (
            <ol className="breadcrumb">
                {links.map((link, idx) => {
                    var active = (idx == (links.length-1));
                    if (!active){
                        return <li key={idx}><a href={link.id} onClick={e => onClick(e, idx)}>{link.label}</a></li>;
                    } else {
                        return <li key={idx}>{link.label}</li>;
                    }
                })}
            </ol>
        );
    }
});

var RameauVocabs = React.createClass({

    getInitialState(){
        const { word } = this.props;
        return {
            breadcrumb: [{id: word.id, label: word.prefLabel}],
            current: this.props.word
        }
    },

    isValidEntry(link){
        return link.label;
    },

    updateState(state){
        const { current } = state;
        this.setState(state);
        if (this.props.onSelectId){
            this.props.onSelectId(current.id);
        }
    },

    // Go to new entry !
    handleClick(e, link){
        if (!this.isValidEntry(link)){
            return;
        }
        e.preventDefault(); // Prevent href behaviour
        this.updateState({
            breadcrumb: [...this.state.breadcrumb, link],
            current: link
        });
    },

    handleBackClick(link, idx){
        // Jump to this link and cut the rest

        ('go back to', link);
        this.updateState({
            breadcrumb: this.state.breadcrumb.slice(0, idx+1),
            current: link
        });
    },

    render(){
        const { current } = this.state;
        return (
            <div>
                <Breadcrumb links={this.state.breadcrumb} onClickLink={this.handleBackClick} />
                {React.addons.createFragment({
                    // Use a unique key per word to force refreshes
                    [current.id]: <RameauVocab type="concepts" word={current} onClickLink={this.handleClick}/>
                })}
            </div>
        );
    }
});


var TreeView = React.createClass({

    getDefaultProps(){
        return {
            depth: 0
        };
    },

    getInitialState(){
        return {
            open: false
        };
    },

    handleToggle(){
        this.setState({open: !this.state.open});
    },

    render(){
        const { entry, selected, depth } = this.props;
        var active = entry.id == selected;
        var hasChildren = entry.narrower && (entry.narrower.length > 0);
        var icon = this.state.open ? "chevron-down" : "chevron-right";
        return (
            <div className="tree-entry">
                <a className={active ? "active" : ""} href="#"
                   onClick={e => this.props.onSelectEntry(e, entry)}
                    style={{paddingLeft: 20*depth}}>

                            <Button icon={icon}
                                bsStyle="link"
                                bsSize="sm"
                                style={{visibility: hasChildren ? "visible" : "hidden", outline: "none"}}
                                onClick={this.handleToggle} />
                    <span className="tree-indented-entry">
                        {entry.prefLabel || entry['rdfs:label'] || entry.id}
                    </span>
                </a>
                {this.renderChildren()}
            </div>
        );
    },

    renderChildren(){
        const { onSelectEntry, entry, selected, depth } = this.props;
        var children = entry.narrower;
        if (!children || !this.state.open){
            return undefined;
        }
        children = children.map(c => RameauStore.getById(c.id)).filter(c => !c._isTemp);
        if (children.length == 0){
            return undefined;
        }
        children = children.sort((a, b) => {
            var la = a.prefLabel || a.id, lb = b.prefLabel || b.id;
            if (la == lb) return 0;
            else if (la < lb) return -1;
            else return 1;
        });
        return (
            children.map(child => {
                var entry = RameauStore.getById(child.id);
                if (entry._isTemp){
                    return undefined;
                }
                return <TreeView key={entry.id} depth={depth+1} entry={entry} onSelectEntry={onSelectEntry} selected={selected} />
            })
        );
    }
});


var RameauHome = React.createClass({
    mixins: [URLFetcher, Router.History],

    contextTypes: {
       location: React.PropTypes.object,
       history: React.PropTypes.object
    },

    statics: {
        breadcrumb: [
            {to: 'rameau', label: 'Référentiels', icon: 'book'}
        ]
    },

    getInitialState(){
        return {
            type: "concepts",
            selectedId: undefined,
            rootWord: undefined,
            clickId: 0,
            data: {}//this.props
        };
    },

    getDefaultProps(){
        return {
            defaultQuery: 'peugeot',
            results: []
        }
    },

    getQuery(){
        return this.context.location.query;
    },

    onSearch(search){
        const { location, history } = this.context;
        this.fetchUrl(this.makeUrl(search));
        history.pushState(null, location.pathname, {
            ...this.getQuery(),
            q: (search && search.length > 0) ? search : undefined
        });
    },

    makeUrl(query=""){
        query = encodeURIComponent(query.trim());
        var url = '/test/api/rameau?q=' + query + '&limit=50';
        //if (this.props.source){
        //    url += '&source=' + this.props.source;
        //}
        //if (filters && filters.length > 0){
        //    filters = encodeURIComponent(JSON.stringify(filters));
        //    url += "&filters=" + filters;
        //}
        return url;
    },

    updateSelected(data, newType){
        //var { clickId, selectedId } = this.state;
        var type = newType || this.state.type;
        if (data && data[type]){
            var results = data[type].hits.hits;
            if (results.length > 0){
                var rootWord = results[0]._source;
                this.setState({
                    rootWord,
                    selectedId: rootWord.id,
                    type
                });
                return;
            }
        }
        this.setState({rootWord:  null, selectedId: null, type});
    },

    onDataUpdated(data){
        this.updateSelected(data);
    },

    componentDidMount(){
        this.onSearch(this.getQuery().q);
        // this.onSearch(this.props.defaultQuery);
        RameauStore.register(() => {
            if (this.isMounted()){
                this.forceUpdate();
            }
        });
    },

    componentWillUnmount(){
        RameauStore.unregister();
    },

    handleSelect(type){
        this.updateSelected(this.state.data, type);
    },

    getCount(key){
        if (this.state.data){
            var keyData = this.state.data[key];
            if (keyData){
                return keyData.hits.total;
            }
        }
        return 0;
    },

    onSelectEntry(e, rootWord){
        var { clickId, selectedId } = this.state;
        e.preventDefault();
        e.stopPropagation();
        if (rootWord.id != selectedId){
            clickId++; // Force refresh, had moved to other page
        }
        this.setState({
            rootWord,
            selectedId: rootWord.id,
            clickId
        });
    },

    onSelectId(id){
        this.setState({
            selectedId: id
        });
    },

    render(){
        var rameauTypes = [
            {id: "concepts", label: "Concepts (" + this.getCount("concepts") + ")"},
            {id: "periodics", label: "Périodiques (" + this.getCount("periodics") + ")"}
        ];

        //<Row>
        //    <Col sm={5}>
        //    </Col>
        //    <Col sm={7}>
        //        <div className="list-group">
        //            {this.renderResults()}
        //        </div>
        //    </Col>
        //</Row>
        //<RightLabel>{this.getCount(f.id)}</RightLabel>
        return (
            <ContentPanel showPanel widePanel sidePanel={this.renderSidePanel()}>
                <ButtonToolbar theme="shadow">
                    <SearchBox onSearch={this.onSearch} defaultValue={this.getQuery().q} /> {/*onChange={this.onSearch}*/}
                </ButtonToolbar>
                <Container style={{paddingTop: 16}}>
                            <Nav bsStyle='tabs' justified activeKey={this.state.type} onSelect={this.handleSelect}>
                                {rameauTypes.map(f => (
                                    <NavItem key={f.id} eventKey={f.id}>{f.label}</NavItem>
                                ))}
                            </Nav>
                    <br />
                    <div className="list-condensed">
                        {this.renderResults()}
                    </div>
                </Container>
            </ContentPanel>
        );
    },

    renderResults(){
        const { type, data, selectedId } = this.state;
        var results = data[type];
        if (!results || !results.hits || (results.hits.total == 0)){
            return <div>Aucun résultat</div>;
        }
        return results.hits.hits.map(res => {
            var entry = res._source;
            return (
                <TreeView key={entry.id} entry={entry} onSelectEntry={this.onSelectEntry} selected={selectedId} />
            );
        });
    },

    renderSidePanel(){
        const { rootWord, type, clickId } = this.state;
        if (!rootWord) {
            // Empty side-panel
            return <div className="panel-side-content wide" />;
        }
        return (
            <div className="panel-side-content wide">
                {React.addons.createFragment({
                    [rootWord.id + "." + clickId]: <RameauVocabs word={rootWord} type={type}
                                                                 onSelectId={this.onSelectId}/>
                })}
            </div>
        );
    }
});


var Routes = (
    <Route path="rameau" component={RameauHome}>
    </Route>
);

module.exports = {
    Routes
};