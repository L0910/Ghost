/**
 * 开源个人博客系统 - 自定义主题脚本
 * 包含：搜索弹窗、导航交互、文章目录、回到顶部等功能
 */
(function () {
    'use strict';

    var searchModal = null, searchInput = null, searchResults = null, searchSuggestions = null, isSearchOpen = false;

    function initSearch() {
        searchModal = document.getElementById('search-modal');
        searchInput = document.getElementById('search-input');
        searchResults = document.getElementById('search-results');
        searchSuggestions = document.getElementById('search-suggestions');
        if (!searchModal) return;
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isSearchOpen) toggleSearch();
        });
        if (searchInput) {
            searchInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    var first = searchResults.querySelector('.search-result-item');
                    if (first) window.location.href = first.href;
                }
            });
        }
    }

    window.toggleSearch = function () {
        if (!searchModal) return;
        isSearchOpen = !isSearchOpen;
        if (isSearchOpen) {
            searchModal.hidden = false;
            document.body.style.overflow = 'hidden';
            setTimeout(function () { if (searchInput) searchInput.focus(); }, 100);
        } else {
            searchModal.hidden = true;
            document.body.style.overflow = '';
            if (searchInput) searchInput.value = '';
            if (searchResults) searchResults.innerHTML = '';
            if (searchSuggestions) searchSuggestions.style.display = 'block';
        }
    };

    window.performSearch = function (query) {
        if (!searchResults || !searchSuggestions) return;
        var q = query.trim();
        if (q.length === 0) {
            searchResults.innerHTML = '';
            searchSuggestions.style.display = 'block';
            return;
        }
        searchSuggestions.style.display = 'none';
        searchResults.innerHTML = '<div style="padding:30px;text-align:center;color:#9aa3ad;">搜索中...</div>';
        var url = '/ghost/api/content/posts/?search=' + encodeURIComponent(q) + '&limit=10&include=tags,authors&fields=id,title,slug,excerpt,feature_image,published_at,url';
        fetch(url)
            .then(function (r) { if (!r.ok) throw new Error('fail'); return r.json(); })
            .then(function (data) { renderResults(data.posts || [], q); })
            .catch(function () { renderError(); });
    };

    function renderResults(posts, query) {
        if (!posts || posts.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results"><div class="search-no-results-title">未找到相关文章</div><div class="search-no-results-suggestion">试试其他关键词，或查看热门标签</div></div>';
            return;
        }
        var html = '';
        posts.forEach(function (post) {
            var title = highlight(post.title || '', query);
            var excerpt = highlight(post.excerpt || '', query);
            var date = post.published_at ? new Date(post.published_at).toLocaleDateString('zh-CN') : '';
            var author = post.authors && post.authors.length > 0 ? post.authors[0].name : '';
            var tag = post.tags && post.tags.length > 0 ? post.tags[0].name : '';
            html += '<a href="' + (post.url || '/') + '" class="search-result-item"><div class="search-result-title">' + title + '</div><div class="search-result-excerpt">' + excerpt + '</div><div class="search-result-meta">' + (tag ? '<span>' + tag + '</span>' : '') + (author ? '<span>' + author + '</span>' : '') + (date ? '<span>' + date + '</span>' : '') + '</div></a>';
        });
        searchResults.innerHTML = html;
    }

    function renderError() {
        searchResults.innerHTML = '<div class="search-no-results"><div class="search-no-results-title">搜索服务暂时不可用</div><div class="search-no-results-suggestion">请稍后重试，或使用标签浏览文章</div></div>';
    }

    function highlight(text, query) {
        if (!text || !query) return text;
        var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return text.replace(new RegExp('(' + escaped + ')', 'gi'), '<mark class="search-highlight">$1</mark>');
    }

    function initBackToTop() {
        var btn = document.createElement('button');
        btn.type = 'button'; btn.className = 'back-to-top'; btn.setAttribute('aria-label', '回到顶部'); btn.innerHTML = '↑';
        btn.style.cssText = 'position:fixed;bottom:30px;right:30px;width:48px;height:48px;border-radius:50%;background:#15171A;color:#fff;border:none;font-size:20px;cursor:pointer;opacity:0;visibility:hidden;transition:all 0.3s ease;box-shadow:0 4px 12px rgba(0,0,0,0.2);z-index:999;';
        document.body.appendChild(btn);
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) { btn.style.opacity = '1'; btn.style.visibility = 'visible'; }
            else { btn.style.opacity = '0'; btn.style.visibility = 'hidden'; }
        }, { passive: true });
        btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    function initTOC() {
        var content = document.querySelector('.post-content');
        if (!content) return;
        var headings = content.querySelectorAll('h2, h3');
        if (headings.length < 3) return;
        var toc = document.createElement('nav');
        toc.className = 'table-of-contents'; toc.setAttribute('aria-label', '文章目录');
        var title = document.createElement('h4'); title.textContent = '目录'; toc.appendChild(title);
        var list = document.createElement('ul'); list.className = 'toc-list';
        headings.forEach(function (h, i) {
            h.id = 'heading-' + i;
            var item = document.createElement('li'); item.className = 'toc-item toc-level-' + h.tagName.toLowerCase();
            var link = document.createElement('a'); link.href = '#' + h.id; link.textContent = h.textContent; link.className = 'toc-link';
            item.appendChild(link); list.appendChild(item);
        });
        toc.appendChild(list);
        content.insertBefore(toc, content.firstChild);
        list.addEventListener('click', function (e) {
            if (e.target.classList.contains('toc-link')) {
                e.preventDefault();
                var t = document.getElementById(e.target.getAttribute('href').substring(1));
                if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initSearch();
        initBackToTop();
        initTOC();
        console.log('%c开源个人博客系统 - 自定义主题已加载', 'color:#15171A;font-weight:bold;font-size:14px;');
    });
})();
