import * as React from "react";
import Link from "next/link";
import ROUTES from "../constants/routes";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "../lib/utils";

const UserAvatar = ({
  id,
  name,
  imgUrl,
  className = "h-9 w-9",
  fallbackClassName,
}: {
  id: string;
  name: string;
  imgUrl?: string | null;
  className?: string;
  fallbackClassName?: string;
}) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <Link href={ROUTES.PROFILE(id)}>
      <Avatar className={className}>
        {imgUrl ? (
          <AvatarImage
            src={imgUrl}
            alt={name}
            className="h-full w-full rounded-full object-cover"
            width={36}
            height={36}
          />
        ) : (
          <AvatarFallback
            className={cn("primary-gradient font-space-grotesk font-bold tracking-wider text-white", fallbackClassName)}
          >
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
