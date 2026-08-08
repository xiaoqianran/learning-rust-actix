import { useMemo, useState } from "react";
import type { RustPreset } from "@/data/rust-presets";
import { cn } from "@/lib/utils";
import { FileCode2, Play } from "lucide-react";

type Props = {
  preset: RustPreset;
  className?: string;
};

/**
 * 多文件 Rust/Actix 模板阅读器 + 请求模拟（浏览器内无法 cargo run）。
 */
export function RustPlayground({ preset, className }: Props) {
  const [fileIdx, setFileIdx] = useState(0);
  const file = preset.files[fileIdx] ?? preset.files[0]!;
  const [result, setResult] = useState<string>("");

  const tryReq = preset.tryRequest;

  const runSim = () => {
    if (!tryReq) {
      setResult("此模板无可模拟请求");
      return;
    }
    setResult(
      `${tryReq.method} ${tryReq.path}\n→ ${tryReq.expectStatus}\n${tryReq.expectBody || "(empty body)"}\n\n(浏览器模拟；本机请 cargo run 后用 curl 验证)`,
    );
  };

  const filesKey = useMemo(() => preset.files.map((f) => f.path).join("|"), [preset]);

  return (
    <div
      key={filesKey}
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface shadow-soft",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-surface-2 px-2 py-1.5">
        {preset.files.map((f, i) => (
          <button
            key={f.path}
            type="button"
            onClick={() => setFileIdx(i)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-[11px] transition-colors",
              i === fileIdx
                ? "bg-surface text-primary"
                : "text-muted hover:text-fg",
            )}
          >
            <FileCode2 className="h-3.5 w-3.5" />
            {f.path}
          </button>
        ))}
      </div>
      <pre className="max-h-[420px] overflow-auto p-4 font-mono text-[12px] leading-relaxed text-code-fg bg-code-bg scrollbar-thin">
        <code>{file.code}</code>
      </pre>
      {tryReq ? (
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-4 py-3">
          <p className="font-mono text-xs text-muted">
            模拟 {tryReq.method} {tryReq.path}
            {tryReq.body ? ` · body ${tryReq.body}` : ""}
          </p>
          <button
            type="button"
            onClick={runSim}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-fg"
          >
            <Play className="h-3.5 w-3.5" />
            模拟请求
          </button>
        </div>
      ) : null}
      {result ? (
        <pre className="border-t border-border bg-bg px-4 py-3 font-mono text-[11px] text-fg">
          {result}
        </pre>
      ) : null}
    </div>
  );
}
