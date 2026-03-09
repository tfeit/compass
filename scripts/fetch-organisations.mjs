import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { API_BASE, MAP_SLUG, OUT_DATA, OUT_IMAGES } from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function fetchListings() {
  const res = await fetch(`${API_BASE}/map/listings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug: MAP_SLUG }),
  });
  if (!res.ok) throw new Error(`Listings failed: ${res.status}`);
  return res.json();
}

async function fetchListing(slug) {
  const res = await fetch(`${API_BASE}/listing`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      slug,
      type: 'organisation',
      mapSlug: MAP_SLUG,
    }),
  });
  if (!res.ok) throw new Error(`Listing ${slug} failed: ${res.status}`);
  return res.json();
}

function collectImageUrls(obj, out = new Set()) {
  if (!obj) return out;
  if (typeof obj === 'string' && /^https?:\/\//.test(obj) && /\.(jpe?g|png|gif|webp)(\?|$)/i.test(obj)) {
    out.add(obj);
    return out;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v) => collectImageUrls(v, out));
    return out;
  }
  if (typeof obj === 'object') {
    for (const v of Object.values(obj)) collectImageUrls(v, out);
  }
  return out;
}

function getExt(url) {
  try {
    const p = new URL(url).pathname;
    const m = p.match(/\.(jpe?g|png|gif|webp)$/i);
    return m ? m[1].toLowerCase().replace('jpeg', 'jpg') : 'jpg';
  } catch {
    return 'jpg';
  }
}

async function downloadImage(url, filePath) {
  const res = await fetch(url);
  if (!res.ok) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, buf);
  return true;
}

/** Normalisiert Label zu Slug für Matching (klein, Sonderzeichen → Unterstrich) */
function toSlug(s) {
  if (typeof s !== 'string') return '';
  return s
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[*/]/g, '')
    .replace(/[ää]/g, 'ae')
    .replace(/[öö]/g, 'oe')
    .replace(/[üü]/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9_-]/g, '');
}

/** Mapping bekannte Zielgruppen-Labels → Quiz-Werte */
const ZIELGRUPPEN_MAP = {
  'schüler*innen': 'schueler',
  schülerinnen: 'schueler',
  schüler: 'schueler',
  'lehrer*innen': 'lehrkraefte',
  lehrkräfte: 'lehrkraefte',
  lehrerinnen: 'lehrkraefte',
  'erzieher*innen': 'lehrkraefte',
  studierende: 'studierende',
  'schulleitungen': 'lehrkraefte',
  'eltern und erziehungsberechtigte': 'berufstaetige',
  fördervereine: 'berufstaetige',
};

function normalizeTargetGroup(label) {
  const key = String(label).toLowerCase().trim();
  return (ZIELGRUPPEN_MAP[key] ?? toSlug(label)) || key;
}

/**
 * Mappt die API-Response (Schema: name, tagline, description, summary, logo, cover, video,
 * website, email, phone, actions_radius, legal_form, address, social, terms) auf unser Organisation-Schema.
 * logo/cover werden durch lokale Pfade ersetzt (localImages).
 */
function mapListingToOrganisation(detail, slug, localImages = {}) {
  const id = detail.id ?? detail.slug ?? slug;
  const name = typeof detail.name === 'string' ? detail.name : String(detail.name ?? slug);

  const address = detail.address && typeof detail.address === 'object'
    ? {
        ...(detail.address.street != null && { street: String(detail.address.street) }),
        ...(detail.address.zip != null && { zip: String(detail.address.zip) }),
        ...(detail.address.city != null && { city: String(detail.address.city) }),
        ...(detail.address.state != null && { state: String(detail.address.state) }),
        ...(detail.address.country != null && { country: String(detail.address.country) }),
        ...(detail.address.geo_lat != null && { geo_lat: String(detail.address.geo_lat) }),
        ...(detail.address.geo_lng != null && { geo_lng: String(detail.address.geo_lng) }),
      }
    : undefined;

  const social = detail.social && typeof detail.social === 'object'
    ? {
        ...(detail.social.facebook != null && detail.social.facebook !== '' && { facebook: String(detail.social.facebook) }),
        ...(detail.social.instagram != null && detail.social.instagram !== '' && { instagram: String(detail.social.instagram) }),
        ...(detail.social.linkedin != null && detail.social.linkedin !== '' && { linkedin: String(detail.social.linkedin) }),
        ...(detail.social.tiktok != null && detail.social.tiktok !== '' && { tiktok: detail.social.tiktok }),
        ...(detail.social.x != null && detail.social.x !== '' && { x: String(detail.social.x) }),
        ...(detail.social.youtube != null && detail.social.youtube !== '' && { youtube: String(detail.social.youtube) }),
      }
    : undefined;

  const terms = detail.terms && typeof detail.terms === 'object'
    ? {
        ...(Array.isArray(detail.terms.handlungsfelder) && { handlungsfelder: detail.terms.handlungsfelder }),
        ...(Array.isArray(detail.terms.bildungsabschnitte) && { bildungsabschnitte: detail.terms.bildungsabschnitte }),
        ...(Array.isArray(detail.terms.regionen) && { regionen: detail.terms.regionen }),
        ...(Array.isArray(detail.terms.sdgs) && { sdgs: detail.terms.sdgs }),
        ...(Array.isArray(detail.terms.tags) && { tags: detail.terms.tags }),
        ...(Array.isArray(detail.terms.zielgruppen) && { zielgruppen: detail.terms.zielgruppen }),
        ...(Array.isArray(detail.terms.ikom) && { ikom: detail.terms.ikom }),
        ...(Array.isArray(detail.terms.evaluation) && { evaluation: detail.terms.evaluation }),
      }
    : undefined;

  const target_groups =
    Array.isArray(detail.terms?.zielgruppen) && detail.terms.zielgruppen.length > 0
      ? [...new Set(detail.terms.zielgruppen.map(normalizeTargetGroup).filter(Boolean))]
      : undefined;

  const topics =
    Array.isArray(detail.terms?.tags) && detail.terms.tags.length > 0
      ? detail.terms.tags.map((t) => toSlug(t)).filter(Boolean)
      : Array.isArray(detail.terms?.handlungsfelder) && detail.terms.handlungsfelder.length > 0
        ? detail.terms.handlungsfelder.map((h) => toSlug(h)).filter(Boolean)
        : undefined;

  return {
    id: String(id),
    slug: String(slug),
    name,
    ...(detail.tagline != null && detail.tagline !== '' && { tagline: String(detail.tagline) }),
    ...(detail.description != null && detail.description !== '' && { description: String(detail.description) }),
    ...(detail.summary != null && detail.summary !== '' && { summary: String(detail.summary) }),
    ...(localImages.logo && { logo: localImages.logo }),
    ...(localImages.cover && { cover: localImages.cover }),
    ...(detail.video != null && detail.video !== '' && { video: String(detail.video) }),
    ...(detail.website != null && detail.website !== '' && { website: String(detail.website) }),
    ...(detail.email != null && detail.email !== '' && { email: String(detail.email) }),
    ...(detail.phone != null && detail.phone !== '' && { phone: String(detail.phone) }),
    ...(detail.actions_radius != null && detail.actions_radius !== '' && { actions_radius: String(detail.actions_radius) }),
    ...(detail.legal_form != null && detail.legal_form !== '' && { legal_form: String(detail.legal_form) }),
    ...(address && Object.keys(address).length > 0 && { address }),
    ...(social && Object.keys(social).length > 0 && { social }),
    ...(terms && Object.keys(terms).length > 0 && { terms }),
    ...(target_groups && target_groups.length > 0 && { target_groups }),
    ...(topics && topics.length > 0 && { topics }),
  };
}

function replaceImageUrlsInDetail(detail, urlToLocal) {
  if (!detail) return detail;
  if (typeof detail === 'string') {
    return urlToLocal[detail] ?? detail;
  }
  if (Array.isArray(detail)) {
    return detail.map((v) => replaceImageUrlsInDetail(v, urlToLocal));
  }
  if (typeof detail === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(detail)) {
      out[k] = replaceImageUrlsInDetail(v, urlToLocal);
    }
    return out;
  }
  return detail;
}

const ALLOWED_KEYS = new Set([
  'id', 'slug', 'name', 'tagline', 'description', 'summary', 'logo', 'cover', 'video',
  'website', 'email', 'phone', 'actions_radius', 'legal_form', 'address', 'social', 'terms',
  'target_groups', 'topics',
]);

function sanitize(org) {
  const out = {};
  for (const k of Object.keys(org)) {
    if (ALLOWED_KEYS.has(k)) out[k] = org[k];
  }
  return out;
}

function writeSampleData() {
  const sample = [
    {
      id: 'sample-1',
      slug: 'beispielorganisation',
      name: 'Beispielorganisation',
      description: 'Beispiel für Build ohne API-Daten.',
      summary: 'Kurzbeschreibung.',
      website: 'https://example.org',
      address: { city: 'Berlin', state: 'Berlin', country: 'Deutschland' },
      terms: { zielgruppen: ['Lehrer*innen'], tags: ['Digitalisierung'] },
      target_groups: ['lehrkraefte'],
      topics: ['digitalisierung'],
    },
  ];
  const outPath = path.join(rootDir, OUT_DATA);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(sample, null, 2));
  console.log('Wrote', outPath, '(sample data)');
}

async function main() {
  console.log('Fetching listings...');
  let listingsData;
  try {
    listingsData = await fetchListings();
  } catch (e) {
    console.warn('Fetch failed:', e.message, '- using existing data or sample.');
    const outPath = path.join(rootDir, OUT_DATA);
    if (fs.existsSync(outPath)) {
      console.log('Keeping existing', outPath);
      return;
    }
    writeSampleData();
    return;
  }
  const items = Array.isArray(listingsData) ? listingsData : listingsData?.data ?? listingsData?.listings ?? [];
  const slugs = items.map((i) => i.slug ?? i.id ?? i).filter(Boolean);
  if (slugs.length === 0) {
    console.warn('No slugs from listings. Using sample data.');
    writeSampleData();
    return;
  }

  const imagesDir = path.join(rootDir, OUT_IMAGES);
  fs.mkdirSync(imagesDir, { recursive: true });

  const organisations = [];
  for (let i = 0; i < slugs.length; i++) {
    const slug = String(slugs[i]);
    console.log(`[${i + 1}/${slugs.length}] ${slug}`);
    try {
      let detail = await fetchListing(slug);
      if (detail?.listing) detail = detail.listing;
      if (detail?.data) detail = detail.data;

      const urls = collectImageUrls(detail);
      const urlToLocal = {};
      let imgIndex = 0;
      for (const url of urls) {
        const ext = getExt(url);
        const localName = `${slug}-${imgIndex}.${ext}`;
        const localPath = path.join(imagesDir, localName);
        const ok = await downloadImage(url, localPath);
        if (ok) {
          urlToLocal[url] = `/images/organisations/${localName}`;
          imgIndex++;
        }
      }
      const withLocal = replaceImageUrlsInDetail(detail, urlToLocal);
      const localImages = {};
      if (withLocal.logo) localImages.logo = withLocal.logo;
      if (withLocal.cover) localImages.cover = withLocal.cover;
      const org = mapListingToOrganisation(withLocal, slug, localImages);
      organisations.push(sanitize(org));
    } catch (e) {
      console.error(`Error ${slug}:`, e.message);
    }
  }

  const outPath = path.join(rootDir, OUT_DATA);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(organisations, null, 2));
  console.log('Wrote', outPath, organisations.length, 'organisations');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
