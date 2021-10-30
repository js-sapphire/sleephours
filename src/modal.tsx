import * as React from 'react';
import "./modal.css";

export function Modal({ children, onClose }: any){
    const modalRef = React.useRef<any>();
    const onCloseCb = React.useCallback((event: any) => {
        if (event.target !== modalRef.current){
            return;
        }
        onClose();
    }, [modalRef])

    React.useEffect(() => {
        if (!modalRef?.current){
            return;
        }
        modalRef.current.addEventListener('click', onCloseCb);
        return () => {
            modalRef.current?.removeEventListener('click', onCloseCb);
        }

    }, [modalRef])

    return (
        <div className="modal" ref={modalRef}>
            <div className="modalInner">
                { children }
            </div>
        </div>
    )
}