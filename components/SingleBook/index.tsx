// components/PostPreview.tsx (with next/link)
"use client";

import CoverImage from "../../app/cover-image";

type ServiceKeys = 'libreria' | 'galeria';

interface PostPreviewProps {
  title: string;
  coverImage: { url: string };
  excerpt: string;
  author: string;
  slug: string;
}

function PostPreview({
  title,
  coverImage,
  excerpt,
  author,
  slug,
  /* onClick, */
}: PostPreviewProps) {
  return (
    <div /* onClick={onClick}  */className="inline-block my-[15px] md:m-[10px]">
      <div className="rounded-sm mb-1 md:mb-2 cursor-pointer drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)] pb-1">
        <CoverImage title={title} slug={slug} author={author} url={coverImage.url} />
      </div>
      <h3 className="text-xl mb-1 leading-snug cursor-pointer text-[#75103A]">
        {title}
      </h3>
      <span className="text-[#7f7579]">{author}</span>
    </div>
  );
}

export default PostPreview;