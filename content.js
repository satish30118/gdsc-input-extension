if (!window.hasCustomNotesPanel) {
    window.hasCustomNotesPanel = true;

    const hostname = location.hostname;
    const notesKey = `${hostname}_notes`;
    const lastKey = `${hostname}_lastPage`;


    // Create main panel
    const panel = document.createElement("div");
    panel.id = "notes-panel";
    panel.innerHTML = `
    <div id="notes-header">
      <strong>Saved Notes</strong>
      <button id="create-note">➕</button>
    </div>
    <div id="notes-list"></div>
    <div id="note-editor" style="display:none">
      <div>
        <button id="back">⬅ Back</button>
        <button id="copy">📋 Copy</button>
        <button id="export">⬇ Export</button>
        <button id="delete">🗑 Delete</button>
      </div>
      <textarea id="note-content" rows="10"></textarea>
    </div>
  `;
    document.body.appendChild(panel);


    // Make panel draggable using the header
    const header = panel.querySelector("#notes-header");
    let isDragging = false, offsetX, offsetY;

    header.addEventListener("mousedown", (e) => {
        isDragging = true;
        const rect = panel.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        panel.style.top = `${e.clientY - offsetY}px`;
        panel.style.left = `${e.clientX - offsetX}px`;
        panel.style.right = "auto";  // override right so left takes effect
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        document.body.style.userSelect = "";
    });


    // Load notes list
    chrome.storage.local.get([notesKey, lastKey], (result) => {
        const notes = result[notesKey] || {};
        const lastPage = result[lastKey] || null;
        renderNotesList(notes);
        if (lastPage && notes[lastPage]) openNote(lastPage, notes[lastPage]);
    });

    
    document.addEventListener("keydown", (e) => {
        // Alt + N toggle
        if (e.altKey && e.key.toLowerCase() === "n") {
            e.preventDefault(); 
            const panel = document.getElementById("notes-panel");
            if (!panel) return;
            if (panel.style.display === "none") {
                panel.style.display = "flex"; 
            } else {
                panel.style.display = "none";
            }
        }
    });

    function renderNotesList(notes) {
        const list = panel.querySelector("#notes-list");
        list.innerHTML = "";
        Object.entries(notes).forEach(([title, content]) => {
            const btn = document.createElement("button");
            btn.className = "note-title";
            btn.textContent = title;
            btn.onclick = () => openNote(title, content);
            list.appendChild(btn);
        });
    }

    function openNote(title, content) {
        panel.querySelector("#note-editor").style.display = "block";
        panel.querySelector("#notes-list").style.display = "none";
        panel.querySelector("#note-content").value = content;
        panel.setAttribute("data-current-note", title);
        chrome.storage.local.set({ [lastKey]: title });
    }

    // Create note
    panel.querySelector("#create-note").onclick = () => {
        const title = prompt("Title for this note:");
        if (!title) return;
        chrome.storage.local.get([notesKey], (result) => {
            const notes = result[notesKey] || {};
            notes[title] = "";
            chrome.storage.local.set({ [notesKey]: notes }, () => renderNotesList(notes));
        });
    };

    // Back button
    panel.querySelector("#back").onclick = () => {
        panel.querySelector("#note-editor").style.display = "none";
        panel.querySelector("#notes-list").style.display = "block";
    };

    // Save on input
    panel.querySelector("#note-content").addEventListener("input", () => {
        const title = panel.getAttribute("data-current-note");
        chrome.storage.local.get([notesKey], (result) => {
            const notes = result[notesKey] || {};
            notes[title] = panel.querySelector("#note-content").value;
            chrome.storage.local.set({ [notesKey]: notes });
        });
    });

    // Export
    panel.querySelector("#export").onclick = () => {
        const title = panel.getAttribute("data-current-note");
        const content = panel.querySelector("#note-content").value;
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title}.txt`;
        a.click();
    };

    // Copy
    panel.querySelector("#copy").onclick = () => {
        const content = panel.querySelector("#note-content").value;
        navigator.clipboard.writeText(content);
        alert("Copied to clipboard");
    };

    // Delete
    panel.querySelector("#delete").onclick = () => {
        const title = panel.getAttribute("data-current-note");
        if (!confirm(`Delete "${title}"?`)) return;
        chrome.storage.local.get([notesKey], (result) => {
            const notes = result[notesKey] || {};
            delete notes[title];
            chrome.storage.local.set({ [notesKey]: notes }, () => {
                panel.querySelector("#note-editor").style.display = "none";
                panel.querySelector("#notes-list").style.display = "block";
                renderNotesList(notes);
            });
        });
    };
}
