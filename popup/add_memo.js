function onError(error) {
  console.log(`Error: ${error}`);
}

async function sendMemo(){
  if (document.querySelector("#memo_content").value === "") return;

  function onGot(item) {
    if (!String(item.memos_api)) return;
    // console.log(document.querySelector("#memo_content").value);
    fetch(item.memos_api, {
      "headers": {
          "Content-Type": "application/json"
      },
      "body": JSON.stringify({
        "content": String(document.querySelector("#memo_content").value)
      }),
      "method": "POST"
    });
  }

  var getting = browser.storage.local.get("memos_api");
  return getting.then(onGot, onError);
}

document.querySelector("#submit").addEventListener("click", (event) => {
  var sending = sendMemo();
  sending.then(
    () => {
      document.querySelector("#memo_content").value = "";
      const evt = new Event('change');
      document.querySelector("#memo_content").dispatchEvent(evt);
    },
    onError
  )
});

// Save memo when text changes

function saveMemo(e) {
  e.preventDefault();
  browser.storage.local.set({
    memo_content: document.querySelector("#memo_content").value
  });
}

function restoreMemo() {
  function setCurrentChoice(result) {
    document.querySelector("#memo_content").value = result.memo_content || "";
  }

  var getting = browser.storage.local.get("memo_content");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreMemo);
document.querySelector("#memo_content").addEventListener("change", saveMemo);
