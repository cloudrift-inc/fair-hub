// components/Link.tsx
import React from "react";
import NextLink from "next/link";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const Link: React.FC<LinkProps> = ({ href, children, className = "" }) => {
  return (
    <NextLink href={href}>
      <span className={`cursor-pointer ${className}`}>{children}</span>
    </NextLink>
  );
};

export default Link;
