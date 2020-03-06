import React, { Component, PropTypes } from 'react';
import { LinkButton } from 'admin/common/components.jsx';

import Lang from 'utils/lang';
import classNames from 'classnames';
import { DataTable, DataTableColumn, RightLabel } from 'admin/common/components';
import { Nav, NavItem } from 'react-bootstrap';
import { Input } from 'admin/forms/form-components';

import './entity-list.css';

var InputFilter = React.createClass({
    render(){
        return <Input bsSize="sm" rightIcon="search" placeholder="filtrer" style={{maxWidth: 240}} {...this.props} />;
    }
});

var EntityList = React.createClass({

    getInitialState(){
        return {
            filter: ""
        }
    },

    handleFilterChange(e){
        console.log(e.target.value);
        this.setState({filter: e.target.value});
    },

    render(){
        const { filter } = this.state;
        const { entities } = this.props;
        var filterColumns = this.props.children.map(col => col.props.dataField);
        var children = [
            ...this.props.children,
            <DataTableColumn dataField="actions" dataFormat={this.renderButtons} style={{width: 280}} align="right">{Lang.txt("list.actions")}</DataTableColumn>
        ].map((c, idx) => React.cloneElement(c, {key: c.key || idx}));
        return (
            <div>
                <div className="clearfix">
                    {this.renderPlusButton()}
                    <div className="pull-right">
                        <InputFilter value={filter} onChange={this.handleFilterChange} />
                    </div>
                </div>
                <DataTable className="table-entity-list" responsive striped 
                        data={entities} 
                        sortColumn="id" 
                        sortOrder="asc" 
                        filter={filter} filterColumns={filterColumns}>
                    {children}
                </DataTable>
                {this.renderPlusButton()}
            </div>
        );
    },

    renderButtons(col, obj){
        const { toEdit, editParam, onDuplicate } = this.props;
        return (
            <ButtonGroup bsSize="xs">
                <LinkButton icon="edit" bsStyle="primary" to={toEdit}
                            params={{[editParam]: (obj.id||'_new')}}>{Lang.txt("action.edit")}</LinkButton>
                {onDuplicate ? <Button icon="copy" bsStyle="primary" onClick={() => onDuplicate(obj)}>{Lang.txt("action.duplicate")}</Button> : undefined}
                <Button icon="trash" bsStyle="danger"
                        disabled={!obj.id || obj.id.indexOf('sys.') == 0}>{Lang.txt("action.delete")}</Button>
            </ButtonGroup>
        );
    },

    renderPlusButton(){
        const { toNew, hasNew, onNew } = this.props;
        const Component = toNew ? LinkButton : Button;
        return <Component bsSize="sm" icon="plus" to={toNew} onClick={onNew} bsStyle="success" style={{marginBottom: 8}} disabled={!hasNew}>{Lang.txt('action.add')}</Component>;
    }
});


var FilteredEntityList = React.createClass({

    getInitialState(){
        return {
            activeKey: this.props.defaultFilter
        }
    },

    handleSelect(activeKey){
        this.setState({ activeKey });
    },

    filteredEntities(){
        var key = this.state.activeKey;
        var filter = this.props.filter;
        return this.props.entities.filter(e => filter(key, e));
    },

    countEntities(key){
        var filter = this.props.filter;
        var cnt = 0;
        this.props.entities.forEach(e => {if (filter(key, e)) cnt++;});
        return cnt;
    },

    render(){
        const { activeKey } = this.state;
        const { filters } = this.props;
        return (
            <div className="fluid-container">
                <Row>
                    <Col sm={2}>
                        <Nav bsStyle='pills' stacked activeKey={activeKey} onSelect={this.handleSelect}>
                            {filters.map(f => (
                                <NavItem eventKey={f.id}>{f.label}<RightLabel>{this.countEntities(f.id)}</RightLabel></NavItem>
                            ))}
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <EntityList {...this.props} entities={this.filteredEntities()}>
                            {this.props.children}
                        </EntityList>
                    </Col>
                </Row>
            </div>
        );
    }
});

module.exports = {
    EntityList,
    FilteredEntityList,
    DataTableColumn
};