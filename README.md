# NEXUS HUMAN: Cybernetic Canvas

**NEXUS HUMAN** is a high-fidelity, interactive front-end experience built around a fictional corporate biotech entity specializing in human augmentation. Diverging from traditional neon-drenched cyberpunk tropes, this project executes a stark, clinical "corporate cybernetics" aesthetic. 

The application emphasizes advanced UI/UX interactions, most notably featuring a custom physics-based "fleshy drag" effect where organic muscle fibers dynamically render and stretch behind interactive image components. Paired with a precision-engineered layout, custom crosshair cursors, and strict typographic hierarchies, the project serves as an exploration of immersive, thematic web design and interactive DOM manipulation.

---

## Architecture and Design System

The interface is structured to simulate a medical-grade, technical registry. The design language relies heavily on:

* **High-Contrast Theming:** A stark transition between absolute dark and clinical light sections, accented by a singular amber tone (`#C8922A`) to emphasize structural hierarchy.
* **Technical Typography:** Utilizing Google Fonts to establish identity: Syne for display headings, Manrope for readable body copy, and Space Mono for technical labels and metrics.
* **Data-Driven Layouts:** Information is presented via raw technical specifications rather than traditional marketing copy to replicate classified blueprints.

---

## Core Interactive Features

* **Physics-Based Organic Interactivity:** Images feature a custom hold-and-drag capability utilizing Framer Motion's spring physics. When interacted with, the DOM dynamically renders hand-coded SVG organic muscle fibers that stretch and tether the image to its original container.
* **Mechanical Micro-Interactions:** Custom precision-cursor states (crosshairs) prioritize mechanical responsiveness over traditional, soft UI transitions.
* **State-Driven Rendering:** Elements utilize dynamic positioning, and a ResizeObserver keeps fibers accurately recalculated as the container resizes.

---

## Video Demonstration

A complete demonstration of the interactive physics, custom cursors, and complete UI/UX flow can be viewed in the project repository:

[View Video Demonstration](https://drive.google.com/drive/folders/11u2lEN-qeaqQ959QY79-UFH4WuFKkntE?usp=sharing)

---

## Technical Specifications

The project is built entirely with custom components, relying on zero external component libraries to ensure maximum performance and bespoke visual fidelity.

### Core Framework
* **UI:** React 19
* **Dev Server & Build Tool:** Vite 7
* **Language:** TypeScript (Strict type safety throughout)

### Styling
* **Utility Classes:** Tailwind CSS v4
* **Theming:** CSS custom properties for accent colors and light/dark background transitions
* **Typography:** Google Fonts (Syne, Manrope, Space Mono)

### Animation & Interaction
* **Framer Motion v12:** Handles scroll-triggered reveals, parallax transforms, spring physics, and drag events.
* **SVG (Hand-Coded):** Powers the muscle fiber system using bezier paths, `feGaussianBlur`, and `feTurbulence` displacement filters.
* **Web Animations API:** Executes direct DOM opacity animations for seamless fiber fade-in/out.
* **ResizeObserver:** Ensures real-time recalculation of fibers upon container resize.

### Custom Components

| Component | Functionality |
| :--- | :--- |
| `DraggableImage` | Manages drag mechanics with squash/stretch physics, fleshy displacement filters, and dynamic muscle fiber generation. |
| `CustomCursor` | Replaces the default system pointer with a responsive amber crosshair. |
| `Navbar` | Implements scroll-aware dark/light theme switching. |
| `Footer` | Houses the statistics strip, structural link columns, and a custom circuit trace SVG. |

### Tooling
* **Package Management:** pnpm workspaces (Monorepo setup)
* **Bundling:** esbuild (Integrated via Vite for rapid compilation)
