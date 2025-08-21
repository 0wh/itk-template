"use client";

import { useRef, useState, useEffect } from "react";
import { Upload, FileImage, AppWindowMac, FileText, Globe } from "lucide-react";
import { readImage } from "@itk-wasm/image-io";
import type { Image } from "@itk-wasm/image-io";

import { PipelineTemplate } from "@/app/pipeline/template";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [itkImage, setItkImage] = useState<Image | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && itkImage?.data) {
      const data = itkImage.data as Uint8ClampedArray;
      const [width, height] = itkImage.size;
      const channels = itkImage.imageType.components;
      const imageData = createImageData(data, width, height, channels);
      ctx.putImageData(imageData, 0, 0);
    }
  }, [itkImage]);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const { image } = await readImage(file);
      setItkImage(image);
    }
  }
  return (
    <div className="font-sans grid items-center justify-items-center min-h-screen p-8 pb-20">
      <main className="flex items-center justify-center h-100">
        {itkImage ? (
          <div className="flex justify-center w-100 mt-10">
            <canvas
              ref={canvasRef}
              width={itkImage.size[0]}
              height={itkImage.size[1]}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg w-100 py-8 mt-10">
            <FileImage className="h-10 w-10 mb-4" />
            <input
              ref={fileInputRef}
              className="hidden"
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleFile}
            />
            <button
              className="flex items-center bg-amber-300 rounded p-4 mt-4"
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              <Upload className="h-4 w-4 mr-2" />
              Select File
            </button>

            <div className="w-full mt-4">
              <p className="text-xs text-muted-foreground text-center mt-1">
                PNG or JPEG
              </p>
            </div>
          </div>
        )}
        <div className="flex flex-col items-start px-10 w-100 h-full">
          <PipelineTemplate itkImage={itkImage} setItkImage={setItkImage} />
        </div>
      </main>
      <footer className="flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://docs.itk.org/projects/wasm/en/latest/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AppWindowMac className="h-4 w-4" />
          ITK-Wasm
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://docs.itk.org/projects/wasm/en/latest/cxx/tutorial/index.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileText className="h-4 w-4" />
          Tutorial
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://docs.itk.org/projects/wasm/en/latest/introduction/packages.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Globe className="h-4 w-4" />
          Example packages →
        </a>
      </footer>
    </div>
  );
}

function createImageData(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  channels: number
) {
  // Create ImageData from grayscale/rgb/rgba image bytes
  const rgba = new Uint8ClampedArray(4 * width * height);
  for (let i = 0; i < width * height; i++) {
    rgba[i * 4 + 0] = data[i * channels + 0];
    rgba[i * 4 + 1] = channels >= 2 ? data[i * channels + 1] : rgba[i * 4 + 0];
    rgba[i * 4 + 2] = channels >= 3 ? data[i * channels + 2] : rgba[i * 4 + 1];
    rgba[i * 4 + 3] = channels >= 4 ? data[i * channels + 3] : 255;
  }
  return new ImageData(rgba, width, height);
}
