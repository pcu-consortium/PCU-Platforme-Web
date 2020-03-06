import React from 'react';
import Router from 'react-router';
import { SaveButton } from 'components/ui';
import { CmsMasterPage } from 'apps/cms/cms-master-page';
import { YamlEditor, WmlEditor } from 'components/editors/code-editors';

var WMLAutocomplete = function(){

    var addField = function(results, obj, prefix, visitedKeys){
        if (!visitedKeys){
            visitedKeys = {};
        }
        if (!Array.isArray(obj) && ((typeof obj) === "object") && obj) {
            for (var key in obj) {
                if (!visitedKeys[key] && obj.hasOwnProperty(key)) {
                    visitedKeys[key] = true; // Avoid double-add
                    var pos = key.indexOf(prefix);
                    if (pos != -1) {
                        results.push({
                            name: key,
                            value: key,
                            meta: 'field',
                            score: 200 - pos
                        })
                    }
                }
            }
        }
    };

    var checkGetField = function(line){
        var matches = line.match(/([_A-Za-z0-9.*]+)\.([^.]*)$/, "g");
        //console.log(matches);
        if (matches){
            var prefix = matches[1];
            var keyPrefix = matches[2];
            var obj = WidgetManager.evalString(prefix);
            console.log(obj);
            var results = [];
            addField(results, obj, keyPrefix);
            return results;
        }
        return undefined;
    };

    var checkMapField = function(line){
        var matches = line.match(/([_A-Za-z0-9.*]+)\*\.([^.*]*)$/, "g");
        //console.log(matches);
        if (matches){
            var prefix = matches[1];
            var keyPrefix = matches[2];
            var arr = WidgetManager.evalString(prefix);
            console.log(arr);
            var results = [];
            var keys = {};
            if (Array.isArray(arr)){
                var len = Math.min(5, arr.length);
                for(var i=0; i<len; i++){
                    addField(results, arr[i], keyPrefix, keys);
                }
            }
            return results;
        }
        return undefined;
    };

    var autocomplete = function(line){
        return checkMapField(line) || checkGetField(line) || [];
    };

    return {
        autocomplete: autocomplete
    }
}();

var CmsTextEditor = React.createClass({

    getInitialState () {
        return {
            errorCnt: 0
        };
    },

    onChange (value) {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
        this.setState({errorCnt: 0});
    },



    onError () {
        this.setState({errorCnt: 1});
    },

    onValid () {
        this.setState({errorCnt: 0});
    },

    onChangeTab () {
        this.setState({errorCnt: 0});
    },

    render () {
        var tabs = [
            {
                id: 'wml', label: 'WidgetML', render: () => {
                return this.renderEditor(WmlEditor);
            }
            },
            {
                id: 'yaml', label: 'YAML', render: () => {
                return this.renderEditor(YamlEditor);
            }
            }
        ];
        return (
            <Tabs tabs={tabs} lazy={true} onChangeTab={this.onChangeTab}>
                {this.renderErrors()}
            </Tabs>
        );
    },

    renderEditor(Editor) {
        var autocomplete = (editor, session, pos, prefix, callback) => {
            // console.log(pos, prefix, callback);
            // Compute a more complete prefix...
            var line = editor.session.getLine(pos.row);
            var longPrefix = line.substring(0, pos.column);
            //callback()
            callback(null, WMLAutocomplete.autocomplete(longPrefix));
        };
        return <Editor id="editor-page" content={this.props.page} height={500} inline_depth={8}
                       onChange={this.onChange} onError={this.onError} onValid={this.onValid}
                       autocomplete={autocomplete} />
    },

    renderErrors () {
        if (this.state.errorCnt === 0) {
            return undefined;
        }
        return <div className="pull-right label label-danger" style={{margin: "12px"}}>1 error</div>
    }
});


var CmsEditPageSource = React.createClass({

    getInitialState(){
        return {
            saving: false
        }
    },

    onChange(value){
        if (this.props.onChange){
            this.props.onChange(value);
        }
    },

    render(){
        var page = jQuery.extend(true, {}, this.props.page);
        delete page._id;
        delete page.pageId;
        delete page.site;
        return (
            <div className="fluid-container">
                <Row>
                    <Col md={5}>
                        <CmsTextEditor page={page} onChange={this.onChange} />
                    </Col>
                    <Col md={7}>
                        <CmsMasterPage {...this.props} page={page} useUUID={false} />
                    </Col>
                </Row>
            </div>
        );
    }
});

var CmsEditPage = React.createClass({
    mixins: [Router.Navigation],

    contextTypes: {
        location: React.PropTypes.object
    },

    getInitialState(){
        return {
            page: this.props.page,
            saving: false
        }
    },

    getMode(){
        return this.context.location.query.mode || "wysiwyg";
    },

    getPageUrl(){
        const { baseUrl, page } = this.props;
        return baseUrl + 'page/' + page.pageId;
    },

    onChange(page){
        this.setState({page: page});
    },

    save(onFinished){
        CmsAdmin.pageDispatcher.dispatch({actionType: "save"});
        var page = jQuery.extend(true, {}, this.state.page);

        CmsAdmin.removeIds(page);

        // Restore missing keys
        page.pageId = this.props.page.pageId;
        page.site   = this.props.page.site;
        this.setState({saving: true});
        //alert('saving');
        $.ajax({
            url: this.props.api + '/cms/page/' + this.props.pageId,
            type: "PUT",
            contentType: 'application/json',
            //dataType: 'json',
            data: JSON.stringify(page),
            success(data){
                console.log('saved !', data);
            },
            complete: () => {
                this.setState({saving: false});
                if (onFinished){
                    onFinished();
                }
            }
        });
    },

    saveAndExit(){
        this.save(() => window.location = this.getPageUrl());
    },

    deletePage(){        
        var page = jQuery.extend(true, {}, this.state.page);
        page.pageId = this.props.page.pageId;
        page.site   = this.props.page.site;        
        if (confirm('Do you want to delete this page?'))
        {
            $.ajax({
                url: this.props.api + '/cms/page/' + this.props.pageId,
                type: "DELETE",
                contentType: 'application/json',
                data: JSON.stringify(page),
                success(data){
                    //console.log('delete !', data);
                },
                complete: () => {
                }
            });            
            alert('Page '+page.pageId+' has been removed.');
            window.location = this.props.baseUrl;
        }        
    },

    render(){
        return (
            <div style={{paddingLeft: 15, paddingRight: 15, minHeight: 300}}>
                <h3>
                    {this.renderButtons()}
                    Page Editor - {this.props.pageId}
                </h3>
                {this.renderPage()}
            </div>
        );
    },

    renderPage(){
        var page = this.state.page;
        switch(this.getMode()){
            case "preview": return <CmsMasterPage {...this.props} page={page} />;
            case "source":  {
                CmsAdmin.removeIds(page);
                return <CmsEditPageSource {...this.props} page={page} onChange={this.onChange} />;
            }
            case "wysiwyg": return <CmsMasterPage {...this.props} page={page} editing />;
            default: console.warn("unknown mode", this.state.mode); return undefined;
        }
    },

    renderButtons(){
        return (
            <div style={{float: 'right'}}>
                <ButtonToolbar>
                    <ButtonGroup bsSize="sm">
                        {this.renderModeButton("source", "edit", "Source")}
                        {this.renderModeButton("wysiwyg", "th", "Editor")}
                        {this.renderModeButton("preview", "newspaper-o", "Preview")}
                    </ButtonGroup>
                    <ButtonGroup bsSize="sm">
                        <Button icon="sign-out" href={this.getPageUrl()}>Exit</Button>
                        <SaveButton onClick={this.save} icon="check" saving={this.state.saving}>Apply</SaveButton>
                        <SaveButton onClick={this.saveAndExit} saving={this.state.saving}>Save</SaveButton>
                        <SaveButton onClick={this.deletePage} icon="remove">Delete</SaveButton>
                    </ButtonGroup>
                </ButtonToolbar>
            </div>
        );
    },

    renderModeButton(mode, icon, label){
        const path = this.context.location.pathname;
        const active = this.getMode() === mode;
        return <Button icon={icon} active={active} to={path} query={{mode: mode}}>{label}</Button>;
    }
});

module.exports = {
    CmsEditPage
}