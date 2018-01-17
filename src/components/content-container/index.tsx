import styled, { keyframes } from 'styled-components'

const slideInBottom = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const ContentContainer = styled.div`
  animation: .5s ease-out 0s 1 ${slideInBottom};
`

export default ContentContainer
