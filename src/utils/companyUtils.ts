import { validateUBN } from '@paid-tw/ubn';

// Our own 統一編號 lookup service (tw-ubn). It serves the daily FIA tax-registry
// snapshot from the edge and falls back to the official FIA per-record API for
// anything not yet in the snapshot, so it replaces the third-party g0v API.
// Override per environment with VITE_UBN_API (no trailing slash).
const UBN_API = import.meta.env.VITE_UBN_API ?? 'https://tw-ubn-lookup.kaik.workers.dev';

interface VatLookupResponse {
  found: boolean;
  ban: string;
  /** Registered tax name — the invoice title (抬頭). */
  name?: string;
}

export const fetchCompanyInfo = async (uniformNumber: string): Promise<string | null> => {
  // Validate locally with our post-2023 checksum first — no request for a
  // malformed 統編.
  if (!validateUBN(uniformNumber)) return null;

  try {
    const response = await fetch(`${UBN_API}/v1/vat/${uniformNumber}`);

    if (!response.ok) return null;

    const data = (await response.json()) as VatLookupResponse;

    return data.found && data.name ? data.name : null;
  } catch (error) {
    console.error('Error fetching company info:', error);
    return null;
  }
};
