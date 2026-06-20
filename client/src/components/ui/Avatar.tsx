import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: "sm" | "default" | "lg";
  className?: string;
}

interface AvatarGroupProps {
  avatars: Array<{ src?: string | null; alt?: string; fallback: string }>;
  max?: number;
  className?: string;
}

export function Avatar({ src, alt, fallback, size = "default", className }: AvatarProps) {
  const sizes = {
    sm: "w-6 h-6 text-xs",
    default: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
  };
  return (
    <div
      className={cn(
        "rounded-full overflow-hidden bg-violet-100 flex items-center justify-center shrink-0",
        sizes[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt ?? ""} className="w-full h-full object-cover" />
      ) : (
        <span className="font-medium text-violet-700">{fallback}</span>
      )}
    </div>
  );
}

export function AvatarGroup({ avatars, max = 4, className }: AvatarGroupProps) {
  const shown = avatars.slice(0, max);
  const extra = avatars.length - max;
  return (
    <div className={cn("flex -space-x-2", className)}>
      {shown.map((a, i) => (
        <Avatar
          key={i}
          src={a.src}
          alt={a.alt}
          fallback={a.fallback}
          size="default"
          className="border-2 border-white"
        />
      ))}
      {extra > 0 && (
        <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
          +{extra}
        </div>
      )}
    </div>
  );
}
