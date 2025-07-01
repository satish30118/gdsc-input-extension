document.getElementById("export").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const key = new URL(tabs[0].url).hostname;
    chrome.storage.local.get([key], (result) => {
      const blob = new Blob([result[key] || ""], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      chrome.downloads.download({
        url: url,
        filename: `note-${key}.txt`
      });
    });
  });
});

document.getElementById("clear").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const key = new URL(tabs[0].url).hostname;
    chrome.storage.local.remove([key], () => {
      alert("Note cleared for this site.");
    });
  });
});
