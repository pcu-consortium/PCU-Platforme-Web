
import { CmsAdmin, CmsMenu, CmsFooter } from './cms-layout';
import { CmsMasterPage } from './cms-master-page';
import { SearchBox } from 'components/search/search-box';

var CmsPageWrapper = React.createClass({

    getInitialState() {
        return {
            editing: false
        }
    },

    getDefaultProps(){
        return {
            editable: true
        }
    },

    edit() {
        this.setState({ editing: true });
    },

    save() {
        CmsAdmin.savePage(() => this.setState({ editing: false }));
    },

    render(){
        return (
            <div>
                {this.renderEditButtons()}
                <CmsMasterPage {...this.props} editing={this.state.editing} />
            </div>
        )
    },

    renderEditButtons(){
        if (!this.props.editable){
            return undefined;
        }

        var page = this.props.page;
        var pageUrl = 'page/' + page.pageId;
        if (this.state.editing){
            return (
                <div style={{float: 'right'}}>
                    <ButtonGroup bsSize="sm">
                        <Button glyph="remove" href={pageUrl}>cancel</Button>
                        <Button glyph="floppy-disk" handleClick={this.save}>save</Button>
                    </ButtonGroup>
                </div>
            );
        }
        return undefined;
        // var href = this.props.baseUrl + 'admin/cms/page/' + this.props.page.pageId;
        // return (
        //     <ButtonGroup bsSize="sm">
        //         <Button icon="edit" href={href + "#/?mode=source"}>source</Button>
        //         <Button icon="th" href={href}>edit</Button>
        //     </ButtonGroup>
        // );
    }
});


var CmsApp = React.createClass({
    componentDidMount() {
        if (this.props.content && this.props.content.page){
            CmsAdmin.setPage(this.props.content.page);
        }
    },

    render () {
        return (
            <div className="cms-body">
                <CmsMenu menu={this.props.blocks.menu} site={this.props.site} baseUrl={this.props.baseUrl}  searchUrl={this.props.searchUrl} />
                <div style={{paddingLeft: 12, paddingRight: 12, minHeight: 300}}>
                    {this.renderCmsPage(this.props.content)}
                </div>
                <CmsFooter footer={this.props.blocks.footer} baseUrl={this.props.baseUrl} />
            </div>
        )
    },


    isUndefined (subject) {
        return typeof subject === 'undefined';
    },

    renderCmsPage (content) {
        return <CmsPageWrapper site={this.props.site} baseUrl={this.props.baseUrl} page={content.page} api={this.props.api} editable={true} />;
    }
});

window.CmsApp = CmsApp; // TODO : tmp fix, change jade layouts...

module.exports = {
  CmsApp
};

