import React, { useEffect } from 'react';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

type ServiceKeys = 'libreria' | 'galeria';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    /* imgSrc: string;
    artworkName: string;
    artistName: string;
    description: string;
    unitPrice: number; */
    selectedBook: {
        author: string;
        coverImage: {
            url: string;
        };
        excerpt: string;
        sys: {
            id: string;
        }
        title: string;
        unitPrice: number;
    };
}

const whatsappItemMessage = {
    libreria: "%C3%A9ste%20libro%3A%20",
    galeria: "%C3%A9sta%20pieza%20de%20arte%3A%20",
}

const Modal: React.FC<ModalProps> = (ModalProps: ModalProps) => {
    const { isOpen, onClose, selectedBook } = ModalProps;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    
    async function createPreference() {
        let data: any | null = null;
        try {
            const metadataPromise = await fetch(`/api/metadata/?id=${selectedBook.sys.id}`, {
                method: "GET",
              });

            const preferenceMetadata = await metadataPromise.json();
            const response = await fetch("/api/preference", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: "1AMgM0D8Io7LhpejVTVNUX",
                    title: `${selectedBook.title} - ${selectedBook.author}`,
                    quantity: 1,
                    unit_price: 3000,
                    description: selectedBook.excerpt,
                    currency_id: 'COP',
                    metadata: preferenceMetadata
                }),
            });
          data = await response.json();
          /* console.log("Preference created:", data); */
        } catch (error) {
          console.error("Error creating preference:", error);
        }
        finally {
            if(data?.init_point)
            window.open(data.init_point, "_blank");
        }
    }

    const whatsappUrl = `https://wa.me/573102104501?text=Hola%2C%20Trastalleres!%20Quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20${whatsappItemMessage.libreria}%20${selectedBook.title}%0AArtist:%20${selectedBook.author}`;

    if (!isOpen) return null;

    return (
        <div className="modal" onClick={handleBackgroundClick} role="dialog" aria-modal="true">
            <div className="modal-content">
                <figure className="modal-image">
                    <img className="modal-image_img" src={selectedBook.coverImage.url} alt={`Image of the artwork ${selectedBook.title}`} />
                </figure>

                <div className="modal-info">
                    <section className="modal-artist">
                        <h3 className="modal-artist--title">{selectedBook.title}</h3>
                        <h4 className="modal-artist--author">{selectedBook.author}</h4>
                    </section>

                    <section className="modal-description">
                        <p>{selectedBook.excerpt}</p>
                    </section>

                    <section className="modal-buy">
                        <span className="modal-buy_text">Compra aquí: </span>
                        <a className="contact-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                            Contacta <FontAwesomeIcon icon={faWhatsapp} />
                        </a>
                        <button onClick={createPreference}>Mercado pago</button>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Modal;