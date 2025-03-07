export const  collectRef = (storage: React.MutableRefObject<Record<string, SVGSVGElement>>, id: string) => {

  return (ref: SVGSVGElement | null) => {
    if (!ref) {
      delete storage.current[id]
    } else {
      storage.current[id] = ref
    }
  }
}