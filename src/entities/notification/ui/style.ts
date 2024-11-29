import styled from "styled-components";
import "../../../shared/variables.scss";

export const Title = styled.h4`
  width: 80%;
  font-size: 20px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media screen and (min-width: 601px) {
    width: 40%;
  }
`;

export const Text = styled.p`
  width: 100%;
  font-size: 20px;
  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media screen and (min-width: 1321px) {
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
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 8px 12px;
  font-weight: 500;

  /* Стиль для "Ожидает подтверждения" */
  ${(props) =>
    props.$status === "wait_submit" &&
    `
    background-color: var(--color-submit);
    color: var(--color-font-submit);
  `}

  /* Стиль для "Ожидает отправки" */
  ${(props) =>
    props.$status === "wait_sent" &&
    `
    background-color: var(--color-sent);
    color: var(--color-font-sent);  `}

  /* Стиль для "Отправлено" */
  ${(props) =>
    props.$status === "sent" &&
    `
    background-color: var(--color-success);
    color: var(--color-font-success);  `}
`;
