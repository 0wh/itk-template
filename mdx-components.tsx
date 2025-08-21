import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

/** Utils */
function cx(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(" ");
}

const components = {
  // Allows customizing built-in components, e.g. to add styling.
  h2: ({ children }) => <h2 className="text-xl mb-3">{children}</h2>,
  ul: (props) => <ul className="list-none mb-1" {...props} />,
  code: (props) => (
    <code
      className={
        "rounded bg-muted px-[0.35rem] py-[0.15rem] font-mono text-[0.85em] text-foreground bg-gray-100"
      }
      {...props}
    />
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
