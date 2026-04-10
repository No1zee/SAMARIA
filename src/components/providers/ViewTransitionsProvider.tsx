"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Trick 2: View Transitions API
 * Intercepts link clicks to wrap navigation in a cinematic transition.
 */
export default function ViewTransitionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentPath = useRef(pathname);

  useEffect(() => {
    // We only trigger the transition when the actual route changes
    if (currentPath.current !== pathname) {
      if (typeof document !== 'undefined' && 'startViewTransition' in document) {
        // @ts-expect-error - startViewTransition is a new browser API
        document.startViewTransition(async () => {
          // View Transitions API handles the snapshot automatically.
          // We wait for a tick to ensure the DOM has updated.
          await new Promise((resolve) => setTimeout(resolve, 0));
        });
      }
      currentPath.current = pathname;
    }
  }, [pathname]);

  return <>{children}</>;
}
