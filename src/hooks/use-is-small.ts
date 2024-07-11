import { useMediaQuery } from 'react-responsive'

export default function useIsMedium() {
  return useMediaQuery({ query: '(max-width: 768px)' })
}
