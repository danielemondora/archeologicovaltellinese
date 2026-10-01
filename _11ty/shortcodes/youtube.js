// _11ty/shortcodes/youtube.js
// https://www.jamesleighton.com/2026/09/easily-embed-youtube-videos-into-11ty/
export default function (url, title) {
  const input = String(url).trim()
  const bareId = input.match(/^[a-zA-Z0-9_-]{11}$/)
  const match =
    bareId ||
    input.match(
      /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/,
    )

  if (!match) {
    throw new Error(
      `youtube shortcode: couldn't extract a video ID from "${url}"`,
    )
  }

  const id = bareId ? bareId[0] : match[1]
  const safeTitle = String(title || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

  return `<div style="position: relative; width: 100%; padding-top: 56.25%; margin-bottom: 1em;">
    <iframe
        src="https://www.youtube-nocookie.com/embed/${id}"
        title="${safeTitle}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
 </div>`
}
