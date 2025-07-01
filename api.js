export async function getPageSummary(content, apiKey) {
    const prompt = `Summarize the following webpage content:\n\n${content}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7
        }), w
    });

    const json = await response.json();
    return json.choices?.[0]?.message?.content || "No summary available.";
}

export async function getCSSModifications(instruction, html, apiKey) {
    const prompt = `
You're a helpful assistant that returns CSS rules only. Given the HTML, provide only new CSS rules that satisfy: "${instruction}"

HTML:\n${html}
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.5
        }),
    });

    const json = await response.json();
    return json.choices?.[0]?.message?.content || "/* No CSS generated */";
}
