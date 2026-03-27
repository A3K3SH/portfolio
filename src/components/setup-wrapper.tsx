'use client';

import dynamic from 'next/dynamic';

const Setup = dynamic(() => import('./setup'), {
 ssr: false,
});

export default function SetupWrapper() {
 return <Setup />;
}
