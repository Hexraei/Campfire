"use client";

import { useTransition, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ComponentProps } from "react";
import { createPortal } from "react-dom";

export function TransitionLink({
  href,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    startTransition(() => {
      router.push(href.toString());
    });
  };

  return (
    <>
      {isPending && mounted && document.body && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-stone-500/60 backdrop-blur-md transition-all duration-300">
          <div className="flex flex-col items-center gap-4">
            <div className="relative flex items-center justify-center w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
              <img
                src="/logo-transparent.png"
                alt="Loading..."
                className="w-8 h-8 object-contain animate-pulse"
              />
            </div>
            <p className="text-xs font-semibold text-white tracking-widest uppercase animate-pulse">
              Loading
            </p>
          </div>
        </div>,
        document.body
      )}
      <Link href={href} onClick={handleTransition} {...props}>
        {children}
      </Link>
    </>
  );
}
