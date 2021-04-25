import marked from 'marked';
import hljs from "highlight.js"; // 引入 highlight.js
import "highlight.js/styles/monokai-sublime.css"; // 引入高亮样式 这里我用的是sublime样式

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code) {
        return hljs.highlightAuto(code).value;
    },
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false
})
export function markdown (str) {
    // 代码高亮后没有背景色等样式，是因为pre标签没有hljs的class，所以手动添加
    return marked(str).replace(/<pre>/g, "<pre class='hljs'>");
}