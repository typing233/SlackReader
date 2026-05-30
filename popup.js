document.addEventListener('DOMContentLoaded', () => {
  const btnWord = document.getElementById('btnWord');
  const btnExcel = document.getElementById('btnExcel');
  const btnRestore = document.getElementById('btnRestore');
  const statusEl = document.getElementById('status');
  const siteNameEl = document.getElementById('siteName');
  const errorEl = document.getElementById('error');

  function sendMessage(msg) {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs[0]) {
          resolve({ success: false, error: '无法连接到页面' });
          return;
        }
        chrome.tabs.sendMessage(tabs[0].id, msg, (response) => {
          if (chrome.runtime.lastError) {
            resolve({ success: false, error: '当前页面不支持此扩展' });
          } else {
            resolve(response || { success: false, error: '无响应' });
          }
        });
      });
    });
  }

  async function refreshStatus() {
    const resp = await sendMessage({ action: 'getStatus' });
    if (resp.siteName) {
      siteNameEl.textContent = resp.siteName;
    } else {
      siteNameEl.textContent = '未识别的站点';
    }

    if (resp.isActive) {
      statusEl.textContent = `已激活 - ${resp.currentSkin === 'word' ? 'Word' : 'Excel'} 模式`;
      statusEl.className = 'status';
      btnRestore.style.display = 'block';
    } else {
      statusEl.textContent = '未激活';
      statusEl.className = 'status inactive';
      btnRestore.style.display = 'none';
    }
  }

  btnWord.addEventListener('click', async () => {
    errorEl.textContent = '';
    chrome.storage.local.set({ preferredSkin: 'word' });
    const resp = await sendMessage({ action: 'activate', skin: 'word' });
    if (!resp.success) {
      errorEl.textContent = resp.error || '激活失败';
    } else {
      refreshStatus();
    }
  });

  btnExcel.addEventListener('click', async () => {
    errorEl.textContent = '';
    chrome.storage.local.set({ preferredSkin: 'excel' });
    const resp = await sendMessage({ action: 'activate', skin: 'excel' });
    if (!resp.success) {
      errorEl.textContent = resp.error || '激活失败';
    } else {
      refreshStatus();
    }
  });

  btnRestore.addEventListener('click', async () => {
    errorEl.textContent = '';
    await sendMessage({ action: 'deactivate' });
    refreshStatus();
  });

  refreshStatus();
});
