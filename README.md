# 天津中医药大学足球联赛

纯静态网页，无后端、无依赖、无构建步骤。改一个数据文件就能更新，直接挂 GitHub Pages。

## 文件结构

```
index.html                  页面（不用改）
assets/style.css            样式（改配色改这里）
assets/fonts/               自托管中文字体子集（见下方「字体」）
assets/logo.png             校徽（取自学校官网）
assets/logo_font.png        校名标准字·白（页头绿底上用的就是这个）
assets/logo_font_green.png  校名标准字·绿（备用，白底场景）
assets/logo_font_deep.png   校名标准字·深绿（备用）
data/league.js              数据 —— 日常只改这个文件
tools/subset_fonts.py       重新裁剪字体子集（改文案后跑一次）
赛程表(1).xlsx               原始赛程表（留档，不参与页面）
```

## 字体

页面不用系统默认字体，而是**自托管裁剪过的思源黑体 + 思源宋体子集**，
一共 108KB。这样做的好处是：Windows 上不再是微软雅黑（而且 `font-weight:900`
在微软雅黑上只能靠浏览器伪粗体，发虚），手机上不管 iOS 的苹方还是安卓各家的
默认字体，看到的也都是同一个字面。

- 正文和数据用**思源黑体**（92KB，覆盖页面全部 271 个字符）
- 只有标题（`积分榜` / `赛程与结果` / `第 N 轮` / 校训）用**思源宋体**，
  所以宋体只裁了 32 个字，15KB

**改了页面文案或队名之后**，跑一次：

```bash
python tools/subset_fonts.py
```

不跑也不会出错——子集里没有的字会回退到系统字体（宋体那几个位置回退到系统宋体），
只是那一个字和别人长得不太一样。改标题文案的话，顺手把新字补进
`tools/subset_fonts.py` 里的 `SERIF_CHARS`。

源字体用的是你机器上 `C:\Windows\Fonts\` 里的 `NotoSansSC-VF.ttf` /
`NotoSerifSC-VF.ttf`（可变字体，所以全字重都有真实字形）。
换机器或找不到字体时改脚本顶部的 `FONTS`。

## 本地预览

直接双击 `index.html`。数据放在 `data/league.js` 而不是 `.json`，
就是为了让 `file://` 也能读（`fetch` 本地 JSON 会被浏览器拦掉）。

## 更新数据

只维护 `data/league.js` 里的 `matches` 数组。每场比赛长这样：

```js
{ round: 1, date: "2026-10-08", home: "管院", away: "医技",
  hg: null, ag: null, status: "scheduled" },
```

比赛踢完后，**改成这样**：

```js
{ round: 1, date: "2026-10-08", home: "管院", away: "医技",
  hg: 2, ag: 1, status: "played" },
```

- `hg` / `ag` 是主客队进球数，**没踢就保持 `null`**
- `status`：`"scheduled"` 未赛 / `"played"` 已赛，**两个要一起改**
- `round` 是轮次，页面按它分组显示
- `home` / `away` 必须和 `teams` 里的写法**完全一致**

积分、净胜球、排名全部由页面自动算，**不要手填**。
排序规则：胜 3 分 / 平 1 分 / 负 0 分，依次比较 积分 → 净胜球 → 进球数 → 队名。
改赛制就改 `points`。

赛程已核对为**标准单循环**：8 队 × 每队 7 场 = 28 场，每两队恰好碰一次，共 7 轮。

## 发布到 GitHub Pages

建一个 **public** 仓库，然后在项目目录里：

```bash
git init
git add .
git commit -m "联赛积分榜"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

然后进仓库 **Settings → Pages**，Source 选 `Deploy from a branch`，
Branch 选 `main` + 目录 `/ (root)`，保存。等一两分钟，访问
`https://<你的用户名>.github.io/<仓库名>/`。

`.nojekyll` 这个空文件别删，它让 Pages 跳过 Jekyll 直接按静态文件发。

## 设计说明

- 设计语言沿用 `review_system` 那套：绿色页头 + 白色圆角卡片 + 标签页导航。
- 主绿 `#00873C`，**从官网校徽 PNG 采样**得到。学校规范写的是
  CMYK 100/0/100/20，但印刷值直接转屏幕会得到刺眼的 `#00CC00`，故以采样值为准。
  （注：你另一个项目用的 `#007a3d` 更暗一点，想统一改 `style.css` 里的 `--g` 即可。）
- 校徽是绿底圆盘，放绿页头上要给个白盘托住（`.brand__emblem` 的 `background:#fff`）。
- 手机端表格用 `table-layout: fixed` + 百分比列宽，**保证任意宽度都塞得进屏幕**；
  同时隐藏「进/失」两列。改列时留意 720px 那个媒体查询。
- 前三名高亮只在**确实有比赛结果**时才出现——全是 0 分时按拼音排序，
  高亮前三会让人误以为那就是名次。

## 待办

- 比分尚未录入，积分榜目前是 8 队全 0，页面会显示提示。
  首场比赛结果填进 `data/league.js` 后自动更新。
- 校徽源文件只有官网给得 100×100，页头显示 40–52px 够用；
  要做海报得找宣传部要矢量源文件。

校徽、校名版权归天津中医药大学，本页仅作联赛信息展示。
