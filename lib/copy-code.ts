export async function copyCode(text: string | undefined, clipboard?: Pick<Clipboard, 'writeText'>) {
  if (!text || !clipboard) throw new Error('Code or clipboard unavailable')
  await clipboard.writeText(text)
}
