"use client";

import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();
  const currentPath = useRef(pathname);

  useEffect(() => {
    // We only trigger the transition when the actual route changes
    if (currentPath.current !== pathname) {
      if (typeof document !== 'undefined' && 'startViewTransition' in document) {
        // @ts-ignore
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
