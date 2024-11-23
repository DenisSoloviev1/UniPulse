import styled from "styled-components";

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ToggleChecker = styled.input`
  height: 3em;
  width: 100%;
  display: none;
`;

export const TogglerLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const CheckboxToggler = styled.div`
  width: 3em;
  display: flex;
  flex-direction: column;
  gap: 0.7em;
`;

export const Line = styled.div`
  background: #df6447;
  height: 0.3em;
  border-radius: 10em;
  transition-duration: 500ms;
`;

export const Line1 = styled(Line)<{ isChecked?: boolean }>`
  ${({ isChecked }) =>
    isChecked &&
    `
    transform: rotate(45deg) translateY(0.7em) translateX(0.7em);
  `}
`;

export const Line2 = styled(Line)<{ isChecked?: boolean }>`
  ${({ isChecked }) =>
    isChecked &&
    `
    transform: rotate(-45deg) translateY(0em) translateX(0.1em);
  `}
`;

export const Line3 = styled(Line)<{ isChecked?: boolean }>`
  ${({ isChecked }) =>
    isChecked &&
    `
    transform: scaleX(0);
    transform-origin: left;
  `}
`;
