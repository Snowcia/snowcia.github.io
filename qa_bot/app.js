// proste reguły odpowiedzi — działa offline, bez żadnego serwera
const chat = document.getElementById('chat');
const form = document.getElementById('inputForm');
const input = document.getElementById('userInput');

// zestaw reguł (regex, handler)
const rules = [
  { r: /^(hej|cześć|siema|yo)\b/i, reply: "Siema! Co tam chcesz ogarnąć? 😎" },
  { r: /(jak|co)\s*(si[eę]|sie)?\s*(masz|idziesz)?/i, reply: "Spoko, lecimy dalej — z czym konkretnie? 🤘" },
  { r: /portfolio/i, reply: "Portfolio powinno być czytelne: krótko o Tobie, projekty z opisami i linkami. Chcesz szkielet projektu?" },
  { r: /github/i, reply: "GitHub to miejsce na kod — wrzucaj tam repozytoria z czytelnymi README i demo." },
  { r: /jak\s+zacząć/i, reply: "Zacznij od małego projektu, wrzuć go na GitHub i zrób prostą stronę w portfolio. Chcesz pomóc z pomysłem?" },
  { r: /jak\s+zrobić\s+stronę|html|css|javascript/i, reply: "Zrób proste HTML + CSS, potem dorzuć trochę JS. Mogę Ci zrobić gotowy szablon (masz już taki w repo)." },
  { r: /kontakt|email|mail/i, reply: "Dodaj sekcję kontakt z mailem i linkami do GitHuba / LinkedIn — proste i skuteczne." },
  { r: /dzień|dzień dobry|dobry/i, reply: "Dzień dobry! Jak mogę pomóc z portfolio?" },
  // przykład z parametrem
  { r: /ocen moje hasło|sprawdź hasło|strength/i, reply: "Mogę ocenić siłę hasła lokalnie — nie wysyłaj prawdziwych haseł publicznie." }
];

// domyślne odpowiedzi (kilka wariantów)
const fallback = [
  "Hm, nie do końca kumam — rozwiń pytanie, proszę.",
  "Opisz to dokładniej, to postaram się odpowiedzieć jak człowiek, a nie robot.",
  "Brzmi ciekawie — chcesz prosty przykład czy opis koncepcyjny?"
];

// helper: dodaj komunikat do UI
function addMessage(text, who = 'bot') {
  const el = document.createElement('div');
  el.className = `msg ${who}`;
  el.innerText = text;
  chat.appendChild(el);
  chat.scrollTop = chat.scrollHeight;
}

// prosty "thinking" delay
function botReply(userText) {
  // najpierw pokażemy w stylu "bot typing"
  addMessage("...", 'bot');

  setTimeout(() => {
    // usuń ostatni "..."
    const last = chat.querySelector('.msg.bot:last-child');
    if (last && last.innerText === "...") last.remove();

    const u = userText.trim();

    // sprawdź reguły
    for (const rule of rules) {
      if (rule.r.test(u)) {
        addMessage(rule.reply, 'bot');
        return;
      }
    }

    // prosta odpowiedź na pytania typu "ile ile"
    if (/\?+$/.test(u) || u.endsWith('?')) {
      // losowy fallback + drobne warianty
      addMessage(fallback[Math.floor(Math.random()*fallback.length)], 'bot');
      return;
    }

    // egzotyczna próba: echo z lekkim stylem
    addMessage("Brzmi spoko — doprecyzuj, a dam Ci konkretny kod/plan.", 'bot');
  }, 450 + Math.random()*500);
}

// obsługa formularza
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  input.value = '';
  botReply(text);
});

// powitalna wiadomość
addMessage("Cześć! Jestem Twój Q&A bot. Zadaj pytanie — odpowiem prosto i bez bzdur.", 'bot');
