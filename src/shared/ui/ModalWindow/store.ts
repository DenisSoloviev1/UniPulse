import { create } from "zustand";

/**
 * Хранилище для управления состоянием модальных окон.
 * Позволяет открывать, закрывать и проверять состояния модальных окон.
 */
interface ModalState {
  /**
   * Объект, содержащий состояния всех модальных окон.
   * Ключ - уникальное имя модального окна, значение - его состояние (true/false).
   */
  modals: Record<string, boolean>;

  /**
   * Функция для открытия модального окна.
   * @param modalName - Уникальное имя модального окна.
   */
  open: (modalName: string) => void;

  /**
   * Функция для закрытия модального окна.
   * @param modalName - Уникальное имя модального окна.
   */
  close: (modalName: string) => void;

  /**
   * Функция для проверки, открыто ли конкретное модальное окно.
   * @param modalName - Уникальное имя модального окна.
   * @returns true, если окно открыто, иначе false.
   */
  isOpen: (modalName: string) => boolean;
}

/**
 * Создаёт Zustand-хранилище для управления модальными окнами.
 */
export const useModalStore = create<ModalState>((set, get) => ({
  /**
   * Изначально объект пустой, что означает, что все модальные окна закрыты.
   */
  modals: {},

  /**
   * Открывает модальное окно, добавляя или обновляя его состояние в объекте modals.
   * @param modalName - Уникальное имя модального окна.
   */
  open: (modalName: string) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalName]: true,
      },
    })),

  /**
   * Закрывает модальное окно, обновляя его состояние в объекте modals.
   * @param modalName - Уникальное имя модального окна.
   */
  close: (modalName: string) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalName]: false,
      },
    })),

  /**
   * Проверяет, открыто ли указанное модальное окно.
   * Если модального окна с данным именем нет в объекте, возвращает false.
   * @param modalName - Уникальное имя модального окна.
   * @returns true, если окно открыто, иначе false.
   */
  isOpen: (modalName: string) => get().modals[modalName] || false,
}));
