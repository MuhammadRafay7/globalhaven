import React, { ChangeEvent, FC, useState, useTransition } from "react";
import Image from "next/image";
import { TbPhotoPlus, TbLink } from "react-icons/tb";

import SpinnerMini from "./Loader";
import { cn } from "@/utils/helper";

const edgestoreEnabled = process.env.NEXT_PUBLIC_EDGESTORE_ENABLED === "true";

interface ImageUploadProps {
  onChange: (fieldName: string, imgSrc: string) => void;
  initialImage?: string;
}

const ImageUpload: FC<ImageUploadProps> = ({ onChange, initialImage = "" }) => {
  const [image, setImage] = useState(initialImage);
  const [isLoading, startTransition] = useTransition();
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleFileChange = async (file: File) => {
    if (!file.type.startsWith("image")) return;
    const previewUrl = URL.createObjectURL(file);
    setImage(previewUrl);

    if (!edgestoreEnabled) {
      onChange("image", previewUrl);
      return;
    }

    startTransition(async () => {
      try {
        const { useEdgeStore } = await import("@/lib/edgestore");
        // This will throw if provider isn't mounted — caught below
        const { edgestore } = (useEdgeStore as any)();
        const res = await edgestore.publicFiles.upload({
          file,
          options: { replaceTargetUrl: initialImage },
        });
        onChange("image", res.url);
      } catch {
        onChange("image", previewUrl);
      }
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    handleFileChange(e.target.files[0]);
  };

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) handleFileChange(e.dataTransfer.files[0]);
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) return;
    setImage(urlInput.trim());
    onChange("image", urlInput.trim());
    setShowUrlInput(false);
    setUrlInput("");
  };

  return (
    <div className="flex flex-col gap-3">
      <label
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        htmlFor="hotel"
        className={cn(
          "relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-12 border-slate-300 dark:border-dark-border w-full h-[220px] flex flex-col justify-center items-center text-slate-500 dark:text-slate-400 rounded-xl",
          isLoading && "opacity-70",
          isDragging && "border-primary-500 bg-primary-50 dark:bg-primary-900/10"
        )}
      >
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center z-20 bg-white/60 dark:bg-dark-card/60 rounded-xl">
            <SpinnerMini className="w-8 h-8 text-primary-600" />
          </div>
        )}
        {image ? (
          <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden">
            <Image
              fill
              style={{ objectFit: "cover" }}
              src={image}
              alt="property"
              sizes="100vw"
              className="z-10"
              unoptimized
            />
          </div>
        ) : (
          <>
            <TbPhotoPlus className="w-14 h-14 mb-3 text-slate-400 dark:text-slate-500" />
            <span className="font-semibold text-sm">
              Click or drag to upload
            </span>
            <span className="text-xs mt-1 text-slate-400">PNG, JPG up to 10MB</span>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          id="hotel"
          className="w-0 h-0 opacity-0"
          onChange={handleChange}
          autoFocus
        />
      </label>

      {/* URL fallback input */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <TbLink size={14} />
          {showUrlInput ? "Hide" : "Use image URL instead"}
        </button>
      </div>

      {showUrlInput && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="flex-1 text-sm border border-slate-200 dark:border-dark-border rounded-lg px-3 py-2 bg-white dark:bg-dark-card text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors"
          >
            Use
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
