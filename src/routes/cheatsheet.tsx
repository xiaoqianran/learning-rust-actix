import { createFileRoute, Link } from "@tanstack/react-router";
import { BookMarked } from "lucide-react";

export const Route = createFileRoute("/cheatsheet")({
  component: CheatsheetPage,
});

const SECTIONS: { title: string; items: { k: string; v: string }[] }[] = [
  {
    title: "Rust 核心",
    items: [
      { k: "ownership", v: "唯一 owner；离开作用域 drop" },
      { k: "&T / &mut T", v: "借用；同时只能有一个可变借用" },
      { k: "Result / ?", v: "可恢复错误；? 提前返回 Err" },
      { k: "async / .await", v: "Future；IO 等待时让出执行权" },
      { k: "Cargo.toml", v: "依赖与特性；edition = 2021" },
      { k: "serde derive", v: "Serialize / Deserialize ↔ JSON" },
    ],
  },
  {
    title: "Actix 启动",
    items: [
      { k: "HttpServer::new", v: "App 工厂闭包；每 worker 一份" },
      { k: ".bind().run()", v: "监听地址后 await 服务" },
      { k: "#[actix_web::main]", v: "启动异步运行时" },
      { k: ".workers(n)", v: "工作线程数" },
      { k: "App::new()", v: "路由、数据、中间件容器" },
    ],
  },
  {
    title: "路由",
    items: [
      { k: "#[get]/path\")", v: "宏属性 + .service(handler)" },
      { k: ".route(path, method.to(f))", v: "链式注册" },
      { k: "web::resource", v: "同路径挂多方法" },
      { k: "web::scope(\"/api\")", v: "前缀分组 / 版本化" },
      { k: "{id}", v: "动态段 → web::Path" },
    ],
  },
  {
    title: "提取器",
    items: [
      { k: "web::Path<T>", v: "路径参数；解析失败 400" },
      { k: "web::Query<T>", v: "查询串；需 Deserialize" },
      { k: "web::Json<T>", v: "JSON body（消费一次）" },
      { k: "web::Form<T>", v: "x-www-form-urlencoded" },
      { k: "web::Data<T>", v: "App 状态（Arc 语义）" },
      { k: "HttpRequest", v: "底层头 / 连接信息" },
    ],
  },
  {
    title: "响应与错误",
    items: [
      { k: "impl Responder", v: "str / String / Json / HttpResponse" },
      { k: "HttpResponse::Ok()", v: "状态码构建器" },
      { k: "web::Json(t)", v: "序列化 JSON 响应" },
      { k: "ResponseError", v: "自定义错误 → 状态码 + body" },
      { k: "201 / 204 / 401 / 404", v: "REST 常用状态码" },
    ],
  },
  {
    title: "中间件",
    items: [
      { k: ".wrap(mw)", v: "洋葱模型；外层先见请求" },
      { k: "Logger", v: "访问日志" },
      { k: "Compress", v: "响应压缩" },
      { k: "DefaultHeaders", v: "统一响应头" },
      { k: "actix-cors", v: "浏览器跨域" },
      { k: "鉴权中间件", v: "Bearer → extensions / 401" },
    ],
  },
  {
    title: "工程实践",
    items: [
      { k: "actix_web::test", v: "init_service + TestRequest" },
      { k: "RUST_LOG", v: "日志过滤" },
      { k: "PORT env", v: "12-factor 配置" },
      { k: "cargo build --release", v: "生产二进制" },
      { k: "JsonConfig::limit", v: "限制 body 大小" },
      { k: "argon2 / 参数化查询", v: "密码哈希 · 防注入" },
    ],
  },
];

function CheatsheetPage() {
  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <BookMarked className="h-3.5 w-3.5" />
          速查 · Actix-web 4
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg sm:text-3xl">
          Rust + Actix 速查表
        </h1>
        <p className="mt-2 text-sm text-muted">
          写 handler 时扫一眼。详细交互见{" "}
          <Link to="/" className="text-primary no-underline hover:underline">
            课程
          </Link>
          ；权威文档见{" "}
          <a
            href="https://actix.rs/docs/"
            target="_blank"
            rel="noreferrer"
            className="text-primary no-underline hover:underline"
          >
            actix.rs/docs
          </a>
          。
        </p>
      </header>

      <div className="space-y-5">
        {SECTIONS.map((sec) => (
          <section
            key={sec.title}
            className="overflow-hidden rounded-xl border border-border bg-surface"
          >
            <h2 className="border-b border-border bg-surface-2 px-4 py-2.5 text-sm font-semibold text-fg">
              {sec.title}
            </h2>
            <ul className="divide-y divide-border">
              {sec.items.map((it) => (
                <li
                  key={it.k}
                  className="grid gap-1 px-4 py-2.5 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-4"
                >
                  <code className="font-mono text-xs font-medium text-primary">{it.k}</code>
                  <span className="text-sm text-muted">{it.v}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
