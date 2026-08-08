import type { DemoKind } from "./lessons";

export type DemoSource = {
  kind: DemoKind;
  title: string;
  code: string;
};

const SOURCES: Record<DemoKind, DemoSource> = {
  "hello-world": {
    kind: "hello-world",
    title: "Hello Actix",
    code: `#[get("/")]
async fn hello() -> impl Responder {
    "Hello, Actix!"
}

HttpServer::new(|| App::new().service(hello))
    .bind(("127.0.0.1", 8080))?
    .run()
    .await`,
  },
  ownership: {
    kind: "ownership",
    title: "Ownership",
    code: `fn takes_ownership(s: String) { println!("{s}"); }
fn borrows(s: &str) { println!("{s}"); }

let name = String::from("actix");
borrows(&name);
takes_ownership(name);
// name 已 move`,
  },
  "result-error": {
    kind: "result-error",
    title: "Result",
    code: `async fn user(path: web::Path<u32>) -> Result<HttpResponse> {
    let id = path.into_inner();
    if id == 0 {
        return Ok(HttpResponse::BadRequest().body("invalid id"));
    }
    Ok(HttpResponse::Ok().json(json!({ "id": id })))
}`,
  },
  "async-await": {
    kind: "async-await",
    title: "async/await",
    code: `async fn slow() -> impl Responder {
    tokio::time::sleep(Duration::from_millis(50)).await;
    "done"
}`,
  },
  config: {
    kind: "config",
    title: "Cargo / env",
    code: `[dependencies]
actix-web = "4"
serde = { version = "1", features = ["derive"] }

let port = env::var("PORT").unwrap_or("8080".into());`,
  },
  "json-body": {
    kind: "json-body",
    title: "JSON body",
    code: `#[derive(Deserialize)]
struct CreateNote { title: String, body: String }

#[post("/notes")]
async fn create(body: web::Json<CreateNote>) -> impl Responder {
    HttpResponse::Created().json(body.into_inner())
}`,
  },
  httpserver: {
    kind: "httpserver",
    title: "HttpServer",
    code: `HttpServer::new(|| App::new().route("/health", web::get().to(|| async { "ok" })))
    .bind(("0.0.0.0", 8080))?
    .workers(4)
    .run()
    .await`,
  },
  "app-routes": {
    kind: "app-routes",
    title: "Routes",
    code: `#[get("/hello/{name}")]
async fn greet(name: web::Path<String>) -> String {
    format!("hi {name}")
}
App::new().service(greet)`,
  },
  responders: {
    kind: "responders",
    title: "Responder",
    code: `async fn health() -> impl Responder {
    web::Json(Health { status: "up" })
}
async fn missing() -> HttpResponse {
    HttpResponse::NotFound().body("missing")
}`,
  },
  "scope-resource": {
    kind: "scope-resource",
    title: "Scope",
    code: `App::new().service(
  web::scope("/api/v1").service(
    web::resource("/notes/{id}")
      .route(web::get().to(get_note))
  )
)`,
  },
  extractors: {
    kind: "extractors",
    title: "Extractors",
    code: `async fn list(
    path: web::Path<String>,
    q: web::Query<Page>,
    db: web::Data<Db>,
) -> impl Responder { /* ... */ }`,
  },
  "path-query": {
    kind: "path-query",
    title: "Path/Query",
    code: `async fn item(
    path: web::Path<(u32, String)>,
    query: web::Query<Search>,
) -> String {
    let (id, kind) = path.into_inner();
    format!("{id}/{kind}?q={}", query.q)
}`,
  },
  "app-data": {
    kind: "app-data",
    title: "AppData",
    code: `struct AppState { hits: Mutex<u64> }
async fn hit(data: web::Data<AppState>) -> String {
    let mut n = data.hits.lock().unwrap();
    *n += 1;
    format!("hits={n}")
}`,
  },
  middleware: {
    kind: "middleware",
    title: "Middleware",
    code: `App::new()
    .wrap(middleware::Logger::default())
    .wrap(middleware::Compress::default())`,
  },
  "auth-middleware": {
    kind: "auth-middleware",
    title: "Auth",
    code: `// Authorization: Bearer <token>
// 失败 → 401
// 成功 → extensions.insert(user)`,
  },
  logging: {
    kind: "logging",
    title: "Logging",
    code: `env_logger::init_from_env(
  env_logger::Env::new().default_filter_or("info")
);
// RUST_LOG=debug,actix_web=info`,
  },
  challenge: {
    kind: "challenge",
    title: "REST verbs",
    code: `GET    /api/notes
POST   /api/notes
PUT    /api/notes/{id}
DELETE /api/notes/{id}`,
  },
  state: {
    kind: "state",
    title: "CRUD state",
    code: `struct Db {
  notes: Mutex<Vec<Note>>,
  seq: Mutex<u64>,
}`,
  },
  testing: {
    kind: "testing",
    title: "Tests",
    code: `#[actix_web::test]
async fn health_ok() {
    let app = test::init_service(App::new().route(...)).await;
    let req = TestRequest::get().uri("/health").to_request();
    let resp = test::call_service(&app, req).await;
    assert!(resp.status().is_success());
}`,
  },
  streaming: {
    kind: "streaming",
    title: "Stream",
    code: `HttpResponse::Ok()
  .content_type("text/plain")
  .streaming(stream)`,
  },
  websocket: {
    kind: "websocket",
    title: "WebSocket",
    code: `// HTTP Upgrade → WebSocket
// 读 Client 消息 / 写 Server 消息
// ping/pong 心跳`,
  },
  actor: {
    kind: "actor",
    title: "Actor",
    code: `// mailbox 串行处理消息
// handler 只 send，不直接抢锁`,
  },
};

export function getDemoSource(kind: DemoKind): DemoSource {
  return SOURCES[kind] ?? SOURCES["hello-world"];
}
