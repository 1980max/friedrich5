
async function sendMessage() {
    const input = document.getElementById("user-input");
    const responseContainer = document.getElementById("response");
    const question = input.value.trim();

    if (!question) return;

    responseContainer.innerHTML = "⏳ Denke nach...";
    
    try {
        const response = await fetch("/api/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: question }),
        });

        const data = await response.json();

        if (data.answer) {
            responseContainer.innerHTML = data.answer;
        } else {
            responseContainer.innerHTML = "⚠️ Fehler: " + (data.error?.message || "Unbekannt");
        }
    } catch (error) {
        responseContainer.innerHTML = "❌ Netzwerkfehler";
    }
}
