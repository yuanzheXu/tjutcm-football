/* 天津中医药大学足球联赛 — 数据文件
 *
 * 日常只改这个文件。比赛结果是唯一数据源，
 * 积分榜、净胜球、排名全部由页面自动算出，不要手填。
 *
 * match 字段:
 *   round   轮次（页面按轮次分组显示）
 *   date    比赛日期 YYYY-MM-DD
 *   home    主队   —— 必须和 teams 里的写法完全一致
 *   away    客队
 *   hg/ag   比分    —— 还没踢就写 null
 *   status  "played" 已赛 / "scheduled" 未赛
 *   scorers 进球球员，可选。不写就一直显示"暂无记录"。
 *   assists 助攻球员，可选。格式同 scorers，影响助攻榜。
 *   yellow  黄牌数，可选。写 { home: 1, away: 1 }，赛程里画黄牌。
 *
 * 录入比分时把 hg/ag 填上数字、status 改成 "played" 即可。
 *
 * 想同时出射手榜，再加一个 scorers 字段，格式如下
 * （下面用的是占位符，真名等你给）：
 *
 *   scorers: { home: ["球员甲", "球员乙"], away: ["球员丙"] }
 *
 * home/away 数组里各写各队进球的人名，进几个球就写几个名字。
 * 点球照常写；乌龙球写进得利的那一边。
 * 不写 scorers 只影响射手榜显示"暂无记录"，别的榜单不受影响。
 *
 * 比分还没录、但又想让射手榜上先有人，用下面的 manualScorers 手填，
 * 它和 scorers 算出来的进球数会加在一起。
 *
 * 助攻榜同理，用 assists 字段，写进去的每个名字算 1 次助攻：
 *
 *   assists: { home: ["球员甲"], away: ["球员乙", "球员丙"] }
 *
 * 同一个人只要两边都写，就会同时出现在射手榜和助攻榜上。
 * 比分没录但想先挂助攻，用下面的 manualAssists 手填。
 */

window.LEAGUE = {
  name: "天津中医药大学足球联赛",
  season: "2026 赛季",
  updated: "2026-10-20",

  points: { win: 3, draw: 1, loss: 0 },

  teams: [
    "管院",
    "医技",
    "卫药联",
    "中西医",
    "研院",
    "中药",
    "护理",
    "中医",
  ],

  // 单循环 8 队 × 每队 7 场 = 28 场，共 7 轮
  matches: [
    // ── 第 1 轮 ──────────────────────────────
    { round: 1, date: "2026-10-08", home: "管院",   away: "医技",   hg: null, ag: null, status: "scheduled" },
    { round: 1, date: "2026-10-09", home: "中西医", away: "卫药联", hg: 2, ag: 3, status: "played",
      scorers: { away: ["喻天乐", "喻天乐", "喻天乐"] } },
    { round: 1, date: "2026-10-12", home: "研院",         away: "中药",         hg: null, ag: null, status: "scheduled" },
    { round: 1, date: "2026-10-13", home: "中医",         away: "护理",         hg: 3, ag: 2, status: "played" },

    // ── 第 2 轮 ──────────────────────────────
    { round: 2, date: "2026-10-14", home: "卫药联", away: "管院",         hg: 2, ag: 6, status: "played",
      scorers: { away: ["马正国", "马正国", "旦曾", "魏立铭", "董恒成", "董恒成"] },
      assists: { away: ["董恒成", "董恒成", "旦曾"] } },
    { round: 2, date: "2026-10-15", home: "医技",         away: "中西医",       hg: 5, ag: 0, status: "played" },
    { round: 2, date: "2026-10-19", home: "护理",         away: "研院",         hg: 2, ag: 3, status: "played",
      yellow: { home: 1, away: 1 } },
    { round: 2, date: "2026-10-20", home: "中药",         away: "中医",         hg: null, ag: null, status: "scheduled" },

    // ── 第 3 轮 ──────────────────────────────
    { round: 3, date: "2026-10-21", home: "管院",         away: "中西医",       hg: null, ag: null, status: "scheduled" },
    { round: 3, date: "2026-10-22", home: "医技",         away: "卫药联", hg: null, ag: null, status: "scheduled" },
    { round: 3, date: "2026-10-26", home: "中医",         away: "研院",         hg: null, ag: null, status: "scheduled" },
    { round: 3, date: "2026-10-27", home: "中药",         away: "护理",         hg: null, ag: null, status: "scheduled" },

    // ── 第 4 轮 ──────────────────────────────
    { round: 4, date: "2026-10-28", home: "研院",         away: "管院",         hg: null, ag: null, status: "scheduled" },
    { round: 4, date: "2026-10-29", home: "中药",         away: "医技",         hg: null, ag: null, status: "scheduled" },
    { round: 4, date: "2026-11-02", home: "护理",         away: "卫药联", hg: null, ag: null, status: "scheduled" },
    { round: 4, date: "2026-11-03", home: "中西医",       away: "中医",         hg: null, ag: null, status: "scheduled" },

    // ── 第 5 轮 ──────────────────────────────
    { round: 5, date: "2026-11-04", home: "管院",         away: "中药",         hg: null, ag: null, status: "scheduled" },
    { round: 5, date: "2026-11-05", home: "医技",         away: "护理",         hg: null, ag: null, status: "scheduled" },
    { round: 5, date: "2026-11-09", home: "中医",         away: "卫药联", hg: null, ag: null, status: "scheduled" },
    { round: 5, date: "2026-11-10", home: "研院",         away: "中西医",       hg: null, ag: null, status: "scheduled" },

    // ── 第 6 轮 ──────────────────────────────
    { round: 6, date: "2026-11-11", home: "护理",         away: "管院",         hg: null, ag: null, status: "scheduled" },
    { round: 6, date: "2026-11-12", home: "中医",         away: "医技",         hg: null, ag: null, status: "scheduled" },
    { round: 6, date: "2026-11-16", home: "卫药联", away: "研院",         hg: null, ag: null, status: "scheduled" },
    { round: 6, date: "2026-11-17", home: "中西医",       away: "中药",         hg: null, ag: null, status: "scheduled" },

    // ── 第 7 轮 ──────────────────────────────
    { round: 7, date: "2026-11-18", home: "管院",         away: "中医",         hg: null, ag: null, status: "scheduled" },
    { round: 7, date: "2026-11-19", home: "医技",         away: "研院",         hg: null, ag: null, status: "scheduled" },
    { round: 7, date: "2026-11-23", home: "中药",         away: "卫药联", hg: null, ag: null, status: "scheduled" },
    { round: 7, date: "2026-11-24", home: "护理",         away: "中西医",       hg: null, ag: null, status: "scheduled" },
  ],

  // 手工补录的进球，只影响射手榜。
  // 用在比分还没录、但射手榜想先有人名的时候。
  //   name   球员姓名
  //   team   队名，必须和上面 teams 里写法一致；不知道就写 ""，页面上不显示队名
  //   goals  进球数
  // 等这些球对应的比赛录进 matches 之后，把这里的条目删掉，
  // 否则同一批进球会被算两遍。
  // 现在是空的：喻天乐那 3 球已经挂到 10-09 那场上了。
  manualScorers: [],

  // 手工补录的助攻，只影响助攻榜。字段和 manualScorers 一样，
  // 只是把 goals 换成 assists。等对应比赛录进 matches 后同样要删掉，避免算两遍。
  //   name     球员姓名
  //   team     队名，不知道就写 ""
  //   assists  助攻数
  manualAssists: [
    { team: "卫药联", name: "陈勃宏", assists: 2 },
  ],
};
