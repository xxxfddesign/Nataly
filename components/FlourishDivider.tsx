import Image from "next/image";

// Декоративный золотой орнамент-разделитель между смысловыми блоками.
// variant позволяет чередовать два разных узора, чтобы не повторяться визуально.
export function FlourishDivider({
  variant = 1,
  className = "",
}: {
  variant?: 1 | 2;
  className?: string;
}) {
  const src = variant === 1 ? "/images/deco-flourish-1.png" : "/images/deco-flourish-2.png";
  return (
    <div className={`mx-auto flex w-full max-w-xs items-center justify-center opacity-70 ${className}`} aria-hidden="true">
      <Image src={src} alt="" width={1117} height={223} className="h-auto w-full" />
    </div>
  );
}
