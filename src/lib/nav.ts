import {
  Award,
  BookMarked,
  BookOpen,
  BookX,
  Code2,
  FlaskConical,
  LayoutDashboard,
  Library,
  Server,
  type LucideIcon,
} from "lucide-react";
import type { Lesson } from "@/data/lessons";
import { LESSONS, TRACKS, getCourseLessons } from "@/data/lessons";

/** 用户向路径命名（序号 + 短名） */
export const TRACK_META: Record<Lesson["track"], { order: number; label: string; blurb: string }> =
  {
    Rust基础: { order: 1, label: "① Rust 基础", blurb: "所有权 · async · Serde" },
    Actix入门: { order: 2, label: "② Actix 入门", blurb: "Server · 路由 · Handler" },
    请求提取: { order: 3, label: "③ 请求提取", blurb: "Path · Query · Json · Data" },
    中间件状态: { order: 4, label: "④ 中间件", blurb: "Logger · 鉴权 · 错误" },
    REST实战: { order: 5, label: "⑤ REST 实战", blurb: "CRUD · Token · 校验" },
    工程化: { order: 6, label: "⑥ 工程化", blurb: "测试 · 配置 · 部署" },
    进阶模式: { order: 7, label: "⑦ 进阶模式", blurb: "流 · WS · 安全 · 面试" },
    官方对齐: { order: 8, label: "⑧ 文档补全", blurb: "对照 actix.rs · 可选" },
  };

export function trackLabel(track: Lesson["track"]) {
  return TRACK_META[track]?.label ?? track;
}

export function orderedTracks(): Lesson["track"][] {
  return [...TRACKS].sort((a, b) => (TRACK_META[a]?.order ?? 99) - (TRACK_META[b]?.order ?? 99));
}

export function getValidCompleted(completed: string[]): string[] {
  const set = new Set(LESSONS.map((l) => l.slug));
  return completed.filter((s) => set.has(s));
}

export function completedCount(completed: string[]): number {
  const set = new Set(getValidCompleted(completed));
  return getCourseLessons().filter((l) => set.has(l.slug)).length;
}

export function progressPercent(completed: string[]): number {
  const core = getCourseLessons();
  if (core.length === 0) return 0;
  return Math.round((completedCount(completed) / core.length) * 100);
}

export function isAllComplete(completed: string[]): boolean {
  return getCourseLessons().every((l) => completed.includes(l.slug));
}

export function getContinueLesson(completed: string[]): Lesson {
  const coreNext = getCourseLessons().find((l) => !completed.includes(l.slug));
  if (coreNext) return coreNext;
  const next = LESSONS.find((l) => !completed.includes(l.slug));
  if (next) return next;
  return LESSONS[LESSONS.length - 1] ?? LESSONS[0]!;
}

export function getContinueHref(completed: string[]): {
  kind: "lesson" | "certificate";
  slug?: string;
} {
  if (isAllComplete(completed)) return { kind: "certificate" };
  return { kind: "lesson", slug: getContinueLesson(completed).slug };
}

export type NavItem = {
  to:
    | "/"
    | "/docs"
    | "/cheatsheet"
    | "/studio"
    | "/playground"
    | "/lab"
    | "/hub"
    | "/mistakes"
    | "/certificate";
  label: string;
  hint?: string;
  icon: LucideIcon;
};

export const NAV_PRIMARY: NavItem[] = [
  { to: "/docs", label: "文档", hint: "查 · actix.rs 对照地图", icon: Library },
  { to: "/studio", label: "工坊", hint: "练 · 模拟 REST 闯关", icon: Server },
  { to: "/hub", label: "进度", hint: "我 · 学习中心", icon: LayoutDashboard },
];

export const NAV_TOOLS: NavItem[] = [
  { to: "/cheatsheet", label: "速查表", hint: "写码时扫一眼", icon: BookMarked },
  { to: "/playground", label: "代码操场", hint: "Actix 项目模板", icon: Code2 },
  { to: "/lab", label: "练习场", hint: "刷测验题", icon: FlaskConical },
  { to: "/mistakes", label: "错题本", hint: "错题重练", icon: BookX },
  { to: "/certificate", label: "结业证书", hint: "全部完成后解锁", icon: Award },
];

export const NAV_HOME: NavItem = {
  to: "/",
  label: "学 · 首页",
  hint: "路径与大纲",
  icon: BookOpen,
};
