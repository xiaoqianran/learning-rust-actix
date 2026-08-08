export type RustFile = {
  path: string;
  code: string;
};

export type RustPreset = {
  id: string;
  title: string;
  summary: string;
  files: RustFile[];
  /** 模拟请求 */
  tryRequest?: {
    method: string;
    path: string;
    body?: string;
    expectStatus: number;
    expectBody: string;
  };
};

export const RUST_PRESETS: RustPreset[] = [
  {
    id: "hello",
    title: "Hello World",
    summary: "最小 HttpServer + GET /",
    files: [
      {
        path: "src/main.rs",
        code: `use actix_web::{get, App, HttpServer, Responder};

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
}
`,
      },
      {
        path: "Cargo.toml",
        code: `[package]
name = "hello-actix"
version = "0.1.0"
edition = "2021"

[dependencies]
actix-web = "4"
`,
      },
    ],
    tryRequest: {
      method: "GET",
      path: "/",
      expectStatus: 200,
      expectBody: "Hello, Actix!",
    },
  },
  {
    id: "json-api",
    title: "JSON API",
    summary: "POST JSON + web::Data 状态",
    files: [
      {
        path: "src/main.rs",
        code: `use actix_web::{post, web, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;

#[derive(Serialize, Deserialize, Clone)]
struct Note {
    id: u64,
    title: String,
}

struct Db {
    notes: Mutex<Vec<Note>>,
    seq: Mutex<u64>,
}

#[derive(Deserialize)]
struct Create {
    title: String,
}

#[post("/notes")]
async fn create(db: web::Data<Db>, body: web::Json<Create>) -> impl Responder {
    let mut seq = db.seq.lock().unwrap();
    *seq += 1;
    let note = Note {
        id: *seq,
        title: body.title.clone(),
    };
    db.notes.lock().unwrap().push(note.clone());
    HttpResponse::Created().json(note)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let db = web::Data::new(Db {
        notes: Mutex::new(vec![]),
        seq: Mutex::new(0),
    });
    HttpServer::new(move || {
        App::new()
            .app_data(db.clone())
            .service(create)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
`,
      },
      {
        path: "Cargo.toml",
        code: `[package]
name = "json-api"
version = "0.1.0"
edition = "2021"

[dependencies]
actix-web = "4"
serde = { version = "1", features = ["derive"] }
serde_json = "1"
`,
      },
    ],
    tryRequest: {
      method: "POST",
      path: "/notes",
      body: '{"title":"from playground"}',
      expectStatus: 201,
      expectBody: '{"id":1,"title":"from playground"}',
    },
  },
  {
    id: "extractors",
    title: "Path + Query",
    summary: "提取路径参数与查询串",
    files: [
      {
        path: "src/main.rs",
        code: `use actix_web::{get, web, App, HttpServer, Responder};
use serde::Deserialize;

#[derive(Deserialize)]
struct Page {
    page: u32,
}

#[get("/users/{id}")]
async fn user(path: web::Path<u32>, q: web::Query<Page>) -> impl Responder {
    format!("user={} page={}", path, q.page)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(user))
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}
`,
      },
    ],
    tryRequest: {
      method: "GET",
      path: "/users/7?page=2",
      expectStatus: 200,
      expectBody: "user=7 page=2",
    },
  },
  {
    id: "middleware",
    title: "Logger 中间件",
    summary: "wrap Logger + health",
    files: [
      {
        path: "src/main.rs",
        code: `use actix_web::{middleware, web, App, HttpServer, Responder};

async fn health() -> impl Responder {
    "ok"
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Logger::default())
            .route("/health", web::get().to(health))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
`,
      },
    ],
    tryRequest: {
      method: "GET",
      path: "/health",
      expectStatus: 200,
      expectBody: "ok",
    },
  },
  {
    id: "auth",
    title: "Bearer 鉴权草图",
    summary: "登录发 token，/me 校验",
    files: [
      {
        path: "src/main.rs",
        code: `// 教学草图：生产请用安全随机 token / JWT + 哈希密码
use actix_web::{get, post, web, App, HttpRequest, HttpResponse, HttpServer};
use serde::Deserialize;
use std::collections::HashMap;
use std::sync::Mutex;

struct Tokens(Mutex<HashMap<String, String>>);

#[derive(Deserialize)]
struct Login {
    email: String,
    password: String,
}

#[post("/auth/login")]
async fn login(body: web::Json<Login>, tokens: web::Data<Tokens>) -> HttpResponse {
    if body.password != "password123" {
        return HttpResponse::Unauthorized().body("bad credentials");
    }
    let token = "demo-token".to_string();
    tokens.0.lock().unwrap().insert(token.clone(), body.email.clone());
    HttpResponse::Ok().json(serde_json::json!({ "token": token }))
}

#[get("/me")]
async fn me(req: HttpRequest, tokens: web::Data<Tokens>) -> HttpResponse {
    let auth = req
        .headers()
        .get("Authorization")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("");
    let token = auth.strip_prefix("Bearer ").unwrap_or("");
    match tokens.0.lock().unwrap().get(token) {
        Some(email) => HttpResponse::Ok().json(serde_json::json!({ "email": email })),
        None => HttpResponse::Unauthorized().finish(),
    }
}
`,
      },
    ],
    tryRequest: {
      method: "GET",
      path: "/me",
      expectStatus: 401,
      expectBody: "",
    },
  },
];

export function getPreset(id: string): RustPreset {
  return RUST_PRESETS.find((p) => p.id === id) ?? RUST_PRESETS[0]!;
}
