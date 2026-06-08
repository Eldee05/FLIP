import { useState, useRef, useEffect } from "react";
import { useStore } from "../../store/useStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Th,
  Td,
  Button,
  Badge,
} from "../shared/UI";
import {
  uploadDocument,
  deleteDocument,
  getDownloadUrl,
  listDocuments,
} from "../../services/documentService";
//import { Icons } from "../shared/Icons";

const EXISTING_DOCS = [
  {
    id: "d1",
    name: "Victim Impact Statement",
    case: "CASE-2024-001",
    date: "30 Apr 2026",
    type: "pdf",
  },
  {
    id: "d2",
    name: "Case Initiation Letter",
    case: "CASE-2024-001",
    date: "15 Mar 2026",
    type: "pdf",
  },
  {
    id: "d3",
    name: "Rights Notification",
    case: "CASE-2024-001",
    date: "15 Mar 2026",
    type: "pdf",
  },
];

const TYPE_ICONS = { pdf: "📄", image: "🖼️", doc: "📝", other: "🗃️" };

const MAX_SIZES = {
  pdf: 25 * 1024 * 1024,
  image: 10 * 1024 * 1024,
  doc: 15 * 1024 * 1024,
  audio: 50 * 1024 * 1024,
  video: 100 * 1024 * 1024,
  other: 10 * 1024 * 1024,
};

function fileType(file) {
  if (file.type.startsWith("image/")) return "image";
  if (file.type === "application/pdf") return "pdf";
  if (
    file.type.includes("word") ||
    file.name.endsWith(".docx") ||
    file.name.endsWith(".doc")
  )
    return "doc";
  return "other";
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function DocumentsTab() {
  const {
    uploadedFiles,
    addUploadedFile,
    removeUploadedFile,
    setUploadedFiles,
  } = useStore();
  console.log("RENDER FILES:", uploadedFiles);
  const [dragging, setDragging] = useState(false);
  const [previewing, setPreviewing] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    async function loadFiles() {
      try {
        const files = await listDocuments();

        console.log("SUPABASE FILES:", files);

        const mappedFiles = files.map((file) => ({
          id: file.id || file.name,
          name: file.name.replace(/^\d+-/, ""),
          size: file.metadata?.size || 0,
          type: "other",
          fileName: file.name,
          uploaded: new Date(file.created_at).toLocaleDateString(),
        }));

        console.log("FILES TO STORE:", mappedFiles);

        setUploadedFiles(mappedFiles);
      } catch (err) {
        console.error("Failed to load documents", err);
      }
    }

    loadFiles();
  }, []);

  async function processFiles(fileList) {
    for (const f of Array.from(fileList)) {
      try {
        const type = fileType(f);

        const maxSize = MAX_SIZES[type] || MAX_SIZES.other;

        if (f.size > maxSize) {
          alert(
            `${f.name} exceeds the maximum size of ${formatSize(maxSize)}.`,
          );
          continue;
        }

        const uploaded = await uploadDocument(f);

        addUploadedFile({
          id: Date.now() + Math.random(),

          name: uploaded.originalName,

          size: uploaded.size,

          type,

          mimeType: f.type,

          fileName: uploaded.fileName,

          uploaded: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        });
      } catch (err) {
        console.error("UPLOAD ERROR:", err);

        alert(
          err?.message || JSON.stringify(err) || `Failed to upload ${f.name}`,
        );
      }
    }
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    processFiles(e.dataTransfer.files);
  }

  function onInputChange(e) {
    processFiles(e.target.files);
    e.target.value = "";
  }

  async function download(file) {
    try {
      const url = await getDownloadUrl(file.fileName);

      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      a.click();
    } catch (err) {
      console.error(err);
      alert("Unable to download file.");
    }
  }

  return (
    <div style={{ animation: "fadeUp 0.35s var(--ease) both" }}>
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
            marginBottom: "4px",
          }}
        >
          Dashboard /{" "}
          <span style={{ color: "var(--gold-light)" }}>Documents</span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "26px",
            fontWeight: 600,
          }}
        >
          Case Documents
        </h1>
      </div>

      {/* ── Upload Drop Zone ─────────────────────────────────── */}
      <Card style={{ marginBottom: "20px" }}>
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
        </CardHeader>
        <CardBody>
          <div
            onClick={() => inputRef.current.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            style={{
              border: `2px dashed ${dragging ? "var(--gold)" : "var(--border-light)"}`,
              borderRadius: "var(--radius-lg)",
              padding: "40px 20px",
              textAlign: "center",
              cursor: "pointer",
              background: dragging
                ? "rgba(201,168,76,0.05)"
                : "rgba(128,128,128,0.03)",
              transition: "var(--transition)",
            }}
          >
            <div style={{ fontSize: "36px", marginBottom: "10px" }}>📂</div>
            <p
              style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}
            >
              {dragging ? "Drop files here" : "Click to upload or drag & drop"}
            </p>
            <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Supports PDF, Word, images (JPG, PNG, GIF) and other file types
            </p>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.bmp,.webp,.txt,.xlsx,.csv"
              onChange={onInputChange}
              style={{ display: "none" }}
            />
          </div>

          {/* Upload progress / file list */}
          {uploadedFiles?.length > 0 && (
            <div
              style={{
                marginTop: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {uploadedFiles?.map((f) => (
                <div
                  key={f.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 14px",
                    background: "rgba(128,128,128,0.06)",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>{TYPE_ICONS[f.type]}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {f.name}
                    </p>
                    <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                      {formatSize(f.size)} · {f.uploaded}
                    </p>
                  </div>
                  {f.type === "image" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPreviewing(f)}
                    >
                      Preview
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => download(f)}
                  >
                    ⬇ Download
                  </Button>
                  <button
                    onClick={async () => {
                      try {
                        await deleteDocument(f.fileName);

                        removeUploadedFile(f.id);
                      } catch (err) {
                        console.error(err);
                        alert("Failed to delete file.");
                      }
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                      fontSize: "16px",
                      padding: "4px",
                      lineHeight: 1,
                    }}
                    aria-label="Remove file"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* ── Image Preview Modal ───────────────────────────────── */}
      {previewing && (
        <div
          onClick={() => setPreviewing(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            zIndex: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              position: "relative",
            }}
          >
            <img
              src={previewing.dataUrl}
              alt={previewing.name}
              style={{
                maxWidth: "100%",
                maxHeight: "85vh",
                borderRadius: "var(--radius)",
                display: "block",
              }}
            />
            <button
              onClick={() => setPreviewing(null)}
              style={{
                position: "absolute",
                top: "-12px",
                right: "-12px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "var(--red)",
                border: "none",
                color: "#fff",
                fontSize: "14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ── Official Case Documents ───────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Official Case Documents</CardTitle>
          <Badge variant="info">{EXISTING_DOCS.length} files</Badge>
        </CardHeader>
        <CardBody noPadding>
          <Table>
            <thead>
              <tr>
                <Th>Document</Th>
                <Th>Case</Th>
                <Th>Date</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {EXISTING_DOCS.map((doc) => (
                <tr
                  key={doc.id}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(128,128,128,0.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <Td>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span>📄</span>
                      <span style={{ fontWeight: 500 }}>{doc.name}</span>
                    </span>
                  </Td>
                  <Td>
                    <span
                      style={{ fontWeight: 600, color: "var(--gold-light)" }}
                    >
                      {doc.case}
                    </span>
                  </Td>
                  <Td style={{ color: "var(--text-muted)" }}>{doc.date}</Td>
                  <Td>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => {
                        // In production this would fetch the real file
                        const a = document.createElement("a");
                        a.href = "#";
                        // Simulate download
                        console.log("Downloading", doc.name);
                      }}
                    >
                      ⬇ Download
                    </Button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
