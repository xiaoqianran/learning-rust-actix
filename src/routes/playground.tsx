import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { RUST_PRESETS, getPreset } from "@/data/rust-presets";
import { RustPlayground } from "@/components/RustPlayground";
import { Code2, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

type PlaygroundSearch = {
  example?: string;
};

export const Route = createFileRoute("/playground")({
  validateSearch: (search: Record<string, unknown>): PlaygroundSearch => ({
    example:
      typeof search.example === "string" && search.example.length > 0
        ? search.example
        : undefined,
  }),
  component: PlaygroundPage,
});

function PlaygroundPage() {
  const { example } = Route.useSearch();
  const [activeId, setActiveId] = useState(example ?? "hello");
  const preset = useMemo(() => getPreset(activeId), [activeId]);

  return (
    <div className="mx-auto max-w-5xl pb-16">
      <header className="mb-5">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <Code2 className="h-3.5 w-3.5" />
          Actix 项目模板
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
          代码操场
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          多文件{" "}
          <code className="rounded-sm bg-surface-3 px-1.5 py-0.5 font-mono text-xs text-primary">
            actix-web
          </code>{" "}
          模板：阅读完整 crate 结构，一键模拟请求。浏览器内无法真正{" "}
          <code className="rounded-sm bg-surface-3 px-1 font-mono text-[11px]">cargo run</code>
          ，请把代码拷到本机验证。
        </p>
      </header>

      <div className="mb-4 flex flex-wrap gap-2">
        {RUST_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActiveId(p.id)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-150",
              activeId === p.id
                ? "bg-primary text-primary-fg"
                : "bg-surface-3 text-muted hover:text-fg",
            )}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm">
          <span className="font-medium text-fg">{preset.title}</span>
          <span className="text-muted"> · {preset.summary}</span>
        </div>
        <p className="inline-flex items-center gap-1.5 text-[11px] text-subtle">
          <Terminal className="h-3 w-3" />
          本机：cargo new && 粘贴文件 && cargo run
        </p>
      </div>

      <RustPlayground key={preset.id} preset={preset} />

      <aside className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          {
            t: "读结构",
            d: "Cargo.toml + main.rs 对照课内知识点，看清依赖与入口。",
          },
          {
            t: "模拟请求",
            d: "用内置模拟器看期望状态码与 body，建立 HTTP 心智模型。",
          },
          {
            t: "本机运行",
            d: "复制到本地 cargo 工程，用 curl / httpie 做真实验证。",
          },
        ].map((item) => (
          <div
            key={item.t}
            className="rounded-lg border border-border bg-surface-2 px-3.5 py-3"
          >
            <p className="text-sm font-medium text-fg">{item.t}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{item.d}</p>
          </div>
        ))}
      </aside>
    </div>
  );
}
