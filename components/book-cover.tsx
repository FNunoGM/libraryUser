import Image from "next/image";

interface BookCoverProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export function BookCover({
  src,
  alt,
  width = 200,
  height = 300,
}: BookCoverProps) {
  return (
    <div className="relative w-full" style={{ aspectRatio: "2/3" }}>
      <Image
        src={`data:image/png;base64,${src}` || "/placeholder.svg"}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover rounded-md"
      />
    </div>
  );
}
