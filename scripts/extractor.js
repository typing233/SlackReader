class ContentExtractor {
  constructor(rule) {
    this.rule = rule;
  }

  extract() {
    if (!this.rule) return null;

    this.removeUnwantedElements();
    const title = this.getTitle();
    const content = this.getContent();

    return { content, title };
  }

  removeUnwantedElements() {
    const globalRemove = [
      'iframe', '.ad', '.ads', '.advertisement',
      '[id*="google_ads"]', '[class*="google_ad"]',
      '.popup', '.modal', '.overlay',
      '[style*="position: fixed"]', '[style*="position:fixed"]',
      '.floating', '.float-btn', '.back-to-top'
    ];

    const selectors = [...globalRemove, ...this.rule.removeSelectors];

    selectors.forEach(selector => {
      try {
        document.querySelectorAll(selector).forEach(el => {
          if (!el.closest('#nd-disguise-container')) {
            el.remove();
          }
        });
      } catch (e) {}
    });
  }

  getContent() {
    const selectors = this.rule.contentSelector.split(',').map(s => s.trim());
    for (const selector of selectors) {
      try {
        const el = document.querySelector(selector);
        if (el && el.textContent.trim().length > 100) {
          return this.cleanContent(el);
        }
      } catch (e) {}
    }
    return this.fallbackExtract();
  }

  getTitle() {
    const selectors = this.rule.titleSelector.split(',').map(s => s.trim());
    for (const selector of selectors) {
      try {
        const el = document.querySelector(selector);
        if (el && el.textContent.trim()) {
          return el.textContent.trim();
        }
      } catch (e) {}
    }
    return '';
  }

  cleanContent(element) {
    const clone = element.cloneNode(true);

    clone.querySelectorAll('script, style, ins, iframe, .ad, .ads, noscript').forEach(el => el.remove());
    clone.querySelectorAll('h1, h2, h3').forEach(el => el.remove());
    clone.querySelectorAll('a').forEach(a => {
      const text = a.textContent.trim();
      if (text.length < 30 && (a.href.includes('javascript') || this.isNavText(text))) {
        a.remove();
      }
    });

    let html = clone.innerHTML;
    html = html.replace(/<br\s*\/?>/gi, '\n');
    html = html.replace(/<\/p>/gi, '\n\n');
    html = html.replace(/<\/div>/gi, '\n');
    html = html.replace(/<[^>]+>/g, '');
    html = this.decodeEntities(html);
    html = html.replace(/\n{3,}/g, '\n\n');

    const lines = html.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .filter(line => !this.isAdText(line));

    return lines.join('\n\n');
  }

  decodeEntities(html) {
    return html
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n))
      .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
  }

  isNavText(text) {
    const navPatterns = [
      /^上一[章页篇]$/, /^下一[章页篇]$/, /^目录$/, /^返回$/,
      /^首页$/, /^书架$/, /^设置$/, /^加入书签$/
    ];
    return navPatterns.some(p => p.test(text));
  }

  isAdText(text) {
    const adPatterns = [
      /^[\s]*$/,
      /天才一秒/,
      /手机阅读/,
      /最新网址/,
      /百度搜索/,
      /请记住本站/,
      /一秒记住/,
      /收藏本站/,
      /推荐阅读/,
      /加入书签/,
      /最快更新/,
      /无弹窗/,
      /全文阅读/,
      /www\.[a-z]+\.(com|net|org|cc|la)/i,
      /http[s]?:\/\//i,
      /本站域名/,
      /请使用.*浏览器/,
      /本章未完.*点击下一页/,
      /亲.*本章还未完/,
      /笔趣阁.*最快/,
      /本文由.*首发/,
      /请勿转载/,
      /如果.*喜欢.*请收藏/,
      /尽在.*小说网/,
      /无限好文.*尽在晋江/,
      /谷[一-龥]{0,1}$/,
      /^\s*章节错误.*点此举报\s*$/,
      /^\s*上一[章页]\s*$/,
      /^\s*下一[章页]\s*$/,
      /^\s*目录\s*$/,
      /^\s*书签\s*$/,
      /^\s*返回目录\s*$/
    ];
    return adPatterns.some(p => p.test(text));
  }

  fallbackExtract() {
    const paragraphs = document.querySelectorAll('p');
    const texts = [];
    paragraphs.forEach(p => {
      const text = p.textContent.trim();
      if (text.length > 20 && !this.isAdText(text) && !this.isNavText(text)) {
        texts.push(text);
      }
    });

    if (texts.join('').length > 500) {
      return texts.join('\n\n');
    }

    const allText = document.body.innerText;
    const lines = allText.split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 15 && !this.isAdText(l) && !this.isNavText(l));
    return lines.join('\n\n');
  }
}
