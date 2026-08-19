"use client";

import * as React from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";

interface LocalSearchProps {
  route: string;
  imgSrc: string;
  placeholder: string;
  iconPosition?: "left" | "right";
  otherClasses?: string;
}

const LocalSearch = ({ route, imgSrc, iconPosition = "left", placeholder, otherClasses }: LocalSearchProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [searchQuery, setSearchQuery] = React.useState(query || "");
  const previousSearchRef = React.useRef(searchQuery);

  React.useEffect(() => {
    if (previousSearchRef.current === searchQuery) return;

    previousSearchRef.current = searchQuery;

    const delayDeboundFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newurl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });

          router.push(newurl, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(delayDeboundFn);
  }, [searchQuery, router, route, searchParams, pathname]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-14 grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && <Image src={imgSrc} alt="Search" width={24} height={24} className="cursor-pointer" />}
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <Image src={imgSrc} alt="search" width={15} height={15} className="cursor-pointer" />
      )}
    </div>
  );
};

export default LocalSearch;
