import { useState, useEffect } from "react";

const WALLETS = [
  {
    id: "eth",
    label: "Ethereum",
    symbol: "ETH",
    icon: "Ξ",
    color: "#627eea",
    bg: "rgba(98,126,234,0.08)",
    border: "rgba(98,126,234,0.2)",
    address: "0xa186CDE39efdAa7f5F68f0A9A36f8F04E1C18A19",
  },
  {
    id: "usdt",
    label: "Tron (USDT)",
    symbol: "USDT",
    icon: "₮",
    color: "#26a17b",
    bg: "rgba(38,161,123,0.08)",
    border: "rgba(38,161,123,0.2)",
    address: "TJmB5RnuwoWci6pkSW3iBdExdhJkEa96vX",
  },
  {
    id: "usdc",
    label: "USD Coin",
    symbol: "USDC",
    icon: "$",
    color: "#2775ca",
    bg: "rgba(39,117,202,0.08)",
    border: "rgba(39,117,202,0.2)",
    address: "0x08C62c9Fa3426d8D3F0Ba5Bc2163171e325cCd2e",
  },
  {
    id: "bnb",
    label: "BNB",
    symbol: "BNB",
    icon: "◈",
    color: "#f3ba2f",
    bg: "rgba(243,186,47,0.08)",
    border: "rgba(243,186,47,0.2)",
    address: "0x08C62c9Fa3426d8D3F0Ba5Bc2163171e325cCd2e",
  },
];

function WalletCard({ wallet }) {
  const [copied, setCopied] = useState(false);
  const [hovering, setHovering] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(wallet.address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div
      style={{
        background: "var(--bg-card, #1a1d2e)",
        border: `1px solid ${hovering ? wallet.border : "var(--border, rgba(255,255,255,0.08))"}`,
        borderRadius: "var(--radius-lg, 12px)",
        padding: "20px 22px",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
        boxShadow: hovering
          ? `0 4px 24px ${wallet.bg}`
          : "0 2px 8px rgba(0,0,0,0.2)",
        transform: hovering ? "translateY(-1px)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Subtle top accent line matching coin color */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${wallet.color}, transparent)`,
          opacity: hovering ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      />

      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Coin icon */}
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: wallet.bg,
              border: `1px solid ${wallet.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: 700,
              color: wallet.color,
              flexShrink: 0,
            }}
          >
            {wallet.icon}
          </div>
          <div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                fontFamily: "var(--font-display, serif)",
                color: "var(--text-primary, #fff)",
              }}
            >
              {wallet.label}
            </div>
            <div
              style={{
                fontSize: "10px",
                color: wallet.color,
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              {wallet.symbol}
            </div>
          </div>
        </div>

        {/* Copied badge */}
        {copied && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              background: "rgba(61,184,138,0.12)",
              border: "1px solid rgba(61,184,138,0.3)",
              borderRadius: "20px",
              padding: "3px 10px",
              fontSize: "10px",
              fontWeight: 700,
              color: "#3db88a",
              animation: "fadeIn 0.2s ease",
            }}
          >
            <span style={{ fontSize: "13px" }}>✓</span> ✓ Copied!
          </div>
        )}
      </div>

      {/* Address row */}
      <div
        style={{
          background: "rgba(128,128,128,0.06)",
          border: "1px solid var(--border-light, rgba(255,255,255,0.05))",
          borderRadius: "var(--radius, 8px)",
          padding: "8px 10px",
          marginBottom: "12px",
          fontFamily: "monospace",
          fontSize: "10px",
          color: "var(--text-secondary, rgba(255,255,255,0.7))",
          wordBreak: "break-all",
          lineHeight: 1.6,
          letterSpacing: "0.3px",
        }}
      >
        {wallet.address}
      </div>

      {/* Copy button + hint */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            color: "var(--text-muted, rgba(255,255,255,0.35))",
            margin: 0,
          }}
        >
          👆 Click to copy wallet address
        </p>

        <button
          onClick={handleCopy}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            borderRadius: "var(--radius, 8px)",
            border: copied
              ? "1px solid rgba(61,184,138,0.4)"
              : `1px solid ${wallet.border}`,
            background: copied ? "rgba(61,184,138,0.1)" : wallet.bg,
            color: copied ? "#3db88a" : wallet.color,
            fontSize: "10px",
            fontWeight: 700,
            fontFamily: "var(--font-body, sans-serif)",
            cursor: "pointer",
            transition: "all 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            if (!copied) e.currentTarget.style.opacity = "0.8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          {copied ? (
            <>
              <span style={{ fontSize: "14px" }}> ✓ Copied!</span>
            </>
          ) : (
            <>
              <span>📋</span> Copy Address
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function WalletModal({ onClose }) {
  // Close on Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "fadeIn 0.2s var(--ease)",
      }}
    >
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          width: "100%",
          maxWidth: "560px",
          maxHeight: "88vh",
          overflowY: "auto",
          position: "relative",
          animation: "fadeUp 0.3s var(--ease)",
        }}
      >
        {/* Gold top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg,transparent,var(--gold),transparent)",
            borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
          }}
        />

        {/* Modal header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "22px 24px 16px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(201,168,76,0.12)",
                border: "1px solid rgba(201,168,76,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
              }}
            >
              💱
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                Wallet Addresses
              </h2>
              <p
                style={{
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  margin: 0,
                  marginTop: "2px",
                }}
              >
                Click any address to copy it instantly
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close wallet"
            style={{
              background: "rgba(128,128,128,0.08)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius)",
              color: "var(--text-muted)",
              cursor: "pointer",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontFamily: "var(--font-body)",
              transition: "var(--transition)",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(224,82,82,0.1)";
              e.currentTarget.style.color = "#fca5a5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(128,128,128,0.08)";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            ✕
          </button>
        </div>

        {/* Warning banner */}
        <div
          style={{
            margin: "16px 24px 0",
            background: "rgba(201,168,76,0.07)",
            border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: "var(--radius)",
            padding: "10px 14px",
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "10px", flexShrink: 0 }}>⚠️</span>
          <p
            style={{
              fontSize: "11px",
              color: "var(--gold-light)",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Always verify the full address before sending funds. Blockchain
            transactions are irreversible.{" "}
            <strong>Contact your solicitor if unsure.</strong>
          </p>
        </div>

        {/* Wallet cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "16px 24px 24px",
          }}
        >
          {WALLETS.map((wallet) => (
            <WalletCard key={wallet.id} wallet={wallet} />
          ))}
        </div>
      </div>
    </div>
  );
}
