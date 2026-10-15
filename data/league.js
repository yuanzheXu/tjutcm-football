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
 *
 * 录入比分时把 hg/ag 填上数字、status 改成 "played" 即可。
 */

window.LEAGUE = {
  name: "天津中医药大学足球联赛",
  season: "2026 赛季",
  updated: "2026-10-15",

  points: { win: 3, draw: 1, loss: 0 },

  teams: [
    "管院",
    "医技",
    "公卫制药联队",
    "中西医",
    "研院",
    "中药",
    "护理",
    "中医",
  ],

  // 单循环 8 队 × 每队 7 场 = 28 场，共 7 轮
  matches: [
    // ── 第 1 轮 ──────────────────────────────
    { round: 1, date: "2026-10-08", home: "管院",         away: "医技",         hg: null, ag: null, status: "scheduled" },
    { round: 1, date: "2026-10-09", home: "中西医",       away: "公卫制药联队", hg: null, ag: null, status: "scheduled" },
    { round: 1, date: "2026-10-12", home: "研院",         away: "中药",         hg: null, ag: null, status: "scheduled" },
    { round: 1, date: "2026-10-13", home: "中医",         away: "护理",         hg: null, ag: null, status: "scheduled" },

    // ── 第 2 轮 ──────────────────────────────
    { round: 2, date: "2026-10-14", home: "公卫制药联队", away: "管院",         hg: null, ag: null, status: "scheduled" },
    { round: 2, date: "2026-10-15", home: "医技",         away: "中西医",       hg: null, ag: null, status: "scheduled" },
    { round: 2, date: "2026-10-19", home: "护理",         away: "研院",         hg: null, ag: null, status: "scheduled" },
    { round: 2, date: "2026-10-20", home: "中药",         away: "中医",         hg: null, ag: null, status: "scheduled" },

    // ── 第 3 轮 ──────────────────────────────
    { round: 3, date: "2026-10-21", home: "管院",         away: "中西医",       hg: null, ag: null, status: "scheduled" },
    { round: 3, date: "2026-10-22", home: "医技",         away: "公卫制药联队", hg: null, ag: null, status: "scheduled" },
    { round: 3, date: "2026-10-26", home: "中医",         away: "研院",         hg: null, ag: null, status: "scheduled" },
    { round: 3, date: "2026-10-27", home: "中药",         away: "护理",         hg: null, ag: null, status: "scheduled" },

    // ── 第 4 轮 ──────────────────────────────
    { round: 4, date: "2026-10-28", home: "研院",         away: "管院",         hg: null, ag: null, status: "scheduled" },
    { round: 4, date: "2026-10-29", home: "中药",         away: "医技",         hg: null, ag: null, status: "scheduled" },
    { round: 4, date: "2026-11-02", home: "护理",         away: "公卫制药联队", hg: null, ag: null, status: "scheduled" },
    { round: 4, date: "2026-11-03", home: "中西医",       away: "中医",         hg: null, ag: null, status: "scheduled" },

    // ── 第 5 轮 ──────────────────────────────
    { round: 5, date: "2026-11-04", home: "管院",         away: "中药",         hg: null, ag: null, status: "scheduled" },
    { round: 5, date: "2026-11-05", home: "医技",         away: "护理",         hg: null, ag: null, status: "scheduled" },
    { round: 5, date: "2026-11-09", home: "中医",         away: "公卫制药联队", hg: null, ag: null, status: "scheduled" },
    { round: 5, date: "2026-11-10", home: "研院",         away: "中西医",       hg: null, ag: null, status: "scheduled" },

    // ── 第 6 轮 ──────────────────────────────
    { round: 6, date: "2026-11-11", home: "护理",         away: "管院",         hg: null, ag: null, status: "scheduled" },
    { round: 6, date: "2026-11-12", home: "中医",         away: "医技",         hg: null, ag: null, status: "scheduled" },
    { round: 6, date: "2026-11-16", home: "公卫制药联队", away: "研院",         hg: null, ag: null, status: "scheduled" },
    { round: 6, date: "2026-11-17", home: "中西医",       away: "中药",         hg: null, ag: null, status: "scheduled" },

    // ── 第 7 轮 ──────────────────────────────
    { round: 7, date: "2026-11-18", home: "管院",         away: "中医",         hg: null, ag: null, status: "scheduled" },
    { round: 7, date: "2026-11-19", home: "医技",         away: "研院",         hg: null, ag: null, status: "scheduled" },
    { round: 7, date: "2026-11-23", home: "中药",         away: "公卫制药联队", hg: null, ag: null, status: "scheduled" },
    { round: 7, date: "2026-11-24", home: "护理",         away: "中西医",       hg: null, ag: null, status: "scheduled" },
  ],
};
