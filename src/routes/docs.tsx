import { createFileRoute, Link } from "@tanstack/react-router";
import { DOC_SECTIONS, getDocsCoverage } from "@/data/docs-map";
import { getLesson } from "@/data/lessons";
import { BookOpen, ExternalLink, Library, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/docs")({
  component: DocsMapPage,
});

function DocsMapPage() {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const llms = `${base}/llms.txt`;
  const llmsFull = `${base}/llms-full.txt`;
  const coverage = getDocsCoverage();
  const [q, setQ] = useState("");

  const sections = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return DOC_SECTIONS;
    return DOC_SECTIONS.map((sec) => ({
      ...sec,
      items: sec.items.filter(
        (it) =>
          it.title.toLowerCase().includes(query) ||
          it.lessonSlug?.toLowerCase().includes(query) ||
          it.note?.toLowerCase().includes(query) ||
          it.official.toLowerCase().includes(query) ||
          sec.title.toLowerCase().includes(query),
      ),
    })).filter((sec) => sec.items.length > 0);
  }, [q]);

  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <Library className="h-3.5 w-3.5" />
          对照官方
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg sm:text-3xl">文档地图</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          按{" "}
          <a
            href="https://actix.rs/docs/"
            target="_blank"
            rel="noreferrer"
            className="text-primary no-underline hover:underline"
          >
            actix.rs/docs
          </a>{" "}
          与 Rust Book 结构整理。左侧官方权威文档，右侧本站交互课。我们做「动手 + 源码对照 + 测验 +
          工坊」，官网做「规范全文 + API」。
        </p>
      </header>

      <div className="mb-5 rounded-xl border border-border bg-surface p-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-muted">对照官方覆盖</p>
            <p className="mt-0.5 font-display text-2xl font-semibold tabular-nums text-fg">
              {coverage.percent}%
            </p>
            <p className="text-xs text-subtle">
              {coverage.linked}/{coverage.total} 条目已挂本站课
            </p>
          </div>
          <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-surface-3 sm:w-48">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${coverage.percent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mb-6 space-y-3 rounded-xl border border-border bg-surface-2 px-4 py-3 text-xs leading-relaxed text-muted">
        <p>
          <span className="font-medium text-fg">本站 LLM 文件：</span>
          <a className="mx-1 text-primary hover:underline" href={llms} target="_blank" rel="noreferrer">
            llms.txt
          </a>
          ·
          <a
            className="mx-1 text-primary hover:underline"
            href={llmsFull}
            target="_blank"
            rel="noreferrer"
          >
            llms-full.txt
          </a>
        </p>
        <p>
          官方资源：
          <a
            className="mx-1 text-primary hover:underline"
            href="https://actix.rs/docs/"
            target="_blank"
            rel="noreferrer"
          >
            actix.rs/docs
          </a>
          ·
          <a
            className="mx-1 text-primary hover:underline"
            href="https://docs.rs/actix-web/"
            target="_blank"
            rel="noreferrer"
          >
            docs.rs/actix-web
          </a>
          ·
          <a
            className="mx-1 text-primary hover:underline"
            href="https://doc.rust-lang.org/book/"
            target="_blank"
            rel="noreferrer"
          >
            Rust Book
          </a>
        </p>
      </div>

      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜索文档条目…"
          className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-3 text-sm text-fg placeholder:text-subtle outline-none focus:border-primary"
        />
      </div>

      <div className="space-y-6">
        {sections.map((sec) => (
          <section key={sec.id}>
            <h2 className="mb-2 font-display text-sm font-semibold text-fg">{sec.title}</h2>
            <ul className="overflow-hidden rounded-xl border border-border bg-surface divide-y divide-border">
              {sec.items.map((it) => {
                const lesson = it.lessonSlug ? getLesson(it.lessonSlug) : undefined;
                return (
                  <li
                    key={it.title + it.official}
                    className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-fg">{it.title}</p>
                      {it.note ? <p className="text-xs text-subtle">{it.note}</p> : null}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={it.official}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted no-underline hover:text-fg",
                        )}
                      >
                        官方
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      {lesson ? (
                        <Link
                          to="/lesson/$slug"
                          params={{ slug: lesson.slug }}
                          className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-medium text-primary no-underline"
                        >
                          <BookOpen className="h-3 w-3" />
                          本站课
                        </Link>
                      ) : (
                        <span className="text-[11px] text-subtle">暂无课</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
