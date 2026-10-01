import Image from 'next/image';
import previewFrames from '@/lib/publicationPreviewFrames.json';

interface PublicationPreviewProps {
    preview?: string;
    title: string;
}

export default function PublicationPreview({ preview, title }: PublicationPreviewProps) {
    if (!preview) return null;

    const src = `/papers/${preview}`;
    const frame = previewFrames[preview as keyof typeof previewFrames];
    // Fit each figure's content bounds in the same 8:5 canvas, leaving even margins.
    // Only the presentation changes; the linked original remains complete.
    const scale = frame ? Math.min(1.88 / frame.contentWidth, 1.13 / frame.contentHeight) : 1;
    const imageStyle = frame ? {
        width: `${frame.width * scale / 2 * 100}%`,
        height: `${frame.height * scale / 1.25 * 100}%`,
        left: `${((2 - frame.contentWidth * scale) / 2 - frame.left * scale) / 2 * 100}%`,
        top: `${((1.25 - frame.contentHeight * scale) / 2 - frame.top * scale) / 1.25 * 100}%`,
    } : undefined;

    return (
        <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View figure for ${title}`}
            className="block w-full shrink-0 self-start rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:w-60 sm:self-center"
        >
            <div className="relative aspect-[8/5] overflow-hidden rounded-lg border border-neutral-200 bg-white transition-shadow hover:shadow-md dark:border-neutral-700">
                <Image
                    src={src}
                    alt={`Overview of ${title}`}
                    width={frame?.width || 800}
                    height={frame?.height || 500}
                    className={frame ? 'absolute max-w-none' : 'absolute h-full w-full object-contain p-2'}
                    style={imageStyle}
                    sizes="(min-width: 640px) 240px, (max-width: 480px) calc(100vw - 80px), 440px"
                />
            </div>
        </a>
    );
}
