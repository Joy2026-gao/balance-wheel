const scenarios = [
  {
    id: "life",
    title: "人生平衡轮",
    icon: "self",
    desc: "适合年度复盘、自我教练和个人成长。",
    purpose: "年度人生平衡轮",
    dimensions: [
      ["健康", "体能、耐力、精力储备"],
      ["事业", "方向、职责、成就感"],
      ["财务", "收入、资源和安全感"],
      ["家庭", "亲密关系和情感补给"],
      ["朋友", "连接、支持和陪伴"],
      ["成长", "学习、自我管理和提升"],
      ["休闲", "放松、恢复和乐趣"],
      ["精神生活", "愿景、价值和意义感"]
    ]
  },
  {
    id: "work",
    title: "工作复盘",
    icon: "work",
    desc: "适合绩效面谈、职业规划和阶段总结。",
    purpose: "工作 / 绩效复盘平衡轮",
    dimensions: [
      ["目标清晰", "是否知道关键产出和优先级"],
      ["能力匹配", "能力是否支撑当前任务"],
      ["资源支持", "信息、工具、预算和协作资源"],
      ["沟通协作", "跨团队沟通和关系质量"],
      ["结果交付", "质量、效率和承诺兑现"],
      ["影响力", "推动他人和影响业务的能力"],
      ["成长空间", "挑战、反馈和学习机会"],
      ["工作能量", "投入感、恢复和可持续状态"]
    ]
  },
  {
    id: "learning",
    title: "学习规划",
    icon: "learn",
    desc: "适合学生、亲子教练和学习目标拆解。",
    purpose: "学习规划平衡轮",
    dimensions: [
      ["学习目标", "目标是否具体、清楚、可衡量"],
      ["时间管理", "计划、节奏和专注时间"],
      ["学习方法", "预习、复习、练习和纠错"],
      ["知识掌握", "理解、记忆和迁移运用"],
      ["作业完成", "质量、速度和主动性"],
      ["考试准备", "题型、心态和复盘"],
      ["家庭支持", "环境、鼓励和边界"],
      ["身心状态", "睡眠、运动和情绪稳定"]
    ]
  },
  {
    id: "summer",
    title: "暑期规划",
    icon: "summer",
    desc: "适合学生假期安排、亲子沟通和半年度调整。",
    purpose: "暑期规划平衡轮",
    dimensions: [
      ["学习目标", "暑期想完成的学习任务和成果"],
      ["作息节奏", "睡眠、起床、专注和休息安排"],
      ["运动健康", "运动频率、体能和身体状态"],
      ["阅读输入", "阅读、观影、参观和知识拓展"],
      ["兴趣探索", "兴趣班、项目制学习和创造表达"],
      ["家庭共处", "亲子沟通、家务参与和家庭活动"],
      ["社交活动", "同伴连接、户外活动和合作体验"],
      ["开学准备", "知识衔接、物品准备和状态回归"]
    ]
  },
  {
    id: "team",
    title: "团队诊断",
    icon: "team",
    desc: "适合部门总结、项目复盘和团队共创。",
    purpose: "团队 / 项目诊断平衡轮",
    dimensions: [
      ["共同目标", "目标是否一致且被理解"],
      ["角色分工", "职责、边界和接口清晰度"],
      ["沟通机制", "会议、同步和反馈效率"],
      ["信任氛围", "安全感、开放度和互相支持"],
      ["决策效率", "授权、节奏和卡点处理"],
      ["执行闭环", "行动、追踪和复盘质量"],
      ["资源保障", "人、钱、时间和信息支持"],
      ["创新学习", "试错、沉淀和持续改进"]
    ]
  },
  {
    id: "meeting",
    title: "会议体验",
    icon: "meet",
    desc: "适合优化例会、复盘会和共创会。",
    purpose: "会议体验平衡轮",
    dimensions: [
      ["会议目的", "为什么开会是否清楚"],
      ["议程设计", "流程、时间和重点安排"],
      ["参与投入", "成员是否真实参与"],
      ["讨论质量", "信息充分、观点碰撞和聚焦"],
      ["主持引导", "节奏、提问和现场能量"],
      ["决策产出", "是否形成明确结论"],
      ["行动分工", "负责人、时间和标准"],
      ["会后跟踪", "是否监督进展并复盘"]
    ]
  }
];

const prompts = [
  "如果这个维度提升 1 分，最先会发生什么变化？",
  "这个分数背后，有哪些事实和证据？",
  "它正在影响哪些其他维度？",
  "你真正能影响的部分是什么？",
  "谁可以支持你完成这次改变？"
];

const state = {
  scenarioId: "life",
  purpose: scenarios[0].purpose,
  dimensions: structuredClone(scenarios[0].dimensions),
  scores: Array(8).fill(5),
  targets: Array(8).fill(8),
  focusArea: scenarios[0].dimensions[0][0],
  reflection: "",
  actionStep: "",
  actionItems: [],
  dueDate: "",
  support: "",
  reviewDate: "",
  reviewPartner: "",
  trackingNote: ""
};

const canvas = document.querySelector("#wheelCanvas");
const ctx = canvas.getContext("2d");
const averageScore = document.querySelector("#averageScore");
const sceneCards = document.querySelector("#sceneCards");
const dimensionEditor = document.querySelector("#dimensionEditor");
const dimensionList = document.querySelector("#dimensionList");
const targetList = document.querySelector("#targetList");
const focusTitle = document.querySelector("#focusTitle");
const focusPrompt = document.querySelector("#focusPrompt");
const focusArea = document.querySelector("#focusArea");
const reflection = document.querySelector("#reflection");
const purposeInput = document.querySelector("#purposeInput");
const actionStep = document.querySelector("#actionStep");
const extraActions = document.querySelector("#extraActions");
const addActionBtn = document.querySelector("#addActionBtn");
const dueDate = document.querySelector("#dueDate");
const support = document.querySelector("#support");
const planSummary = document.querySelector("#planSummary");
const reviewDate = document.querySelector("#reviewDate");
const reviewPartner = document.querySelector("#reviewPartner");
const trackingNote = document.querySelector("#trackingNote");
const completionPanel = document.querySelector("#completionPanel");
const completionContent = document.querySelector("#completionContent");
const exportResultBtn = document.querySelector("#exportResultBtn");
const exportStatus = document.querySelector("#exportStatus");
const stepOrder = ["purpose", "dimensions", "score", "pivot", "goal", "action", "track"];
const viewOrder = ["what", "meaning", "flow", "scenes", "practice"];

function cloneDimensions(dimensions) {
  return dimensions.map(([name, hint]) => [name, hint]);
}

function removeLegacyHorseSuffix(name) {
  const legacySuffixes = new Set(["马力", "赛道", "能量补给", "驻地", "同行伙伴", "驯马术", "牧场", "星辰方向"]);
  const [base, suffix] = String(name).split(" / ");
  return suffix && legacySuffixes.has(suffix) ? base : name;
}

function normalizeLegacyDimensionNames() {
  const originalFocus = state.focusArea;
  state.dimensions = state.dimensions.map(([name, hint]) => [removeLegacyHorseSuffix(name), hint]);
  state.focusArea = removeLegacyHorseSuffix(originalFocus);
}

function loadState() {
  const saved = localStorage.getItem("balanceWheelStateV2");
  if (!saved) return;
  try {
    const parsed = JSON.parse(saved);
    Object.assign(state, parsed);
    if (!Array.isArray(state.dimensions) || state.dimensions.length !== 8) {
      state.dimensions = cloneDimensions(scenarios[0].dimensions);
    }
    if (!Array.isArray(state.scores) || state.scores.length !== 8) state.scores = Array(8).fill(5);
    if (!Array.isArray(state.targets) || state.targets.length !== 8) state.targets = Array(8).fill(8);
    if (!Array.isArray(state.actionItems)) state.actionItems = [];
    state.actionItems = state.actionItems.filter(item => item && item.trim());
    normalizeLegacyDimensionNames();
  } catch {
    localStorage.removeItem("balanceWheelStateV2");
  }
}

function saveState() {
  localStorage.setItem("balanceWheelStateV2", JSON.stringify(state));
}

function getDimensionName(index) {
  return state.dimensions[index][0];
}

function buildSceneCards() {
  sceneCards.innerHTML = "";
  scenarios.forEach(scenario => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `scene-card ${scenario.id === state.scenarioId ? "active" : ""}`;
    button.innerHTML = `<i class="scene-icon ${scenario.icon}" aria-hidden="true"></i><strong>${scenario.title}</strong><span>${scenario.desc}</span>`;
    button.addEventListener("click", () => selectScenario(scenario.id));
    sceneCards.append(button);
  });
}

function selectScenario(id) {
  const scenario = scenarios.find(item => item.id === id);
  if (!scenario) return;
  state.scenarioId = scenario.id;
  state.purpose = scenario.purpose;
  state.dimensions = cloneDimensions(scenario.dimensions);
  state.scores = Array(8).fill(5);
  state.targets = Array(8).fill(8);
  state.focusArea = state.dimensions[0][0];
  normalizeLegacyDimensionNames();
  buildSceneCards();
  renderAll();
}

function buildDimensionEditor() {
  dimensionEditor.innerHTML = "";
  state.dimensions.forEach((dimension, index) => {
    const label = document.createElement("label");
    label.className = "field";
    label.innerHTML = `<span>维度 ${index + 1}</span>`;
    const input = document.createElement("input");
    input.type = "text";
    input.value = dimension[0];
    input.addEventListener("input", () => {
      state.dimensions[index][0] = input.value.trim() || `维度 ${index + 1}`;
      state.focusArea = state.dimensions[getFocusIndex()][0];
      renderScoreControls();
      renderTargetControls();
      renderFocusOptions();
      update();
    });
    label.append(input);
    dimensionEditor.append(label);
  });
}

function makeSliderCard(index, mode) {
  const template = document.querySelector("#dimensionTemplate");
  const item = template.content.cloneNode(true);
  const card = item.querySelector(".dimension-card");
  const label = item.querySelector(".dimension-name");
  const output = item.querySelector(".score-badge");
  const slider = item.querySelector(".score-slider");
  const scoreArray = mode === "target" ? state.targets : state.scores;

  label.textContent = getDimensionName(index);
  const hint = document.createElement("span");
  hint.className = "dimension-hint";
  hint.textContent = state.dimensions[index][1] || "";
  label.append(hint);
  output.textContent = scoreArray[index];
  slider.value = scoreArray[index];
  slider.classList.toggle("target-slider", mode === "target");
  slider.setAttribute("aria-label", `${getDimensionName(index)}${mode === "target" ? "目标分" : "当前评分"}`);

  slider.addEventListener("input", () => {
    scoreArray[index] = Number(slider.value);
    output.textContent = slider.value;
    update();
  });

  card.addEventListener("click", event => {
    if (event.target === slider) return;
    state.focusArea = getDimensionName(index);
    renderFocusOptions();
    update();
  });

  return item;
}

function renderScoreControls() {
  dimensionList.innerHTML = "";
  state.dimensions.forEach((_, index) => {
    dimensionList.append(makeSliderCard(index, "score"));
  });
}

function renderTargetControls() {
  targetList.innerHTML = "";
  state.dimensions.forEach((_, index) => {
    targetList.append(makeSliderCard(index, "target"));
  });
}

function renderFocusOptions() {
  const current = state.focusArea;
  focusArea.innerHTML = "";
  state.dimensions.forEach(([name]) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    focusArea.append(option);
  });
  focusArea.value = state.dimensions.some(([name]) => name === current) ? current : getDimensionName(getFocusIndex());
  state.focusArea = focusArea.value;
}

function point(cx, cy, radius, index, total, value = 10) {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / total;
  const scaled = radius * (value / 10);
  return {
    x: cx + Math.cos(angle) * scaled,
    y: cy + Math.sin(angle) * scaled
  };
}

function drawPolygon(values, color, fill, width = 4) {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = 286;
  ctx.beginPath();
  values.forEach((value, index) => {
    const p = point(cx, cy, radius, index, values.length, value);
    if (index === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.fill();
  ctx.stroke();
}

function drawWheel() {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = 286;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let ring = 10; ring >= 1; ring--) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius * ring / 10, 0, Math.PI * 2);
    ctx.strokeStyle = ring % 5 === 0 ? "#c7d1db" : "#e7ecf1";
    ctx.lineWidth = ring % 5 === 0 ? 2 : 1;
    ctx.stroke();
  }

  state.dimensions.forEach(([name], index) => {
    const end = point(cx, cy, radius, index, 8);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = "#d9e0e8";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const label = point(cx, cy, radius + 32, index, 8);
    ctx.fillStyle = "#17212b";
    ctx.font = "700 17px -apple-system, BlinkMacSystemFont, PingFang SC, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(name.split(" / ")[0].slice(0, 6), label.x, label.y);
  });

  drawPolygon(state.targets, "#c58a2c", "rgba(197, 138, 44, 0.12)", 3);
  drawPolygon(state.scores, "#2f7d67", "rgba(47, 125, 103, 0.26)", 5);

  state.scores.forEach((value, index) => {
    const p = point(cx, cy, radius, index, 8, value);
    ctx.beginPath();
    ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#2f7d67";
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "700 13px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(value), p.x, p.y);
  });
}

function getFocusIndex() {
  return state.scores.reduce((lowest, score, index) => score < state.scores[lowest] ? index : lowest, 0);
}

function updateFocus() {
  const lowest = getFocusIndex();
  const chosenIndex = state.dimensions.findIndex(([name]) => name === state.focusArea);
  const index = chosenIndex >= 0 ? chosenIndex : lowest;
  const [name, hint] = state.dimensions[index];
  const gap = state.targets[index] - state.scores[index];
  focusTitle.textContent = `建议支点：${state.dimensions[lowest][0]}｜当前选择：${name}`;
  focusPrompt.textContent = `${hint || "这个维度值得进一步观察"}。当前 ${state.scores[index]} 分，目标 ${state.targets[index]} 分，差距 ${Math.max(gap, 0)} 分。${prompts[index % prompts.length]}`;
}

function updateAverage() {
  const total = state.scores.reduce((sum, score) => sum + score, 0);
  averageScore.textContent = (total / state.scores.length).toFixed(1);
}

function updateSummary() {
  const due = state.dueDate || "待确定日期";
  const supportText = state.support || "待确认支持资源";
  const actions = [state.actionStep, ...state.actionItems].filter(item => item && item.trim());
  const action = actions.length ? actions.map((item, index) => `${index + 1}. ${item}`).join("；") : "待填写一个最小行动";
  const review = state.reviewDate || "待确定复盘日期";
  planSummary.textContent = `本次主题：${state.purpose || "未命名主题"}。我选择的支点是「${state.focusArea}」。下一步行动：${action}。完成日期：${due}。支持资源：${supportText}。复盘安排：${review}。`;
}

function getActions() {
  return [state.actionStep, ...state.actionItems].filter(item => item && item.trim());
}

function getAverageScore() {
  const total = state.scores.reduce((sum, score) => sum + score, 0);
  return (total / state.scores.length).toFixed(1);
}

function createResultItem(label, value) {
  const item = document.createElement("article");
  item.className = "result-item";
  const title = document.createElement("span");
  title.textContent = label;
  const text = document.createElement("strong");
  text.textContent = value || "待填写";
  item.append(title, text);
  return item;
}

function getWheelImage() {
  drawWheel();
  return canvas.toDataURL("image/png");
}

function renderCompletion() {
  const actions = getActions();
  const dimensionRecords = state.dimensions
    .map(([name], index) => ({ name, score: state.scores[index], target: state.targets[index] }));
  const reviewText = [
    state.reviewDate || "",
    state.reviewPartner ? `支持者：${state.reviewPartner}` : ""
  ].filter(Boolean).join(" · ") || "待确定";

  completionContent.innerHTML = "";
  const summary = document.createElement("div");
  summary.className = "result-summary";
  summary.append(
    createResultItem("本次主题", state.purpose || "未命名主题"),
    createResultItem("当前平均分", getAverageScore()),
    createResultItem("优先支点", state.focusArea || "待选择"),
    createResultItem("复盘安排", reviewText)
  );

  const wheelPreview = document.createElement("article");
  wheelPreview.className = "result-wheel-preview";
  const wheelPreviewText = document.createElement("div");
  wheelPreviewText.innerHTML = "<h4>平衡轮图形</h4><p>绿色是当前状态，金色是目标状态；图形越接近圆，代表整体越均衡。</p>";
  const wheelImage = document.createElement("img");
  wheelImage.src = getWheelImage();
  wheelImage.alt = "本次平衡轮图形";
  wheelPreview.append(wheelPreviewText, wheelImage);

  const details = document.createElement("div");
  details.className = "result-details";

  const actionBlock = document.createElement("article");
  actionBlock.innerHTML = "<h4>行动安排</h4>";
  const actionList = document.createElement("ol");
  if (actions.length) {
    actions.forEach(action => {
      const item = document.createElement("li");
      item.textContent = action;
      actionList.append(item);
    });
  } else {
    const item = document.createElement("li");
    item.textContent = "先写下一个一周内可以开始的最小行动。";
    actionList.append(item);
  }
  actionBlock.append(actionList);

  const supportBlock = document.createElement("article");
  supportBlock.innerHTML = "<h4>落地条件</h4>";
  const supportList = document.createElement("ul");
  [
    `完成日期：${state.dueDate || "待确定"}`,
    `支持资源：${state.support || "待确认"}`,
    `复盘时看：${state.trackingNote || "行动完成情况、支点分数变化和下一步调整"}`
  ].forEach(text => {
    const item = document.createElement("li");
    item.textContent = text;
    supportList.append(item);
  });
  supportBlock.append(supportList);

  const wheelBlock = document.createElement("article");
  wheelBlock.innerHTML = "<h4>8 个维度记录</h4>";
  const dimensionListResult = document.createElement("ul");
  dimensionListResult.className = "dimension-result-list";
  dimensionRecords.forEach(({ name, score, target }) => {
    const item = document.createElement("li");
    item.innerHTML = `<span>${name}</span><strong>当前 ${score} / 目标 ${target}</strong>`;
    dimensionListResult.append(item);
  });
  wheelBlock.append(dimensionListResult);

  details.append(actionBlock, supportBlock, wheelBlock);
  completionContent.append(summary, wheelPreview, details);
}

function buildResultText() {
  const actions = getActions();
  const lines = [
    "本次平衡轮成果卡",
    `本次主题：${state.purpose || "未命名主题"}`,
    `当前平均分：${getAverageScore()}`,
    `优先支点：${state.focusArea || "待选择"}`,
    `完成日期：${state.dueDate || "待确定"}`,
    `支持资源：${state.support || "待确认"}`,
    `下次复盘日期：${state.reviewDate || "待确定"}`,
    state.reviewPartner ? `复盘支持者：${state.reviewPartner}` : "",
    "",
    "行动安排：",
    ...(actions.length ? actions.map((item, index) => `${index + 1}. ${item}`) : ["1. 待填写一个最小行动"]),
    "",
    "8 个维度记录：",
    ...state.dimensions.map(([name], index) => `${index + 1}. ${name}：当前 ${state.scores[index]} / 目标 ${state.targets[index]}`),
    "",
    `复盘时看什么：${state.trackingNote || "行动完成情况、支点分数变化和下一步调整"}`
  ];
  return lines.filter(line => line !== "").join("\n");
}

function openPrintView() {
  const printWindow = window.open("", "_blank", "width=900,height=720");
  if (!printWindow) {
    window.print();
    return;
  }
  const wheelImage = getWheelImage();
  const safeText = buildResultText()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  printWindow.document.write(`
    <!doctype html>
    <html lang="zh-CN">
      <head>
        <meta charset="utf-8">
        <title>平衡轮成果卡</title>
        <style>
          body { margin: 32px; color: #17212b; font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; }
          h1 { margin: 0 0 18px; font-size: 28px; }
          img { display: block; width: 520px; max-width: 100%; margin: 0 0 22px; border: 1px solid #d9e0e8; border-radius: 8px; }
          pre { white-space: pre-wrap; line-height: 1.8; font-size: 15px; }
          @media print { body { margin: 18mm; } img { width: 150mm; } }
        </style>
      </head>
      <body>
        <h1>平衡轮成果卡</h1>
        <img src="${wheelImage}" alt="本次平衡轮图形">
        <pre>${safeText}</pre>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  window.setTimeout(() => printWindow.print(), 250);
}

function showCompletion(shouldPrint = false) {
  renderCompletion();
  completionPanel.hidden = false;
  exportStatus.textContent = shouldPrint ? "正在打开打印窗口；在系统打印窗口里选择“保存为 PDF”即可导出。" : "已生成成果卡。";
  completionPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  if (shouldPrint) {
    openPrintView();
  }
}

function update() {
  updateAverage();
  updateFocus();
  updateSummary();
  drawWheel();
  saveState();
}

function activateView(view) {
  const target = viewOrder.includes(view) ? view : "what";
  document.querySelectorAll(".module-section").forEach(section => {
    section.classList.toggle("active", section.dataset.view === target);
  });
  document.querySelectorAll(".side-nav a[data-view]").forEach(link => {
    link.classList.toggle("active", link.dataset.view === target);
  });
  document.querySelectorAll(".nav-progress span").forEach((item, index) => {
    item.classList.toggle("active", index <= viewOrder.indexOf(target));
  });
  history.replaceState(null, "", `#${target}`);
  if (target === "practice") drawWheel();
}

function renderFields() {
  state.actionItems = (state.actionItems || []).filter(item => item && item.trim());
  purposeInput.value = state.purpose || "";
  reflection.value = state.reflection || "";
  actionStep.value = state.actionStep || "";
  renderExtraActions();
  dueDate.value = state.dueDate || "";
  support.value = state.support || "";
  reviewDate.value = state.reviewDate || "";
  reviewPartner.value = state.reviewPartner || "";
  trackingNote.value = state.trackingNote || "";
}

function renderExtraActions() {
  extraActions.innerHTML = "";
  state.actionItems.forEach((value, index) => {
    const row = document.createElement("label");
    row.className = "field extra-action-row";
    const title = document.createElement("span");
    title.textContent = `行动项 ${index + 2}`;
    const textarea = document.createElement("textarea");
    textarea.rows = 3;
    textarea.placeholder = "继续写一个具体行动";
    textarea.value = value;
    textarea.addEventListener("input", () => {
      state.actionItems[index] = textarea.value;
      update();
    });
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-action-button";
    remove.textContent = "删除";
    remove.addEventListener("click", () => {
      state.actionItems.splice(index, 1);
      renderExtraActions();
      update();
    });
    row.append(title, textarea, remove);
    extraActions.append(row);
  });
}

function renderAll() {
  normalizeLegacyDimensionNames();
  buildDimensionEditor();
  renderScoreControls();
  renderTargetControls();
  renderFocusOptions();
  renderFields();
  update();
}

function bindTabs() {
  document.querySelectorAll(".step").forEach(tab => {
    tab.addEventListener("click", () => {
      activateStep(tab.dataset.tab);
    });
  });
}

function bindMainNavigation() {
  document.querySelectorAll(".side-nav a[data-view]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      activateView(link.dataset.view);
    });
  });
}

function activateStep(step) {
  const target = stepOrder.includes(step) ? step : stepOrder[0];
  document.querySelectorAll(".step").forEach(item => {
    item.classList.toggle("active", item.dataset.tab === target);
  });
  document.querySelectorAll(".tab-content").forEach(item => item.classList.remove("active"));
  document.querySelector(`#${target}Tab`).classList.add("active");
  document.querySelector("#prevStep").disabled = stepOrder.indexOf(target) === 0;
  document.querySelector("#nextStep").textContent = target === "track" ? "完成" : "下一步";
}

function bindFields() {
  purposeInput.addEventListener("input", () => {
    state.purpose = purposeInput.value;
    update();
  });
  focusArea.addEventListener("change", () => {
    state.focusArea = focusArea.value;
    update();
  });
  reflection.addEventListener("input", () => {
    state.reflection = reflection.value;
    saveState();
  });
  actionStep.addEventListener("input", () => {
    state.actionStep = actionStep.value;
    update();
  });
  addActionBtn.addEventListener("click", () => {
    state.actionItems.push(" ");
    renderExtraActions();
    update();
  });
  dueDate.addEventListener("change", () => {
    state.dueDate = dueDate.value;
    update();
  });
  support.addEventListener("input", () => {
    state.support = support.value;
    update();
  });
  reviewDate.addEventListener("change", () => {
    state.reviewDate = reviewDate.value;
    update();
  });
  reviewPartner.addEventListener("input", () => {
    state.reviewPartner = reviewPartner.value;
    update();
  });
  trackingNote.addEventListener("input", () => {
    state.trackingNote = trackingNote.value;
    saveState();
  });
}

function bindActions() {
  document.querySelector("#printBtn").addEventListener("click", () => showCompletion(true));
  exportResultBtn.addEventListener("click", () => showCompletion(true));
  document.querySelector("#prevStep").addEventListener("click", () => {
    const active = document.querySelector(".step.active")?.dataset.tab || stepOrder[0];
    const index = Math.max(stepOrder.indexOf(active) - 1, 0);
    activateStep(stepOrder[index]);
  });
  document.querySelector("#nextStep").addEventListener("click", () => {
    const active = document.querySelector(".step.active")?.dataset.tab || stepOrder[0];
    const index = stepOrder.indexOf(active);
    if (index >= stepOrder.length - 1) {
      showCompletion(false);
      return;
    }
    activateStep(stepOrder[index + 1]);
  });
  document.querySelector("#resetBtn").addEventListener("click", () => {
    const scenario = scenarios.find(item => item.id === state.scenarioId) || scenarios[0];
    Object.assign(state, {
      purpose: scenario.purpose,
      dimensions: cloneDimensions(scenario.dimensions),
      scores: Array(8).fill(5),
      targets: Array(8).fill(8),
      focusArea: scenario.dimensions[0][0],
      reflection: "",
      actionStep: "",
      actionItems: [],
      dueDate: "",
      support: "",
      reviewDate: "",
      reviewPartner: "",
      trackingNote: ""
    });
    normalizeLegacyDimensionNames();
    renderAll();
    activateStep("purpose");
  });
}

loadState();
buildSceneCards();
bindMainNavigation();
bindTabs();
bindFields();
bindActions();
renderAll();
activateStep("purpose");
activateView(location.hash.replace("#", "") || "what");
