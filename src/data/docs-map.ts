/** actix.rs / Rust 文档对照地图 */

export type DocItem = {
  title: string;
  official: string;
  lessonSlug?: string;
  note?: string;
};

export type DocSection = {
  id: string;
  title: string;
  items: DocItem[];
};

const ACTIX = "https://actix.rs";
const RUST = "https://doc.rust-lang.org/book";

export const DOC_SECTIONS: DocSection[] = [
  {
    id: "rust",
    title: "Rust 基础",
    items: [
      {
        title: "所有权",
        official: `${RUST}/ch04-00-understanding-ownership.html`,
        lessonSlug: "ownership",
      },
      {
        title: "错误处理",
        official: `${RUST}/ch09-00-error-handling.html`,
        lessonSlug: "types-result",
      },
      {
        title: "异步编程",
        official: "https://rust-lang.github.io/async-book/",
        lessonSlug: "async-await",
      },
      {
        title: "Cargo",
        official: "https://doc.rust-lang.org/cargo/",
        lessonSlug: "cargo-mod",
      },
      {
        title: "Serde",
        official: "https://serde.rs/",
        lessonSlug: "serde-json",
      },
    ],
  },
  {
    id: "getting-started",
    title: "Actix 入门",
    items: [
      {
        title: "Quick start",
        official: `${ACTIX}/docs/getting-started/`,
        lessonSlug: "intro",
      },
      {
        title: "Application",
        official: `${ACTIX}/docs/application/`,
        lessonSlug: "app-routes",
        note: "App / configure / app_data",
      },
      {
        title: "Server",
        official: `${ACTIX}/docs/server/`,
        lessonSlug: "httpserver",
      },
      {
        title: "Handlers",
        official: `${ACTIX}/docs/handlers/`,
        lessonSlug: "handlers",
      },
      {
        title: "URL Dispatch / Scope",
        official: `${ACTIX}/docs/url-dispatch/`,
        lessonSlug: "scope-resource",
      },
    ],
  },
  {
    id: "extractors",
    title: "提取器",
    items: [
      {
        title: "Extractors overview",
        official: `${ACTIX}/docs/extractors/`,
        lessonSlug: "extractors-intro",
      },
      {
        title: "Path / Query",
        official: `${ACTIX}/docs/extractors/path/`,
        lessonSlug: "path-query",
      },
      {
        title: "JSON",
        official: `${ACTIX}/docs/extractors/json/`,
        lessonSlug: "json-form",
      },
      {
        title: "Application data",
        official: `${ACTIX}/docs/application/`,
        lessonSlug: "app-data",
        note: "web::Data",
      },
    ],
  },
  {
    id: "middleware",
    title: "中间件与错误",
    items: [
      {
        title: "Middleware",
        official: `${ACTIX}/docs/middleware/`,
        lessonSlug: "middleware",
      },
      {
        title: "Errors",
        official: `${ACTIX}/docs/errors/`,
        lessonSlug: "error-handling",
      },
      {
        title: "Logging",
        official: `${ACTIX}/docs/middleware/logging/`,
        lessonSlug: "cors-logging",
      },
    ],
  },
  {
    id: "rest",
    title: "REST 与会话",
    items: [
      {
        title: "Request lifecycle",
        official: `${ACTIX}/docs/request/`,
        lessonSlug: "rest-design",
      },
      {
        title: "Responses",
        official: `${ACTIX}/docs/response/`,
        lessonSlug: "handlers",
      },
      {
        title: "Static files",
        official: `${ACTIX}/docs/static-files/`,
        lessonSlug: "official-static",
        note: "参考卡片",
      },
    ],
  },
  {
    id: "testing-deploy",
    title: "测试与部署",
    items: [
      {
        title: "Testing",
        official: `${ACTIX}/docs/testing/`,
        lessonSlug: "testing",
      },
      {
        title: "HTTP/2 & TLS",
        official: `${ACTIX}/docs/server/`,
        lessonSlug: "official-http2",
      },
    ],
  },
];

export function getDocsCoverage() {
  let total = 0;
  let linked = 0;
  for (const sec of DOC_SECTIONS) {
    for (const it of sec.items) {
      total += 1;
      if (it.lessonSlug) linked += 1;
    }
  }
  return {
    total,
    linked,
    percent: total ? Math.round((linked / total) * 100) : 0,
  };
}
