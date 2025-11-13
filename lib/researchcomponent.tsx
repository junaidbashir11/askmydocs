import { useEffect, useState, FormEvent } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface FileInfo {
  file_name: string;
}

export default function LegalComponent() {
  const { connected, publicKey } = useWallet();
  const [hasFile, setHasFile] = useState(false);
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [actualFiles, setActualFiles] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileInfo[]>([]);
  const [filestoWork, setFilestoWork] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Single shared check function (no duplication)
  const checkFileExistence = async () => {
    if (!publicKey) return;

    try {
      const response = await fetch("https://junaidb-askdocs.hf.space/checkfile", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          owner: publicKey.toBase58(),
          filetype: "research",
        }),
      });

      if (!response.ok) throw new Error("Failed to check file");

      const data = await response.json();
      setHasFile(data.status);
      if (data.status && data.files) setFiles(data.files);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setActualFiles(prev => [...prev, ...Array.from(e.target.files as FileList)]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!actualFiles.length || !publicKey) return;

    setLoading(true);

    try {
      const formData = new FormData();
      actualFiles.forEach((file) => formData.append("files", file));
      formData.append("owner", publicKey.toBase58());
      formData.append("filetype", "research");

      const res = await fetch("https://junaidb-askdocs.hf.space/upload-files", {
        method: "POST",
        mode: "cors",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      toast.success("Files uploaded successfully!");

      // ✅ Clear local files & immediately recheck
      setActualFiles([]);
      localStorage.removeItem("researchfiles");
      await checkFileExistence(); // ensures immediate UI update
    } catch (err) {
      console.error(err);
      toast.error(`Failed to upload files ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Only one effect, using shared checkFileExistence
  useEffect(() => {
    if (connected) checkFileExistence();
  }, [connected, publicKey]);

  if (!connected) return <div>Redirecting...</div>;
  console.log(filestoWork)
  return (
    <main className="p-8 border border-gray-700 rounded-2xl bg-gray-800/30 backdrop-blur-sm shadow-xl">
      <h3 className="text-xl font-semibold text-white mb-4">Research</h3>

      <div className="flex justify-center items-start gap-8 w-full max-w-5xl">
        {/* Left Section */}
        <section className="w-1/2">
          {hasFile ? (
            <section className="space-y-6">
              {/* File Selection List */}
              <div className="space-y-2">
                {files.length > 0 ? (
                  files.map((file) => (
                    <div key={file.file_name} className="flex items-center gap-2">
                      <Checkbox
                        id={file.file_name}
                        checked={selectedFiles.some(
                          (f) => f.file_name === file.file_name
                        )}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedFiles((prev) => [...prev, file]);
                            setFilestoWork((prev) => [...prev, file.file_name]);
                          } else {
                            setSelectedFiles((prev) =>
                              prev.filter((f) => f.file_name !== file.file_name)
                            );
                            setFilestoWork((prev) =>
                              prev.filter((f) => f !== file.file_name)
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={file.file_name}
                        className="text-sm text-white font-medium"
                      >
                        {file.file_name}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No files found.</p>
                )}
              </div>

              {/* Upload More Section */}
              <div className="pt-4 border-t border-gray-700">
                <FieldLabel className="text-white font-mono mb-2 block">
                  Upload More Documents
                </FieldLabel>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="file"
                    multiple
                    className="bg-white text-black"
                    onChange={handleFileChange}
                  />
                  <Button type="submit" disabled={loading}>
                    {loading ? "Uploading..." : "Upload"}
                  </Button>
                </form>
              </div>
            </section>
          ) : (
            <section>
              <FieldLabel className="text-white font-mono mb-2 block">
                Upload Documents
              </FieldLabel>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="file"
                  multiple
                  className="bg-white text-black"
                  onChange={handleFileChange}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? "Uploading..." : "Upload"}
                </Button>
              </form>
            </section>
          )}
        </section>

        {/* Right Section (empty for now) */}
        <section className="w-1/2"></section>
      </div>
    </main>
  );
}
