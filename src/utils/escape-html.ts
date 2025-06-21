const lookup = {
  '&': '&amp;',
  '"': '&quot;',
  '<': '&lt;',
  '>': '&gt;',
}

export function escapeHTML(s: string): string {
  return s.replace(/[&"<>]/g, c => lookup[c as never])
}
