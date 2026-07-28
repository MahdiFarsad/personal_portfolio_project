"use client";

import { useState } from "react";

// During local dev, the frontend (localhost:3000) and PHP backend (served by Laragon)
// are different origins, so we need the full URL. In production both are served from
// the same domain, so this becomes a relative path instead.
const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost/portfolio/backend/api/submit.php"
    : "/api/submit.php";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot field, stays empty for real users
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, formType: "contact" }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "", website: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg("Could not reach the server. Please try again later.");
    }
  }

  return (
    <main className="min-h-screen px-6 md:px-16 py-16 max-w-2xl mx-auto">
      <p className="font-mono text-sm text-teal tracking-widest uppercase mb-4">
        Get In Touch
      </p>
      <h1 className="font-display text-3xl md:text-5xl mb-10">Contact</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Honeypot field - hidden from real users via CSS, bots often fill it anyway */}
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange}
          className="hidden"
          tabIndex="-1"
          autoComplete="off"
        />

        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-muted block mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full bg-surface border border-surface focus:border-teal outline-none rounded-sm px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-muted block mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-surface border border-surface focus:border-teal outline-none rounded-sm px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-muted block mb-2">
            Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full bg-surface border border-surface focus:border-teal outline-none rounded-sm px-4 py-3 text-sm resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="font-mono text-sm uppercase tracking-wide bg-amber text-ink px-6 py-3 rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50 w-fit"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="font-mono text-sm text-teal">
            Message sent. I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="font-mono text-sm text-amber">{errorMsg}</p>
        )}
      </form>
    </main>
  );
}
