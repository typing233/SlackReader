const SITE_RULES = {
  'read.qidian.com': {
    name: '起点中文网',
    contentSelector: '.read-content .text-wrap, .main-text-wrap .content, #chapterContent',
    titleSelector: '.text-head h1, .main-text-wrap h1, .j_chapterName',
    removeSelectors: [
      '.admire-wrap', '.chapter-comment', '.review-wrap',
      '.sidebar', '.float-btn', '.recommend-wrap',
      '#authorSpeak498498', '.chapter-review', 'ins.adsbygoogle'
    ]
  },
  'vipreader.qidian.com': {
    name: '起点VIP',
    contentSelector: '.read-content .text-wrap, #chapterContent',
    titleSelector: '.text-head h1, .j_chapterName',
    removeSelectors: ['.admire-wrap', '.chapter-comment', '.sidebar', '.float-btn']
  },
  'fanqienovel.com': {
    name: '番茄小说',
    contentSelector: '.muye-reader-content-inner, .chapter-content, [class*="readerContent"]',
    titleSelector: '.muye-reader-title, .chapter-title, [class*="readerTitle"]',
    removeSelectors: [
      '.comment-area', '.recommend-area', '.floating-bar',
      '[class*="comment"]', '[class*="recommend"]', '[class*="sidebar"]'
    ]
  },
  'www.jjwxc.net': {
    name: '晋江文学城',
    contentSelector: '.noveltext, #content, [itemprop="acticleBody"]',
    titleSelector: '.noveltext h2, .readsmall .noveltitle',
    removeSelectors: [
      '#favoritemark_box', '.readsmall .noveltitle ~ div:not(.noveltext)',
      '#bgcolor_item', '#fonttype_item', '.noveltitle ~ table',
      'script', '.ggad', '#extra'
    ]
  },
  'www.17k.com': {
    name: '17K小说网',
    contentSelector: '#chapterContent, .readArea .p',
    titleSelector: '.readAreaBox h1, #chapterName',
    removeSelectors: [
      '.chapter_text_ad', '#authorSay', '.readBottom',
      '.BookReader_Side', '.floatBar', '.chapter-comment-area'
    ]
  },
  'www.zongheng.com': {
    name: '纵横中文网',
    contentSelector: '.content, .reader_box .content',
    titleSelector: '.title_txtbox h1, .reader_box h1',
    removeSelectors: [
      '.chapter_ad', '.book_comment', '.recommend_box',
      '.side_bar', '.float_toolbar'
    ]
  },
  'book.zongheng.com': {
    name: '纵横阅读',
    contentSelector: '.content, .reader_box .content',
    titleSelector: '.title_txtbox h1, .reader_box h1',
    removeSelectors: ['.chapter_ad', '.book_comment', '.side_bar']
  },
  'www.ciweimao.com': {
    name: '刺猬猫',
    contentSelector: '#J_BookRead, .chapter-entity, .read-content',
    titleSelector: '.chapter-title h1, .read-title',
    removeSelectors: [
      '.chapter-comment', '.chapter-share', '.sidebar',
      '.float-tools', '.chapter-recommend'
    ]
  },
  'www.69shu.com': {
    name: '69书吧',
    contentSelector: '.txtnav, #htmlContent, .yd_text2',
    titleSelector: '.txtnav h1, .yd_text1 h1',
    removeSelectors: ['.bottem', '.topnav', '.bottomad', 'ins', '.ads']
  },
  'www.biquge.com.cn': {
    name: '笔趣阁',
    contentSelector: '#content, #booktext, .content_read #content',
    titleSelector: '.bookname h1, .content_read h1',
    removeSelectors: [
      '.bottem1', '.bottem2', '.read_nav', '#HMcoup498435',
      '.kongmark', 'ins.adsbygoogle', 'script', '.ads'
    ]
  },
  'www.xbiquge.so': {
    name: '新笔趣阁',
    contentSelector: '#content, #booktext',
    titleSelector: '.bookname h1, .content_read h1',
    removeSelectors: ['.bottem1', '.bottem2', '.read_nav', 'ins', '.ads', 'script']
  },
  'www.xbiquge.bz': {
    name: '笔趣阁BZ',
    contentSelector: '#content, #booktext',
    titleSelector: '.bookname h1',
    removeSelectors: ['.bottem1', '.bottem2', '.read_nav', 'ins', '.ads']
  },
  'www.biquge5200.com': {
    name: '笔趣阁5200',
    contentSelector: '#content, #htmlContent',
    titleSelector: '.bookname h1, h1.wap_none',
    removeSelectors: ['.bottem1', '.bottem2', '.read_nav', 'ins', '.ads']
  },
  'www.52bqg.org': {
    name: '52笔趣阁',
    contentSelector: '#content, #htmlContent',
    titleSelector: '.bookname h1',
    removeSelectors: ['.bottem1', '.bottem2', '.read_nav', 'ins']
  },
  'www.biqugeu.net': {
    name: '笔趣阁EU',
    contentSelector: '#content, #booktext',
    titleSelector: '.bookname h1',
    removeSelectors: ['.bottem1', '.bottem2', '.read_nav', 'ins']
  },
  'www.txtwu.com': {
    name: 'TXT屋',
    contentSelector: '#content, .chapter_content',
    titleSelector: 'h1, .chapter_title',
    removeSelectors: ['.nav', '.sidebar', 'ins', '.ads', '.footer']
  },
  'www.shuqi.com': {
    name: '书旗小说',
    contentSelector: '.read-content, .chapter-content, .article-content',
    titleSelector: '.chapter-name, .read-title',
    removeSelectors: ['.comment-area', '.sidebar', '.float-bar', '.ad-wrap']
  },
  'www.hetushu.com': {
    name: '和图书',
    contentSelector: '#content, .book_content',
    titleSelector: 'h2, .book_title',
    removeSelectors: ['.nav', '.sidebar', '.ad', '.footer', 'ins']
  }
};

function getSiteRule() {
  const hostname = window.location.hostname;
  for (const [domain, rule] of Object.entries(SITE_RULES)) {
    if (hostname === domain || hostname.endsWith('.' + domain)) {
      return rule;
    }
  }
  return null;
}
