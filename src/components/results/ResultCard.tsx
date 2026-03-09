import { Card } from '../ui/Card';

interface ResultCardProps {
  name: string;
  description?: string;
  location?: string;
  score?: number;
  url?: string;
  imageUrl?: string;
  onClick?: () => void;
}

export function ResultCard({
  name,
  description,
  location,
  score,
  url,
  imageUrl,
  onClick,
}: ResultCardProps) {
  const Wrapper = onClick ? 'button' : 'div';
  const wrapperProps = onClick
    ? { type: 'button' as const, onClick, className: 'w-full text-left' }
    : {};

  return (
    <Wrapper {...wrapperProps}>
      <Card className="flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow cursor-pointer">
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          className="w-20 h-20 object-contain rounded-lg shrink-0"
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-secondary-foreground">{name}</h3>
          {score != null && (
            <span className="text-sm font-medium text-primary shrink-0">
              {Math.round(score * 100)}% Match
            </span>
          )}
        </div>
        {location && <p className="text-sm text-secondary-muted mt-0.5">{location}</p>}
        {description && (
          <p className="text-secondary-foreground/90 mt-2 line-clamp-2">{description}</p>
        )}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-block mt-2 text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary-focus focus:ring-offset-1 rounded"
          >
            Zur Website →
          </a>
        )}
      </div>
    </Card>
    </Wrapper>
  );
}
