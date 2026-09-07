/**
 * 开源个人博客系统 - 自定义主题脚本 v2.0.0
 * 包含：搜索弹窗、文章目录、回到顶部等功能
 */
(function () {
    'use strict';

    var searchModal = null, searchInput = null, isSearchOpen = false;

    function initSearch() {
        searchModal = document.getElementById('search-modal');
        searchInput = document.getElementById('search-input');
        if (!searchModal) return;
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isSearchOpen) toggleSearch();
        });
        if (searchInput) {
            searchInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    doSearch();
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
        }
    };

    function doSearch() {
        if (!searchInput) return;
        var q = searchInput.value.trim();
        if (q.length === 0) return;
        // 跳转到Ghost搜索结果页
        window.location.href = '/?s=' + encodeURIComponent(q);
    }

    window.performSearch = function (query) {
        // 实时输入时不跳转，按回车才跳转
        // 这里可以添加搜索建议等功能
    };

    function initBackToTop() {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'back-to-top';
        btn.setAttribute('aria-label', '回到顶部');
        btn.innerHTML = '↑';
        document.body.appendChild(btn);
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                btn.style.opacity = '1';
                btn.style.visibility = 'visible';
            } else {
                btn.style.opacity = '0';
                btn.style.visibility = 'hidden';
            }
        }, { passive: true });
        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function initTOC() {
        var content = document.querySelector('.post-content');
        if (!content) return;
        var headings = content.querySelectorAll('h2, h3');
        if (headings.length < 3) return;
        var toc = document.createElement('nav');
        toc.className = 'table-of-contents';
        toc.setAttribute('aria-label', '文章目录');
        var title = document.createElement('h4');
        title.textContent = '目录';
        toc.appendChild(title);
        var list = document.createElement('ul');
        list.className = 'toc-list';
        headings.forEach(function (h, i) {
            h.id = 'heading-' + i;
            var item = document.createElement('li');
            item.className = 'toc-item toc-level-' + h.tagName.toLowerCase();
            var link = document.createElement('a');
            link.href = '#' + h.id;
            link.textContent = h.textContent;
            link.className = 'toc-link';
            item.appendChild(link);
            list.appendChild(item);
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
        console.log('%c开源个人博客系统 - 自定义主题 v2.0.0 已加载', 'color:#15171A;font-weight:bold;font-size:14px;');
    });
})();
