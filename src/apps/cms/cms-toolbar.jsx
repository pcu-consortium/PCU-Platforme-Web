
var DefautWidgetImages = [
    {
        title: 'Une nouvelle Bugatti',
        img: 'http://files.armadillolab.fr/images/bugatti/1024.jpg',
        description: 'Design de la prochaine voiture de Bugatti...'
    },
    {
        title: 'Un magnifique étang au coeur de la France',
        img: 'http://files.armadillolab.fr/images/etang/1024.jpg',
        description: 'Idéal pour les fêtes...'
    },
    {
        title: 'Coup de pied spectaculaire',
        img: 'http://files.armadillolab.fr/images/soccer/1024.jpg',
        description: 'La photo du jour'
    },
    {

        title: 'Daltonien',
        img: 'http://colorvisiontesting.com/images/plate%20with%205.jpg',
        description: 'Rien de spécial'
    }
];



var CmsToolbar = function() {

    var cache = {};

    var getToolbar = function(site){
        if (cache[site]){
            return cache[site];
        }
        var searchUrl = '/' + site + '/search?q=';
        var rssUrl = 'http://campusaar.hypotheses.org/category/actualites-news/feed';

        var widgets = [
            "Html",
            {name: 'CMS', icon: 'tasks', children: [
                'Sitemap',
                'TOC',
                {name: 'Rss', widget: {type: 'Rss', title: 'Flux RSS', url: rssUrl}},
                "Blockquote",
                {name: 'Subjects', icon: 'code-fork', widget: {type: 'Subjects', rootId: null}},
                "PictureText",
                "PDF",
                "Video",
                "SubPage",
                "MarkerMap",
                "ImageTimeline",
            ]},
            {name: 'Search', icon: 'search', children:[
                {name: 'SearchBox', widget: {type: 'SearchBox', url:searchUrl, justified: true, autoRefreshValue: true}},
                "SearchFacet",
                "SearchResults",
            ]},
            {name: 'CampusAAR', icon: 'sitemap', children:[
                "Subjects",
                "Glossary",
                "AudioVisual",
                "AnalysisTypes",
                "Classification",
                "SearchFacet",
                "Roles",
                "Traduction",
                "Discours",
                "Usage"
            ]},
            //{name: 'Image', icon: 'picture', children: [

            //]},
            {name: 'Columns', icon: 'columns', children: [
                {name: 'left (30-70)', icon: 'columns', widget: {type: 'Columns', children: [
                    {type: 'Column', width: '30%', children: []},
                    {type: 'Column', width: '70%', children: []}
                ]}},
                {name: 'split (50-50)', icon: 'columns', widget: {type: 'Columns', children: [
                    {type: 'Column', width: '50%', children: []},
                    {type: 'Column', width: '50%', children: []}
                ]}},
                {name: 'right (70-30)', icon: 'columns', widget: {type: 'Columns', children: [
                    {type: 'Column', width: '70%', children: []},
                    {type: 'Column', width: '30%', children: []}
                ]}},
                {name: 'triple (25-50-25)', icon: 'columns', widget: {type: 'Columns', children: [
                    {type: 'Column', width: '25%', children: []},
                    {type: 'Column', width: '50%', children: []},
                    {type: 'Column', width: '25%', children: []}
                ]}},
            ]},
            {name: 'Layout', icon: 'folder', children:[
                "Tabs",
                "Section"
            ]}
        ];

        if ((site === 'test') || (site === 'psa')){
            // Insert special test widgets
            widgets.splice(10, 0,
                {name: 'Image', icon: 'picture-o', widget: {type: 'Image', width:'100%', src: 'http://answersafrica.com/wp-content/uploads/2013/07/armadillo.jpg'}},
                "ImageGrid",
                {name: 'Carousel', icon: 'laptop', widget: {type: 'Carousel', items: DefautWidgetImages}},
                "Video",
                "FeatureList",
                "Features",
                {name: 'Bubbles', icon: 'spinner', widget: {type: 'Bubbles', items: DefautWidgetImages, gridSize: 4}},
                "TextBubbles",
                "IconWithText",
                "PDF",
                "Vocab",
                "VocabApp"
            );
        }

        cache[site] = widgets;

        return widgets;
    };

    return {
        getToolbar: getToolbar
    }
}();

module.exports = {
    CmsToolbar
}