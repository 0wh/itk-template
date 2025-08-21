## Build a **Client-Side ITK-Wasm Pipeline** that applies Multi-Otsu thresholding to a grayscale image in the browser.

1. **Learn the basics**

- Go through the [official ITK-Wasm tutorial](https://docs.itk.org/projects/wasm/en/latest/cxx/tutorial/index.html) (C++ → Wasm).

2. **Implement the pipeline**

- Use ITK-Wasm tooling to wrap ITK’s [`OtsuMultipleThresholdsImageFilter`](https://docs.itk.org/projects/doxygen/en/stable/classitk_1_1OtsuMultipleThresholdsImageFilter.html).

3. **Integrate into Next.js**

- In `@/app/pipeline/template.jsx`, implement `processImage(image)` to return the thresholds.
