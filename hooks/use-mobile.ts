import * as React from 'react'

/** Mobile breakpoint threshold in pixels (matching Tailwind's md breakpoint) */
const MOBILE_BREAKPOINT = 768

/**
 * Hook to detect if the device is mobile based on viewport width.
 * Listens to resize events and updates state when breakpoint is crossed.
 *
 * @returns boolean - True if viewport width is less than 768px, false otherwise
 *
 * @example
 * const isMobile = useIsMobile()
 * return isMobile ? <MobileNav /> : <DesktopNav />
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Create media query listener for responsive breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    // Set initial state on mount
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}
