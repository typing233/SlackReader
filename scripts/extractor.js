class ContentExtractor {
  constructor(rule) {
    this.rule = rule;
  }

  extract() {
    if (!this.rule) return null;

    this.removeUnwantedElements();
    const content = this.getContent();
    const title = this.getTitle();

    return { content, title };
  }

  removeUnwantedElements() {
    const globalRemove = [
      'iframe', '.ad', '.ads', '.advertisement',
      '[id*="ad_"]', '[class*="ad_"]', '[id*="google"]',
      '.popup', '.modal', '.overlay', '.float',
      '[style*="position: fixed"]', '[style*="position:fixed"]'
    ];

    const selectors = [...globalRemove, ...this.rule.removeSelectors];

    selectors.forEach(selector => {
      try {
        document.querySelectorAll(selector).forEach(el => {
          if (!el.closest('#nd-disguise-container')) {
            el.style.display = 'none';
          }
        });
      } catch (e) {}
    });
  }

  getContent() {
    const selectors = this.rule.contentSelector.split(',').map(s => s.trim());
    for (const selector of selectors) {
      const el = document.querySelector(selector);
      if (el && el.textContent.trim().length > 100) {
        return this.cleanContent(el);
      }
    }
    return this.fallbackExtract();
  }

  getTitle() {
    const selectors = this.rule.titleSelector.split(',').map(s => s.trim());
    for (const selector of selectors) {
      const el = document.querySelector(selector);
      if (el && el.textContent.trim()) {
        return el.textContent.trim();
      }
    }
    return document.title;
  }

  cleanContent(element) {
    const clone = element.cloneNode(true);

    clone.querySelectorAll('script, style, ins, iframe, .ad, .ads').forEach(el => el.remove());

    let html = clone.innerHTML;
    html = html.replace(/<br\s*\/?>/gi, '\n');
    html = html.replace(/<\/p>/gi, '\n\n');
    html = html.replace(/<[^>]+>/g, '');
    html = html.replace(/&nbsp;/g, ' ');
    html = html.replace(/&lt;/g, '<');
    html = html.replace(/&gt;/g, '>');
    html = html.replace(/&amp;/g, '&');
    html = html.replace(/\n{3,}/g, '\n\n');

    const lines = html.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .filter(line => !this.isAdText(line));

    return lines.join('\n\n');
  }

  isAdText(text) {
    const adPatterns = [
      /^[\s]*$/,
      /天才一秒/,
      /手机阅读/,
      /最新网址/,
      /百度搜索/,
      /请记住本站/,
      /www\.[a-z]+\.(com|net|org)/i,
      /最快更新/,
      /一秒记住/,
      /收藏本站/,
      /推荐阅读/,
      /加入书签/
    ];
    return adPatterns.some(p => p.test(text));
  }

  fallbackExtract() {
    const paragraphs = document.querySelectorAll('p');
    const texts = [];
    paragraphs.forEach(p => {
      const text = p.textContent.trim();
      if (text.length > 20 && !this.isAdText(text)) {
        texts.push(text);
      }
    });

    if (texts.join('').length > 500) {
      return texts.join('\n\n');
    }

    const allText = document.body.innerText;
    const lines = allText.split('\n').filter(l => l.trim().length > 20 && !this.isAdText(l));
    return lines.join('\n\n');
  }
}
