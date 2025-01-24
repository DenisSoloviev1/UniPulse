import { ReactNode, useState } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"

const Button = styled.button`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(133, 132, 132, 0.3);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
`

export const Modal = ({
  children,
  renderProp,
}: {
  children: ReactNode
  renderProp: () => ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {isOpen &&
        createPortal(
          <Button
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(false)
              document.body.style.overflow = "unset"
            }}
          >
            {renderProp()}
          </Button>,
          document.body
        )}
      <button
        style={{ width: "100%" }}
        onClick={() => {
          setIsOpen(true)
          document.body.style.overflow = "hidden"
        }}
      >
        {children}
      </button>
    </>
  )
}
