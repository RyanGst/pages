---
title: "Bundling vs. Transpiling"
description: "Clarifying the Two Pillars of Modern TypeScript Builds"
giscus: true
---

If you are a developer working with modern JavaScript or TypeScript, you constantly interact with two core concepts: **bundling** and **transpiling**. While often used together, they serve distinctly different purposes in the build process.

![esbuild-benchmark](../../../assets/esbuild-benchmark.png)

## 1. Transpiling: The Language Translator

**Transpiling** is the act of converting code written in one language version into another language version. Essentially, it transforms a modern syntax (like ES6+ or TypeScript) into a version of JavaScript that a specific runtime environment can understand.

• **Goal:** Ensure code compatibility with the target runtime (e.g., converting TypeScript to JavaScript compatible with the specific version of Node.js you are running).

• **Mechanism:** Tools like Babel or the internal transpilers in Bun handle this conversion.

• **Performance Note:** While the transpilation step itself does not affect the final runtime speed (since the output is always JavaScript), **running the transpilation process at runtime** (e.g., using `ts-node` in production without pre-compiling) severely slows down startup time and consumes more memory. It is considered a mistake to skip pre-compilation for production environments.

## 2. Bundling: The Efficiency Packer

**Bundling** takes multiple source files and dependencies and combines them into a single output file (or a few smaller files).

• **Goal:** Optimize application loading and simplify deployment.

• **Use Cases:**

    ◦ **Browser Environments:** Bundling reduces the number of HTTP requests (I/O) the browser must make to load all the necessary JavaScript and CSS files, speeding up application loading.

    ◦ **Serverless/Edge Functions (e.g., AWS Lambda):** Bundling is often necessary to package all your project dependencies (`node_modules`) directly into the deployment artifact, as you may not have file system access or the ability to run `npm install` during execution. This reduces deployment complexity.

• **Optimization Techniques:** Bundling often includes minification (removing human-readable formatting to improve performance for the interpreter) and tree-shaking (removing unused code).

| Feature          | Bundling                                             | Transpiling                                     |
| ---------------- | ---------------------------------------------------- | ----------------------------------------------- |
| **Action**       | Combines many files into one (or few).               | Converts newer language syntax to older syntax. |
| **Primary Goal** | Optimize loading, minimize I/O, simplify deployment. | Ensure language compatibility.                  |
| **Example Tool** | Browserify, Webpack, esbuild, Rollup.                | Babel, Bun's internal transpiler, `tsc`.        |

## See also

This blog post is a transcription of a video I've done some time ago:

<iframe width="560" height="100%" src="https://www.youtube.com/embed/JDKMh1dzXVg?si=d38Cc2WUE193dNu6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

