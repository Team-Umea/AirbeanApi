import { useState, useCallback, useRef } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import ReactDOM from "react-dom";
import { CircleX } from "lucide-react";

let openModalFn = null;
let closeModalFn = null;

const ModalComponent = () => {
  const [modalContent, setModalContent] = useState(null);
  const [header, setHeader] = useState(null);
  const modalRef = useRef();

  const open = useCallback((content, header) => {
    setModalContent(() => content);
    setHeader(header);
  }, []);

  const close = useCallback(() => {
    setModalContent(null);
    setHeader(null);
  }, []);

  useOutsideClick(modalRef, close);

  openModalFn = open;
  closeModalFn = close;

  if (!modalContent) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div
        ref={modalRef}
        className="bg-amber-100 p-6 rounded-lg relative min-w-[300px] max-w-[90%]">
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between">
            {header && <h2 className="text-2xl font-semibold text-gray-800">{header}</h2>}
            <button
              onClick={close}
              className="text-red-600 hover:text-red-800 transition-all duration-200 ease cursor-pointer text-xl">
              <CircleX className="h-8 w-8" />
            </button>
          </div>
          {typeof modalContent === "function" ? modalContent({ close }) : modalContent}
        </div>
      </div>
    </div>,
    document.body
  );
};

ModalComponent.open = (content, header) => {
  if (openModalFn) openModalFn(content, header);
};

ModalComponent.close = () => {
  if (closeModalFn) closeModalFn();
};

export default ModalComponent;
