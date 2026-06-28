"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  title: "",
  description: "",
  altText: "",
  sortOrder: "100",
  uploadKey: "",
};

export default function PhotoUploadPanel({ uploadEnabled }) {
  const router = useRouter();
  const [formState, setFormState] = useState(initialState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!selectedFile) {
      setStatus({ type: "error", message: "Choose a photo before uploading." });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    const payload = new FormData();
    payload.set("photo", selectedFile);
    payload.set("title", formState.title);
    payload.set("description", formState.description);
    payload.set("altText", formState.altText);
    payload.set("sortOrder", formState.sortOrder || "100");
    payload.set("uploadKey", formState.uploadKey);

    try {
      const response = await fetch("/api/upload-photo", {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Upload failed.");
      }

      setStatus({ type: "success", message: "Photo uploaded and published." });
      setFormState(initialState);
      setSelectedFile(null);
      event.target.reset();
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Upload failed.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="section-shell mt-10 rounded-[2rem] p-6 sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--accent)]">
            Owner upload
          </p>
          <h3 className="font-display mt-3 text-4xl leading-tight text-[color:var(--foreground)]">
            Add a new resort photo from this page.
          </h3>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[color:var(--muted)]">
          Upload a file, enter the gallery details, and the photo will appear in the live gallery after refresh.
        </p>
      </div>

      {!uploadEnabled ? (
        <div className="mt-6 rounded-[1.5rem] border border-[color:var(--line)] bg-white/70 px-5 py-4 text-sm leading-7 text-[color:var(--muted)]">
          Upload is disabled until `SUPABASE_SERVICE_ROLE_KEY` and `GALLERY_UPLOAD_KEY` are configured in the environment.
        </div>
      ) : null}

      <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <label className="field-shell md:col-span-2">
          <span className="field-label">Photo file</span>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="field-input field-file"
            onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
            disabled={!uploadEnabled || isSubmitting}
            required
          />
        </label>

        <label className="field-shell">
          <span className="field-label">Title</span>
          <input
            type="text"
            name="title"
            className="field-input"
            value={formState.title}
            onChange={updateField}
            disabled={!uploadEnabled || isSubmitting}
            required
          />
        </label>

        <label className="field-shell">
          <span className="field-label">Sort order</span>
          <input
            type="number"
            name="sortOrder"
            className="field-input"
            value={formState.sortOrder}
            onChange={updateField}
            disabled={!uploadEnabled || isSubmitting}
            min="1"
          />
        </label>

        <label className="field-shell md:col-span-2">
          <span className="field-label">Description</span>
          <textarea
            name="description"
            className="field-input min-h-28 resize-y"
            value={formState.description}
            onChange={updateField}
            disabled={!uploadEnabled || isSubmitting}
            required
          />
        </label>

        <label className="field-shell">
          <span className="field-label">Alt text</span>
          <input
            type="text"
            name="altText"
            className="field-input"
            value={formState.altText}
            onChange={updateField}
            disabled={!uploadEnabled || isSubmitting}
            required
          />
        </label>

        <label className="field-shell">
          <span className="field-label">Upload key</span>
          <input
            type="password"
            name="uploadKey"
            className="field-input"
            placeholder="Private key from .env.local"
            value={formState.uploadKey}
            onChange={updateField}
            disabled={!uploadEnabled || isSubmitting}
            required
          />
          <span className="text-xs leading-6 text-[color:var(--muted)]">
            Use the private upload key stored in your local environment file.
          </span>
        </label>

        <div className="md:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={!uploadEnabled || isSubmitting}
            className="rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Uploading..." : "Upload photo"}
          </button>
          {status.message ? (
            <p
              className={`text-sm leading-7 ${
                status.type === "error"
                  ? "text-[color:#b42318]"
                  : "text-[color:var(--forest)]"
              }`}
            >
              {status.message}
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}