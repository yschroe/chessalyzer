import type { SVGProps } from 'react';

/** Inline mark so `currentColor` follows the docs theme (light/dark toggle). */
export function Logo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
            fill="none"
            aria-hidden="true"
            {...props}
        >
            <g
                transform="translate(0 203)"
                stroke="currentColor"
                strokeLinecap="butt"
                strokeLinejoin="miter"
            >
                <path d="M87.06 221.972h326.525" strokeWidth="20.359" />
                <path d="M87.06 181.325h326.525" strokeWidth="20.359" />
                <path d="M97.478 187.455 251.971-119.165 403.381 187.117" strokeWidth="17.891" />
                <path d="M403.504 187.732 479.048-17.112 150.435 181.325" strokeWidth="21.365" />
                <path d="M97.109 187.578 21.812-16.775 350.424 181.663" strokeWidth="21.365" />
            </g>
        </svg>
    );
}
