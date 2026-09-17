"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "../chatbot.module.css";

const assistantNames = ["Lucy", "Mia", "Ava", "Emma", "Sofia", "Nora", "Zoe", "Luna", "Ella", "Harper", "Olivia", "Mila", "Aiden", "Leo", "Noah", "Theo"];
const initialMessage = { from: "bot", text: "Hi. I can help you find the right way to begin." };

function randomAssistant(exclude) {
  const options = assistantNames.filter((name) => name !== exclude);
  return options[Math.floor(Math.random() * options.length)];
}

function playNotificationSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(660, now);
    oscillator.frequency.setValueAtTime(880, now + 0.08);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.25);
    oscillator.addEventListener("ended", () => void context.close(), { once: true });
  } catch {
    // Audio is optional and can be blocked by browser autoplay policy.
  }
}

export default function Chatbot() {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([initialMessage]);
  const [assistantName, setAssistantName] = useState(() => randomAssistant());
  const [sessionId, setSessionId] = useState();
  const [sending, setSending] = useState(false);
  const [showCustomerCare, setShowCustomerCare] = useState(false);
  const [launcherArriving, setLauncherArriving] = useState(true);
  const [greetingVisible, setGreetingVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const abortRef = useRef(null);
  const inputRef = useRef(null);
  const endRef = useRef(null);
  const sendingRef = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLauncherArriving(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const enableAudio = () => {
      window.removeEventListener("pointerdown", enableAudio);
      window.removeEventListener("keydown", enableAudio);
    };

    window.addEventListener("pointerdown", enableAudio, { once: true });
    window.addEventListener("keydown", enableAudio, { once: true });
    return () => {
      window.removeEventListener("pointerdown", enableAudio);
      window.removeEventListener("keydown", enableAudio);
    };
  }, []);

  useEffect(() => {
    sendingRef.current = sending;
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  useEffect(() => {
    if (!sending && open) inputRef.current?.focus();
  }, [sending, open]);

  useEffect(() => {
    document.title = unreadCount > 0
      ? `(${unreadCount}) New message | Answer Right Now`
      : "Answer Right Now";

    function clearUnread() {
      if (document.visibilityState === "visible") setUnreadCount(0);
    }

    document.addEventListener("visibilitychange", clearUnread);
    window.addEventListener("focus", clearUnread);
    return () => {
      document.removeEventListener("visibilitychange", clearUnread);
      window.removeEventListener("focus", clearUnread);
      document.title = "Answer Right Now";
    };
  }, [unreadCount]);

  const updateLastBot = useCallback((text) => {
    setMessages((current) => {
      const next = [...current];
      const index = next.findLastIndex((message) => message.from === "bot");
      if (index >= 0) next[index] = { ...next[index], text };
      return next;
    });
  }, []);

  const sendMessage = useCallback(async (text) => {
    const message = text.trim();
    if (!message || sendingRef.current) return;

    const controller = new AbortController();
    abortRef.current = controller;
    sendingRef.current = true;
    setSending(true);
    setInput("");
    setShowCustomerCare(false);
    setMessages((current) => [...current, { from: "user", text: message }, { from: "bot", text: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/x-ndjson" },
        body: JSON.stringify({ message, session_id: sessionId }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const errorText = await response.text();
        let detail = "The assistant could not reply.";
        try {
          detail = JSON.parse(errorText).detail || detail;
        } catch {
          if (errorText.trim() && !errorText.toLowerCase().includes("<html")) detail = errorText;
        }
        throw new Error(detail);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let answer = "";
      let receivedSessionId;
      let customerCare = false;
      let streamError;

      const processLine = (line) => {
        if (!line.trim()) return;
        try {
          const data = JSON.parse(line);
          if (data.session_id) receivedSessionId = data.session_id;
          if (typeof data.show_customer_care === "boolean") customerCare = data.show_customer_care;
          if (data.error) streamError = data.error;
          const chunk = data.response || (data.type === "chunk" ? data.content : "");
          if (chunk) {
            answer += chunk;
            updateLastBot(answer);
          } else if (data.type === "done" && data.content && !answer) {
            answer = data.content;
            updateLastBot(answer);
          }
        } catch (error) {
          console.error("Invalid NDJSON line:", line, error);
        }
      };

      while (true) {
        const { value, done } = await reader.read();
        buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        lines.forEach(processLine);
        if (done) break;
      }
      if (buffer.trim()) processLine(buffer);
      if (!answer) throw new Error(streamError || "The assistant returned an empty response.");
      if (receivedSessionId) setSessionId(receivedSessionId);
      setShowCustomerCare(customerCare);
      setUnreadCount((count) => count + 1);
      playNotificationSound();
    } catch (error) {
      if (!controller.signal.aborted) {
        console.error("Chat error:", error);
        updateLastBot(error instanceof Error ? error.message : "The assistant is temporarily unavailable.");
      }
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      sendingRef.current = false;
      setSending(false);
    }
  }, [sessionId, updateLastBot]);

  useEffect(() => {
    function openChat(event) {
      const message = event.detail?.message?.trim();
      if (!message || sendingRef.current) return;
      setOpen(true);
      void sendMessage(message);
    }

    window.addEventListener("trimmedi:open-chat", openChat);
    return () => window.removeEventListener("trimmedi:open-chat", openChat);
  }, [sendMessage]);

  function clearChat() {
    abortRef.current?.abort();
    setAssistantName((current) => randomAssistant(current));
    setMessages([initialMessage]);
    setInput("");
    setSessionId(undefined);
    setShowCustomerCare(false);
    sendingRef.current = false;
    setSending(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className={styles.root} id="chatbot">
      {open ? (
        <section className={styles.panel} role="dialog" aria-label="Answer Right Now assistant">
          <header className={styles.header}>
            <div className={styles.identity}><span className={styles.avatar}>✦</span><div><strong>{assistantName}</strong><span><b />{sending ? `${assistantName} is typing...` : "Online now"}</span></div></div>
            <div className={styles.actions}><button type="button" onClick={clearChat} aria-label="Clear chat">⌫</button><button type="button" onClick={() => setOpen(false)} aria-label="Close chat">×</button></div>
          </header>

          <div className={styles.messages} aria-live="polite">
            {messages.map((message, index) => <div className={`${styles.row} ${message.from === "user" ? styles.userRow : ""}`} key={`${message.from}-${index}`}>{message.from === "bot" && <span className={styles.messageAvatar}>✦</span>}<div className={`${styles.message} ${message.from === "user" ? styles.userMessage : styles.botMessage}`}>{message.text ? (message.from === "bot" ? <ReactMarkdown>{message.text}</ReactMarkdown> : message.text) : <span className={styles.cursor} />}</div></div>)}
            {sending && <span className={styles.typing}>{assistantName} is typing...</span>}
            {showCustomerCare && <a className={styles.care} href="tel:+18334263964"><span>☎</span><span><strong>Talk to a human agent</strong><small>+1-833-426-3964</small></span></a>}
            <div ref={endRef} />
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputWrap}><input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} placeholder={sending ? `${assistantName} is typing...` : "Message the assistant..."} disabled={sending} aria-label="Message assistant" />{sending ? <button type="button" onClick={() => abortRef.current?.abort()} aria-label="Stop generating">■</button> : <button type="submit" disabled={!input.trim()} aria-label="Send message">↑</button>}</div>
            <small>{sending ? "Click stop to end the response" : "Enter to send"}</small>
          </form>
        </section>
      ) : (
        <>
          {greetingVisible && <div className={styles.greeting}><button type="button" onClick={() => setGreetingVisible(false)} aria-label="Dismiss greeting">×</button>👉 <span>We are here!</span></div>}
          <button type="button" className={`${styles.launcher} ${launcherArriving ? styles.arriving : ""}`} onClick={() => { setOpen(true); setGreetingVisible(false); }} aria-label="Open chat">✦</button>
        </>
      )}
    </div>
  );
}
