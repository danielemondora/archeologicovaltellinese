export const separaAutori = (autoriString) => {
  if (!autoriString) return []
  if (Array.isArray(autoriString)) return autoriString
  return autoriString.split(',').map((autore) => autore.trim())
}
