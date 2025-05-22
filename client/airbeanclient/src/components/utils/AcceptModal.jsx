import { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { CircleX } from "lucide-react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import PrimaryButton from "../btn/PrimaryButton";
import SecondaryButton from "../btn/SecondaryButton";

let openModalFn = null;
let closeModalFn = null;

const AcceptModal = () => {
  const [modalContent, setModalContent] = useState(null);
  const [header, setHeader] = useState(null);
  const [onAccept, setOnAccept] = useState(null);

  const modalRef = useRef();
  useOutsideClick(modalRef, () => closeModal());

  const openModal = useCallback((content, headerText, acceptCallback) => {
    setModalContent(() => content);
    setHeader(headerText);
    setOnAccept(() => acceptCallback);
  }, []);

  const closeModal = useCallback(() => {
    setModalContent(null);
    setHeader(null);
    setOnAccept(null);
  }, []);

  useEffect(() => {
    openModalFn = openModal;
    closeModalFn = closeModal;
  }, [openModal, closeModal]);

  if (!modalContent) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div
        ref={modalRef}
        className="bg-amber-100 p-6 rounded-lg relative min-w-[300px] max-w-[90%]">
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between items-center">
            {header && <h2 className="text-2xl font-semibold text-gray-800">{header}</h2>}
          </div>

          <div>
            {typeof modalContent === "function"
              ? modalContent({ close: closeModal })
              : modalContent}
          </div>

          <div className="flex justify-end gap-x-4 mt-4">
            <SecondaryButton onClick={closeModal}>Avbryt</SecondaryButton>
            <PrimaryButton
              onClick={() => {
                if (onAccept) onAccept();
                closeModal();
              }}>
              Bekräfta
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

AcceptModal.open = (content, header, onAccept) => {
  if (openModalFn) openModalFn(content, header, onAccept);
};

AcceptModal.close = () => {
  if (closeModalFn) closeModalFn();
};

export default AcceptModal;
