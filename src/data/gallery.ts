import type { GalleryItem } from "../types/content";

/**
 * GALLERY — masonry grid with a lightbox.
 *
 * id       Unique id.
 * src      Image path under /public ("/images/gallery/lab-01.webp"). WebP/AVIF preferred.
 * alt      REQUIRED description for screen readers.
 * caption  Optional caption shown on hover and in the lightbox.
 * srcSet   Optional responsive sources, e.g. "/images/gallery/lab-640.webp 640w, /images/gallery/lab-1280.webp 1280w".
 * width / height  Intrinsic pixel size. Strongly recommended: it reserves space so the
 *                 page doesn't jump while images load.
 *
 * The SVG files referenced below are SAMPLE placeholders — replace with real photos.
 */
export const gallery: GalleryItem[] = [
  { id: "g1", src: "/images/gallery/sample-1.svg", alt: "Sample placeholder: lab bench", caption: "Sample — lab bench", width: 800, height: 1000 },
  { id: "g2", src: "/images/gallery/sample-2.svg", alt: "Sample placeholder: workshop", caption: "Sample — workshop", width: 800, height: 560 },
  { id: "g3", src: "/images/gallery/sample-3.svg", alt: "Sample placeholder: arena", caption: "Sample — arena day", width: 800, height: 800 },
  { id: "g4", src: "/images/gallery/sample-4.svg", alt: "Sample placeholder: soldering", caption: "Sample — soldering", width: 800, height: 1100 },
  { id: "g5", src: "/images/gallery/sample-5.svg", alt: "Sample placeholder: team photo", caption: "Sample — team", width: 800, height: 600 },
  { id: "g6", src: "/images/gallery/sample-6.svg", alt: "Sample placeholder: drone test", caption: "Sample — drone test", width: 800, height: 900 },
];
