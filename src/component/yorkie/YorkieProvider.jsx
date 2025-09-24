import yorkie from "yorkie-js-sdk";

async function main() {
  // 1. Yorkie 클라이언트 생성 및 연결
  const client = new yorkie.Client("http://localhost:8080", {
    apiKey: "your-api-key", // 필요하다면 API 키
  });
  await client.activate();

  // 2. 문서 생성 및 attach
  const doc = new yorkie.Document("doc1");
  await client.attach(doc);

  // 3. 초기 상태 업데이트
  doc.update((root) => {
    if (!root.counter) {
      root.counter = 0;
    }
  });

  // 4. 문서 변경 구독
  doc.subscribe((event) => {
    console.log("Document changed:", doc.toJSON());
  });

  // 5. 값 변경 예시
  setInterval(() => {
    doc.update((root) => {
      root.counter += 1;
    });
  }, 2000);
}

main();
