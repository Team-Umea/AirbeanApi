// Modal.js
import { useState, useCallback, useRef } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import ReactDOM from "react-dom";

let openModalFn = null;
let closeModalFn = null;

const ModalComponent = () => {
  const [modalContent, setModalContent] = useState(null);
  const modalRef = useRef();

  const open = useCallback((content) => {
    setModalContent(() => content);
  }, []);

  const close = useCallback(() => {
    setModalContent(null);
  }, []);

  useOutsideClick(modalRef, close);

  openModalFn = open;
  closeModalFn = close;

  if (!modalContent) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div ref={modalRef} className="bg-white p-6 rounded-lg relative min-w-[300px] max-w-[90%]">
        <button
          onClick={close}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-800 text-xl">
          &times;
        </button>
        {typeof modalContent === "function" ? modalContent({ close }) : modalContent}
      </div>
    </div>,
    document.body
  );
};

ModalComponent.open = (content) => {
  if (openModalFn) openModalFn(content);
};

ModalComponent.close = () => {
  if (closeModalFn) closeModalFn();
};

export default ModalComponent;
