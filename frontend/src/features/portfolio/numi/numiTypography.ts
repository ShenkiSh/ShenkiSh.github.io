/** Keep the final pair together when captions or memory copy wrap. */
export function keepLastWordsTogether(text: string): string {
  return text.replace(/(\S+)\s+(\S+)\s*$/u, "$1\u00a0$2");
}
