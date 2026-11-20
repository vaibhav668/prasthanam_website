import type { GalleryItem } from "../types/content";

/**
 * GALLERY — masonry grid with a lightbox.
 *
 * id       Unique id.
 * src      Image path under /public ("/images/gallery/lab-01.jpg"). WebP/AVIF preferred.
 * alt      REQUIRED description for screen readers.
 * caption  Optional caption shown on hover and in the lightbox.
 * srcSet   Optional responsive sources, e.g. "/images/gallery/lab-640.webp 640w, /images/gallery/lab-1280.webp 1280w".
 * width / height  Intrinsic pixel size. Strongly recommended: it reserves space so the
 *                 page doesn't jump while images load.
 *
 */
export const gallery: GalleryItem[] = [
  { id: "lab-01", src: "/images/gallery/lab-01.jpg", alt: "Team members laughing while racing on rolling chairs in the lab", caption: "Lab fun", width: 1600, height: 906 },
  { id: "lab-02", src: "/images/gallery/lab-02.jpg", alt: "Members gathered around laptops and circuit boards at a lab bench", caption: "Debugging at the bench", width: 616, height: 980 },
  { id: "lab-03", src: "/images/gallery/lab-03.jpg", alt: "Members sharing a light moment in the lab", caption: "Lab moments", width: 899, height: 1515 },
  { id: "lab-04", src: "/images/gallery/lab-04.jpg", alt: "Members demonstrating a circuit setup on a table with laptops", caption: "Circuit demo", width: 1144, height: 1532 },
  { id: "lab-05", src: "/images/gallery/lab-05.jpg", alt: "A member demonstrating a computer-vision project to visitors", caption: "Computer vision demo", width: 1170, height: 1302 },
  { id: "lab-06", src: "/images/gallery/lab-06.jpg", alt: "A member showing the Fruit Ninja computer-vision game to a visitor", caption: "Fruit Ninja — computer vision game", width: 1133, height: 1502 },
  { id: "lab-07", src: "/images/gallery/lab-07.jpg", alt: "Visitors crowding the project table with a drone and laptops", caption: "Project showcase", width: 1134, height: 1490 },
  { id: "lab-08", src: "/images/gallery/lab-08.jpg", alt: "Two members laughing while soldering on the floor next to a power socket", caption: "Soldering session", width: 567, height: 805 },
  { id: "lab-09", src: "/images/gallery/lab-09.jpg", alt: "Members gathered around a drone being assembled on a lab table", caption: "Drone build", width: 821, height: 1041 },
];
