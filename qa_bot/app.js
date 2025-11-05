const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage("Ty", text, "user");
  userInput.value = "";

  setTimeout(() => {
    const reply = getBotReply(text);
    addMessage("Snowcia Bot", reply, "bot");
  }, 700);
}

function addMessage(sender, text, cls) {
  const msg = document.createElement("div");
  msg.classList.add("message", cls);
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotReply(input) {
  input = input.toLowerCase();
  if (input.includes("hej") || input.includes("cześć")) {
    return "Hejka! 😊 Jak mogę pomóc?";
  } else if (input.includes("jak masz na imię")) {
    return "Jestem Snowcia Bot, mały projekt z portfolio!";
  } else if (input.includes("kto cię stworzył")) {
    return "Stworzyła mnie Snowcia — mistrzyni kodu 🔥";
  } else if (input.includes("pogoda")) {
    return "Nie mam dostępu do prognozy, ale mogę zgadywać, że jest ładnie 😎";
  } else {
    const responses = [
      "Nie jestem pewna, ale brzmi ciekawie 🤔",
      "Możesz mi to wyjaśnić trochę bardziej?",
      "Brzmi mądrze 😄",
      "Spróbuj zapytać inaczej — jeszcze się uczę!"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
}
