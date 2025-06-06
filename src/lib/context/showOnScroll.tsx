import React, {
  createContext,
  useEffect,
  useState,
  useRef,
  useContext,
  type RefObject,
  type Dispatch,
  type SetStateAction,
} from "react";

const ShowOnScrollContext = createContext<{
  showOnScroll: boolean;
  elementRef: RefObject<HTMLButtonElement | null>;
  setShowOnScroll: Dispatch<SetStateAction<boolean>>;
}>({
  showOnScroll: false,
  elementRef: { current: null },
  setShowOnScroll: () => {},
});

export const ShowOnScrollContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const elementRef = useRef<null | HTMLButtonElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [showOnScroll, setShowOnScroll] = useState(false);

  useEffect(() => {
    const setupObserver = () => {
      if (!elementRef.current) return;
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) {
            setShowOnScroll(true);
          } else {
            setShowOnScroll(false);
          }
        },
        {
          threshold: 1,
          rootMargin: "-50px 0px 0px 0px",
        }
      );

      observerRef.current.observe(elementRef.current);
    };

    if (elementRef.current) {
      setupObserver();
    } else {
      const mo = new MutationObserver(() => {
        if (elementRef.current) {
          setupObserver();
          mo.disconnect();
        }
      });

      mo.observe(document.body, {
        childList: true,
        subtree: true,
      });

      return () => mo.disconnect();
    }

    return () => {
      if (observerRef.current && elementRef.current) {
        observerRef.current.unobserve(elementRef.current);
        observerRef.current.disconnect();
      }
    };
  }, [showOnScroll]);

  return (
    <ShowOnScrollContext.Provider
      value={{ showOnScroll, elementRef, setShowOnScroll }}
    >
      {children}
    </ShowOnScrollContext.Provider>
  );
};

export function useShowOnScrollContext() {
  return useContext(ShowOnScrollContext);
}
