// Scroll-motion helpers shared by the reveal, count-up and process-line
// components. One IntersectionObserver per threshold serves every element.

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** True when any part of the element is inside the viewport. */
export function isInViewport(element: Element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

const observers = new Map<number, IntersectionObserver>();
const callbacks = new WeakMap<Element, () => void>();

/**
 * Calls `onEnter` once, the first time at least `threshold` of the element is
 * visible. Returns a cleanup function.
 */
export function observeOnce(element: Element, onEnter: () => void, threshold = 0.15) {
  let observer = observers.get(threshold);
  if (!observer) {
    observer = new IntersectionObserver(
      (entries, self) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          self.unobserve(entry.target);
          callbacks.get(entry.target)?.();
          callbacks.delete(entry.target);
        }
      },
      { threshold },
    );
    observers.set(threshold, observer);
  }

  callbacks.set(element, onEnter);
  observer.observe(element);
  return () => {
    observer.unobserve(element);
    callbacks.delete(element);
  };
}
