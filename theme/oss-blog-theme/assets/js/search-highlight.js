/**
 * 搜索高亮模块 - 自主扩展功能
 * 从URL参数读取关键词，页面内高亮匹配文本，支持导航
 * 数据来源：URL参数 ?s= / ?search= / ?q=
 * 隐私影响：仅浏览器端处理，不发送数据到第三方
 */
(function () {
    'use strict';
    var keyword = '', matches = [], currentIndex = -1;
    var MAX_HIGHLIGHT = 500;

    function init() {
        var params = new URLSearchParams(window.location.search);
        keyword = params.get('s') || params.get('search') || params.get('q') || '';
        if (!keyword) return;
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', highlightPage);
        } else {
            highlightPage();
        }
    }

    function highlightPage() {
        var selectors = ['.post-content','.post-card-excerpt','.post-card-title',
            '.search-result-title','.search-result-excerpt','.related-post-title',
            '.recent-post-title','.post-excerpt','article'];
        matches = [];
        currentIndex = -1;
        selectors.forEach(function (sel) {
            document.querySelectorAll(sel).forEach(function (el) { highlightInElement(el); });
        });
        if (matches.length > 0) {
            addToolbar();
            navigate(1);
        } else {
            showNoMatch();
        }
    }

    function highlightInElement(element) {
        if (element.querySelector('.search-highlight')) return;
        var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                var p = node.parentElement;
                if (p && (p.tagName === 'SCRIPT' || p.tagName === 'STYLE' || p.isContentEditable))
                    return NodeFilter.FILTER_REJECT;
                if (p && p.classList && p.classList.contains('search-highlight'))
                    return NodeFilter.FILTER_REJECT;
                return node.nodeValue && node.nodeValue.trim().length > 0
                    ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
        });
        var textNodes = [], cur;
        while ((cur = walker.nextNode())) textNodes.push(cur);
        var escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        var regex = new RegExp('(' + escaped + ')', 'gi');
        textNodes.forEach(function (textNode) {
            var text = textNode.nodeValue;
            if (!regex.test(text)) return;
            regex.lastIndex = 0;
            var frag = document.createDocumentFragment();
            var last = 0, match;
            while ((match = regex.exec(text)) !== null) {
                if (match.index > last)
                    frag.appendChild(document.createTextNode(text.substring(last, match.index)));
                var mark = document.createElement('mark');
                mark.className = 'search-highlight';
                mark.textContent = match[0];
                frag.appendChild(mark);
                matches.push(mark);
                last = regex.lastIndex;
                if (matches.length >= MAX_HIGHLIGHT) break;
            }
            if (last < text.length)
                frag.appendChild(document.createTextNode(text.substring(last)));
            if (textNode.parentNode) textNode.parentNode.replaceChild(frag, textNode);
        });
    }

    function addToolbar() {
        if (document.getElementById('search-highlight-toolbar')) return;
        var toolbar = document.createElement('div');
        toolbar.id = 'search-highlight-toolbar';
        toolbar.innerHTML = '<div style="display:flex;align-items:center;gap:16px;max-width:1200px;margin:0 auto;">' +
            '<span style="font-size:14px;">搜索: <strong>' + escapeHtml(keyword) + '</strong></span>' +
            '<span id="highlight-count" style="font-size:13px;opacity:0.8;min-width:60px;">0 / ' + matches.length + '</span>' +
            '<div style="display:flex;gap:8px;margin-left:auto;">' +
            '<button id="hl-prev" style="width:32px;height:32px;border:1px solid rgba(255,255,255,0.3);background:transparent;color:#fff;border-radius:6px;cursor:pointer;">↑</button>' +
            '<button id="hl-next" style="width:32px;height:32px;border:1px solid rgba(255,255,255,0.3);background:transparent;color:#fff;border-radius:6px;cursor:pointer;">↓</button>' +
            '<button id="hl-close" style="width:32px;height:32px;border:1px solid rgba(255,255,255,0.3);background:transparent;color:#fff;border-radius:6px;cursor:pointer;">×</button>' +
            '</div></div>';
        toolbar.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:1001;background:#15171A;color:#fff;padding:10px 20px;box-shadow:0 2px 8px rgba(0,0,0,0.2);transform:translateY(-100%);transition:transform 0.3s ease;';
        var style = document.createElement('style');
        style.textContent = '.search-highlight-toolbar.show{transform:translateY(0)!important;}.search-highlight-current{background:#ffc107!important;color:#000!important;outline:2px solid #ff9800;}';
        document.head.appendChild(style);
        document.body.appendChild(toolbar);
        setTimeout(function () { toolbar.classList.add('show'); }, 100);
        document.getElementById('hl-prev').addEventListener('click', function () { navigate(-1); });
        document.getElementById('hl-next').addEventListener('click', function () { navigate(1); });
        document.getElementById('hl-close').addEventListener('click', function () {
            clearHighlights();
            toolbar.classList.remove('show');
            setTimeout(function () { toolbar.remove(); }, 300);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'F3' || (e.ctrlKey && e.key === 'g')) {
                e.preventDefault();
                navigate(e.shiftKey ? -1 : 1);
            }
            if (e.key === 'Escape') {
                var c = document.getElementById('hl-close');
                if (c) c.click();
            }
        });
    }

    function navigate(dir) {
        if (matches.length === 0) return;
        if (currentIndex >= 0 && matches[currentIndex])
            matches[currentIndex].classList.remove('search-highlight-current');
        currentIndex += dir;
        if (currentIndex >= matches.length) currentIndex = 0;
        else if (currentIndex < 0) currentIndex = matches.length - 1;
        var cur = matches[currentIndex];
        cur.classList.add('search-highlight-current');
        cur.scrollIntoView({ behavior: 'smooth', block: 'center' });
        var count = document.getElementById('highlight-count');
        if (count) count.textContent = (currentIndex + 1) + ' / ' + matches.length;
    }

    function clearHighlights() {
        document.querySelectorAll('.search-highlight').forEach(function (el) {
            var p = el.parentNode;
            if (p) { p.replaceChild(document.createTextNode(el.textContent), el); p.normalize(); }
        });
        matches = [];
        currentIndex = -1;
    }

    function showNoMatch() {
        var hint = document.createElement('div');
        hint.innerHTML = '<div style="padding:16px 20px;background:#fff3cd;border:1px solid #ffc107;border-radius:8px;margin:20px 0;color:#856404;font-size:14px;">未找到关键词 "<strong>' + escapeHtml(keyword) + '</strong>" 的匹配内容。建议：检查拼写、使用更短的关键词、或浏览标签页。</div>';
        var main = document.querySelector('.site-main') || document.querySelector('main');
        if (main) main.insertBefore(hint, main.firstChild);
    }

    function escapeHtml(str) {
        var d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    window.SearchHighlight = { init: init, navigate: navigate, clearHighlights: clearHighlights };
    init();
})();
