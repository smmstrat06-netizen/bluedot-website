/**
 * Contact form checks shared by the browser (src/scripts/form.ts) and the
 * server (src/pages/api/contact.ts), so both accept exactly the same input.
 */

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Moroccan numbers (05/06/07…, +212…) or any international number written with + or 00
export const isPhone = (value: string) => {
  const v = value.replace(/[\s.\-()]/g, "");
  if (/^0[5-7]\d{8}$/.test(v)) return true;
  if (/^(\+|00)212/.test(v)) return /^(\+|00)212[5-7]\d{8}$/.test(v);
  return /^(\+|00)[1-9]\d{7,14}$/.test(v);
};
