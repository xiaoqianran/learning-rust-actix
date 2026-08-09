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
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `Rust 提供内存安全与零成本抽象；actix-web 是基于 Actor 模型的高性能异步 HTTP 框架，在 TechEmpower 等基准中长期名列前茅。

本站路径：先补齐 Rust 异步与错误处理直觉，再进 HttpServer / App / 提取器 / 中间件，最后在「工坊」用模拟 REST API 练登录与笔记 CRUD。

为什么这一节重要：系统级语言遇上高性能 Web 框架。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Rust + Actix 是什么」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Rust + Actix 是什么」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「intro」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Rust + Actix 是什么？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
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
}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：Rust + Actix 是什么
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "hello-world", title: "动手：Hello 请求路径" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "intro-0b4b-1",
            question: "关于「Rust + Actix 是什么」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "intro-0b4b-2",
            question: "学习「Rust + Actix 是什么」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "intro-0b4b-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
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
      {
        type: "text",
        title: "概念深讲",
        body: `每个值有唯一 owner；owner 离开作用域即 drop。传参默认 move；用 &T / &mut T 借用。Web 服务里 handler 常常拿借用的 AppData、Path 字符串切片或 owned String。

为什么这一节重要：移动、借用、生命周期直觉。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「所有权与借用」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "补充要点 1",
        body: `在 handler 里优先用提取器得到 owned 数据（Path<String>、Json<T>），避免和请求生命周期纠缠。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「所有权与借用」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「ownership」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是所有权与借用？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `fn takes_ownership(s: String) {
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
}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：所有权与借用
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "ownership", title: "动手：所有权可视化" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ownership-b46b-1",
            question: "关于「所有权与借用」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "ownership-b46b-2",
            question: "学习「所有权与借用」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "ownership-b46b-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "types-result",
    title: "类型、Result 与 ?",
    summary: "错误传播是 Web 的日常。",
    level: "入门",
    track: "Rust基础",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `Rust 没有异常栈展开；可恢复错误用 Result<T, E>。? 运算符在函数返回 Result 时把 Err 提前返回。Actix handler 可返回 Result<impl Responder, Error>。

为什么这一节重要：错误传播是 Web 的日常。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「类型、Result 与 ?」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「类型、Result 与 ?」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「types-result」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是类型、Result 与 ?？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `use actix_web::{web, HttpResponse, Result};

async fn user(path: web::Path<u32>) -> Result<HttpResponse> {
    let id = path.into_inner();
    if id == 0 {
        return Ok(HttpResponse::BadRequest().body("invalid id"));
    }
    Ok(HttpResponse::Ok().json(serde_json::json!({ "id": id })))
}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：类型、Result 与 ?
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "result-error", title: "动手：Result 分支" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "types-result-eebf-1",
            question: "关于「类型、Result 与 ?」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "types-result-eebf-2",
            question: "学习「类型、Result 与 ?」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "types-result-eebf-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
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
      {
        type: "text",
        title: "概念深讲",
        body: `async fn 返回 Future；.await 在等待 IO 时让出执行权。actix-web 内置/集成 tokio 运行时；入口常用 #[actix_web::main]。不要在 async 里做重 CPU 阻塞，应 spawn_blocking。

为什么这一节重要：Future、.await、#[actix_web::main]。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「async / await 与运行时」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「async / await 与运行时」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「async-await」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是async / await 与运行时？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `use actix_web::{get, web, Responder};
use std::time::Duration;

#[get("/slow")]
async fn slow() -> impl Responder {
    // 模拟 IO
    tokio::time::sleep(Duration::from_millis(50)).await;
    "done"
}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：async / await 与运行时
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "async-await", title: "动手：并发等待" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "async-await-2214-1",
            question: "关于「async / await 与运行时」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "async-await-2214-2",
            question: "学习「async / await 与运行时」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "async-await-2214-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "cargo-mod",
    title: "Cargo 与模块",
    summary: "crate、mod、依赖声明。",
    level: "入门",
    track: "Rust基础",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `cargo new --bin api 创建二进制 crate。Cargo.toml 声明 actix-web、serde、serde_json 等。用 mod 拆 handlers / models / middleware，lib.rs 或 main.rs 组织模块树。

为什么这一节重要：crate、mod、依赖声明。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Cargo 与模块」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Cargo 与模块」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「cargo-mod」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Cargo 与模块？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `[package]
name = "learning-api"
version = "0.1.0"
edition = "2021"

[dependencies]
actix-web = "4"
serde = { version = "1", features = ["derive"] }
serde_json = "1"
env_logger = "0.11"
log = "0.4"`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：Cargo 与模块
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "config", title: "动手：依赖与模块树" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "cargo-mod-12b4-1",
            question: "关于「Cargo 与模块」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "cargo-mod-12b4-2",
            question: "学习「Cargo 与模块」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "cargo-mod-12b4-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "serde-json",
    title: "Serde 与 JSON",
    summary: "Serialize / Deserialize 是 API 标配。",
    level: "入门",
    track: "Rust基础",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `HTTP 边界上的 JSON 与 Rust 结构体互转靠 serde。derive(Serialize, Deserialize) 后即可 web::Json<T> 提取与 .json() 响应。

为什么这一节重要：Serialize / Deserialize 是 API 标配。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Serde 与 JSON」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Serde 与 JSON」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「serde-json」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Serde 与 JSON？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `use serde::{Deserialize, Serialize};

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
}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：Serde 与 JSON
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "json-body", title: "动手：JSON 往返" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "serde-json-68a9-1",
            question: "关于「Serde 与 JSON」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "serde-json-68a9-2",
            question: "学习「Serde 与 JSON」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "serde-json-68a9-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "httpserver",
    title: "HttpServer 与绑定",
    summary: "进程、worker、bind/run。",
    level: "入门",
    track: "Actix入门",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `HttpServer::new 接受闭包，每个 worker 线程克隆一份 App 工厂。bind 地址后 run().await 阻塞服务。生产可 workers(n)、keep_alive、client_request_timeout。

为什么这一节重要：进程、worker、bind/run。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「HttpServer 与绑定」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「HttpServer 与绑定」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「httpserver」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是HttpServer 与绑定？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `HttpServer::new(|| {
    App::new()
        .route("/health", web::get().to(|| async { "ok" }))
})
.bind(("0.0.0.0", 8080))?
.workers(4)
.run()
.await`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：HttpServer 与绑定
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "httpserver", title: "动手：绑定与 worker" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "httpserver-7dd4-1",
            question: "关于「HttpServer 与绑定」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "httpserver-7dd4-2",
            question: "学习「HttpServer 与绑定」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "httpserver-7dd4-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
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
      {
        type: "text",
        title: "概念深讲",
        body: `1) #[get]/path\\")] + .service(handler)  2) .route(path, method.to(fn))  3) web::resource(...).route(...)。路径支持 {id} 动态段。

为什么这一节重要：route / service / resource。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「App 与路由注册」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「App 与路由注册」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「app-routes」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是App 与路由注册？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `use actix_web::{get, post, web, App, HttpResponse};

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
    .route("/ping", web::get().to(|| async { HttpResponse::Ok().body("pong") }))`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：App 与路由注册
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "app-routes", title: "动手：路由匹配" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "app-routes-4c2e-1",
            question: "关于「App 与路由注册」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "app-routes-4c2e-2",
            question: "学习「App 与路由注册」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "app-routes-4c2e-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "handlers",
    title: "Handler 与 Responder",
    summary: "async fn 返回什么都能响应？",
    level: "入门",
    track: "Actix入门",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `impl Responder 的类型可直接返回：&'static str、String、HttpResponse、Json<T> 等。复杂逻辑用 HttpResponse::build。Handler 可以是 async fn，由框架轮询 Future。

为什么这一节重要：async fn 返回什么都能响应？不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Handler 与 Responder」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Handler 与 Responder」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「handlers」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Handler 与 Responder？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `use actix_web::{web, HttpResponse, Responder};
use serde::Serialize;

#[derive(Serialize)]
struct Health { status: &'static str }

async fn health() -> impl Responder {
    web::Json(Health { status: "up" })
}

async fn not_found() -> HttpResponse {
    HttpResponse::NotFound().body("missing")
}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：Handler 与 Responder
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "responders", title: "动手：Responder 类型" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "handlers-7c0b-1",
            question: "关于「Handler 与 Responder」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "handlers-7c0b-2",
            question: "学习「Handler 与 Responder」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "handlers-7c0b-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "scope-resource",
    title: "Scope 与 Resource",
    summary: "前缀分组与细粒度方法。",
    level: "进阶",
    track: "Actix入门",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `web::scope(\\"/api\\") 给一组路由加前缀；web::resource(\\"/notes/{id}\\") 上挂 GET/PUT/DELETE。适合版本化 API：/api/v1。

为什么这一节重要：前缀分组与细粒度方法。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Scope 与 Resource」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Scope 与 Resource」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「scope-resource」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Scope 与 Resource？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `use actix_web::{web, App, HttpResponse};

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

App::new().service(web::scope("/api/v1").configure(api_config))`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：Scope 与 Resource
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "scope-resource", title: "动手：/api 前缀" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "scope-resource-c77b-1",
            question: "关于「Scope 与 Resource」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "scope-resource-c77b-2",
            question: "学习「Scope 与 Resource」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "scope-resource-c77b-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "extractors-intro",
    title: "提取器总览",
    summary: "从请求里「声明式」拿数据。",
    level: "入门",
    track: "请求提取",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `Handler 参数实现 FromRequest 即可自动提取：Path、Query、Json、Form、Data、HttpRequest、Bytes… 失败时框架返回对应错误响应（如 400）。顺序：先提路径/查询，再提 body。

为什么这一节重要：从请求里「声明式」拿数据。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「提取器总览」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「提取器总览」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「extractors-intro」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是提取器总览？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `use actix_web::{web, HttpResponse, Result};

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
}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：提取器总览
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "extractors", title: "动手：提取器流水线" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "extractors-intro-c26d-1",
            question: "关于「提取器总览」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "extractors-intro-c26d-2",
            question: "学习「提取器总览」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "extractors-intro-c26d-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "path-query",
    title: "Path 与 Query",
    summary: "路径参数与查询字符串。",
    level: "入门",
    track: "请求提取",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `web::Path<u32> 自动解析失败→400。多段用元组或结构体。web::Query<T> 需 Deserialize。

为什么这一节重要：路径参数与查询字符串。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Path 与 Query」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Path 与 Query」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「path-query」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Path 与 Query？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `#[derive(serde::Deserialize)]
struct Search { q: String, limit: Option<u32> }

async fn item(
    path: web::Path<(u32, String)>,
    query: web::Query<Search>,
) -> String {
    let (id, kind) = path.into_inner();
    format!("id={id} kind={kind} q={} limit={:?}", query.q, query.limit)
}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：Path 与 Query
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "path-query", title: "动手：改 Path / Query" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "path-query-eba5-1",
            question: "关于「Path 与 Query」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "path-query-eba5-2",
            question: "学习「Path 与 Query」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "path-query-eba5-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "json-form",
    title: "Json 与 Form",
    summary: "Body 反序列化。",
    level: "进阶",
    track: "请求提取",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `请求体只能消费一次。web::Json<T> 读 application/json；web::Form<T> 读 urlencoded。大 body 注意 JsonConfig::limit。

为什么这一节重要：Body 反序列化。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Json 与 Form」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Json 与 Form」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「json-form」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Json 与 Form？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `use actix_web::{post, web, HttpResponse, Result};

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
}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：Json 与 Form
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "json-body", title: "动手：POST JSON" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "json-form-9b67-1",
            question: "关于「Json 与 Form」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "json-form-9b67-2",
            question: "学习「Json 与 Form」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "json-form-9b67-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
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
      {
        type: "text",
        title: "概念深讲",
        body: `HttpServer 多 worker 时每 worker 有自己的 App 状态克隆；用 Arc<Mutex<_>> / Arc<RwLock<_>> 或外部连接池做真共享。app_data(Data::new(state)) 注册，handler 取 Data<T>。

为什么这一节重要：App 级状态与 handler 注入。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「web::Data 共享状态」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「web::Data 共享状态」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「app-data」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是web::Data 共享状态？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `use actix_web::{web, App, HttpServer};
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
})`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：web::Data 共享状态
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "app-data", title: "动手：共享计数" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "app-data-1ddc-1",
            question: "关于「web::Data 共享状态」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "app-data-1ddc-2",
            question: "学习「web::Data 共享状态」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "app-data-1ddc-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "headers-req",
    title: "请求头与 HttpRequest",
    summary: "底层访问仍可用。",
    level: "进阶",
    track: "请求提取",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `大多数场景用提取器；需要原始头、连接信息时注入 HttpRequest 或 web::Header。

为什么这一节重要：底层访问仍可用。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「请求头与 HttpRequest」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「请求头与 HttpRequest」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「headers-req」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是请求头与 HttpRequest？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `use actix_web::{HttpRequest, HttpResponse};

async fn who(req: HttpRequest) -> HttpResponse {
    let ua = req
        .headers()
        .get("user-agent")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("unknown");
    HttpResponse::Ok().body(format!("ua={ua}"))
}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：请求头与 HttpRequest
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "extractors", title: "动手：读 User-Agent", hint: "在提取器面板查看 headers" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "headers-req-45ed-1",
            question: "关于「请求头与 HttpRequest」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "headers-req-45ed-2",
            question: "学习「请求头与 HttpRequest」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "headers-req-45ed-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
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
      {
        type: "text",
        title: "概念深讲",
        body: `.wrap(A).wrap(B) 时，请求先过外层。Logger、Compress、DefaultHeaders、Cors、自定义鉴权都是中间件。Transform trait 可自定义。

为什么这一节重要：wrap 顺序与请求/响应钩子。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「中间件链」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「中间件链」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「middleware」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是中间件链？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `use actix_web::{middleware, App, HttpServer};

App::new()
    .wrap(middleware::Logger::default())
    .wrap(middleware::DefaultHeaders::new().add(("X-Version", "1")))
    .wrap(middleware::Compress::default())`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：中间件链
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "middleware", title: "动手：中间件洋葱" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "middleware-b200-1",
            question: "关于「中间件链」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "middleware-b200-2",
            question: "学习「中间件链」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "middleware-b200-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
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
      {
        type: "text",
        title: "概念深讲",
        body: `中间件读 Authorization，校验后把 UserId 插入 extensions，下游 handler 提取；失败返回 401。也可用提取器封装鉴权。工坊里用模拟 Bearer 练同一心智模型。

为什么这一节重要：Bearer Token 校验模式。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「鉴权中间件思路」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「鉴权中间件思路」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「auth-mw」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是鉴权中间件思路？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `// 中间件伪代码
// 1. 读 Authorization: Bearer <token>
// 2. 查 token → user
// 3. req.extensions_mut().insert(user);
// 4. 调用 next.call(req)
// 失败 → 401 Unauthorized

async fn me(user: web::ReqData<User>) -> impl Responder {
    web::Json(user.into_inner())
}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：鉴权中间件思路
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "auth-middleware", title: "动手：401 vs 200" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "auth-mw-d36e-1",
            question: "关于「鉴权中间件思路」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "auth-mw-d36e-2",
            question: "学习「鉴权中间件思路」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "auth-mw-d36e-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "error-handling",
    title: "错误处理",
    summary: "ResponseError 与统一 JSON 错误。",
    level: "进阶",
    track: "中间件状态",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `实现 ResponseError 让 ? 自动变成正确状态码与 body。统一 {\\"message\\":...} 方便前端。

为什么这一节重要：ResponseError 与统一 JSON 错误。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「错误处理」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「错误处理」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「error-handling」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是错误处理？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `use actix_web::{HttpResponse, ResponseError};
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
}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：错误处理
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "result-error", title: "动手：错误映射" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "error-handling-c213-1",
            question: "关于「错误处理」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "error-handling-c213-2",
            question: "学习「错误处理」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "error-handling-c213-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "cors-logging",
    title: "CORS 与日志",
    summary: "浏览器跨域与可观测性。",
    level: "进阶",
    track: "中间件状态",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `actix-cors 配置允许的 origin/method/header。日志用 env_logger + middleware::Logger，RUST_LOG=info。

为什么这一节重要：浏览器跨域与可观测性。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「CORS 与日志」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「CORS 与日志」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「cors-logging」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是CORS 与日志？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `use actix_cors::Cors;
use actix_web::middleware::Logger;

App::new()
    .wrap(Logger::default())
    .wrap(
        Cors::default()
            .allowed_origin("http://localhost:5173")
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
            .allow_any_header()
            .max_age(3600),
    )`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：CORS 与日志
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "logging", title: "动手：日志级别" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "cors-logging-da3c-1",
            question: "关于「CORS 与日志」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "cors-logging-da3c-2",
            question: "学习「CORS 与日志」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "cors-logging-da3c-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "rest-design",
    title: "REST 资源设计",
    summary: "名词资源 + HTTP 动词。",
    level: "实战",
    track: "REST实战",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `GET 安全幂等；POST 创建；PUT/PATCH 更新；DELETE 删除。用复数名词 /api/notes、/api/notes/{id}。状态码：201 Created、204 No Content、404、401、422。

为什么这一节重要：名词资源 + HTTP 动词。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「REST 资源设计」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「REST 资源设计」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「rest-design」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是REST 资源设计？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `// GET    /api/notes
// POST   /api/notes
// GET    /api/notes/{id}
// PUT    /api/notes/{id}
// DELETE /api/notes/{id}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：REST 资源设计
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "challenge", title: "动手：点选正确方法" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "rest-design-ad76-1",
            question: "关于「REST 资源设计」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "rest-design-ad76-2",
            question: "学习「REST 资源设计」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "rest-design-ad76-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
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
      {
        type: "text",
        title: "概念深讲",
        body: `内存 Vec + Mutex 即可教学；生产换数据库。注意鉴权：所有 notes 路由包在需登录 scope。

为什么这一节重要：工坊同构的服务端形状。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「笔记 CRUD 实现」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "补充要点 1",
        body: `打开「全栈工坊」用 demo@actix.dev / password123 走通同一流程。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「笔记 CRUD 实现」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「crud-notes」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是笔记 CRUD 实现？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `#[derive(Clone, Serialize, Deserialize)]
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
}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：笔记 CRUD 实现
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "state", title: "动手：内存 CRUD" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "crud-notes-2d08-1",
            question: "关于「笔记 CRUD 实现」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "crud-notes-2d08-2",
            question: "学习「笔记 CRUD 实现」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "crud-notes-2d08-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "validation",
    title: "输入校验",
    summary: "拒绝脏数据。",
    level: "实战",
    track: "REST实战",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `长度、邮箱格式、必填字段。可用手写 if 或 validator crate。失败返回 400/422 + 字段错误信息。

为什么这一节重要：拒绝脏数据。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「输入校验」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「输入校验」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「validation」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是输入校验？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `fn validate_note(title: &str, body: &str) -> Result<(), &'static str> {
    if title.trim().is_empty() { return Err("title required"); }
    if title.len() > 120 { return Err("title too long"); }
    if body.len() > 10_000 { return Err("body too long"); }
    Ok(())
}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：输入校验
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "json-body", title: "动手：非法 JSON/字段" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "validation-a617-1",
            question: "关于「输入校验」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "validation-a617-2",
            question: "学习「输入校验」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "validation-a617-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "pagination",
    title: "分页与过滤",
    summary: "列表 API 不一次倒完。",
    level: "实战",
    track: "REST实战",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `page/size 或 cursor。返回 { items, total, page }。注意 size 上限防滥用。

为什么这一节重要：列表 API 不一次倒完。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「分页与过滤」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「分页与过滤」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「pagination」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是分页与过滤？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `#[derive(Deserialize)]
struct PageQuery {
    page: Option<u32>,
    size: Option<u32>,
}

async fn list(q: web::Query<PageQuery>, db: web::Data<Db>) -> impl Responder {
    let page = q.page.unwrap_or(1).max(1);
    let size = q.size.unwrap_or(20).clamp(1, 100);
    // slice notes...
    web::Json(serde_json::json!({ "page": page, "size": size }))
}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：分页与过滤
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "path-query", title: "动手：page/size" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pagination-fe7c-1",
            question: "关于「分页与过滤」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "pagination-fe7c-2",
            question: "学习「分页与过滤」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "pagination-fe7c-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
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
      {
        type: "text",
        title: "概念深讲",
        body: `POST /auth/login → { token, user }；客户端 Authorization: Bearer …；服务端 map 存 token→user；logout 删 token。JWT 可无状态，教学先用不透明 token。

为什么这一节重要：登录发牌、请求带牌。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Token 会话」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Token 会话」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「token-session」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Token 会话？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `#[post("/auth/login")]
async fn login(body: web::Json<Login>) -> Result<HttpResponse> {
    // verify password...
    let token = uuid::Uuid::new_v4().to_string();
    // store token → user
    Ok(HttpResponse::Ok().json(serde_json::json!({
        "token": token,
        "user": { "email": body.email }
    })))
}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：Token 会话
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "auth-middleware", title: "动手：带 Token 访问 /me" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "token-session-e5d2-1",
            question: "关于「Token 会话」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "token-session-e5d2-2",
            question: "学习「Token 会话」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "token-session-e5d2-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "project-structure",
    title: "项目结构",
    summary: "可维护的 crate 布局。",
    level: "实战",
    track: "工程化",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `src/main.rs 启动；src/routes/ 注册；src/handlers/；src/models/；src/middleware/；src/error.rs；tests/ 集成测试。

为什么这一节重要：可维护的 crate 布局。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「项目结构」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「项目结构」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「project-structure」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是项目结构？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `src/
  main.rs
  lib.rs
  error.rs
  models/mod.rs
  handlers/{auth.rs,notes.rs}
  middleware/auth.rs
  routes.rs
tests/api_notes.rs`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：项目结构
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "config", title: "动手：模块树" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "project-structure-3ce2-1",
            question: "关于「项目结构」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "project-structure-3ce2-2",
            question: "学习「项目结构」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "project-structure-3ce2-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
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
      {
        type: "text",
        title: "概念深讲",
        body: `init_service + TestRequest 发调用，读状态码与 body。单元测 handler；集成测完整 App。

为什么这一节重要：actix_web::test 套件。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「测试 Actix 服务」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「测试 Actix 服务」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「testing」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是测试 Actix 服务？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `#[actix_web::test]
async fn health_ok() {
    let app = actix_web::test::init_service(
        App::new().route("/health", web::get().to(|| async { "ok" }))
    ).await;
    let req = actix_web::test::TestRequest::get().uri("/health").to_request();
    let resp = actix_web::test::call_service(&app, req).await;
    assert!(resp.status().is_success());
}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：测试 Actix 服务
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "testing", title: "动手：断言状态码" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "testing-ae2b-1",
            question: "关于「测试 Actix 服务」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "testing-ae2b-2",
            question: "学习「测试 Actix 服务」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "testing-ae2b-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "config-env",
    title: "配置与环境变量",
    summary: "12-factor：端口、数据库 URL。",
    level: "实战",
    track: "工程化",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `std::env::var(\\"PORT\\")、dotenvy 加载 .env。切勿把密钥写进仓库。

为什么这一节重要：12-factor：端口、数据库 URL。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「配置与环境变量」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「配置与环境变量」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「config-env」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是配置与环境变量？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `let port: u16 = std::env::var("PORT")
    .ok()
    .and_then(|s| s.parse().ok())
    .unwrap_or(8080);
let bind = format!("0.0.0.0:{port}");
HttpServer::new(|| App::new())
    .bind(bind)?
    .run()
    .await`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：配置与环境变量
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "config", title: "动手：PORT 环境变量" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "config-env-8956-1",
            question: "关于「配置与环境变量」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "config-env-8956-2",
            question: "学习「配置与环境变量」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "config-env-8956-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "logging-obs",
    title: "日志与可观测",
    summary: "请求 ID、结构化日志。",
    level: "实战",
    track: "工程化",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `Logger 中间件 + tracing 生态；为请求生成 request-id 响应头。错误日志带路径与 user id（勿记密码）。

为什么这一节重要：请求 ID、结构化日志。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「日志与可观测」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「日志与可观测」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「logging-obs」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是日志与可观测？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
App::new().wrap(middleware::Logger::new("%a %{User-Agent}i %s %b %T"))`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：日志与可观测
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "logging", title: "动手：RUST_LOG" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "logging-obs-a4d3-1",
            question: "关于「日志与可观测」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "logging-obs-a4d3-2",
            question: "学习「日志与可观测」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "logging-obs-a4d3-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "deploy",
    title: "构建与部署",
    summary: "release、反向代理、容器。",
    level: "实战",
    track: "工程化",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `cargo build --release；反向代理 TLS；健康检查 /health；优雅关闭；资源限制。Docker 多阶段构建减小镜像。

为什么这一节重要：release、反向代理、容器。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「构建与部署」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「构建与部署」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「deploy」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是构建与部署？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `FROM rust:1.83 as build
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
COPY --from=build /app/target/release/learning-api /usr/local/bin/
ENV PORT=8080
EXPOSE 8080
CMD ["learning-api"]`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：构建与部署
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "httpserver", title: "动手：release 思维模型" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "deploy-078f-1",
            question: "关于「构建与部署」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "deploy-078f-2",
            question: "学习「构建与部署」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "deploy-078f-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "streaming",
    title: "流式响应",
    summary: "大文件与 chunk。",
    level: "进阶",
    track: "进阶模式",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `对大文件/生成器使用流，降低内存峰值。SSE 也可基于流。

为什么这一节重要：大文件与 chunk。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「流式响应」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「流式响应」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「streaming」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是流式响应？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `use actix_web::{HttpResponse, web};
use futures_util::stream;

async fn stream_hello() -> HttpResponse {
    let s = stream::iter(vec![
        Ok::<_, actix_web::Error>(web::Bytes::from("Hello ")),
        Ok(web::Bytes::from("stream")),
    ]);
    HttpResponse::Ok().content_type("text/plain").streaming(s)
}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：流式响应
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "streaming", title: "动手：分块输出" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "streaming-abb0-1",
            question: "关于「流式响应」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "streaming-abb0-2",
            question: "学习「流式响应」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "streaming-abb0-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "websocket",
    title: "WebSocket 入门",
    summary: "actix-web 升级连接。",
    level: "进阶",
    track: "进阶模式",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `HTTP 升级为 WS 后双向推送。聊天、协作、游戏状态。actix 生态有 actix-ws / 原生 actor 方案。

为什么这一节重要：actix-web 升级连接。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「WebSocket 入门」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「WebSocket 入门」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「websocket」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是WebSocket 入门？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `// 路由注册 WS 升级 handler
// 读 Client 消息，写 Server 消息
// 心跳 ping/pong 保活`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：WebSocket 入门
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "websocket", title: "动手：帧收发示意" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "websocket-bf56-1",
            question: "关于「WebSocket 入门」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "websocket-bf56-2",
            question: "学习「WebSocket 入门」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "websocket-bf56-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "actors",
    title: "Actor 直觉",
    summary: "Actix 名字的由来。",
    level: "进阶",
    track: "进阶模式",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `Actor 邮箱串行处理消息，避免共享可变状态的锁心智。actix 框架本身；actix-web 4 更偏 tokio 服务，但 Actor 模型仍可在业务中用。

为什么这一节重要：Actix 名字的由来。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Actor 直觉」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Actor 直觉」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「actors」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Actor 直觉？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `// Actor 收 CreateNote 消息 → 更新内部 Vec
// Handler 只 send 消息，不直接锁全局`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：Actor 直觉
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "actor", title: "动手：邮箱排队" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "actors-67ef-1",
            question: "关于「Actor 直觉」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "actors-67ef-2",
            question: "学习「Actor 直觉」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "actors-67ef-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "performance",
    title: "性能要点",
    summary: "零拷贝、连接池、少分配。",
    level: "进阶",
    track: "进阶模式",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `release 构建；连接池复用 DB；避免 handler 内大克隆；压缩中间件按需；水平扩展多实例 + 负载均衡。

为什么这一节重要：零拷贝、连接池、少分配。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「性能要点」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「性能要点」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「performance」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是性能要点？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "最小示例",
        lang: "rust",
        code: `// 性能要点
fn main() {
    println!("demo: performance");
}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：性能要点
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "httpserver", title: "动手：worker 与吞吐" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "performance-c05f-1",
            question: "关于「性能要点」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "performance-c05f-2",
            question: "学习「性能要点」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "performance-c05f-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "security",
    title: "Web 安全基础",
    summary: "OWASP 速通。",
    level: "进阶",
    track: "进阶模式",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `参数化查询防注入；哈希密码（argon2）；HTTPS；CORS 白名单；限制 body 大小；鉴权默认拒绝；不在日志打密钥。

为什么这一节重要：OWASP 速通。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「Web 安全基础」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「Web 安全基础」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「security」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是Web 安全基础？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `App::new().app_data(
    web::JsonConfig::default().limit(32 * 1024)
)`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：Web 安全基础
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "auth-middleware", title: "动手：拒绝无 token" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "security-e91e-1",
            question: "关于「Web 安全基础」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "security-e91e-2",
            question: "学习「Web 安全基础」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "security-e91e-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "interview",
    title: "面试串讲",
    summary: "用一条请求串起知识点。",
    level: "进阶",
    track: "进阶模式",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `客户端 POST /api/notes → 中间件日志/CORS/鉴权 → 提取 Json + Data<Db> → 业务校验 → 写库 → 201 JSON。对比：所有权保证无数据竞争；Result 驱动错误码；async 提高 IO 并发。

为什么这一节重要：用一条请求串起知识点。不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「面试串讲」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「面试串讲」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「interview」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是面试串讲？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "最小示例",
        lang: "rust",
        code: `// 面试串讲
fn main() {
    println!("demo: interview");
}`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：面试串讲
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "middleware", title: "动手：完整链路回放" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "interview-0498-1",
            question: "关于「面试串讲」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "interview-0498-2",
            question: "学习「面试串讲」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "interview-0498-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "official-app",
    title: "App 配置全解",
    summary: "configure / app_data / wrap 清单",
    level: "进阶",
    track: "官方对齐",
    format: "reference",
    minutes: 12,
    official: "/actix-web/docs/application/",
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `configure / app_data / wrap 清单。本课为参考卡片，对照 actix.rs 文档加深。结业不强制掌握每一张参考卡。

为什么这一节重要：configure / app_data / wrap 清单不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「App 配置全解」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「App 配置全解」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「official-app」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是App 配置全解？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `// 详见 https://actix.rs/actix-web/docs/application/
// 建议：实现一个最小例子后回来对照选项表。`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：App 配置全解
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "hello-world", title: "对照：最小服务" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "official-app-fc8f-1",
            question: "关于「App 配置全解」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "official-app-fc8f-2",
            question: "学习「App 配置全解」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "official-app-fc8f-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "official-server",
    title: "服务器选项",
    summary: "workers / backlog / TLS 入口",
    level: "进阶",
    track: "官方对齐",
    format: "reference",
    minutes: 12,
    official: "/actix-web/docs/server/",
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `workers / backlog / TLS 入口。本课为参考卡片，对照 actix.rs 文档加深。结业不强制掌握每一张参考卡。

为什么这一节重要：workers / backlog / TLS 入口不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「服务器选项」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「服务器选项」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「official-server」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是服务器选项？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `// 详见 https://actix.rs/actix-web/docs/server/
// 建议：实现一个最小例子后回来对照选项表。`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：服务器选项
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "hello-world", title: "对照：最小服务" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "official-server-15f4-1",
            question: "关于「服务器选项」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "official-server-15f4-2",
            question: "学习「服务器选项」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "official-server-15f4-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "official-extract",
    title: "提取器官方列表",
    summary: "Bytes / Payload / Session…",
    level: "进阶",
    track: "官方对齐",
    format: "reference",
    minutes: 12,
    official: "/actix-web/docs/extractors/",
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `Bytes / Payload / Session…。本课为参考卡片，对照 actix.rs 文档加深。结业不强制掌握每一张参考卡。

为什么这一节重要：Bytes / Payload / Session…不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「提取器官方列表」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「提取器官方列表」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「official-extract」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是提取器官方列表？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `// 详见 https://actix.rs/actix-web/docs/extractors/
// 建议：实现一个最小例子后回来对照选项表。`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：提取器官方列表
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "hello-world", title: "对照：最小服务" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "official-extract-16a5-1",
            question: "关于「提取器官方列表」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "official-extract-16a5-2",
            question: "学习「提取器官方列表」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "official-extract-16a5-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "official-middleware",
    title: "内置中间件",
    summary: "ErrorHandlers / NormalizePath…",
    level: "进阶",
    track: "官方对齐",
    format: "reference",
    minutes: 12,
    official: "/actix-web/docs/middleware/",
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `ErrorHandlers / NormalizePath…。本课为参考卡片，对照 actix.rs 文档加深。结业不强制掌握每一张参考卡。

为什么这一节重要：ErrorHandlers / NormalizePath…不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「内置中间件」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「内置中间件」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「official-middleware」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是内置中间件？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `// 详见 https://actix.rs/actix-web/docs/middleware/
// 建议：实现一个最小例子后回来对照选项表。`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：内置中间件
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "hello-world", title: "对照：最小服务" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "official-middleware-f92d-1",
            question: "关于「内置中间件」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "official-middleware-f92d-2",
            question: "学习「内置中间件」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "official-middleware-f92d-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "official-static",
    title: "静态文件",
    summary: "actix-files 托管前端",
    level: "进阶",
    track: "官方对齐",
    format: "reference",
    minutes: 12,
    official: "/actix-web/docs/static-files/",
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `actix-files 托管前端。本课为参考卡片，对照 actix.rs 文档加深。结业不强制掌握每一张参考卡。

为什么这一节重要：actix-files 托管前端不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「静态文件」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「静态文件」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「official-static」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是静态文件？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `// 详见 https://actix.rs/actix-web/docs/static-files/
// 建议：实现一个最小例子后回来对照选项表。`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：静态文件
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "hello-world", title: "对照：最小服务" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "official-static-7bf1-1",
            question: "关于「静态文件」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "official-static-7bf1-2",
            question: "学习「静态文件」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "official-static-7bf1-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
    ],
  },
  {
    slug: "official-http2",
    title: "HTTP/2 与 TLS",
    summary: "rustls 集成要点",
    level: "进阶",
    track: "官方对齐",
    format: "reference",
    minutes: 12,
    official: "/actix-web/docs/server/",
    blocks: [
      {
        type: "text",
        title: "概念深讲",
        body: `rustls 集成要点。本课为参考卡片，对照 actix.rs 文档加深。结业不强制掌握每一张参考卡。

为什么这一节重要：rustls 集成要点不只是名词，而是后续所有实践的前提。学习时请同时抓住三件事：① 它解决什么问题；② 核心机制/API 是什么；③ 什么情况下不该用、常见坑是什么。`,
      },
      {
        type: "text",
        title: "机制与关键点",
        body: `围绕「HTTP/2 与 TLS」，建议你用下面清单自检是否真懂：
· 输入/前置条件是什么？
· 输出/副作用是什么？
· 与相邻概念如何区分？（容易混淆的一对一对比）
· 复杂度或性能上的直觉（是否 O(n)、是否阻塞、是否有状态）
· 在真实项目里通常放在哪一层（入口、中间件、数据层、UI、运维）？

把每个点用自己的话写进笔记；能讲给别人听，才算过关。`,
      },
      {
        type: "text",
        title: "实践步骤",
        body: `1. 只读官方/权威文档里与「HTTP/2 与 TLS」直接相关的一小节，不要发散。
2. 在本机或本站 Demo 里最小复现：只验证一个行为。
3. 故意制造一个错误（错参数、错顺序、错环境），观察报错信息。
4. 改对后再总结：「正确做法 / 错误做法 / 如何排查」三行笔记。
5. 做本节测验；错题收入错题本，隔天再测一次。`,
      },
      {
        type: "text",
        title: "踩坑与排障",
        body: `· 文档示例能跑、自己环境不能：先对齐版本与配置，再怀疑代码。
· 「好像懂了」但默写不出来：回去做最小复现，而不是再看一遍视频。
· 多个概念一起崩：二分法缩小范围（注释一半配置/代码）。
· 与「official-http2」相关的问题，优先查官方 FAQ 与 issue 里的 breaking change。
· 生产环境多一项：可观测性（日志/指标）和回滚策略。`,
      },
      {
        type: "text",
        title: "面试 / 复盘一问",
        body: `请用 90 秒回答：什么是HTTP/2 与 TLS？它解决什么问题？举一个你会在项目里使用（或拒绝使用）的场景，并说明取舍。

加分项：对比一个替代方案，并说出性能、复杂度或可维护性上的差异。`,
      },
      {
        type: "code",
        title: "对应源码",
        lang: "rust",
        code: `// 详见 https://actix.rs/actix-web/docs/server/
// 建议：实现一个最小例子后回来对照选项表。`,
      },
      {
        type: "code",
        title: "自检清单（注释版）",
        lang: "text",
        code: `// [ ] 能用自己的话解释：HTTP/2 与 TLS
// [ ] 能默写最小示例
// [ ] 能说出 2 个踩坑
// [ ] 能在项目场景里决定用/不用`,
      },
      { type: "demo", kind: "hello-world", title: "对照：最小服务" },
      {
        type: "tip",
        body: `先求「能复现 + 能讲清」，再求「背全 API」。本课 Demo 与测验就是你的验收标准。`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "official-http2-a571-1",
            question: "关于「HTTP/2 与 TLS」，最准确的理解是？",
            options: ["只需要记住名词即可", "要同时理解问题、机制、适用边界与常见坑", "与实践无关", "只能在考试中使用"],
            answer: 1,
            explain: "概念 + 机制 + 边界 + 排障，才是可迁移的掌握。",
          },
          {
            id: "official-http2-a571-2",
            question: "学习「HTTP/2 与 TLS」时，优先行动是？",
            options: ["一次看完所有周边主题", "最小复现一个行为，再扩展", "只收藏文档不动手", "跳过报错信息"],
            answer: 1,
            explain: "最小复现建立反馈回路。",
          },
          {
            id: "official-http2-a571-3",
            question: "遇到「示例能跑、自己环境不能」时，你应先？",
            options: ["重写整个项目", "对齐版本/配置并阅读完整报错", "忽略错误继续下一步", "删除全部依赖"],
            answer: 1,
            explain: "环境与版本是第一怀疑对象。",
          },
        ],
      },
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
