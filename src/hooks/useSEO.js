import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Custom hook to set per-page SEO meta tags dynamically.
 * Manipulates document.title, meta description, canonical, and OG tags.
 * Reacts to language switches.
 */
export default function useSEO({ title, description, canonical, ogImage }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set document title
    if (title) {
      document.title = title;
    }

    // Set meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    // Set canonical URL
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonical);
    }

    // Set OG title
    if (title) {
      setMetaProperty('og:title', title);
    }

    // Set OG description
    if (description) {
      setMetaProperty('og:description', description);
    }

    // Set OG URL
    if (canonical) {
      setMetaProperty('og:url', canonical);
    }

    // Set OG image
    if (ogImage) {
      setMetaProperty('og:image', ogImage);
    }

    return () => {
      // Restore default title on unmount
      document.title = 'Institut ITI Tanger | Formations Professionnelles en Informatique & Gestion';
    };
  }, [title, description, canonical, ogImage, i18n.language]);
}

function setMetaProperty(property, content) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}
