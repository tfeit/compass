import { XMarkIcon } from '@heroicons/react/24/outline';
import { Modal } from '../ui/Modal';
import type { ScoredOrganisation } from '../../types/matching';

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim();
}

function getEmbedVideoUrl(url: string): string | null {
  try {
    if (url.includes('youtube.com/watch?v=')) {
      const m = url.match(/[?&]v=([^&]+)/);
      return m ? `https://www.youtube.com/embed/${m[1]}` : null;
    }
    if (url.includes('youtu.be/')) {
      const m = url.match(/youtu\.be\/([^?]+)/);
      return m ? `https://www.youtube.com/embed/${m[1]}` : null;
    }
    if (url.includes('vimeo.com/')) {
      const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
      return m ? `https://player.vimeo.com/video/${m[1]}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

interface OrganisationDetailModalProps {
  organisation: ScoredOrganisation | null;
  onClose: () => void;
}

export function OrganisationDetailModal({ organisation, onClose }: OrganisationDetailModalProps) {
  if (!organisation) return null;

  const summary = organisation.summary ? stripHtml(organisation.summary) : undefined;
  /** Beschreibung als HTML (wird mit dangerouslySetInnerHTML gerendert) */
  const descriptionHtml = organisation.description ? String(organisation.description) : undefined;
  const embedUrl = organisation.video ? getEmbedVideoUrl(organisation.video) : null;

  return (
    <Modal isOpen={!!organisation} onClose={onClose} title={organisation.name}>
      <div className="p-0">
        <div className="flex justify-end p-4 pb-0 absolute top-0 right-0 z-10">
          <button
            className="p-2 rounded-full bg-white/50 hover:bg-white/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus border border-primary cursor-pointer"
            onClick={onClose}
            type="button"
            aria-label="Schließen"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Cover-Bild */}
        {organisation.cover && (
          <div className="w-full aspect-video object-cover bg-secondary overflow-hidden">
            <img
              src={organisation.cover}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 pt-4">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <h3 className="text-xl lg:text-3xl font-bold text-foreground">{organisation.name}</h3>
          </div>
          {organisation.tagline && (
            <p className="text-secondary-muted mb-4">{organisation.tagline}</p>
          )}

          {/* Zusammenfassung */}
          {summary && (
            <section className="mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-2">Zusammenfassung</h4>
              <p className="text-secondary-foreground whitespace-pre-wrap">{summary}</p>
            </section>
          )}

          {/* Video */}
          {organisation.video && (
            <section className="mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-2">Video</h4>
              {embedUrl ? (
                <div className="aspect-video rounded-lg overflow-hidden bg-black">
                  <iframe
                    src={embedUrl}
                    title="Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <a
                  href={organisation.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Video ansehen
                </a>
              )}
            </section>
          )}

          {/* Beschreibung */}
          {descriptionHtml && (
            <section className="mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-2">Beschreibung</h4>
              <div
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                className="text-secondary-foreground [&_p]:mb-2 [&_p:last-child]:mb-0 [&_a]:text-primary [&_a]:underline"
              />
            </section>
          )}

          {/* Button zur Website */}
          {organisation.website && (
            <a
              href={organisation.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium border-2 bg-primary text-white hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus border-primary transition-colors w-full"
            >
              Zur Website
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
}
