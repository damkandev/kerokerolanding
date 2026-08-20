import Image from "next/image";

import { IconMask } from "./IconMask";

const avatarSizes = {
  sm: { avatar: "size-7 lg:size-8", icon: "size-[13px] lg:size-[15px]" },
  lg: {
    avatar: "size-12 lg:size-14",
    icon: "size-[22px] lg:size-6",
  },
} as const;

export function AvatarByline({
  authorImage,
  authorName,
  nameLabel,
  meta,
  size = "sm",
}: {
  authorImage: string;
  authorName: string;
  nameLabel?: string;
  meta?: string;
  size?: keyof typeof avatarSizes;
}) {
  const avatarSize = avatarSizes[size];

  return (
    <span className="flex items-center gap-3">
      <span className="flex items-center gap-1">
        <Image
          src={authorImage}
          alt=""
          width={96}
          height={96}
          sizes="56px"
          className={`${avatarSize.avatar} border border-kk-border object-cover`}
        />
        <span
          className={`${avatarSize.avatar} flex items-center justify-center border border-kk-border bg-kk-brand`}
        >
          <IconMask
            src="/figma/star.svg"
            className={`${avatarSize.icon} text-[#316238]`}
          />
        </span>
      </span>
      <span className="flex flex-col items-start gap-1 text-left">
        <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.13em] text-kk-heading lg:text-[11px]">
          {nameLabel ?? authorName} <span aria-hidden="true">×</span> Kerokero
        </span>
        {meta ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-kk-text/55">
            {meta}
          </span>
        ) : null}
      </span>
    </span>
  );
}
