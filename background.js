chrome.commands.onCommand.addListener((command) => {
    if (command === "toggle-input-box") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0].id) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: () => {
                        const box = document.getElementById("floating-input-box");
                        if (box) {
                            box.style.display = box.style.display === "none" ? "block" : "none";
                        }
                    }
                });
            }
        });
    }
});
