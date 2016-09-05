var PorterRender = {
    getParameterByName: function(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    displayError: function(message) {
        $("#markdown-rendered").html("<br><br><center><h1>Cool, you discovered a glitch.</h1><h2>There was a problem loading this article.</h2><p>Head back to the Learn section to find the article again. If this problem persists, contact us at the email address in the footer.</p><p><small><i>" + message + "</i></small></p></center><br><br>");
    },
    articleMap: {
        "1000": "../content/test.md",
        "2000": "../content/frontend/2000intro.md"
    },
    loadArticle: function (theID) {
        if (theID in this.articleMap) {
            $.ajax({
                url: PorterRender.articleMap[theID],
                success: function(result) {
                    var conv = new showdown.Converter({
                        strikethrough: true,
                        tasklists: true,
                        tables: true
                    });
                    $("#markdown-rendered").html(conv.makeHtml(result)).promise().done(function(){
                        $('pre code').each(function(i, e) {
                            hljs.highlightBlock(e);
                        }); 
                    });
                },
                error: function (xhr, textStatus, thrownError) {
                        PorterRender.displayError(thrownError);
                    }
            });
        } else {
            this.displayError("Article not found.");
        }
    }
};
$(document).ready(function () {
    var docID = PorterRender.getParameterByName("d");
    if (docID !== null) {
        PorterRender.loadArticle(docID);
    } else {
        PorterRender.displayError("No parameter found.");
    }
});