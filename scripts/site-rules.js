const SITE_RULES = {
  'read.qidian.com': {
    name: '起点中文网',
    contentSelector: 'main, .read-content .text-wrap, #j_chapterContent',
    titleSelector: 'h1.title, .text-head h1, .j_chapterName',
    removeSelectors: [
      'span.review', '#r-authorSay', 'a.avatar',
      '.admire-wrap', '.chapter-comment', '.review-wrap',
      '.sidebar', '.float-btn', '.recommend-wrap',
      '.chapter-review', '.fan-footer', '.vip-limit-wrap',
      '.chapter-nav', '.tool-bar', 'ins.adsbygoogle',
      '.chapter-head-above', '.chapter-head-below'
    ]
  },
  'vipreader.qidian.com': {
    name: '起点VIP',
    contentSelector: 'main, .read-content .text-wrap, #j_chapterContent',
    titleSelector: 'h1.title, .text-head h1, .j_chapterName',
    removeSelectors: [
      'span.review', '#r-authorSay', 'a.avatar',
      '.admire-wrap', '.chapter-comment', '.sidebar',
      '.float-btn', '.fan-footer', '.vip-limit-wrap',
      '.chapter-nav', '.tool-bar'
    ]
  },
  'fanqienovel.com': {
    name: '番茄小说',
    contentSelector: '.muye-reader-content, .muye-reader-content-inner, [class*="readerContent"]',
    titleSelector: '.muye-reader-title, [class*="readerTitle"], h1[class*="title"]',
    removeSelectors: [
      '[class*="comment"]', '[class*="recommend"]', '[class*="sidebar"]',
      '[class*="toolbar"]', '[class*="float"]', '[class*="footer"]',
      '[class*="header"]', '[class*="nav"]', '[class*="barrage"]',
      '[class*="gift"]', '[class*="interact"]', '[class*="Chapter_"]'
    ]
  },
  'changdunovel.com': {
    name: '番茄(长读)',
    contentSelector: '.muye-reader-content, [class*="readerContent"]',
    titleSelector: '.muye-reader-title, [class*="readerTitle"]',
    removeSelectors: [
      '[class*="comment"]', '[class*="recommend"]', '[class*="sidebar"]',
      '[class*="toolbar"]', '[class*="float"]', '[class*="footer"]',
      '[class*="header"]', '[class*="nav"]'
    ]
  },
  'www.jjwxc.net': {
    name: '晋江文学城',
    contentSelector: 'div.noveltext, #paragraph_comment_content',
    titleSelector: 'div.noveltext h2, .readsmall h2',
    removeSelectors: [
      'div.noveltext h2', '#buy_content', '.danmu_total_str',
      '#note_danmu_wrapper', '.readsmall',
      '#bgcolor_item', '#fonttype_item', '#favoritemark_box',
      'hr', 'script', '.ggad', '#extra',
      '.noveltitle ~ table', '.noveltitle ~ div:not(.noveltext)',
      '[id*="google"]', 'ins', '.adsbygoogle'
    ]
  },
  'www.17k.com': {
    name: '17K小说网',
    contentSelector: '#readArea > .readAreaBox.content > .p, #readArea .readAreaBox .p, #chapterContent',
    titleSelector: '#readArea > .readAreaBox.content > h1, .readAreaBox h1, #chapterName',
    removeSelectors: [
      'p.copy', '#banner_content', 'div.qrcode',
      'div.chapter_text_ad', '#authorSay', '.readBottom',
      '.BookReader_Side', '.floatBar', '.chapter-comment-area',
      '.read_tools', '.sidebar', 'ins', '.ads'
    ]
  },
  'read.zongheng.com': {
    name: '纵横中文网',
    contentSelector: 'div.content, .reader_container .content, .chapter-content',
    titleSelector: '.title_txtbox h1, .reader_container h1, .chapter-title',
    removeSelectors: [
      '.chapter_ad', '.book_comment', '.recommend_box',
      '.side_bar', '.float_toolbar', '.chapter-nav',
      '.reader-tools', 'ins', '.ads', '.footer'
    ]
  },
  'www.zongheng.com': {
    name: '纵横中文网',
    contentSelector: 'div.content, .reader_container .content',
    titleSelector: '.title_txtbox h1, .reader_container h1',
    removeSelectors: [
      '.chapter_ad', '.book_comment', '.recommend_box',
      '.side_bar', '.float_toolbar', 'ins', '.ads'
    ]
  },
  'book.zongheng.com': {
    name: '纵横阅读',
    contentSelector: 'div.content, .reader_container .content',
    titleSelector: '.title_txtbox h1, .reader_container h1',
    removeSelectors: ['.chapter_ad', '.book_comment', '.side_bar', 'ins']
  },
  'www.ciweimao.com': {
    name: '刺猬猫',
    contentSelector: '#J_BookCnt, .chapter.chapter-entity, .read-content .chapter',
    titleSelector: '.chapter-title, .read-title, #J_BookCnt h1',
    removeSelectors: [
      '.chapter.author_say', '#J_BookCnt .chapter span',
      '.chapter-comment', '.chapter-share', '.sidebar',
      '.float-tools', '.chapter-recommend', '.login-info',
      'ins', '.ads', '.chapter-nav'
    ]
  },
  'www.69shuba.com': {
    name: '69书吧',
    contentSelector: '.txtnav, #htmlContent, .yd_text2',
    titleSelector: '.txtnav h1, .yd_text1 h1, h1',
    removeSelectors: [
      '.bottem', '.topnav', '.bottomad', 'ins', '.ads',
      '.txtinfo', '.hide', 'script', '#txtright',
      '.ads_txt', '.footer', '.header', 'a[href*="bookmark"]'
    ]
  },
  'www.69shu.com': {
    name: '69书吧(旧)',
    contentSelector: '.txtnav, #htmlContent, .yd_text2',
    titleSelector: '.txtnav h1, .yd_text1 h1, h1',
    removeSelectors: [
      '.bottem', '.topnav', '.bottomad', 'ins', '.ads',
      '.txtinfo', 'script', '#txtright', '.footer'
    ]
  },
  'www.biquge.com.cn': {
    name: '笔趣阁',
    contentSelector: '#content, #booktext',
    titleSelector: '.bookname h1, .content_read h1, h1',
    removeSelectors: [
      '.bottem1', '.bottem2', '.read_nav', '.kongmark',
      'ins.adsbygoogle', 'script', '.ads', 'div[align="center"]',
      'a[href*="javascript"]', '.readinline', '.chapter_nav'
    ]
  },
  'www.xbiquge.so': {
    name: '新笔趣阁',
    contentSelector: '#content, #booktext',
    titleSelector: '.bookname h1, .content_read h1',
    removeSelectors: [
      '.bottem1', '.bottem2', '.read_nav', 'ins', '.ads',
      'script', 'div[align="center"]', '.chapter_nav'
    ]
  },
  'www.xbiquge.bz': {
    name: '笔趣阁BZ',
    contentSelector: '#content, #booktext',
    titleSelector: '.bookname h1, h1',
    removeSelectors: ['.bottem1', '.bottem2', '.read_nav', 'ins', '.ads', 'script']
  },
  'www.biquge5200.com': {
    name: '笔趣阁5200',
    contentSelector: '#content, #htmlContent, #booktext',
    titleSelector: '.bookname h1, h1.wap_none, .content_read h1',
    removeSelectors: [
      '.bottem1', '.bottem2', '.read_nav', 'ins', '.ads',
      'script', 'div[align="center"]', 'a[href*="javascript"]'
    ]
  },
  'www.52bqg.org': {
    name: '52笔趣阁',
    contentSelector: '#content, #htmlContent, #booktext',
    titleSelector: '.bookname h1, h1',
    removeSelectors: ['.bottem1', '.bottem2', '.read_nav', 'ins', 'script', '.ads']
  },
  'www.biqugeu.net': {
    name: '笔趣阁EU',
    contentSelector: '#content, #booktext',
    titleSelector: '.bookname h1, h1',
    removeSelectors: ['.bottem1', '.bottem2', '.read_nav', 'ins', 'script', '.ads']
  },
  'www.hetushu.com': {
    name: '和图书',
    contentSelector: '#content, .book_content, #booktxt',
    titleSelector: 'h2, .book_title, h1',
    removeSelectors: [
      '.nav', '.sidebar', '.ad', '.footer', 'ins',
      '.header', 'script', '.pagebar'
    ]
  },
  'www.shuqi.com': {
    name: '书旗小说',
    contentSelector: '.read-content, .chapter-content, .article-content',
    titleSelector: '.chapter-name, .read-title, h1',
    removeSelectors: [
      '.comment-area', '.sidebar', '.float-bar', '.ad-wrap',
      '.recommend', '.nav', '.footer', 'ins'
    ]
  },
  'www.txtwu.com': {
    name: 'TXT屋',
    contentSelector: '#content, .chapter_content, #booktext',
    titleSelector: 'h1, .chapter_title, .bookname h1',
    removeSelectors: ['.nav', '.sidebar', 'ins', '.ads', '.footer', 'script']
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
