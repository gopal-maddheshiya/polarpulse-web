/**
 * Securely downloads real assets (PDFs, CSVs, NetCDF) via in-memory Blobs
 * to prevent browser "File can't be downloaded securely" warnings on HTTP dev servers.
 */
export async function downloadRealFile(fileUrl: string, targetFilename: string): Promise<boolean> {
  try {
    const res = await fetch(fileUrl)
    if (!res.ok) throw new Error(`File fetch failed: ${res.status}`)
    const blob = await res.blob()
    const blobUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = blobUrl
    a.download = targetFilename
    document.body.appendChild(a)
    a.click()
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)
    }, 1500)
    return true
  } catch (err) {
    console.warn('Fallback direct download:', err)
    window.open(fileUrl, '_blank')
    return false
  }
}

export function downloadTextFile(filename: string, content: string, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function downloadJson(filename: string, data: unknown) {
  downloadTextFile(filename, JSON.stringify(data, null, 2), 'application/json;charset=utf-8')
}

export function downloadCsv(filename: string, rows: Record<string, string | number>[]) {
  if (rows.length === 0) {
    downloadTextFile(filename, '')
    return
  }
  const headers = Object.keys(rows[0])
  const escape = (v: any) => {
    const s = String(v ?? '')
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  const lines = [headers.join(','), ...rows.map(r => headers.map(h => escape(r[h])).join(','))]
  downloadTextFile(filename, lines.join('\n'), 'text/csv;charset=utf-8')
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      return true
    } catch {
      return false
    }
  }
}

export function openDoi(doi: string) {
  if (!doi) return
  const url = /^https?:\/\//i.test(doi) ? doi : `https://doi.org/${doi}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function buildApaCitation(input: { authors: string[]; year: number; title: string; journal: string; doi?: string }) {
  const a = input.authors.length > 0 ? input.authors.join(', ') : 'Anonymous'
  const doi = input.doi ? ` https://doi.org/${input.doi}` : ''
  return `${a} (${input.year}). ${input.title}. ${input.journal}.${doi}`
}
