import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileLink = ({ imgUrl, href, title }: { imgUrl: string; href?: string; title: string }) => {
  return (
    <div className="flex-center gap-1">
      <Image src={imgUrl} alt={title} width={20} height={20} />

      {href ? (
        <Link href={href} target="_blank" rel="noopener noreferrer" className="paragraph-medium text-link-100">
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-dark400_light700">{title}</p>
      )}
    </div>
  );
};

export default ProfileLink;
