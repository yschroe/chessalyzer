import { Link } from 'fumadocs-core/link';
import type { CSSProperties } from 'react';

import './home.css';
import { Logo } from '@/components/logo';

function HeroBoard() {
    const files = 14;
    const ranks = 14;
    // Heat cluster biased mid-right so copy sits on quieter squares
    const heat: Record<string, number> = {
        '10-6': 0.55,
        '10-7': 0.75,
        '11-6': 0.7,
        '11-7': 0.95,
        '9-7': 0.4,
        '12-6': 0.45,
        '11-8': 0.5,
        '12-7': 0.6,
        '9-6': 0.3,
        '10-5': 0.35,
        '13-7': 0.42,
        '12-8': 0.38,
    };

    return (
        <svg
            className="home-hero-board absolute inset-0 size-full"
            viewBox="0 0 1120 1120"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="readability" x1="0%" y1="50%" x2="70%" y2="50%">
                    <stop
                        offset="0%"
                        stopColor="var(--home-wash)"
                        style={{ stopOpacity: 'var(--home-wash-start)' }}
                    />
                    <stop
                        offset="40%"
                        stopColor="var(--home-wash)"
                        style={{ stopOpacity: 'var(--home-wash-mid)' }}
                    />
                    <stop offset="100%" stopColor="var(--home-wash)" stopOpacity={0} />
                </linearGradient>
            </defs>

            {Array.from({ length: ranks }, (_, rank) =>
                Array.from({ length: files }, (_, file) => {
                    const light = (file + rank) % 2 === 0;
                    const key = `${file}-${rank}`;
                    const intensity = heat[key] ?? 0;
                    const size = 80;
                    const x = file * size;
                    const y = rank * size;
                    return (
                        <g key={key}>
                            <rect
                                x={x}
                                y={y}
                                width={size}
                                height={size}
                                fill={
                                    light ? 'var(--home-square-light)' : 'var(--home-square-dark)'
                                }
                            />
                            {intensity > 0 ? (
                                <rect
                                    className="home-heat-cell"
                                    x={x}
                                    y={y}
                                    width={size}
                                    height={size}
                                    fill="var(--home-heat)"
                                    style={
                                        {
                                            '--heat-base-opacity': `calc(${intensity} * var(--home-heat-strength))`,
                                            opacity: `calc(${intensity} * var(--home-heat-strength))`,
                                            animationDelay: `${((file + rank) % 5) * 0.75}s`,
                                        } as CSSProperties
                                    }
                                />
                            ) : null}
                        </g>
                    );
                }),
            )}

            <rect width="1120" height="1120" fill="url(#readability)" />
        </svg>
    );
}

export default function Home() {
    return (
        <div className="home-page relative isolate flex flex-1 flex-col overflow-hidden border-fd-muted sm:m-4 sm:rounded-lg sm:border sm:border-fd-border">
            <HeroBoard />

            <div className="z-10 flex flex-1 flex-col justify-center">
                <div className="px-6 py-24 sm:px-10 lg:px-36">
                    <p className="home-brand mb-5 flex items-end gap-2 text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
                        <Logo className="size-22" />
                        Chessalyzer
                    </p>

                    <h1 className="home-headline mb-4 max-w-lg text-2xl leading-snug font-medium sm:text-3xl md:text-4xl">
                        Batch-analyze chess games at scale
                    </h1>

                    <p className="home-lede mb-8 max-w-xl text-base leading-relaxed sm:text-lg">
                        Parse large PGN databases and run modular trackers — fast, parallel, and
                        dependency-free.
                    </p>

                    <div className="home-cta flex flex-wrap items-center gap-4">
                        <Link
                            href="/docs"
                            className="home-cta-primary inline-flex items-center rounded px-5 py-3 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            Open Docs
                        </Link>
                        <a
                            href="https://github.com/yschroe/chessalyzer"
                            className="home-cta-secondary text-sm font-medium underline-offset-4 hover:underline"
                        >
                            View on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getConfig() {
    return {
        render: 'static',
    };
}
