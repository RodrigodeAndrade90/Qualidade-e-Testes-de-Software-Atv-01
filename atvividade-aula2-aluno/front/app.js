const examples = [
  ["Alunos · consultar todos", "GET", "/api/students"],
  ["Alunos · localizar", "GET", "/api/students/258001"],
  [
    "Alunos · cadastrar",
    "POST",
    "/api/students",
    { ra: 258099, name: "Estudante de teste" },
  ],
  ["Disciplinas · consultar todas", "GET", "/api/courses"],
  ["Disciplinas · localizar", "GET", "/api/courses/13"],
  [
    "Disciplinas · cadastrar",
    "POST",
    "/api/courses",
    { name: "Disciplina de teste REST" },
  ],
  ["Matrículas · consultar todas", "GET", "/api/enrollments"],
  ["Matrículas · localizar", "GET", "/api/enrollments/student/258001/course/1"],
  [
    "Matrículas · cadastrar",
    "POST",
    "/api/enrollments",
    { studentRa: 258099, courseId: 13 },
  ],
  [
    "Erro 400 · informações incorretas",
    "POST",
    "/api/students",
    { ra: -1, name: "A" },
  ],
  ["Erro 404 · aluno não encontrado", "GET", "/api/students/2147483647"],
  [
    "Erro 409 · matrícula duplicada na base inicial",
    "POST",
    "/api/enrollments",
    { studentRa: 258001, courseId: 1 },
  ],
];
const $ = (id) => document.getElementById(id);
$("base").value =
  location.protocol === "file:" ? "http://localhost:3002" : location.origin;
examples.forEach(([label], index) =>
  $("example").add(new Option(label, index)),
);

function hasBody() {
  return $("method").value === "POST";
}
function requestUrl() {
  const base = new URL($("base").value);
  if (!["http:", "https:"].includes(base.protocol))
    throw new Error("Informe uma URL que utilize HTTP ou HTTPS.");
  const path = $("path").value;
  const method = $("method").value;
  const collection = /^\/api\/(students|courses|enrollments)$/;
  const resource = /^\/api\/(students|courses)\/[^/?#]+$/;
  const enrollment = /^\/api\/enrollments\/student\/[^/?#]+\/course\/[^/?#]+$/;
  const supported =
    (method === "GET" && (collection.test(path) || resource.test(path) || enrollment.test(path))) ||
    (method === "POST" && collection.test(path));

  if (!supported) {
    throw new Error("Escolha um caminho suportado para a opera\u00e7\u00e3o selecionada.");
  }
  return new URL(base.href.replace(/\/$/, "") + path).href;
}
function preview() {
  $("body").disabled = !hasBody();
  let url;
  try {
    url = requestUrl();
  } catch {
    url = "(URL ou rota inválida)";
  }
  $("request-preview").textContent =
    `${$("method").value} ${url}\nAccept: application/json${hasBody() ? "\nContent-Type: application/json\n\n" + $("body").value : ""}`;
}
function chooseExample() {
  const [, method, path, body] = examples[$("example").value];
  $("method").value = method;
  $("path").value = path;
  $("body").value = body ? JSON.stringify(body, null, 2) : "";
  $("example-hint").textContent = "Altere os códigos identificadores e os dados antes de executar.";
  preview();
}
$("example").addEventListener("change", chooseExample);
for (const id of ["base", "method", "path", "body"])
  $(id).addEventListener("input", preview);
$("request-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  let url, body;
  try {
    url = requestUrl();
    if (hasBody()) body = JSON.stringify(JSON.parse($("body").value));
  } catch (error) {
    $("status").className = "status error";
    $("status").textContent = "A chamada não foi realizada";
    $("response-meta").textContent = error.message;
    $("response-headers").textContent = "—";
    $("response-body").textContent =
      "Revise a URL, a rota ou o JSON e faça uma nova tentativa.";
    return;
  }
  const entry = Object.fromEntries(
    ["base", "method", "path", "body"].map((id) => [id, $(id).value]),
  );
  const headers = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  $("send").disabled = true;
  $("status").className = "status";
  $("status").textContent = "Executando…";
  $("response-headers").textContent = "—";
  $("response-body").textContent = "Esperando o retorno…";
  $("response-meta").textContent = url;
  const start = performance.now();
  try {
    const response = await fetch(url, {
      method: entry.method,
      headers,
      body,
      signal: AbortSignal.timeout(15000),
    });
    const text = await response.text();
    $("status").className = `status ${response.ok ? "success" : "error"}`;
    $("status").textContent =
      `${response.status} ${response.statusText}`.trim();
    $("response-meta").textContent =
      `${Math.round(performance.now() - start)} ms · ${new TextEncoder().encode(text).length} bytes de corpo · ${response.url}`;
    $("response-headers").textContent =
      Array.from(response.headers, ([name, value]) => `${name}: ${value}`).join(
        "\n",
      ) || "(nenhum cabeçalho disponível)";
    let formatted = text || "(retorno sem conteúdo)";
    try {
      formatted = JSON.stringify(JSON.parse(text), null, 2);
    } catch {
      /* Mantém respostas que não são JSON. */
    }
    $("response-body").textContent = formatted;
  } catch (error) {
    $("status").className = "status error";
    $("status").textContent = "Não foi possível conectar";
    $("response-meta").textContent =
      `${Math.round(performance.now() - start)} ms · Sem resposta HTTP disponível`;
    $("response-body").textContent =
      `${error.message}\n\nVerifique se a API está em execução e se o endereço está correto. Use preferencialmente a página servida pelo Compose. Outra origem pode exigir configuração de CORS. O limite de espera é 15 segundos.`;
  } finally {
    $("send").disabled = false;
  }
});
chooseExample();
