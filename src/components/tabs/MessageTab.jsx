import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useStore } from "../../store/useStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  FormGroup,
  Label,
  Textarea,
  Alert,
} from "../shared/UI";

const EJ_SERVICE = "service_o19agur";
const EJ_TEMPLATE = "template_6y2432k";
const EJ_KEY = "QGsZz3A5V2T3x093H"; //

const THREADS = [
  {
    id: 1,
    sender: "DC Sarah Mitchell",
    role: "Case Officer",
    preview:
      "Your hearing has been confirmed for June 15th. Please ensure you bring your ID and all case documents.",
    time: "Today, 09:14",
    unread: true,
    avatar: "SM",
    color: "var(--blue)",
  },
  {
    id: 2,
    sender: "Victim Support Team",
    role: "Support",
    preview:
      "Resources are available for your upcoming court appearance. We can arrange a pre-court visit.",
    time: "Yesterday",
    unread: true,
    avatar: "VS",
    color: "var(--green)",
  },
  {
    id: 3,
    sender: "Sarah Thornton (Solicitor)",
    role: "Solicitor",
    preview:
      "I have reviewed the case files. We should discuss strategy before the June 15 hearing.",
    time: "2 days ago",
    unread: false,
    avatar: "ST",
    color: "var(--gold)",
  },
];

export default function MessageTab() {
  const { currentUser } = useStore();

  const [selected, setSelected] = useState(null);
  const [compose, setCompose] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState(null); // {ok, msg}
  const formRef = useRef();

  const senderName = currentUser?.name || "Portal User";
  const senderEmail = currentUser?.vin || "user@fiip.portal";

  async function sendMessage(e) {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) {
      setSendResult({
        ok: false,
        msg: "Please fill in both subject and message.",
      });
      return;
    }
    setSending(true);
    setSendResult(null);

    try {
      await emailjs.send(
        EJ_SERVICE,
        EJ_TEMPLATE,
        {
          from_name: senderName,
          from_email: senderEmail,
          subject: subject,
          message: body,
          to_email: "federalpolicy24@gmail.com",
          sent_at: new Date().toLocaleString(),
        },
        EJ_KEY,
      );
      setSendResult({
        ok: true,
        msg: "✅ Message sent to your solicitor successfully.",
      });
      setSubject("");
      setBody("");
      setTimeout(() => {
        setSendResult(null);
        setCompose(false);
      }, 3000);
    } catch (error) {
      setSendResult({
        ok: false,
        msg: `❌ Failed to send: ${error?.text || error?.message || "Check your EmailJS credentials in MessagesTab.jsx"}`,
      });

      setSubject("");
      setBody("");
      setTimeout(() => {
        setSendResult(null);
        setCompose(false);
      }, 3000);
    }
    setSending(false);
  }

  return (
    <div style={{ animation: "fadeUp 0.35s var(--ease) both" }}>
      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              marginBottom: "4px",
            }}
          >
            Dashboard /{" "}
            <span style={{ color: "var(--gold-light)" }}>Messages</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "26px",
              fontWeight: 600,
            }}
          >
            Secure Messages
          </h1>
        </div>
        <Button
          variant="gold"
          size="sm"
          onClick={() => {
            setCompose(true);
            setSelected(null);
          }}
        >
          + New Message
        </Button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "18px",
          alignItems: "start",
        }}
      >
        {/* Thread list */}
        <Card>
          <CardHeader>
            <CardTitle>Inbox</CardTitle>
          </CardHeader>
          <div>
            {THREADS.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  setSelected(t);
                  setCompose(false);
                }}
                style={{
                  padding: "14px 16px",
                  cursor: "pointer",
                  borderBottom: "1px solid var(--border)",
                  background:
                    selected?.id === t.id
                      ? "rgba(201,168,76,0.06)"
                      : "transparent",
                  transition: "var(--transition)",
                  borderLeft:
                    selected?.id === t.id
                      ? "2px solid var(--gold)"
                      : "2px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (selected?.id !== t.id)
                    e.currentTarget.style.background = "rgba(128,128,128,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (selected?.id !== t.id)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: t.unread ? 700 : 500,
                    }}
                  >
                    {t.sender}
                  </span>
                  <span
                    style={{ fontSize: "10px", color: "var(--text-muted)" }}
                  >
                    {t.time}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    lineHeight: 1.4,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {t.preview}
                </p>
                {t.unread && (
                  <div
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "var(--blue)",
                      marginTop: "6px",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Right panel */}
        <Card>
          {compose ? (
            <>
              <CardHeader>
                <CardTitle>Message to Solicitor</CardTitle>
                <button
                  onClick={() => setCompose(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    fontSize: "18px",
                    lineHeight: 1,
                  }}
                >
                  ✕
                </button>
              </CardHeader>
              <CardBody>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-muted)",
                    marginBottom: "16px",
                    padding: "10px 12px",
                    background: "rgba(79,142,247,0.08)",
                    borderRadius: "var(--radius)",
                    border: "1px solid rgba(79,142,247,0.2)",
                  }}
                >
                  📨 Your message will be emailed directly to your solicitor at{" "}
                  <strong style={{ color: "var(--gold-light)" }}>
                    federalpolicy24@gmail.com
                  </strong>
                </p>

                {sendResult && (
                  <Alert variant={sendResult.ok ? "success" : "error"}>
                    {sendResult.msg}
                  </Alert>
                )}

                <form ref={formRef} onSubmit={sendMessage} noValidate>
                  <FormGroup>
                    <Label htmlFor="msg-from">From</Label>
                    <div
                      style={{
                        padding: "10px 14px",
                        background: "rgba(128,128,128,0.06)",
                        borderRadius: "var(--radius)",
                        fontSize: "13px",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {senderName} &lt;{senderEmail}&gt;
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="msg-to">To</Label>
                    <div
                      style={{
                        padding: "10px 14px",
                        background: "rgba(128,128,128,0.06)",
                        borderRadius: "var(--radius)",
                        fontSize: "13px",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      Solicitor — federalpolicy24@gmail.com
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="msg-subject">Subject</Label>
                    <input
                      id="msg-subject"
                      type="text"
                      placeholder="e.g. Question about CASE-2024-001"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        background: "rgba(128,128,128,0.08)",
                        border: "1px solid var(--border-light)",
                        borderRadius: "var(--radius)",
                        fontSize: "14px",
                        fontFamily: "var(--font-body)",
                        color: "var(--text-primary)",
                        outline: "none",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--gold)";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(201,168,76,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--border-light)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="msg-body">Message</Label>
                    <Textarea
                      id="msg-body"
                      placeholder="Write your message here…"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows={6}
                    />
                  </FormGroup>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                      type="submit"
                      variant="gold"
                      size="sm"
                      style={{ flex: 1 }}
                      disabled={sending}
                    >
                      {sending ? "⏳ Sending…" : "📨 Send Message"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCompose(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardBody>
            </>
          ) : selected ? (
            <>
              <CardHeader>
                <div>
                  <CardTitle>{selected.sender}</CardTitle>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      marginTop: "2px",
                    }}
                  >
                    {selected.role} · {selected.time}
                  </p>
                </div>
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => setCompose(true)}
                >
                  Reply
                </Button>
              </CardHeader>
              <CardBody>
                <div
                  style={{
                    padding: "16px",
                    background: "rgba(128,128,128,0.04)",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {selected.preview}
                  </p>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    paddingTop: "16px",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <Button
                    variant="gold"
                    size="sm"
                    onClick={() => setCompose(true)}
                  >
                    Reply to {selected.sender.split(" ")[0]}
                  </Button>
                </div>
              </CardBody>
            </>
          ) : (
            <CardBody>
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                  color: "var(--text-muted)",
                }}
              >
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>💬</div>
                <p style={{ fontSize: "14px" }}>
                  Select a message or compose a new one
                </p>
              </div>
            </CardBody>
          )}
        </Card>
      </div>
    </div>
  );
}
