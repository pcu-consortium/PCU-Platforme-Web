function selectText(node) {
    var doc = document
        , range, selection
    ;    
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function cleanPastedHTML(input) {
  // 1. remove line breaks / Mso classes
  var stringStripper = /(\n|\r| class=(")?Mso[a-zA-Z]+(")?)/g;
  var output = input.replace(stringStripper, ' ');
  // 2. strip Word generated HTML comments
  var commentSripper = new RegExp('<!--(.*?)-->','g');
  var output = output.replace(commentSripper, '');
  var tagStripper = new RegExp('<(/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>','gi');
  // 3. remove tags leave content if any
  output = output.replace(tagStripper, '');
  // 4. Remove everything in between and including tags '<style(.)style(.)>'
  var badTags = ['style', 'script','applet','embed','noframes','noscript'];

  for (var i=0; i< badTags.length; i++) {
    tagStripper = new RegExp('<'+badTags[i]+'.*?'+badTags[i]+'(.*?)>', 'gi');
    output = output.replace(tagStripper, '');
  }
  // 5. remove attributes ' style="..."'
  var badAttributes = ['style', 'start'];
  for (var i=0; i< badAttributes.length; i++) {
    var attributeStripper = new RegExp(' ' + badAttributes[i] + '="(.*?)"','gi');
    output = output.replace(attributeStripper, '');
  }
  return output;
}




var WysiwygEditor = React.createClass({

    getInitialState(){
        return {
            isSummernoteLoaded: false
        }
    },

    getDefaultProps: function() {
        return {
            // height: 200,
            airMode: false
        };
    },

    initSummernote: function(){
        if (!this.isMounted()){
            return;
        }
        var node = $(this.refs.innerNode);
        node.summernote({
            height: this.props.height,   //set editable area's height
            airMode: this.props.airMode,
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'clear']],
                // ['fontname', ['fontname']],
                // ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                //['height', ['height']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'hr']],
                //['view', ['fullscreen', 'codeview']],
                ['help', ['help']]
            ],

            // onpaste: e => {
            //     console.log('onPaste !!');
            //     var updatePastedText = function(node){
            //         var original = node.code();
            //         var cleaned = cleanPastedHTML(original); //this is where to call whatever clean function you want. I have mine in a different file, called CleanPastedHTML.
            //         console.log('original', original)
            //         console.log('cleaned', cleaned)
            //         node.code('').html(cleaned); //this sets the displayed content editor to the cleaned pasted code.
            //     };
            //     setTimeout(function () {
            //         //this kinda sucks, but if you don't do a setTimeout, 
            //         //the function is called before the text is really pasted.
            //         updatePastedText(node);
            //     }, 10);
            // }
        });
        node.on('summernote.paste', function (customEvent, nativeEvent) {
            setTimeout(function () {
                selectText($('.note-editable')[0]);
                node.summernote("removeFormat");
            }, 100);
        });
        if (this.props.html){
            node.code(this.props.html);
        }
    },

    componentDidMount() {
        window.CoreMirror = {}; // TODO : clean fix for summernote...
        require.ensure([], () => {
            require('../../../public/stylesheets/summernote/summernote.css');
            require('../../../public/stylesheets/summernote/summernote-bs3.css');
            require('./summernote.min.js');
            if (!this.isMounted()){
                return;
            }
            this.setState({isSummernoteLoaded: true});
            this.initSummernote();
        }, "summernote");
    },

    shouldComponentUpdate: function(nextProps){
        // TODO: check other conditions (height, etc.)
        if (nextProps.html == this.props.html){
            return false;
        }
        if (this.state.isSummernoteLoaded){
            $(this.refs.innerNode).destroy();
        }
        return true;
    },

    componentDidUpdate: function(props, state){
        if (this.state.isSummernoteLoaded){
            this.initSummernote();
        }
    },

    getValue: function(){
        return $(this.refs.innerNode).code();
    },

    //save: function(){
    //    console.log($(this.refs.innerNode).code());
    //},

    render: function() {
        return (
            <div>
                <div ref="innerNode"></div>
            </div>
        )
    }
});

window.WysiwygEditor = WysiwygEditor;

module.exports = WysiwygEditor;