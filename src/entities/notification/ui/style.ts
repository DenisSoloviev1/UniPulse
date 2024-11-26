import styled from "styled-components";
import "../../../shared/variables.scss";

export const Title = styled.h4`
  font-size: 20px;
  font-weight: 700;
`;
export const Text = styled.p`
  width: 100%;
  font-size: 20px;
  padding-left: 10px;

  @media screen and (min-width: 1321px) {
    width: 100%;
    font-size: 20px;
    padding-left: 30px;
  }
`;

export const Time = styled.time`
  color: var(--color-font-disable);
  font-size: 16px;
`;

export const Status = styled.span<{
  $status: "wait_submit" | "wait_sent" | "sent";
}>`
  padding: 4px 8px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  color: var(--color-background);

  /* Стиль для "Ожидает подтверждения" */
  ${(props) =>
    props.$status === "wait_submit" &&
    `
    background-color: var(--color-delete);
  `}

  /* Стиль для "Ожидает отправки" */
  ${(props) =>
    props.$status === "wait_sent" &&
    `
    background-color: var(--color-warning);

  `}

  /* Стиль для "Отправлено" */
  ${(props) =>
    props.$status === "sent" &&
    `
    background-color: var(--color-success);

  `}
`;
