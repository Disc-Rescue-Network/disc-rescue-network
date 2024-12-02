import { useEffect } from "react";

const DEFAULT_DESCRIPTION =
  "Lost a disc on the course? Easily find and claim your disc with our innovative disc golf lost and found system. Connect, recover, and keep your game on track!";

export function useTitle(
  title: string,
  description: string = DEFAULT_DESCRIPTION
) {
  useEffect(() => {
    // Set the page title
    document.title = `${title} - Lost and Found for Disc Golf Players - Disc Rescue Network`;

    // Set or update the meta description
    let metaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement;
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;
  }, [title, description]);
}
