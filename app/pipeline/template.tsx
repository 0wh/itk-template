// SPDX-License-Identifier: GPL-3.0

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
  const [pipelineStatus, setPipelineStatus] = useState<string>("");

  async function processImage(image: Image | null): Promise<number[]> {
    if (image && !pipelineIsBusy) {
      setPipelineIsBusy(true);

      // Implement the itk wasm pipeline here
      {
        // Write a log message in the browser console (Inspect → Console tab)
        console.log("Starting image processing", image.name);
        // Show status message on the page
        setPipelineStatus("Processing");

        // Simulate a 2-second processing delay (replace with your implementation)
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const outImage: Image = image;

        console.log("Image processing complete");
        setPipelineStatus("Successful");

        // Load the output image (with thresholds applied)
        setItkImage(outImage);
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
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
        <Puzzle
          className={`h-4 w-4 mr-2 ${pipelineIsBusy && "mt-1 animate-bounce"}`}
        />
        {pipelineIsBusy ? pipelineStatus : "Start processing"}
      </button>
    </>
  );
}
