const API_URL = import.meta.env.REACT_APP_API_URL|| "http://localhost:5000";


export async function generateText(prompt) {
  try {
    const res = await fetch(`${API_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();
    return data.result;
  } catch (error) {
    console.error("Error generating text:", error);
    return "⚠️ Something went wrong. Please try again.";
  }
}
