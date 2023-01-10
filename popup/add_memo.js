function sendMemo(){
  if (document.getElementById("memo_content").value === "") return;

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  function onGot(item) {
    if (!String(item.memos_api)) return;
    fetch(item.memos_api, {
      "headers": {
          "Content-Type": "application/json"
      },
      "referrer": "https://memos.skywt.cn/",
      "body": JSON.stringify({
        "content": String(document.getElementById("memo_content").value)
      }),
      "method": "POST"
    });
  }

  var getting = browser.storage.local.get("memos_api");
  getting.then(onGot, onError);
}

document.addEventListener("click", (event) => {
  if (event.target.id !== "submit") {
    return;
  }
  sendMemo();
});
  