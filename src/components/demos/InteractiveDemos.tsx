import { useMemo, useState } from "react";
import type { DemoKind } from "@/data/lessons";
import { getDemoSource } from "@/data/demo-sources";
import { Code2, ChevronDown, ChevronUp, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 交互 Demo：左侧讲解源码，右侧 React 模拟 Actix 运行时行为
 * （浏览器无法直接 cargo run，用可操作模型验证概念）。
 */
export function InteractiveDemo({
  kind,
  title,
  hint,
}: {
  kind: DemoKind;
  title: string;
  hint?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const source = getDemoSource(kind);

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border px-4 py-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            交互 Demo · 模拟运行时
          </p>
          <h3 className="mt-0.5 font-display text-base font-semibold text-fg">{title}</h3>
        </div>
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-muted transition-colors hover:text-fg"
        >
          <Code2 className="h-3.5 w-3.5" />
          {collapsed ? "展开模拟器" : "收起模拟器"}
          {collapsed ? (
            <ChevronDown className="h-3.5 w-3.5" />
          ) : (
            <ChevronUp className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
      <div className="p-4 sm:p-5">
        {hint ? <p className="mb-4 text-sm text-muted">{hint}</p> : null}
        {!collapsed ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <pre className="max-h-[380px] overflow-auto rounded-lg border border-border bg-code-bg p-3 font-mono text-[11px] leading-relaxed text-code-fg scrollbar-thin">
              <code>{source.code}</code>
            </pre>
            <DemoRuntime kind={kind} />
          </div>
        ) : (
          <p className="text-sm text-muted">模拟器已收起 — 展开后可改参数并观察响应。</p>
        )}
        <p className="mt-3 text-xs text-subtle">
          源码与模拟器对应同一概念（{source.title}）。真实项目请在本机{" "}
          <code className="rounded bg-surface-3 px-1 font-mono text-[10px]">cargo run</code>。
        </p>
      </div>
    </section>
  );
}

function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[280px] flex-col rounded-lg border border-border bg-surface-2 p-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Status({ code }: { code: number }) {
  const ok = code >= 200 && code < 300;
  return (
    <span
      className={cn(
        "rounded-md px-2 py-0.5 font-mono text-xs font-semibold",
        ok ? "bg-primary/15 text-primary" : "bg-danger/15 text-danger",
      )}
    >
      {code}
    </span>
  );
}

function DemoRuntime({ kind }: { kind: DemoKind }) {
  switch (kind) {
    case "hello-world":
      return <HelloDemo />;
    case "ownership":
      return <OwnershipDemo />;
    case "result-error":
      return <ResultDemo />;
    case "async-await":
      return <AsyncDemo />;
    case "config":
      return <ConfigDemo />;
    case "json-body":
      return <JsonDemo />;
    case "httpserver":
      return <ServerDemo />;
    case "app-routes":
      return <RoutesDemo />;
    case "responders":
      return <RespondersDemo />;
    case "scope-resource":
      return <ScopeDemo />;
    case "extractors":
      return <ExtractorsDemo />;
    case "path-query":
      return <PathQueryDemo />;
    case "app-data":
      return <AppDataDemo />;
    case "middleware":
      return <MiddlewareDemo />;
    case "auth-middleware":
      return <AuthDemo />;
    case "logging":
      return <LoggingDemo />;
    case "challenge":
      return <ChallengeDemo />;
    case "state":
      return <StateDemo />;
    case "testing":
      return <TestingDemo />;
    case "streaming":
      return <StreamingDemo />;
    case "websocket":
      return <WsDemo />;
    case "actor":
      return <ActorDemo />;
    default:
      return (
        <Panel>
          <p className="text-sm text-muted">暂无模拟器：{kind}</p>
        </Panel>
      );
  }
}

function HelloDemo() {
  const [path, setPath] = useState("/");
  const [log, setLog] = useState<string>("等待请求…");
  const [code, setCode] = useState(0);
  const go = () => {
    if (path === "/" || path === "") {
      setCode(200);
      setLog('200 OK  body: "Hello, Actix!"');
    } else {
      setCode(404);
      setLog("404 Not Found");
    }
  };
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">HttpServer 模拟</p>
      <label className="mt-3 text-xs text-muted">请求路径</label>
      <input
        value={path}
        onChange={(e) => setPath(e.target.value)}
        className="mt-1 rounded-md border border-border bg-bg px-2 py-1.5 font-mono text-sm text-fg"
      />
      <button
        type="button"
        onClick={go}
        className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-fg"
      >
        <Play className="h-3.5 w-3.5" /> GET
      </button>
      <div className="mt-auto pt-4">
        {code ? <Status code={code} /> : null}
        <pre className="mt-2 font-mono text-xs text-fg">{log}</pre>
      </div>
    </Panel>
  );
}

function OwnershipDemo() {
  const [owner, setOwner] = useState("main");
  const [alive, setAlive] = useState(true);
  const [msg, setMsg] = useState("name 的 owner 是 main");
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">所有权可视化</p>
      <p className="mt-2 font-mono text-sm text-fg">
        String "actix" → owner: <span className="text-primary">{alive ? owner : "dropped"}</span>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={!alive}
          className="rounded-md border border-border bg-bg px-2.5 py-1.5 text-xs text-fg disabled:opacity-40"
          onClick={() => {
            setMsg("borrows(&name)：借用，owner 仍是 main");
          }}
        >
          borrows(&name)
        </button>
        <button
          type="button"
          disabled={!alive}
          className="rounded-md border border-border bg-bg px-2.5 py-1.5 text-xs text-fg disabled:opacity-40"
          onClick={() => {
            setOwner("takes_ownership");
            setMsg("takes_ownership(name)：move 后 main 不能再用");
          }}
        >
          takes_ownership(name)
        </button>
        <button
          type="button"
          disabled={!alive || owner !== "takes_ownership"}
          className="rounded-md border border-border bg-bg px-2.5 py-1.5 text-xs text-fg disabled:opacity-40"
          onClick={() => {
            setAlive(false);
            setMsg("函数结束：drop，内存释放");
          }}
        >
          函数结束 drop
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted"
          onClick={() => {
            setOwner("main");
            setAlive(true);
            setMsg("重置");
          }}
        >
          <RotateCcw className="h-3 w-3" /> 重置
        </button>
      </div>
      <p className="mt-auto pt-4 text-sm text-muted">{msg}</p>
    </Panel>
  );
}

function ResultDemo() {
  const [id, setId] = useState("1");
  const [out, setOut] = useState("");
  const [code, setCode] = useState(0);
  const run = () => {
    const n = Number(id);
    if (!Number.isFinite(n) || n === 0) {
      setCode(400);
      setOut("Err → BadRequest invalid id");
    } else {
      setCode(200);
      setOut(`Ok → {"id": ${n}}`);
    }
  };
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">Result 分支</p>
      <label className="mt-3 text-xs text-muted">Path id</label>
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="mt-1 rounded-md border border-border bg-bg px-2 py-1.5 font-mono text-sm text-fg"
      />
      <button
        type="button"
        onClick={run}
        className="mt-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-fg"
      >
        调用 handler
      </button>
      <div className="mt-auto pt-4">
        {code ? <Status code={code} /> : null}
        <p className="mt-2 font-mono text-xs text-fg">{out}</p>
      </div>
    </Panel>
  );
}

function AsyncDemo() {
  const [busy, setBusy] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const run = async () => {
    setBusy(true);
    setLogs(["task A start", "task B start"]);
    await Promise.all([
      new Promise((r) => setTimeout(r, 400)),
      new Promise((r) => setTimeout(r, 600)),
    ]);
    setLogs((l) => [...l, "task A done (.await)", "task B done (.await)", "join complete"]);
    setBusy(false);
  };
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">async 并发</p>
      <p className="mt-2 text-xs text-muted">两个 sleep Future 并发等待，总耗时 ≈ max 而非 sum。</p>
      <button
        type="button"
        disabled={busy}
        onClick={run}
        className="mt-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-fg disabled:opacity-50"
      >
        {busy ? "awaiting…" : "spawn 两个 .await"}
      </button>
      <ul className="mt-auto space-y-1 pt-4 font-mono text-xs text-fg">
        {logs.map((l, i) => (
          <li key={i}>→ {l}</li>
        ))}
      </ul>
    </Panel>
  );
}

function ConfigDemo() {
  const [port, setPort] = useState("8080");
  const [mods, setMods] = useState(true);
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">配置 / 模块</p>
      <label className="mt-3 text-xs text-muted">PORT</label>
      <input
        value={port}
        onChange={(e) => setPort(e.target.value)}
        className="mt-1 rounded-md border border-border bg-bg px-2 py-1.5 font-mono text-sm text-fg"
      />
      <label className="mt-3 flex items-center gap-2 text-xs text-fg">
        <input type="checkbox" checked={mods} onChange={(e) => setMods(e.target.checked)} />
        拆分 handlers / models 模块
      </label>
      <pre className="mt-auto rounded-md bg-bg p-2 font-mono text-[11px] text-fg">
        {`bind 0.0.0.0:${port || "8080"}
deps: actix-web, serde
modules: ${mods ? "handlers, models, middleware" : "全在 main.rs"}`}
      </pre>
    </Panel>
  );
}

function JsonDemo() {
  const [raw, setRaw] = useState('{"title":"hi","body":"actix"}');
  const [code, setCode] = useState(0);
  const [out, setOut] = useState("");
  const run = () => {
    try {
      const o = JSON.parse(raw) as { title?: string; body?: string };
      if (!o.title || !o.body) {
        setCode(400);
        setOut("deserialize/validate failed");
        return;
      }
      setCode(201);
      setOut(JSON.stringify({ id: 1, ...o }, null, 2));
    } catch {
      setCode(400);
      setOut("invalid JSON");
    }
  };
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">web::Json 模拟</p>
      <textarea
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        rows={4}
        className="mt-2 rounded-md border border-border bg-bg px-2 py-1.5 font-mono text-xs text-fg"
      />
      <button
        type="button"
        onClick={run}
        className="mt-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-fg"
      >
        POST /notes
      </button>
      <div className="mt-auto pt-3">
        {code ? <Status code={code} /> : null}
        <pre className="mt-2 font-mono text-[11px] text-fg">{out}</pre>
      </div>
    </Panel>
  );
}

function ServerDemo() {
  const [workers, setWorkers] = useState(2);
  const [bound, setBound] = useState(false);
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">HttpServer</p>
      <label className="mt-3 text-xs text-muted">workers: {workers}</label>
      <input
        type="range"
        min={1}
        max={8}
        value={workers}
        onChange={(e) => setWorkers(Number(e.target.value))}
        className="mt-1 w-full"
      />
      <button
        type="button"
        onClick={() => setBound(true)}
        className="mt-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-fg"
      >
        bind 0.0.0.0:8080 & run
      </button>
      <div className="mt-auto grid grid-cols-4 gap-1 pt-4">
        {Array.from({ length: workers }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "rounded-md border px-1 py-3 text-center font-mono text-[10px]",
              bound
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-bg text-muted",
            )}
          >
            W{i + 1}
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted">
        {bound ? `已监听 · ${workers} 个 worker 各持 App 工厂克隆` : "尚未 bind"}
      </p>
    </Panel>
  );
}

function RoutesDemo() {
  const routes = [
    { method: "GET", path: "/hello/{name}", hit: "/hello/rust" },
    { method: "POST", path: "/echo", hit: "/echo" },
    { method: "GET", path: "/ping", hit: "/ping" },
  ];
  const [url, setUrl] = useState("/hello/rust");
  const [method, setMethod] = useState("GET");
  const match = routes.find(
    (r) =>
      r.method === method &&
      (r.hit === url ||
        (r.path.includes("{") && url.startsWith("/hello/") && method === "GET")),
  );
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">路由表</p>
      <ul className="mt-2 space-y-1 font-mono text-[11px] text-muted">
        {routes.map((r) => (
          <li key={r.path}>
            <span className="text-primary">{r.method}</span> {r.path}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex gap-2">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="rounded-md border border-border bg-bg px-2 text-xs text-fg"
        >
          <option>GET</option>
          <option>POST</option>
        </select>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 rounded-md border border-border bg-bg px-2 py-1 font-mono text-xs text-fg"
        />
      </div>
      <p className="mt-auto pt-4 text-sm">
        {match ? (
          <span className="text-primary">匹配 → {match.path}</span>
        ) : (
          <span className="text-danger">无匹配 → 404</span>
        )}
      </p>
    </Panel>
  );
}

function RespondersDemo() {
  const [kind, setKind] = useState<"str" | "json" | "404">("json");
  const map = {
    str: { code: 200, body: "ok" },
    json: { code: 200, body: '{"status":"up"}' },
    "404": { code: 404, body: "missing" },
  } as const;
  const r = map[kind];
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">Responder</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {(
          [
            ["str", "&str"],
            ["json", "web::Json"],
            ["404", "NotFound"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            className={cn(
              "rounded-full px-3 py-1 text-xs",
              kind === k ? "bg-primary text-primary-fg" : "bg-bg text-muted",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-auto pt-4">
        <Status code={r.code} />
        <pre className="mt-2 font-mono text-xs text-fg">{r.body}</pre>
      </div>
    </Panel>
  );
}

function ScopeDemo() {
  const [path, setPath] = useState("/api/v1/notes/3");
  const ok = path.startsWith("/api/v1/notes/");
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">scope /api/v1</p>
      <input
        value={path}
        onChange={(e) => setPath(e.target.value)}
        className="mt-3 rounded-md border border-border bg-bg px-2 py-1.5 font-mono text-xs text-fg"
      />
      <p className="mt-auto pt-4 text-sm">
        {ok ? (
          <span className="text-primary">
            scope 命中 · resource /notes/{"{id}"} · id=
            {path.split("/").pop()}
          </span>
        ) : (
          <span className="text-danger">未进入 /api/v1 scope</span>
        )}
      </p>
    </Panel>
  );
}

function ExtractorsDemo() {
  const steps = ["Path", "Query", "Json", "Data"];
  const [i, setI] = useState(0);
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">FromRequest 流水线</p>
      <ol className="mt-3 space-y-2">
        {steps.map((s, idx) => (
          <li
            key={s}
            className={cn(
              "rounded-md border px-2 py-1.5 font-mono text-xs",
              idx < i
                ? "border-primary/30 bg-primary/10 text-primary"
                : idx === i
                  ? "border-primary text-fg"
                  : "border-border text-muted",
            )}
          >
            {idx + 1}. web::{s}
            {idx < i ? " ✓" : idx === i ? " ← extracting" : ""}
          </li>
        ))}
      </ol>
      <button
        type="button"
        className="mt-auto rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-fg"
        onClick={() => setI((v) => (v >= steps.length ? 0 : v + 1))}
      >
        {i >= steps.length ? "重置" : "下一步提取"}
      </button>
    </Panel>
  );
}

function PathQueryDemo() {
  const [id, setId] = useState("42");
  const [q, setQ] = useState("actix");
  const [limit, setLimit] = useState("10");
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">Path + Query</p>
      <div className="mt-2 grid gap-2">
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="rounded-md border border-border bg-bg px-2 py-1 font-mono text-xs text-fg"
          placeholder="path id"
        />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="rounded-md border border-border bg-bg px-2 py-1 font-mono text-xs text-fg"
          placeholder="q"
        />
        <input
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="rounded-md border border-border bg-bg px-2 py-1 font-mono text-xs text-fg"
          placeholder="limit"
        />
      </div>
      <pre className="mt-auto rounded-md bg-bg p-2 font-mono text-[11px] text-fg">
        {`GET /items/${id}?q=${encodeURIComponent(q)}&limit=${limit}
Path<(u32,)> = (${id},)
Query { q: "${q}", limit: Some(${limit}) }`}
      </pre>
    </Panel>
  );
}

function AppDataDemo() {
  const [hits, setHits] = useState(0);
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">web::Data 计数</p>
      <p className="mt-4 font-display text-4xl font-semibold text-fg">{hits}</p>
      <button
        type="button"
        onClick={() => setHits((h) => h + 1)}
        className="mt-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-fg"
      >
        POST /hit
      </button>
      <p className="mt-auto pt-3 text-xs text-muted">
        Mutex 包装的 u64 计数，包在 Data 中，handler 注入后 +1
      </p>
    </Panel>
  );
}

function MiddlewareDemo() {
  const layers = ["Logger", "DefaultHeaders", "Handler"];
  const [phase, setPhase] = useState<"req" | "res">("req");
  const [idx, setIdx] = useState(0);
  const order = phase === "req" ? layers : [...layers].reverse();
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">中间件洋葱 · {phase === "req" ? "请求↓" : "响应↑"}</p>
      <ol className="mt-3 space-y-1">
        {order.map((name, i) => (
          <li
            key={name + i}
            className={cn(
              "rounded-md border px-2 py-1.5 text-xs",
              i === idx ? "border-primary bg-primary/10 text-primary" : "border-border text-muted",
            )}
          >
            {name}
          </li>
        ))}
      </ol>
      <button
        type="button"
        className="mt-auto rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-fg"
        onClick={() => {
          if (idx < order.length - 1) setIdx(idx + 1);
          else if (phase === "req") {
            setPhase("res");
            setIdx(0);
          } else {
            setPhase("req");
            setIdx(0);
          }
        }}
      >
        前进一步
      </button>
    </Panel>
  );
}

function AuthDemo() {
  const [token, setToken] = useState("");
  const [code, setCode] = useState(0);
  const [body, setBody] = useState("");
  const call = () => {
    if (token === "demo-token") {
      setCode(200);
      setBody('{"email":"demo@actix.dev"}');
    } else {
      setCode(401);
      setBody('{"message":"unauthorized"}');
    }
  };
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">Bearer 鉴权</p>
      <input
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Authorization token"
        className="mt-3 rounded-md border border-border bg-bg px-2 py-1.5 font-mono text-xs text-fg"
      />
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={() => setToken("demo-token")}
          className="rounded-md border border-border px-2 py-1 text-xs text-muted"
        >
          填入合法 token
        </button>
        <button
          type="button"
          onClick={call}
          className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-fg"
        >
          GET /me
        </button>
      </div>
      <div className="mt-auto pt-4">
        {code ? <Status code={code} /> : null}
        <pre className="mt-2 font-mono text-xs text-fg">{body}</pre>
      </div>
    </Panel>
  );
}

function LoggingDemo() {
  const [level, setLevel] = useState("info");
  const lines = useMemo(() => {
    const all = [
      { lv: "error", t: "db connection failed" },
      { lv: "warn", t: "slow request 1.2s" },
      { lv: "info", t: '127.0.0.1 "GET /health HTTP/1.1" 200' },
      { lv: "debug", t: "extracted Path id=3" },
    ];
    const order = ["error", "warn", "info", "debug"];
    const max = order.indexOf(level);
    return all.filter((l) => order.indexOf(l.lv) <= max);
  }, [level]);
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">RUST_LOG={level}</p>
      <input
        type="range"
        min={0}
        max={3}
        value={["error", "warn", "info", "debug"].indexOf(level)}
        onChange={(e) =>
          setLevel(["error", "warn", "info", "debug"][Number(e.target.value)]!)
        }
        className="mt-3 w-full"
      />
      <ul className="mt-auto space-y-1 pt-3 font-mono text-[11px] text-fg">
        {lines.map((l) => (
          <li key={l.t}>
            <span className="text-primary">[{l.lv}]</span> {l.t}
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function ChallengeDemo() {
  const [method, setMethod] = useState("GET");
  const ok =
    (method === "POST" && true) ||
    method === "GET" ||
    method === "PUT" ||
    method === "DELETE";
  const hint: Record<string, string> = {
    GET: "列表/读取 · 安全幂等",
    POST: "创建资源 · 非幂等",
    PUT: "全量更新 · 幂等",
    DELETE: "删除 · 幂等",
    PATCH: "部分更新",
  };
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">REST 方法选择</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMethod(m)}
            className={cn(
              "rounded-md px-2.5 py-1 font-mono text-xs",
              method === m ? "bg-primary text-primary-fg" : "bg-bg text-muted",
            )}
          >
            {m}
          </button>
        ))}
      </div>
      <p className="mt-auto pt-4 text-sm text-fg">{hint[method]}</p>
      <p className="text-xs text-muted">{ok ? "合理用于 /api/notes" : ""}</p>
    </Panel>
  );
}

function StateDemo() {
  const [notes, setNotes] = useState<{ id: number; title: string }[]>([
    { id: 1, title: "first" },
  ]);
  const [title, setTitle] = useState("");
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">内存 Db CRUD</p>
      <ul className="mt-2 max-h-28 space-y-1 overflow-auto">
        {notes.map((n) => (
          <li
            key={n.id}
            className="flex items-center justify-between rounded-md bg-bg px-2 py-1 text-xs"
          >
            <span className="font-mono text-fg">
              #{n.id} {n.title}
            </span>
            <button
              type="button"
              className="text-danger"
              onClick={() => setNotes((xs) => xs.filter((x) => x.id !== n.id))}
            >
              del
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex gap-2 pt-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
          className="flex-1 rounded-md border border-border bg-bg px-2 py-1 text-xs text-fg"
        />
        <button
          type="button"
          className="rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-fg"
          onClick={() => {
            if (!title.trim()) return;
            setNotes((xs) => [...xs, { id: Date.now(), title: title.trim() }]);
            setTitle("");
          }}
        >
          POST
        </button>
      </div>
    </Panel>
  );
}

function TestingDemo() {
  const [ran, setRan] = useState(false);
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">actix_web::test</p>
      <pre className="mt-2 font-mono text-[11px] text-muted">
        {`TestRequest::get().uri("/health")
assert status.is_success()`}
      </pre>
      <button
        type="button"
        onClick={() => setRan(true)}
        className="mt-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-fg"
      >
        运行测试
      </button>
      <p className="mt-auto pt-4 font-mono text-sm">
        {ran ? <span className="text-primary">test health_ok … ok</span> : "ready"}
      </p>
    </Panel>
  );
}

function StreamingDemo() {
  const [chunks, setChunks] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const run = async () => {
    setRunning(true);
    setChunks([]);
    for (const c of ["Hello ", "stream", "!"]) {
      await new Promise((r) => setTimeout(r, 350));
      setChunks((xs) => [...xs, c]);
    }
    setRunning(false);
  };
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">streaming body</p>
      <button
        type="button"
        disabled={running}
        onClick={run}
        className="mt-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-fg disabled:opacity-50"
      >
        开始推送 chunk
      </button>
      <p className="mt-auto font-mono text-lg text-fg pt-4">{chunks.join("") || "…"}</p>
    </Panel>
  );
}

function WsDemo() {
  const [msgs, setMsgs] = useState<string[]>(["<connected>"]);
  const [text, setText] = useState("ping");
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">WebSocket 示意</p>
      <ul className="mt-2 max-h-32 space-y-1 overflow-auto font-mono text-[11px] text-fg">
        {msgs.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
      <div className="mt-auto flex gap-2 pt-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 rounded-md border border-border bg-bg px-2 py-1 text-xs text-fg"
        />
        <button
          type="button"
          className="rounded-md bg-primary px-2 py-1 text-xs text-primary-fg"
          onClick={() => {
            setMsgs((m) => [...m, `→ ${text}`, `← echo: ${text}`]);
            setText("");
          }}
        >
          send
        </button>
      </div>
    </Panel>
  );
}

function ActorDemo() {
  const [queue, setQueue] = useState<string[]>([]);
  const [processed, setProcessed] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const enqueue = () => {
    const id = `CreateNote#${queue.length + processed.length + 1}`;
    setQueue((q) => [...q, id]);
  };
  const tick = async () => {
    if (busy || queue.length === 0) return;
    setBusy(true);
    const [head, ...rest] = queue;
    setQueue(rest);
    await new Promise((r) => setTimeout(r, 400));
    setProcessed((p) => [...p, head!]);
    setBusy(false);
  };
  return (
    <Panel>
      <p className="text-xs font-medium text-primary">Actor 邮箱</p>
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={enqueue}
          className="rounded-md border border-border px-2 py-1 text-xs text-fg"
        >
          send 消息
        </button>
        <button
          type="button"
          onClick={tick}
          className="rounded-md bg-primary px-2 py-1 text-xs text-primary-fg"
        >
          处理一条
        </button>
      </div>
      <p className="mt-3 text-xs text-muted">mailbox: {queue.join(", ") || "∅"}</p>
      <p className="mt-auto text-xs text-primary">
        done: {processed.join(", ") || "—"} {busy ? "(busy)" : ""}
      </p>
    </Panel>
  );
}
