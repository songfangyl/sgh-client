import styled from "styled-components";
import { useState } from "react";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
`;
const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  cursor: pointer;
`;
const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;
const ImageButton = styled.div`
  border: 2px solid #ccc;
  ${(props) =>
    props.active
      ? `border-color: #ccc;`
      : `border-color: transparent;`}
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;
const BigImageWrapper = styled.div`
  text-align: center;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const OverlayImage = styled.img`
  max-width: 90vw;
  max-height: 90vh;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #fff;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
`;
const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.7);
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 24px;
  border-radius: 5px;
`;
const LeftArrow = styled(ArrowButton)`
  left: 20px;
`;
const RightArrow = styled(ArrowButton)`
  right: 20px;
`;

export default function ProductImages({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      {isOpen && (
        <Overlay onClick={() => setIsOpen(false)}>
          <CloseButton onClick={() => setIsOpen(false)}>Close</CloseButton>
          <LeftArrow onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            ◀
          </LeftArrow>
          <OverlayImage src={images[activeIndex]} alt="Expanded view" />
          <RightArrow onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            ▶
          </RightArrow>
        </Overlay>
      )}
      <BigImageWrapper>
        <BigImage src={images[activeIndex]} onClick={() => setIsOpen(true)} />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image, index) => (
          <ImageButton
            key={image}
            active={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            <Image src={image} alt="" onClick={() => setIsOpen(true)} />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
