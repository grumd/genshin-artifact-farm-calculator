import React, { useState, useMemo } from "react";
import { usePopper } from "react-popper";
import useOnclickOutside from "react-cool-onclickoutside";
import styled from "styled-components";

interface PopupProps {
  target: JSX.Element;
  content: JSX.Element;
}

const PopupContent = styled.div`
  background: #333b4d;
  z-index: 2;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  border: 1px solid white;
  max-width: 95%;
  font-size: 90%;
`;

export const Popup = ({ target, content }: PopupProps) => {
  const [visible, setVisible] = useState(false);
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      {
        name: "preventOverflow",
        options: {
          padding: 5,
        },
      },
    ],
  });

  const outsideClickReferences = useMemo(
    () => [{ current: popperElement }, { current: referenceElement }],
    [popperElement, referenceElement]
  );
  useOnclickOutside(
    () => {
      visible && setVisible(false);
    },
    {
      refs: outsideClickReferences,
      ignoreClass: "popup-body",
      disabled: !visible,
    }
  );

  const toggleVisibility = () => {
    setVisible((vis) => !vis);
  };

  return (
    <>
      <div ref={setReferenceElement} onClick={toggleVisibility}>
        {target}
      </div>
      {visible && (
        <PopupContent
          className="popup-body"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {content}
          <div ref={setArrowElement} style={styles.arrow} />
        </PopupContent>
      )}
    </>
  );
};
