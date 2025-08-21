"use client";

import Instruction from "@/app/pipeline/instruction.md";

import { useState } from "react";
import type { Image } from "@itk-wasm/image-io";
import { Puzzle, Loader } from "lucide-react";

export function PipelineTemplate({
  itkImage,
  setItkImage,
}: {
  itkImage: Image | null;
  setItkImage: React.Dispatch<React.SetStateAction<Image | null>>;
}) {
  const [pipelineIsBusy, setPipelineIsBusy] = useState<boolean>(false);

  async function processImage(image: Image | null): Promise<number[]> {
    if (image && !pipelineIsBusy) {
      setPipelineIsBusy(true);
      // Implement the itk wasm pipeline here

      // Simulate a 2-second processing delay (replace with your implementation)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Get the output image with thresholds applied
      const outImage: Image = image;
      setItkImage(outImage);
      setPipelineIsBusy(false);
    }
    // Return thresholds computed by Multi-Otsu
    return [];
  }
  return (
    <>
      <Instruction />
      <button
        className="flex items-center bg-amber-300 disabled:bg-amber-100 disabled:text-gray-500 rounded p-4 mt-4"
        disabled={pipelineIsBusy || !itkImage}
        onClick={async () => {
          await processImage(itkImage);
        }}
      >
        {pipelineIsBusy ? (
          <>
            <Loader className="h-4 w-4 mr-2" />
            Processing
          </>
        ) : (
          <>
            <Puzzle className="h-4 w-4 mr-2" />
            Start processing
          </>
        )}
      </button>
    </>
  );
}
