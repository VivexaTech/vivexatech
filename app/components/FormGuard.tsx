"use client";

import { useEffect, useState } from "react";

const honeypotStyle: React.CSSProperties = {
  position: "absolute",
  left: "-9999px",
  top: "auto",
  width: 1,
  height: 1,
  overflow: "hidden",
};

export default function FormGuard() {
  const [startedAt] = useState(() => String(Date.now()));
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || document.querySelector("script[data-turnstile]")) return;
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.dataset.turnstile = "true";
    document.body.appendChild(script);
  }, [siteKey]);

  return (
    <>
      <input type="hidden" name="startedAt" value={startedAt} />
      <div style={honeypotStyle} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {siteKey ? (
        <div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" />
      ) : null}
    </>
  );
}
