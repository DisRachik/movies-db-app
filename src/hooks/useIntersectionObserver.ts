import { MutableRefObject, useEffect, useRef, useState } from "react";

interface Options {
  threshold?: number;
  root?: Element;
  rootMargin?: string;
  onIntersect?(): void;
}
interface HookReturnType {
  targetRef: MutableRefObject<null>;
  entry?: IntersectionObserverEntry;
}

export function useIntersectionObserver(options: Options = {}): HookReturnType {
  const { threshold = 0, root = null, rootMargin = "0px", onIntersect } = options;
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const targetRef = useRef(null);

  useEffect(() => {
    const currentRef = targetRef.current;

    const observe = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          onIntersect?.();
        }

        setEntry(entry);
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    if (currentRef) {
      observe.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observe.disconnect();
      }
    };
  }, [onIntersect, root, rootMargin, threshold]);

  return { targetRef, entry };
}
