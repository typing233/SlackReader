(function() {
  'use strict';

  const rule = getSiteRule();
  if (!rule) return;

  const extractor = new ContentExtractor(rule);
  const disguise = new DisguiseManager();

  let extractedContent = null;
  let chapterTitle = null;

  function doExtract() {
    const result = extractor.extract();
    if (result) {
      extractedContent = result.content;
      chapterTitle = result.title;
    }
  }

  function handleKeydown(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'H') {
      e.preventDefault();
      e.stopPropagation();

      if (disguise.isActive) {
        disguise.deactivate();
      } else {
        if (!extractedContent) doExtract();
        if (extractedContent) {
          chrome.storage.local.get(['preferredSkin'], (result) => {
            const skin = result.preferredSkin || 'word';
            disguise.activate(skin, extractedContent, chapterTitle);
          });
        }
      }
    }
  }

  document.addEventListener('keydown', handleKeydown, true);

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === 'activate') {
      if (!extractedContent) doExtract();
      if (extractedContent) {
        disguise.activate(msg.skin, extractedContent, chapterTitle);
        sendResponse({ success: true });
      } else {
        sendResponse({ success: false, error: '无法提取正文内容' });
      }
    } else if (msg.action === 'deactivate') {
      disguise.deactivate();
      sendResponse({ success: true });
    } else if (msg.action === 'getStatus') {
      sendResponse({
        isActive: disguise.isActive,
        currentSkin: disguise.currentSkin,
        siteName: rule.name,
        hasContent: !!extractedContent
      });
    }
    return true;
  });

  setTimeout(doExtract, 1000);
})();
