export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explain: string;
};

export type DemoKind =
  | "hello-world"
  | "ownership"
  | "result-error"
  | "async-await"
  | "config"
  | "json-body"
  | "httpserver"
  | "app-routes"
  | "responders"
  | "scope-resource"
  | "extractors"
  | "path-query"
  | "app-data"
  | "middleware"
  | "auth-middleware"
  | "logging"
  | "challenge"
  | "state"
  | "testing"
  | "streaming"
  | "websocket"
  | "actor";

export type LessonBlock =
  | { type: "text"; title?: string; body: string }
  | { type: "code"; title?: string; lang?: string; code: string }
  | { type: "tip"; body: string }
  | { type: "demo"; kind: DemoKind; title: string; hint?: string }
  | { type: "quiz"; questions: QuizQuestion[] };

export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  level: "入门" | "进阶" | "实战";
  track:
    | "Rust基础"
    | "Actix入门"
    | "请求提取"
    | "中间件状态"
    | "REST实战"
    | "工程化"
    | "进阶模式"
    | "官方对齐";
  format?: "course" | "reference";
  minutes: number;
  official?: string;
  blocks: LessonBlock[];
};

export const LESSONS: Lesson[] = [
  {
    slug: "intro",
    title: "Rust + Actix 是什么",
    summary: "系统级语言遇上高性能 Web 框架。",
    level: "入门",
    track: "Rust基础",
    minutes: 8,
    blocks: [
      { type: "text", title: "为什么学这套组合", body: "Rust 提供内存安全与零成本抽象；actix-web 是基于 Actor 模型的高性能异步 HTTP 框架，在 TechEmpower 等基准中长期名列前茅。\n\n本站路径：先补齐 Rust 异步与错误处理直觉，再进 HttpServer / App / 提取器 / 中间件，最后在「工坊」用模拟 REST API 练登录与笔记 CRUD。" },
      { type: "code", title: "最小 Actix 服务", lang: "rust", code: `use actix_web::{get, App, HttpServer, Responder};

#[get("/")]
async fn hello() -> impl Responder {
    "Hello, Actix!"
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(hello))
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}` },
      { type: "demo", kind: "hello-world", title: "动手：Hello 请求路径" },
      { type: "quiz", questions: [
              {
                      "id": "i1",
                      "question": "Actix-web 主要定位？",
                      "options": [
                              "前端框架",
                              "异步 HTTP 服务框架",
                              "ORM",
                              "包管理器"
                      ],
                      "answer": 1,
                      "explain": "HTTP 服务端框架。"
              },
              {
                      "id": "i2",
                      "question": "最小服务需要？",
                      "options": [
                              "仅 main",
                              "HttpServer + App + handler",
                              "仅 React",
                              "仅 Cargo.toml"
                      ],
                      "answer": 1,
                      "explain": "三件套。"
              }
      ] },
    ],
  },
  {
    slug: "ownership",
    title: "所有权与借用",
    summary: "移动、借用、生命周期直觉。",
    level: "入门",
    track: "Rust基础",
    minutes: 12,
    blocks: [
      { type: "text", title: "所有权规则", body: "每个值有唯一 owner；owner 离开作用域即 drop。传参默认 move；用 &T / &mut T 借用。Web 服务里 handler 常常拿借用的 AppData、Path 字符串切片或 owned String。" },
      { type: "code", title: "对应源码 · 移动与借用", lang: "rust", code: `fn takes_ownership(s: String) {
    println!("{s}");
} // s drop

fn borrows(s: &str) {
    println!("{s}");
}

fn main() {
    let name = String::from("actix");
    borrows(&name);           // 借用，name 仍可用
    takes_ownership(name);    // move
    // println!("{name}");    // 编译错误
}` },
      { type: "demo", kind: "ownership", title: "动手：所有权可视化" },
      { type: "tip", body: "在 handler 里优先用提取器得到 owned 数据（Path<String>、Json<T>），避免和请求生命周期纠缠。" },
      { type: "quiz", questions: [
              {
                      "id": "o1",
                      "question": "默认传 String 参数？",
                      "options": [
                              "复制",
                              "移动 ownership",
                              "永远借用",
                              "泄漏"
                      ],
                      "answer": 1,
                      "explain": "move。"
              },
              {
                      "id": "o2",
                      "question": "只读借用写法？",
                      "options": [
                              "*T",
                              "&T",
                              "mut T",
                              "Box<T>"
                      ],
                      "answer": 1,
                      "explain": "&T。"
              }
      ] },
    ],
  },
  {
    slug: "types-result",
    title: "类型、Result 与 ?",
    summary: "错误传播是 Web 的日常。",
    level: "入门",
    track: "Rust基础",
    minutes: 10,
    blocks: [
      { type: "text", title: "Result 是一等公民", body: "Rust 没有异常栈展开；可恢复错误用 Result<T, E>。? 运算符在函数返回 Result 时把 Err 提前返回。Actix handler 可返回 Result<impl Responder, Error>。" },
      { type: "code", title: "对应源码 · ? 传播", lang: "rust", code: `use actix_web::{web, HttpResponse, Result};

async fn user(path: web::Path<u32>) -> Result<HttpResponse> {
    let id = path.into_inner();
    if id == 0 {
        return Ok(HttpResponse::BadRequest().body("invalid id"));
    }
    Ok(HttpResponse::Ok().json(serde_json::json!({ "id": id })))
}` },
      { type: "demo", kind: "result-error", title: "动手：Result 分支" },
      { type: "quiz", questions: [
              {
                      "id": "r1",
                      "question": "? 用在？",
                      "options": [
                              "返回 Result/Option 的函数",
                              "任意函数",
                              "仅 main",
                              "仅宏"
                      ],
                      "answer": 0,
                      "explain": "错误传播。"
              },
              {
                      "id": "r2",
                      "question": "Actix handler 错误常返回？",
                      "options": [
                              "panic",
                              "Result + Error",
                              "null",
                              "undefined"
                      ],
                      "answer": 1,
                      "explain": "类型化错误。"
              }
      ] },
    ],
  },
  {
    slug: "async-await",
    title: "async / await 与运行时",
    summary: "Future、.await、#[actix_web::main]。",
    level: "入门",
    track: "Rust基础",
    minutes: 12,
    blocks: [
      { type: "text", title: "异步不阻塞线程", body: "async fn 返回 Future；.await 在等待 IO 时让出执行权。actix-web 内置/集成 tokio 运行时；入口常用 #[actix_web::main]。不要在 async 里做重 CPU 阻塞，应 spawn_blocking。" },
      { type: "code", title: "对应源码 · 异步 handler", lang: "rust", code: `use actix_web::{get, web, Responder};
use std::time::Duration;

#[get("/slow")]
async fn slow() -> impl Responder {
    // 模拟 IO
    tokio::time::sleep(Duration::from_millis(50)).await;
    "done"
}` },
      { type: "demo", kind: "async-await", title: "动手：并发等待" },
      { type: "quiz", questions: [
              {
                      "id": "a1",
                      "question": ".await 作用？",
                      "options": [
                              "开新线程必用",
                              "等待 Future 完成",
                              "编译成同步",
                              "仅循环"
                      ],
                      "answer": 1,
                      "explain": "轮询 Future。"
              },
              {
                      "id": "a2",
                      "question": "Actix 入口宏？",
                      "options": [
                              "#[tokio::test] only",
                              "#[actix_web::main]",
                              "#[sync]",
                              "fn main 禁止 async"
                      ],
                      "answer": 1,
                      "explain": "启动运行时。"
              }
      ] },
    ],
  },
  {
    slug: "cargo-mod",
    title: "Cargo 与模块",
    summary: "crate、mod、依赖声明。",
    level: "入门",
    track: "Rust基础",
    minutes: 8,
    blocks: [
      { type: "text", title: "工程骨架", body: "cargo new --bin api 创建二进制 crate。Cargo.toml 声明 actix-web、serde、serde_json 等。用 mod 拆 handlers / models / middleware，lib.rs 或 main.rs 组织模块树。" },
      { type: "code", title: "Cargo.toml 片段", lang: "rust", code: `[package]
name = "learning-api"
version = "0.1.0"
edition = "2021"

[dependencies]
actix-web = "4"
serde = { version = "1", features = ["derive"] }
serde_json = "1"
env_logger = "0.11"
log = "0.4"` },
      { type: "demo", kind: "config", title: "动手：依赖与模块树" },
      { type: "quiz", questions: [
              {
                      "id": "c1",
                      "question": "添加依赖写在？",
                      "options": [
                              "main.rs",
                              "Cargo.toml",
                              "package.json",
                              ".env"
                      ],
                      "answer": 1,
                      "explain": "Cargo.toml。"
              },
              {
                      "id": "c2",
                      "question": "子模块关键字？",
                      "options": [
                              "import",
                              "mod",
                              "package",
                              "use only"
                      ],
                      "answer": 1,
                      "explain": "mod。"
              }
      ] },
    ],
  },
  {
    slug: "serde-json",
    title: "Serde 与 JSON",
    summary: "Serialize / Deserialize 是 API 标配。",
    level: "入门",
    track: "Rust基础",
    minutes: 10,
    blocks: [
      { type: "text", title: "为什么需要 Serde", body: "HTTP 边界上的 JSON 与 Rust 结构体互转靠 serde。derive(Serialize, Deserialize) 后即可 web::Json<T> 提取与 .json() 响应。" },
      { type: "code", title: "对应源码 · 结构体 JSON", lang: "rust", code: `use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct CreateNote {
    title: String,
    body: String,
}

#[derive(Serialize)]
struct Note {
    id: u64,
    title: String,
    body: String,
}` },
      { type: "demo", kind: "json-body", title: "动手：JSON 往返" },
      { type: "quiz", questions: [
              {
                      "id": "s1",
                      "question": "自动序列化靠？",
                      "options": [
                              "手写 to_string",
                              "serde derive",
                              "反射运行时",
                              "only Gson"
                      ],
                      "answer": 1,
                      "explain": "serde。"
              },
              {
                      "id": "s2",
                      "question": "请求体 JSON 提取器？",
                      "options": [
                              "web::Path",
                              "web::Json<T>",
                              "web::Data",
                              "HttpRequest only"
                      ],
                      "answer": 1,
                      "explain": "web::Json。"
              }
      ] },
    ],
  },
  {
    slug: "httpserver",
    title: "HttpServer 与绑定",
    summary: "进程、worker、bind/run。",
    level: "入门",
    track: "Actix入门",
    minutes: 10,
    blocks: [
      { type: "text", title: "HttpServer 职责", body: "HttpServer::new 接受闭包，每个 worker 线程克隆一份 App 工厂。bind 地址后 run().await 阻塞服务。生产可 workers(n)、keep_alive、client_request_timeout。" },
      { type: "code", title: "对应源码 · 服务器配置", lang: "rust", code: `HttpServer::new(|| {
    App::new()
        .route("/health", web::get().to(|| async { "ok" }))
})
.bind(("0.0.0.0", 8080))?
.workers(4)
.run()
.await` },
      { type: "demo", kind: "httpserver", title: "动手：绑定与 worker" },
      { type: "quiz", questions: [
              {
                      "id": "h1",
                      "question": "App 工厂为什么是闭包？",
                      "options": [
                              "好看",
                              "每 worker 独立 App 实例",
                              "仅编译用",
                              "禁用并发"
                      ],
                      "answer": 1,
                      "explain": "多 worker 隔离。"
              },
              {
                      "id": "h2",
                      "question": "bind 失败返回？",
                      "options": [
                              "()",
                              "io::Error via ?",
                              "panic 必现",
                              "true"
                      ],
                      "answer": 1,
                      "explain": "Result。"
              }
      ] },
    ],
  },
  {
    slug: "app-routes",
    title: "App 与路由注册",
    summary: "route / service / resource。",
    level: "入门",
    track: "Actix入门",
    minutes: 12,
    blocks: [
      { type: "text", title: "三种注册方式", body: "1) #[get]/path\")] + .service(handler)  2) .route(path, method.to(fn))  3) web::resource(...).route(...)。路径支持 {id} 动态段。" },
      { type: "code", title: "对应源码 · 路由表", lang: "rust", code: `use actix_web::{get, post, web, App, HttpResponse};

#[get("/hello/{name}")]
async fn greet(name: web::Path<String>) -> String {
    format!("hi {name}")
}

#[post("/echo")]
async fn echo(body: String) -> impl actix_web::Responder {
    body
}

App::new()
    .service(greet)
    .service(echo)
    .route("/ping", web::get().to(|| async { HttpResponse::Ok().body("pong") }))` },
      { type: "demo", kind: "app-routes", title: "动手：路由匹配" },
      { type: "quiz", questions: [
              {
                      "id": "ar1",
                      "question": "动态段写法？",
                      "options": [
                              ":id",
                              "{id}",
                              "<id>",
                              "$id"
                      ],
                      "answer": 1,
                      "explain": "{id}。"
              },
              {
                      "id": "ar2",
                      "question": "#[get] handler 注册用？",
                      "options": [
                              ".data",
                              ".service",
                              ".wrap only",
                              ".app_data only"
                      ],
                      "answer": 1,
                      "explain": ".service。"
              }
      ] },
    ],
  },
  {
    slug: "handlers",
    title: "Handler 与 Responder",
    summary: "async fn 返回什么都能响应？",
    level: "入门",
    track: "Actix入门",
    minutes: 10,
    blocks: [
      { type: "text", title: "Responder trait", body: "impl Responder 的类型可直接返回：&'static str、String、HttpResponse、Json<T> 等。复杂逻辑用 HttpResponse::build。Handler 可以是 async fn，由框架轮询 Future。" },
      { type: "code", title: "对应源码 · 多种响应", lang: "rust", code: `use actix_web::{web, HttpResponse, Responder};
use serde::Serialize;

#[derive(Serialize)]
struct Health { status: &'static str }

async fn health() -> impl Responder {
    web::Json(Health { status: "up" })
}

async fn not_found() -> HttpResponse {
    HttpResponse::NotFound().body("missing")
}` },
      { type: "demo", kind: "responders", title: "动手：Responder 类型" },
      { type: "quiz", questions: [
              {
                      "id": "hd1",
                      "question": "返回 JSON 便捷类型？",
                      "options": [
                              "web::Json(T)",
                              "Vec<u8> only",
                              "File",
                              "Socket"
                      ],
                      "answer": 0,
                      "explain": "web::Json。"
              },
              {
                      "id": "hd2",
                      "question": "404 手动构造？",
                      "options": [
                              "HttpResponse::NotFound()",
                              "return null",
                              "throw",
                              "None"
                      ],
                      "answer": 0,
                      "explain": "状态码构建器。"
              }
      ] },
    ],
  },
  {
    slug: "scope-resource",
    title: "Scope 与 Resource",
    summary: "前缀分组与细粒度方法。",
    level: "进阶",
    track: "Actix入门",
    minutes: 10,
    blocks: [
      { type: "text", title: "模块化路由", body: "web::scope(\"/api\") 给一组路由加前缀；web::resource(\"/notes/{id}\") 上挂 GET/PUT/DELETE。适合版本化 API：/api/v1。" },
      { type: "code", title: "对应源码 · scope", lang: "rust", code: `use actix_web::{web, App, HttpResponse};

fn api_config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::resource("/notes/{id}")
            .route(web::get().to(get_note))
            .route(web::delete().to(del_note)),
    );
}

async fn get_note(id: web::Path<u64>) -> HttpResponse {
    HttpResponse::Ok().body(format!("note {id}"))
}
async fn del_note(id: web::Path<u64>) -> HttpResponse {
    HttpResponse::NoContent().finish()
}

App::new().service(web::scope("/api/v1").configure(api_config))` },
      { type: "demo", kind: "scope-resource", title: "动手：/api 前缀" },
      { type: "quiz", questions: [
              {
                      "id": "sc1",
                      "question": "统一前缀用？",
                      "options": [
                              "web::scope",
                              "only macro",
                              "Html",
                              "cookie"
                      ],
                      "answer": 0,
                      "explain": "scope。"
              },
              {
                      "id": "sc2",
                      "question": "同一路径多方法挂在？",
                      "options": [
                              "resource",
                              "middleware only",
                              "main",
                              "logger"
                      ],
                      "answer": 0,
                      "explain": "resource。"
              }
      ] },
    ],
  },
  {
    slug: "extractors-intro",
    title: "提取器总览",
    summary: "从请求里「声明式」拿数据。",
    level: "入门",
    track: "请求提取",
    minutes: 10,
    blocks: [
      { type: "text", title: "FromRequest", body: "Handler 参数实现 FromRequest 即可自动提取：Path、Query、Json、Form、Data、HttpRequest、Bytes… 失败时框架返回对应错误响应（如 400）。顺序：先提路径/查询，再提 body。" },
      { type: "code", title: "对应源码 · 多提取器", lang: "rust", code: `use actix_web::{web, HttpResponse, Result};

#[derive(serde::Deserialize)]
struct Page { page: u32, size: u32 }

async fn list(
    path: web::Path<(String,)>,
    q: web::Query<Page>,
) -> Result<HttpResponse> {
    let (topic,) = path.into_inner();
    Ok(HttpResponse::Ok().body(format!(
        "{topic} page={} size={}",
        q.page, q.size
    )))
}` },
      { type: "demo", kind: "extractors", title: "动手：提取器流水线" },
      { type: "quiz", questions: [
              {
                      "id": "e1",
                      "question": "提取器 trait？",
                      "options": [
                              "Responder",
                              "FromRequest",
                              "Service",
                              "Future only"
                      ],
                      "answer": 1,
                      "explain": "FromRequest。"
              },
              {
                      "id": "e2",
                      "question": "Query 绑定？",
                      "options": [
                              "web::Query<T>",
                              "web::Data",
                              "Path only",
                              "Header 必手写"
                      ],
                      "answer": 0,
                      "explain": "Query。"
              }
      ] },
    ],
  },
  {
    slug: "path-query",
    title: "Path 与 Query",
    summary: "路径参数与查询字符串。",
    level: "入门",
    track: "请求提取",
    minutes: 10,
    blocks: [
      { type: "text", title: "类型安全的参数", body: "web::Path<u32> 自动解析失败→400。多段用元组或结构体。web::Query<T> 需 Deserialize。" },
      { type: "code", title: "对应源码", lang: "rust", code: `#[derive(serde::Deserialize)]
struct Search { q: String, limit: Option<u32> }

async fn item(
    path: web::Path<(u32, String)>,
    query: web::Query<Search>,
) -> String {
    let (id, kind) = path.into_inner();
    format!("id={id} kind={kind} q={} limit={:?}", query.q, query.limit)
}` },
      { type: "demo", kind: "path-query", title: "动手：改 Path / Query" },
      { type: "quiz", questions: [
              {
                      "id": "pq1",
                      "question": "Path 解析失败？",
                      "options": [
                              "500 默认",
                              "通常 400",
                              "静默 200",
                              "重定向"
                      ],
                      "answer": 1,
                      "explain": "客户端错误。"
              },
              {
                      "id": "pq2",
                      "question": "可选查询字段？",
                      "options": [
                              "必须 String",
                              "Option<T>",
                              "禁止",
                              "only i32"
                      ],
                      "answer": 1,
                      "explain": "Option。"
              }
      ] },
    ],
  },
  {
    slug: "json-form",
    title: "Json 与 Form",
    summary: "Body 反序列化。",
    level: "进阶",
    track: "请求提取",
    minutes: 10,
    blocks: [
      { type: "text", title: "Body 提取一次", body: "请求体只能消费一次。web::Json<T> 读 application/json；web::Form<T> 读 urlencoded。大 body 注意 JsonConfig::limit。" },
      { type: "code", title: "对应源码 · POST JSON", lang: "rust", code: `use actix_web::{post, web, HttpResponse, Result};

#[derive(serde::Deserialize)]
struct Login { email: String, password: String }

#[post("/login")]
async fn login(body: web::Json<Login>) -> Result<HttpResponse> {
    if body.password.len() < 6 {
        return Ok(HttpResponse::BadRequest().body("weak password"));
    }
    Ok(HttpResponse::Ok().json(serde_json::json!({
        "token": "demo-token",
        "email": body.email,
    })))
}` },
      { type: "demo", kind: "json-body", title: "动手：POST JSON" },
      { type: "quiz", questions: [
              {
                      "id": "jf1",
                      "question": "JSON body 提取？",
                      "options": [
                              "web::Json<T>",
                              "web::Path",
                              "Query",
                              "Data"
                      ],
                      "answer": 0,
                      "explain": "Json。"
              },
              {
                      "id": "jf2",
                      "question": "body 能提取两次吗？",
                      "options": [
                              "能",
                              "通常不能（已消费）",
                              "必须两次",
                              "仅 HTTPS 能"
                      ],
                      "answer": 1,
                      "explain": "流已读完。"
              }
      ] },
    ],
  },
  {
    slug: "app-data",
    title: "web::Data 共享状态",
    summary: "App 级状态与 handler 注入。",
    level: "进阶",
    track: "请求提取",
    minutes: 12,
    blocks: [
      { type: "text", title: "Data<T> = Arc 包装", body: "HttpServer 多 worker 时每 worker 有自己的 App 状态克隆；用 Arc<Mutex<_>> / Arc<RwLock<_>> 或外部连接池做真共享。app_data(Data::new(state)) 注册，handler 取 Data<T>。" },
      { type: "code", title: "对应源码 · 计数器状态", lang: "rust", code: `use actix_web::{web, App, HttpServer};
use std::sync::Mutex;

struct AppState {
    hits: Mutex<u64>,
}

async fn hit(data: web::Data<AppState>) -> String {
    let mut n = data.hits.lock().unwrap();
    *n += 1;
    format!("hits={n}")
}

HttpServer::new(|| {
    App::new()
        .app_data(web::Data::new(AppState { hits: Mutex::new(0) }))
        .route("/hit", web::post().to(hit))
})` },
      { type: "demo", kind: "app-data", title: "动手：共享计数" },
      { type: "tip", body: "数据库连接池（sqlx::PgPool）典型做法：Data<Pool> 注入。" },
      { type: "quiz", questions: [
              {
                      "id": "ad1",
                      "question": "Data 内部通常？",
                      "options": [
                              "Rc only",
                              "Arc 语义",
                              "裸指针",
                              "全局 static 必用"
                      ],
                      "answer": 1,
                      "explain": "Arc。"
              },
              {
                      "id": "ad2",
                      "question": "注册方法？",
                      "options": [
                              ".app_data",
                              ".service only",
                              ".wrap",
                              ".route only"
                      ],
                      "answer": 0,
                      "explain": "app_data。"
              }
      ] },
    ],
  },
  {
    slug: "headers-req",
    title: "请求头与 HttpRequest",
    summary: "底层访问仍可用。",
    level: "进阶",
    track: "请求提取",
    minutes: 8,
    blocks: [
      { type: "text", title: "何时摸底层", body: "大多数场景用提取器；需要原始头、连接信息时注入 HttpRequest 或 web::Header。" },
      { type: "code", title: "对应源码", lang: "rust", code: `use actix_web::{HttpRequest, HttpResponse};

async fn who(req: HttpRequest) -> HttpResponse {
    let ua = req
        .headers()
        .get("user-agent")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("unknown");
    HttpResponse::Ok().body(format!("ua={ua}"))
}` },
      { type: "demo", kind: "extractors", title: "动手：读 User-Agent", hint: "在提取器面板查看 headers" },
      { type: "quiz", questions: [
              {
                      "id": "hr1",
                      "question": "读头推荐？",
                      "options": [
                              "永远字符串拆",
                              "headers().get",
                              "仅 Query",
                              "禁止"
                      ],
                      "answer": 1,
                      "explain": "HeaderMap。"
              }
      ] },
    ],
  },
  {
    slug: "middleware",
    title: "中间件链",
    summary: "wrap 顺序与请求/响应钩子。",
    level: "进阶",
    track: "中间件状态",
    minutes: 12,
    blocks: [
      { type: "text", title: "洋葱模型", body: ".wrap(A).wrap(B) 时，请求先过外层。Logger、Compress、DefaultHeaders、Cors、自定义鉴权都是中间件。Transform trait 可自定义。" },
      { type: "code", title: "对应源码 · Logger + 默认头", lang: "rust", code: `use actix_web::{middleware, App, HttpServer};

App::new()
    .wrap(middleware::Logger::default())
    .wrap(middleware::DefaultHeaders::new().add(("X-Version", "1")))
    .wrap(middleware::Compress::default())` },
      { type: "demo", kind: "middleware", title: "动手：中间件洋葱" },
      { type: "quiz", questions: [
              {
                      "id": "mw1",
                      "question": "注册中间件？",
                      "options": [
                              ".wrap",
                              ".service",
                              ".data",
                              ".bind"
                      ],
                      "answer": 0,
                      "explain": "wrap。"
              },
              {
                      "id": "mw2",
                      "question": "Logger 作用？",
                      "options": [
                              "写数据库",
                              "访问日志",
                              "编译优化",
                              "TLS"
                      ],
                      "answer": 1,
                      "explain": "请求日志。"
              }
      ] },
    ],
  },
  {
    slug: "auth-mw",
    title: "鉴权中间件思路",
    summary: "Bearer Token 校验模式。",
    level: "进阶",
    track: "中间件状态",
    minutes: 12,
    blocks: [
      { type: "text", title: "模式", body: "中间件读 Authorization，校验后把 UserId 插入 extensions，下游 handler 提取；失败返回 401。也可用提取器封装鉴权。工坊里用模拟 Bearer 练同一心智模型。" },
      { type: "code", title: "对应源码 · 伪代码", lang: "rust", code: `// 中间件伪代码
// 1. 读 Authorization: Bearer <token>
// 2. 查 token → user
// 3. req.extensions_mut().insert(user);
// 4. 调用 next.call(req)
// 失败 → 401 Unauthorized

async fn me(user: web::ReqData<User>) -> impl Responder {
    web::Json(user.into_inner())
}` },
      { type: "demo", kind: "auth-middleware", title: "动手：401 vs 200" },
      { type: "quiz", questions: [
              {
                      "id": "au1",
                      "question": "未登录 REST 常见状态码？",
                      "options": [
                              "200",
                              "401",
                              "301",
                              "204"
                      ],
                      "answer": 1,
                      "explain": "Unauthorized。"
              },
              {
                      "id": "au2",
                      "question": "下游拿用户？",
                      "options": [
                              "extensions / ReqData",
                              "仅全局变量",
                              "query 明文密码",
                              "强制 cookie 名"
                      ],
                      "answer": 0,
                      "explain": "扩展数据。"
              }
      ] },
    ],
  },
  {
    slug: "error-handling",
    title: "错误处理",
    summary: "ResponseError 与统一 JSON 错误。",
    level: "进阶",
    track: "中间件状态",
    minutes: 10,
    blocks: [
      { type: "text", title: "自定义错误类型", body: "实现 ResponseError 让 ? 自动变成正确状态码与 body。统一 {\"message\":...} 方便前端。" },
      { type: "code", title: "对应源码 · ResponseError", lang: "rust", code: `use actix_web::{HttpResponse, ResponseError};
use std::fmt;

#[derive(Debug)]
enum ApiError {
    NotFound,
    Unauthorized,
}

impl fmt::Display for ApiError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::NotFound => write!(f, "not found"),
            Self::Unauthorized => write!(f, "unauthorized"),
        }
    }
}

impl ResponseError for ApiError {
    fn error_response(&self) -> HttpResponse {
        match self {
            Self::NotFound => HttpResponse::NotFound().json(serde_json::json!({"message":"not found"})),
            Self::Unauthorized => HttpResponse::Unauthorized().json(serde_json::json!({"message":"unauthorized"})),
        }
    }
}` },
      { type: "demo", kind: "result-error", title: "动手：错误映射" },
      { type: "quiz", questions: [
              {
                      "id": "eh1",
                      "question": "自定义错误响应实现？",
                      "options": [
                              "Responder only",
                              "ResponseError",
                              "Drop",
                              "Copy"
                      ],
                      "answer": 1,
                      "explain": "ResponseError。"
              }
      ] },
    ],
  },
  {
    slug: "cors-logging",
    title: "CORS 与日志",
    summary: "浏览器跨域与可观测性。",
    level: "进阶",
    track: "中间件状态",
    minutes: 8,
    blocks: [
      { type: "text", title: "前后端分离", body: "actix-cors 配置允许的 origin/method/header。日志用 env_logger + middleware::Logger，RUST_LOG=info。" },
      { type: "code", title: "对应源码", lang: "rust", code: `use actix_cors::Cors;
use actix_web::middleware::Logger;

App::new()
    .wrap(Logger::default())
    .wrap(
        Cors::default()
            .allowed_origin("http://localhost:5173")
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
            .allow_any_header()
            .max_age(3600),
    )` },
      { type: "demo", kind: "logging", title: "动手：日志级别" },
      { type: "quiz", questions: [
              {
                      "id": "cl1",
                      "question": "浏览器跨域靠？",
                      "options": [
                              "仅 VPN",
                              "CORS 头",
                              "DNS",
                              "gzip"
                      ],
                      "answer": 1,
                      "explain": "CORS。"
              }
      ] },
    ],
  },
  {
    slug: "rest-design",
    title: "REST 资源设计",
    summary: "名词资源 + HTTP 动词。",
    level: "实战",
    track: "REST实战",
    minutes: 10,
    blocks: [
      { type: "text", title: "约定", body: "GET 安全幂等；POST 创建；PUT/PATCH 更新；DELETE 删除。用复数名词 /api/notes、/api/notes/{id}。状态码：201 Created、204 No Content、404、401、422。" },
      { type: "code", title: "路由草图", lang: "rust", code: `// GET    /api/notes
// POST   /api/notes
// GET    /api/notes/{id}
// PUT    /api/notes/{id}
// DELETE /api/notes/{id}` },
      { type: "demo", kind: "challenge", title: "动手：点选正确方法" },
      { type: "quiz", questions: [
              {
                      "id": "rd1",
                      "question": "创建资源方法？",
                      "options": [
                              "GET",
                              "POST",
                              "TRACE",
                              "OPTIONS only"
                      ],
                      "answer": 1,
                      "explain": "POST。"
              },
              {
                      "id": "rd2",
                      "question": "删除成功常见？",
                      "options": [
                              "200/204",
                              "201",
                              "302",
                              "100"
                      ],
                      "answer": 0,
                      "explain": "204 无 body 常见。"
              }
      ] },
    ],
  },
  {
    slug: "crud-notes",
    title: "笔记 CRUD 实现",
    summary: "工坊同构的服务端形状。",
    level: "实战",
    track: "REST实战",
    minutes: 14,
    blocks: [
      { type: "text", title: "完整资源", body: "内存 Vec + Mutex 即可教学；生产换数据库。注意鉴权：所有 notes 路由包在需登录 scope。" },
      { type: "code", title: "对应源码 · 列表与创建", lang: "rust", code: `#[derive(Clone, Serialize, Deserialize)]
struct Note { id: u64, title: String, body: String }

struct Db { notes: Mutex<Vec<Note>>, seq: Mutex<u64> }

async fn list(db: web::Data<Db>) -> impl Responder {
    let notes = db.notes.lock().unwrap().clone();
    web::Json(notes)
}

async fn create(db: web::Data<Db>, body: web::Json<CreateNote>) -> impl Responder {
    let mut seq = db.seq.lock().unwrap();
    *seq += 1;
    let note = Note { id: *seq, title: body.title.clone(), body: body.body.clone() };
    db.notes.lock().unwrap().push(note.clone());
    HttpResponse::Created().json(note)
}` },
      { type: "demo", kind: "state", title: "动手：内存 CRUD" },
      { type: "tip", body: "打开「全栈工坊」用 demo@actix.dev / password123 走通同一流程。" },
      { type: "quiz", questions: [
              {
                      "id": "cn1",
                      "question": "创建成功状态码？",
                      "options": [
                              "200 也可但 201 更佳",
                              "404",
                              "500",
                              "301"
                      ],
                      "answer": 0,
                      "explain": "201 Created。"
              }
      ] },
    ],
  },
  {
    slug: "validation",
    title: "输入校验",
    summary: "拒绝脏数据。",
    level: "实战",
    track: "REST实战",
    minutes: 10,
    blocks: [
      { type: "text", title: "边界检查", body: "长度、邮箱格式、必填字段。可用手写 if 或 validator crate。失败返回 400/422 + 字段错误信息。" },
      { type: "code", title: "对应源码", lang: "rust", code: `fn validate_note(title: &str, body: &str) -> Result<(), &'static str> {
    if title.trim().is_empty() { return Err("title required"); }
    if title.len() > 120 { return Err("title too long"); }
    if body.len() > 10_000 { return Err("body too long"); }
    Ok(())
}` },
      { type: "demo", kind: "json-body", title: "动手：非法 JSON/字段" },
      { type: "quiz", questions: [
              {
                      "id": "v1",
                      "question": "校验失败常见？",
                      "options": [
                              "400/422",
                              "200",
                              "101",
                              "206"
                      ],
                      "answer": 0,
                      "explain": "客户端错误。"
              }
      ] },
    ],
  },
  {
    slug: "pagination",
    title: "分页与过滤",
    summary: "列表 API 不一次倒完。",
    level: "实战",
    track: "REST实战",
    minutes: 8,
    blocks: [
      { type: "text", title: "Query 分页", body: "page/size 或 cursor。返回 { items, total, page }。注意 size 上限防滥用。" },
      { type: "code", title: "对应源码", lang: "rust", code: `#[derive(Deserialize)]
struct PageQuery {
    page: Option<u32>,
    size: Option<u32>,
}

async fn list(q: web::Query<PageQuery>, db: web::Data<Db>) -> impl Responder {
    let page = q.page.unwrap_or(1).max(1);
    let size = q.size.unwrap_or(20).clamp(1, 100);
    // slice notes...
    web::Json(serde_json::json!({ "page": page, "size": size }))
}` },
      { type: "demo", kind: "path-query", title: "动手：page/size" },
      { type: "quiz", questions: [
              {
                      "id": "pg1",
                      "question": "size 为什么 clamp？",
                      "options": [
                              "好看",
                              "防一次拉爆内存",
                              "编译需要",
                              "HTTP 禁止大"
                      ],
                      "answer": 1,
                      "explain": "保护服务。"
              }
      ] },
    ],
  },
  {
    slug: "token-session",
    title: "Token 会话",
    summary: "登录发牌、请求带牌。",
    level: "实战",
    track: "REST实战",
    minutes: 12,
    blocks: [
      { type: "text", title: "Bearer 模式", body: "POST /auth/login → { token, user }；客户端 Authorization: Bearer …；服务端 map 存 token→user；logout 删 token。JWT 可无状态，教学先用不透明 token。" },
      { type: "code", title: "对应源码 · 登录形状", lang: "rust", code: `#[post("/auth/login")]
async fn login(body: web::Json<Login>) -> Result<HttpResponse> {
    // verify password...
    let token = uuid::Uuid::new_v4().to_string();
    // store token → user
    Ok(HttpResponse::Ok().json(serde_json::json!({
        "token": token,
        "user": { "email": body.email }
    })))
}` },
      { type: "demo", kind: "auth-middleware", title: "动手：带 Token 访问 /me" },
      { type: "quiz", questions: [
              {
                      "id": "ts1",
                      "question": "Bearer 放在？",
                      "options": [
                              "Authorization 头",
                              "仅 URL 永久",
                              "必须 Cookie 名 x",
                              "TLS 自动"
                      ],
                      "answer": 0,
                      "explain": "Authorization。"
              }
      ] },
    ],
  },
  {
    slug: "project-structure",
    title: "项目结构",
    summary: "可维护的 crate 布局。",
    level: "实战",
    track: "工程化",
    minutes: 8,
    blocks: [
      { type: "text", title: "推荐目录", body: "src/main.rs 启动；src/routes/ 注册；src/handlers/；src/models/；src/middleware/；src/error.rs；tests/ 集成测试。" },
      { type: "code", title: "树", lang: "rust", code: `src/
  main.rs
  lib.rs
  error.rs
  models/mod.rs
  handlers/{auth.rs,notes.rs}
  middleware/auth.rs
  routes.rs
tests/api_notes.rs` },
      { type: "demo", kind: "config", title: "动手：模块树" },
      { type: "quiz", questions: [
              {
                      "id": "ps1",
                      "question": "集成测试目录？",
                      "options": [
                              "tests/",
                              "node_modules",
                              "dist",
                              "only src"
                      ],
                      "answer": 0,
                      "explain": "tests/。"
              }
      ] },
    ],
  },
  {
    slug: "testing",
    title: "测试 Actix 服务",
    summary: "actix_web::test 套件。",
    level: "实战",
    track: "工程化",
    minutes: 12,
    blocks: [
      { type: "text", title: "不真开端口", body: "init_service + TestRequest 发调用，读状态码与 body。单元测 handler；集成测完整 App。" },
      { type: "code", title: "对应源码 · 测试", lang: "rust", code: `#[actix_web::test]
async fn health_ok() {
    let app = actix_web::test::init_service(
        App::new().route("/health", web::get().to(|| async { "ok" }))
    ).await;
    let req = actix_web::test::TestRequest::get().uri("/health").to_request();
    let resp = actix_web::test::call_service(&app, req).await;
    assert!(resp.status().is_success());
}` },
      { type: "demo", kind: "testing", title: "动手：断言状态码" },
      { type: "quiz", questions: [
              {
                      "id": "t1",
                      "question": "actix 测试常用？",
                      "options": [
                              "init_service + TestRequest",
                              "仅 curl 手工",
                              "selenium 必须",
                              "禁止 async test"
                      ],
                      "answer": 0,
                      "explain": "官方 test 工具。"
              }
      ] },
    ],
  },
  {
    slug: "config-env",
    title: "配置与环境变量",
    summary: "12-factor：端口、数据库 URL。",
    level: "实战",
    track: "工程化",
    minutes: 8,
    blocks: [
      { type: "text", title: "环境注入", body: "std::env::var(\"PORT\")、dotenvy 加载 .env。切勿把密钥写进仓库。" },
      { type: "code", title: "对应源码", lang: "rust", code: `let port: u16 = std::env::var("PORT")
    .ok()
    .and_then(|s| s.parse().ok())
    .unwrap_or(8080);
let bind = format!("0.0.0.0:{port}");
HttpServer::new(|| App::new())
    .bind(bind)?
    .run()
    .await` },
      { type: "demo", kind: "config", title: "动手：PORT 环境变量" },
      { type: "quiz", questions: [
              {
                      "id": "ce1",
                      "question": "密钥应放？",
                      "options": [
                              "Git 明文",
                              "环境变量/密钥管理",
                              "前端 localStorage 永久",
                              "README"
                      ],
                      "answer": 1,
                      "explain": "环境与保险柜。"
              }
      ] },
    ],
  },
  {
    slug: "logging-obs",
    title: "日志与可观测",
    summary: "请求 ID、结构化日志。",
    level: "实战",
    track: "工程化",
    minutes: 8,
    blocks: [
      { type: "text", title: "生产可读性", body: "Logger 中间件 + tracing 生态；为请求生成 request-id 响应头。错误日志带路径与 user id（勿记密码）。" },
      { type: "code", title: "对应源码", lang: "rust", code: `env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
App::new().wrap(middleware::Logger::new("%a %{User-Agent}i %s %b %T"))` },
      { type: "demo", kind: "logging", title: "动手：RUST_LOG" },
      { type: "quiz", questions: [
              {
                      "id": "lo1",
                      "question": "默认日志过滤环境变量常？",
                      "options": [
                              "RUST_LOG",
                              "PATH",
                              "HOME",
                              "NODE_ENV"
                      ],
                      "answer": 0,
                      "explain": "RUST_LOG。"
              }
      ] },
    ],
  },
  {
    slug: "deploy",
    title: "构建与部署",
    summary: "release、反向代理、容器。",
    level: "实战",
    track: "工程化",
    minutes: 10,
    blocks: [
      { type: "text", title: "上线清单", body: "cargo build --release；反向代理 TLS；健康检查 /health；优雅关闭；资源限制。Docker 多阶段构建减小镜像。" },
      { type: "code", title: "Dockerfile 片段", lang: "rust", code: `FROM rust:1.83 as build
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
COPY --from=build /app/target/release/learning-api /usr/local/bin/
ENV PORT=8080
EXPOSE 8080
CMD ["learning-api"]` },
      { type: "demo", kind: "httpserver", title: "动手：release 思维模型" },
      { type: "quiz", questions: [
              {
                      "id": "dp1",
                      "question": "生产构建？",
                      "options": [
                              "cargo build --release",
                              "cargo run only",
                              "npm start",
                              "rustc 单文件必须"
                      ],
                      "answer": 0,
                      "explain": "优化二进制。"
              }
      ] },
    ],
  },
  {
    slug: "streaming",
    title: "流式响应",
    summary: "大文件与 chunk。",
    level: "进阶",
    track: "进阶模式",
    minutes: 8,
    blocks: [
      { type: "text", title: "Body::from_stream", body: "对大文件/生成器使用流，降低内存峰值。SSE 也可基于流。" },
      { type: "code", title: "对应源码", lang: "rust", code: `use actix_web::{HttpResponse, web};
use futures_util::stream;

async fn stream_hello() -> HttpResponse {
    let s = stream::iter(vec![
        Ok::<_, actix_web::Error>(web::Bytes::from("Hello ")),
        Ok(web::Bytes::from("stream")),
    ]);
    HttpResponse::Ok().content_type("text/plain").streaming(s)
}` },
      { type: "demo", kind: "streaming", title: "动手：分块输出" },
      { type: "quiz", questions: [
              {
                      "id": "st1",
                      "question": "流式好处？",
                      "options": [
                              "更大内存",
                              "边生成边发送",
                              "更慢必现",
                              "禁用 HTTP/1"
                      ],
                      "answer": 1,
                      "explain": "控内存。"
              }
      ] },
    ],
  },
  {
    slug: "websocket",
    title: "WebSocket 入门",
    summary: "actix-web 升级连接。",
    level: "进阶",
    track: "进阶模式",
    minutes: 10,
    blocks: [
      { type: "text", title: "实时通道", body: "HTTP 升级为 WS 后双向推送。聊天、协作、游戏状态。actix 生态有 actix-ws / 原生 actor 方案。" },
      { type: "code", title: "对应源码 · 概念", lang: "rust", code: `// 路由注册 WS 升级 handler
// 读 Client 消息，写 Server 消息
// 心跳 ping/pong 保活` },
      { type: "demo", kind: "websocket", title: "动手：帧收发示意" },
      { type: "quiz", questions: [
              {
                      "id": "ws1",
                      "question": "WebSocket 先？",
                      "options": [
                              "UDP 广播",
                              "HTTP 升级",
                              "仅 SMTP",
                              "FTP"
                      ],
                      "answer": 1,
                      "explain": "Upgrade。"
              }
      ] },
    ],
  },
  {
    slug: "actors",
    title: "Actor 直觉",
    summary: "Actix 名字的由来。",
    level: "进阶",
    track: "进阶模式",
    minutes: 10,
    blocks: [
      { type: "text", title: "消息传递并发", body: "Actor 邮箱串行处理消息，避免共享可变状态的锁心智。actix 框架本身；actix-web 4 更偏 tokio 服务，但 Actor 模型仍可在业务中用。" },
      { type: "code", title: "伪代码", lang: "rust", code: `// Actor 收 CreateNote 消息 → 更新内部 Vec
// Handler 只 send 消息，不直接锁全局` },
      { type: "demo", kind: "actor", title: "动手：邮箱排队" },
      { type: "quiz", questions: [
              {
                      "id": "ac1",
                      "question": "Actor 通信？",
                      "options": [
                              "共享裸锁为主",
                              "消息传递",
                              "仅全局 static mut",
                              "禁止并发"
                      ],
                      "answer": 1,
                      "explain": "消息。"
              }
      ] },
    ],
  },
  {
    slug: "performance",
    title: "性能要点",
    summary: "零拷贝、连接池、少分配。",
    level: "进阶",
    track: "进阶模式",
    minutes: 8,
    blocks: [
      { type: "text", title: "清单", body: "release 构建；连接池复用 DB；避免 handler 内大克隆；压缩中间件按需；水平扩展多实例 + 负载均衡。" },
      { type: "demo", kind: "httpserver", title: "动手：worker 与吞吐" },
      { type: "quiz", questions: [
              {
                      "id": "pf1",
                      "question": "DB 访问推荐？",
                      "options": [
                              "每次新建 TCP 无池",
                              "连接池",
                              "前端直连 DB",
                              "同步阻塞全局"
                      ],
                      "answer": 1,
                      "explain": "池化。"
              }
      ] },
    ],
  },
  {
    slug: "security",
    title: "Web 安全基础",
    summary: "OWASP 速通。",
    level: "进阶",
    track: "进阶模式",
    minutes: 10,
    blocks: [
      { type: "text", title: "必做", body: "参数化查询防注入；哈希密码（argon2）；HTTPS；CORS 白名单；限制 body 大小；鉴权默认拒绝；不在日志打密钥。" },
      { type: "code", title: "对应源码 · body limit", lang: "rust", code: `App::new().app_data(
    web::JsonConfig::default().limit(32 * 1024)
)` },
      { type: "demo", kind: "auth-middleware", title: "动手：拒绝无 token" },
      { type: "quiz", questions: [
              {
                      "id": "sec1",
                      "question": "密码存储？",
                      "options": [
                              "明文",
                              "可逆加密即可",
                              "慢哈希 (argon2/bcrypt)",
                              "仅 Base64"
                      ],
                      "answer": 2,
                      "explain": "单向慢哈希。"
              }
      ] },
    ],
  },
  {
    slug: "interview",
    title: "面试串讲",
    summary: "用一条请求串起知识点。",
    level: "进阶",
    track: "进阶模式",
    minutes: 10,
    blocks: [
      { type: "text", title: "故事线", body: "客户端 POST /api/notes → 中间件日志/CORS/鉴权 → 提取 Json + Data<Db> → 业务校验 → 写库 → 201 JSON。对比：所有权保证无数据竞争；Result 驱动错误码；async 提高 IO 并发。" },
      { type: "demo", kind: "middleware", title: "动手：完整链路回放" },
      { type: "quiz", questions: [
              {
                      "id": "iv1",
                      "question": "Actix handler 默认？",
                      "options": [
                              "多线程阻塞模型 only",
                              "async 可挂起 IO",
                              "仅同步",
                              "必须 Actor"
                      ],
                      "answer": 1,
                      "explain": "异步。"
              }
      ] },
    ],
  },
  {
    slug: "official-app",
    title: "App 配置全解",
    summary: "configure / app_data / wrap 清单",
    level: "进阶",
    track: "官方对齐",
    format: "reference",
    minutes: 8,
    official: "/actix-web/docs/application/",
    blocks: [
      { type: "text", title: "App 配置全解", body: "configure / app_data / wrap 清单。本课为参考卡片，对照 actix.rs 文档加深。结业不强制掌握每一张参考卡。" },
      { type: "code", title: "入口", lang: "rust", code: `// 详见 https://actix.rs/actix-web/docs/application/
// 建议：实现一个最小例子后回来对照选项表。` },
      { type: "demo", kind: "hello-world", title: "对照：最小服务" },
      { type: "quiz", questions: [
              {
                      "id": "official-appq",
                      "question": "本课定位？",
                      "options": [
                              "可选修参考",
                              "必须删库",
                              "前端课",
                              "替换 Rust"
                      ],
                      "answer": 0,
                      "explain": "参考卡片。"
              }
      ] },
    ],
  },
  {
    slug: "official-server",
    title: "服务器选项",
    summary: "workers / backlog / TLS 入口",
    level: "进阶",
    track: "官方对齐",
    format: "reference",
    minutes: 8,
    official: "/actix-web/docs/server/",
    blocks: [
      { type: "text", title: "服务器选项", body: "workers / backlog / TLS 入口。本课为参考卡片，对照 actix.rs 文档加深。结业不强制掌握每一张参考卡。" },
      { type: "code", title: "入口", lang: "rust", code: `// 详见 https://actix.rs/actix-web/docs/server/
// 建议：实现一个最小例子后回来对照选项表。` },
      { type: "demo", kind: "hello-world", title: "对照：最小服务" },
      { type: "quiz", questions: [
              {
                      "id": "official-serverq",
                      "question": "本课定位？",
                      "options": [
                              "可选修参考",
                              "必须删库",
                              "前端课",
                              "替换 Rust"
                      ],
                      "answer": 0,
                      "explain": "参考卡片。"
              }
      ] },
    ],
  },
  {
    slug: "official-extract",
    title: "提取器官方列表",
    summary: "Bytes / Payload / Session…",
    level: "进阶",
    track: "官方对齐",
    format: "reference",
    minutes: 8,
    official: "/actix-web/docs/extractors/",
    blocks: [
      { type: "text", title: "提取器官方列表", body: "Bytes / Payload / Session…。本课为参考卡片，对照 actix.rs 文档加深。结业不强制掌握每一张参考卡。" },
      { type: "code", title: "入口", lang: "rust", code: `// 详见 https://actix.rs/actix-web/docs/extractors/
// 建议：实现一个最小例子后回来对照选项表。` },
      { type: "demo", kind: "hello-world", title: "对照：最小服务" },
      { type: "quiz", questions: [
              {
                      "id": "official-extractq",
                      "question": "本课定位？",
                      "options": [
                              "可选修参考",
                              "必须删库",
                              "前端课",
                              "替换 Rust"
                      ],
                      "answer": 0,
                      "explain": "参考卡片。"
              }
      ] },
    ],
  },
  {
    slug: "official-middleware",
    title: "内置中间件",
    summary: "ErrorHandlers / NormalizePath…",
    level: "进阶",
    track: "官方对齐",
    format: "reference",
    minutes: 8,
    official: "/actix-web/docs/middleware/",
    blocks: [
      { type: "text", title: "内置中间件", body: "ErrorHandlers / NormalizePath…。本课为参考卡片，对照 actix.rs 文档加深。结业不强制掌握每一张参考卡。" },
      { type: "code", title: "入口", lang: "rust", code: `// 详见 https://actix.rs/actix-web/docs/middleware/
// 建议：实现一个最小例子后回来对照选项表。` },
      { type: "demo", kind: "hello-world", title: "对照：最小服务" },
      { type: "quiz", questions: [
              {
                      "id": "official-middlewareq",
                      "question": "本课定位？",
                      "options": [
                              "可选修参考",
                              "必须删库",
                              "前端课",
                              "替换 Rust"
                      ],
                      "answer": 0,
                      "explain": "参考卡片。"
              }
      ] },
    ],
  },
  {
    slug: "official-static",
    title: "静态文件",
    summary: "actix-files 托管前端",
    level: "进阶",
    track: "官方对齐",
    format: "reference",
    minutes: 8,
    official: "/actix-web/docs/static-files/",
    blocks: [
      { type: "text", title: "静态文件", body: "actix-files 托管前端。本课为参考卡片，对照 actix.rs 文档加深。结业不强制掌握每一张参考卡。" },
      { type: "code", title: "入口", lang: "rust", code: `// 详见 https://actix.rs/actix-web/docs/static-files/
// 建议：实现一个最小例子后回来对照选项表。` },
      { type: "demo", kind: "hello-world", title: "对照：最小服务" },
      { type: "quiz", questions: [
              {
                      "id": "official-staticq",
                      "question": "本课定位？",
                      "options": [
                              "可选修参考",
                              "必须删库",
                              "前端课",
                              "替换 Rust"
                      ],
                      "answer": 0,
                      "explain": "参考卡片。"
              }
      ] },
    ],
  },
  {
    slug: "official-http2",
    title: "HTTP/2 与 TLS",
    summary: "rustls 集成要点",
    level: "进阶",
    track: "官方对齐",
    format: "reference",
    minutes: 8,
    official: "/actix-web/docs/server/",
    blocks: [
      { type: "text", title: "HTTP/2 与 TLS", body: "rustls 集成要点。本课为参考卡片，对照 actix.rs 文档加深。结业不强制掌握每一张参考卡。" },
      { type: "code", title: "入口", lang: "rust", code: `// 详见 https://actix.rs/actix-web/docs/server/
// 建议：实现一个最小例子后回来对照选项表。` },
      { type: "demo", kind: "hello-world", title: "对照：最小服务" },
      { type: "quiz", questions: [
              {
                      "id": "official-http2q",
                      "question": "本课定位？",
                      "options": [
                              "可选修参考",
                              "必须删库",
                              "前端课",
                              "替换 Rust"
                      ],
                      "answer": 0,
                      "explain": "参考卡片。"
              }
      ] },
    ],
  },
];

export const TRACKS = [
  "Rust基础",
  "Actix入门",
  "请求提取",
  "中间件状态",
  "REST实战",
  "工程化",
  "进阶模式",
  "官方对齐",
] as const;

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function getLessonIndex(slug: string): number {
  return LESSONS.findIndex((l) => l.slug === slug);
}

export function getAdjacent(slug: string): {
  prev?: Lesson;
  next?: Lesson;
} {
  const i = getLessonIndex(slug);
  if (i < 0) return {};
  return {
    prev: i > 0 ? LESSONS[i - 1] : undefined,
    next: i < LESSONS.length - 1 ? LESSONS[i + 1] : undefined,
  };
}

export function getLessonsByTrack(track: Lesson["track"]) {
  return LESSONS.filter((l) => l.track === track);
}

export function getAllQuizQuestions(): Array<
  QuizQuestion & { lessonSlug: string; lessonTitle: string }
> {
  const out: Array<QuizQuestion & { lessonSlug: string; lessonTitle: string }> = [];
  for (const lesson of LESSONS) {
    for (const block of lesson.blocks) {
      if (block.type === "quiz") {
        for (const q of block.questions) {
          out.push({
            ...q,
            lessonSlug: lesson.slug,
            lessonTitle: lesson.title,
          });
        }
      }
    }
  }
  return out;
}

export function isCourseLesson(l: Lesson): boolean {
  if (l.format === "reference") return false;
  if (l.format === "course") return true;
  return l.track !== "官方对齐";
}

export function getCourseLessons(): Lesson[] {
  return LESSONS.filter(isCourseLesson);
}
