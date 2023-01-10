function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    memos_api: document.querySelector("#api").value
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#api").value = result.memos_api || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("memos_api");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
