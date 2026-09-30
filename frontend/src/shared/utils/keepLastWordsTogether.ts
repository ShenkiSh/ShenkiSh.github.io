/** Keep the last pair of words together in short portfolio copy. */
export function keepLastWordsTogether(text: string): string {
  return text.replace(/(\S+)\s+(\S+)\s*$/u, "$1\u00a0$2");
}
