import { useEffect, useRef } from 'react';
import { useGetStartupConfig } from '~/data-provider';

export default function useCustomCSS() {
  const { data: config } = useGetStartupConfig();
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const css = config?.interface?.customCSS;
    if (!css) {
      return;
    }

    if (!styleRef.current) {
      styleRef.current = document.createElement('style');
      styleRef.current.id = 'custom-css';
      document.head.appendChild(styleRef.current);
    }

    styleRef.current.textContent = css;

    return () => {
      if (styleRef.current) {
        styleRef.current.remove();
        styleRef.current = null;
      }
    };
  }, [config?.interface?.customCSS]);
}
