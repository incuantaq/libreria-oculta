import ContentfulImage from "../lib/contentful-image";
import Link from "next/link";

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CoverImage({
  title,
  url,
  slug,
  serviceType,
  author,
}: {
  title: string;
  url: string;
  slug: string;
  serviceType: string;
  author: any;
}) {
  console.log("author", author)
  console.log("author", author)
  console.log("author", author)
  console.log("author", author)
  console.log("author", author)
  const image = (
    <ContentfulImage
      alt={`Cover Image for ${title}`}
      priority
      width={2000}
      height={1000}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
      src={url}
    />
  );

  return (
    <div className="sm:mx-0">
      {/* <Link href={`/${serviceType}/${slug}`} aria-label={title}> */}
      {slug ? (
        <Link  href={{
          pathname: `/${serviceType}/${slug}`,
          query: { author },
      }} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
