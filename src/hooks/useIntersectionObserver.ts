import { MutableRefObject, useEffect, useRef, useState } from "react";

interface Options {
  threshold?: number;
  root?: Element;
  rootMargin?: string;
}
interface HookReturnType {
  targetRef: MutableRefObject<null>;
  entry?: IntersectionObserverEntry;
}

export function useIntersectionObserver(options: Options = {}): HookReturnType {
  const { threshold = 0, root = null, rootMargin = "0px" } = options;
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const targetRef = useRef(null);

  const callbackFn = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setEntry(entry);
  };

  useEffect(() => {
    const currentRef = targetRef.current;

    const observe = new IntersectionObserver(callbackFn, {
      threshold,
      root,
      rootMargin,
    });

    if (currentRef) {
      observe.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observe.disconnect();
      }
    };
  }, [root, rootMargin, threshold]);

  return { targetRef, entry };
}
