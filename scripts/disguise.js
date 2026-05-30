class DisguiseManager {
  constructor(pristineHTML, pristineTitle) {
    this.pristineHTML = pristineHTML;
    this.pristineTitle = pristineTitle;
    this.currentSkin = null;
    this.isActive = false;
    this.container = null;
    this.fakeTitle = null;
    this.fakeTitles = {
      word: [
        '2025年度工作汇报.docx',
        '第四季度总结报告.docx',
        '项目可行性分析.docx',
        '会议纪要-20250528.docx',
        '部门绩效考核方案.docx',
        '产品需求文档V3.2.docx',
        '周报-第22周.docx'
      ],
      excel: [
        '数据汇总表.xlsx',
        '2025年Q4销售数据.xlsx',
        '预算明细表-终版.xlsx',
        '人员考勤统计表.xlsx',
        '项目进度跟踪表.xlsx',
        'KPI指标统计-5月.xlsx',
        '客户信息台账.xlsx'
      ]
    };
  }

  activate(skin, content) {
    this.currentSkin = skin;
    this.isActive = true;
    this.fakeTitle = this.getRandomTitle(skin);

    document.title = this.fakeTitle;
    document.body.innerHTML = '';
    document.body.className = '';

    this.container = document.createElement('div');
    this.container.id = 'nd-disguise-container';
    this.container.className = `nd-skin-${skin}`;

    if (skin === 'word') {
      this.container.innerHTML = this.buildWordUI(content);
    } else {
      this.container.innerHTML = this.buildExcelUI(content);
    }

    document.body.appendChild(this.container);
    this.setupScrollBehavior();
  }

  deactivate() {
    if (!this.isActive) return;
    this.isActive = false;
    this.currentSkin = null;
    this.fakeTitle = null;
    document.title = this.pristineTitle;
    document.body.innerHTML = this.pristineHTML;
  }

  getRandomTitle(type) {
    const titles = this.fakeTitles[type];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  buildWordUI(content) {
    const paragraphs = content.split('\n\n').filter(p => p.trim());
    const wordContent = paragraphs.map(p =>
      `<p class="nd-word-paragraph">${this.escapeHtml(p.trim())}</p>`
    ).join('');

    const charCount = content.replace(/\s/g, '').length;
    const pageCount = Math.max(1, Math.ceil(charCount / 1500));

    return `
      <div class="nd-word-titlebar">
        <div class="nd-word-titlebar-left">
          <img class="nd-word-icon" src="data:image/svg+xml,${encodeURIComponent(this.getWordIconSVG())}" alt="">
          <span class="nd-word-filename">${this.escapeHtml(this.fakeTitle)} - Word</span>
        </div>
        <div class="nd-word-titlebar-buttons">
          <span class="nd-btn-minimize">─</span>
          <span class="nd-btn-maximize">□</span>
          <span class="nd-btn-close">✕</span>
        </div>
      </div>
      <div class="nd-word-ribbon">
        <div class="nd-word-tabs">
          <span class="nd-tab">文件</span>
          <span class="nd-tab nd-tab-active">开始</span>
          <span class="nd-tab">插入</span>
          <span class="nd-tab">设计</span>
          <span class="nd-tab">布局</span>
          <span class="nd-tab">引用</span>
          <span class="nd-tab">审阅</span>
          <span class="nd-tab">视图</span>
        </div>
        <div class="nd-word-toolbar">
          <div class="nd-toolbar-group">
            <select class="nd-font-select"><option>宋体</option><option>微软雅黑</option><option>仿宋</option></select>
            <select class="nd-size-select"><option>小四</option><option>五号</option><option>四号</option></select>
            <span class="nd-toolbar-btn"><b>B</b></span>
            <span class="nd-toolbar-btn"><i>I</i></span>
            <span class="nd-toolbar-btn"><u>U</u></span>
          </div>
          <div class="nd-toolbar-separator"></div>
          <div class="nd-toolbar-group">
            <span class="nd-toolbar-btn">≡</span>
            <span class="nd-toolbar-btn">≡</span>
            <span class="nd-toolbar-btn">≡</span>
            <span class="nd-toolbar-btn">≡</span>
          </div>
          <div class="nd-toolbar-separator"></div>
          <div class="nd-toolbar-group">
            <span class="nd-toolbar-btn">¶</span>
            <span class="nd-toolbar-btn">🔤</span>
          </div>
        </div>
      </div>
      <div class="nd-word-ruler">
        <div class="nd-ruler-bar"></div>
      </div>
      <div class="nd-word-body">
        <div class="nd-word-page">
          ${wordContent}
        </div>
      </div>
      <div class="nd-word-statusbar">
        <span>第 1 页，共 ${pageCount} 页</span>
        <span>字数：${charCount}</span>
        <span class="nd-statusbar-right">
          <span class="nd-view-btn">☐</span>
          <span class="nd-view-btn">☐</span>
          <span class="nd-view-btn">☐</span>
          <span class="nd-zoom">100%</span>
          <input type="range" class="nd-zoom-slider" min="50" max="200" value="100">
        </span>
      </div>
    `;
  }

  buildExcelUI(content) {
    const lines = content.split('\n').filter(l => l.trim());
    const rows = lines.map((line, i) => {
      const rowNum = i + 1;
      const displayText = line.trim();
      return `<tr class="nd-excel-row">
        <td class="nd-excel-rownum">${rowNum}</td>
        <td class="nd-excel-cell nd-excel-cell-a">${this.escapeHtml(displayText)}</td>
        <td class="nd-excel-cell nd-excel-cell-b"></td>
        <td class="nd-excel-cell nd-excel-cell-c"></td>
        <td class="nd-excel-cell nd-excel-cell-d"></td>
        <td class="nd-excel-cell nd-excel-cell-e"></td>
        <td class="nd-excel-cell nd-excel-cell-f"></td>
      </tr>`;
    }).join('');

    return `
      <div class="nd-excel-titlebar">
        <div class="nd-excel-titlebar-left">
          <img class="nd-excel-icon" src="data:image/svg+xml,${encodeURIComponent(this.getExcelIconSVG())}" alt="">
          <span class="nd-excel-filename">${this.escapeHtml(this.fakeTitle)} - Excel</span>
        </div>
        <div class="nd-excel-titlebar-buttons">
          <span class="nd-btn-minimize">─</span>
          <span class="nd-btn-maximize">□</span>
          <span class="nd-btn-close">✕</span>
        </div>
      </div>
      <div class="nd-excel-ribbon">
        <div class="nd-excel-tabs">
          <span class="nd-tab">文件</span>
          <span class="nd-tab nd-tab-active">开始</span>
          <span class="nd-tab">插入</span>
          <span class="nd-tab">页面布局</span>
          <span class="nd-tab">公式</span>
          <span class="nd-tab">数据</span>
          <span class="nd-tab">审阅</span>
          <span class="nd-tab">视图</span>
        </div>
        <div class="nd-excel-toolbar">
          <div class="nd-toolbar-group">
            <select class="nd-font-select"><option>等线</option><option>宋体</option><option>微软雅黑</option></select>
            <select class="nd-size-select"><option>11</option><option>12</option><option>14</option></select>
            <span class="nd-toolbar-btn"><b>B</b></span>
            <span class="nd-toolbar-btn"><i>I</i></span>
            <span class="nd-toolbar-btn"><u>U</u></span>
          </div>
          <div class="nd-toolbar-separator"></div>
          <div class="nd-toolbar-group">
            <span class="nd-toolbar-btn">⊞</span>
            <span class="nd-toolbar-btn">🎨</span>
            <span class="nd-toolbar-btn">A</span>
          </div>
          <div class="nd-toolbar-separator"></div>
          <div class="nd-toolbar-group">
            <span class="nd-toolbar-btn">≡</span>
            <span class="nd-toolbar-btn">⇔</span>
            <span class="nd-toolbar-btn">%</span>
          </div>
        </div>
      </div>
      <div class="nd-excel-formulabar">
        <span class="nd-excel-namebox">A1</span>
        <span class="nd-excel-fx">fx</span>
        <input class="nd-excel-formula-input" value="" readonly>
      </div>
      <div class="nd-excel-body">
        <table class="nd-excel-table">
          <thead>
            <tr class="nd-excel-header">
              <th class="nd-excel-rownum"></th>
              <th class="nd-excel-colhead">A</th>
              <th class="nd-excel-colhead">B</th>
              <th class="nd-excel-colhead">C</th>
              <th class="nd-excel-colhead">D</th>
              <th class="nd-excel-colhead">E</th>
              <th class="nd-excel-colhead">F</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
      <div class="nd-excel-sheetbar">
        <span class="nd-sheet-nav">◀</span>
        <span class="nd-sheet-nav">▶</span>
        <span class="nd-sheet-tab nd-sheet-active">Sheet1</span>
        <span class="nd-sheet-tab">Sheet2</span>
        <span class="nd-sheet-tab">Sheet3</span>
        <span class="nd-sheet-add">+</span>
      </div>
      <div class="nd-excel-statusbar">
        <span>就绪</span>
        <span class="nd-statusbar-right">
          <span>平均值: -</span>
          <span>计数: ${lines.length}</span>
          <span>求和: -</span>
          <span class="nd-zoom">100%</span>
          <input type="range" class="nd-zoom-slider" min="50" max="200" value="100">
        </span>
      </div>
    `;
  }

  setupScrollBehavior() {
    const body = this.container.querySelector('.nd-word-body, .nd-excel-body');
    if (body) {
      body.style.overflowY = 'auto';
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  getWordIconSVG() {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect width="16" height="16" rx="2" fill="%232b579a"/><text x="4" y="12" font-size="10" fill="white" font-family="Arial" font-weight="bold">W</text></svg>';
  }

  getExcelIconSVG() {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect width="16" height="16" rx="2" fill="%23217346"/><text x="4" y="12" font-size="10" fill="white" font-family="Arial" font-weight="bold">X</text></svg>';
  }
}
