import React, { useState, useEffect } from "react";
import "./scene.css";
import Tap from "./Tap";
import { useTranslation } from "react-i18next";
import { playClick, playWrong, playCorrect } from "./PlayAudio";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
  PHRASE: "phrase",
};

const DraggablePhrase = ({ text, id, isDisabled }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PHRASE,
    item: { id, text },
    canDrag: !isDisabled, // Disable dragging if the phrase is already dropped correctly
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <button
      ref={drag}
      className="line-button"
      style={{
        opacity: isDisabled ? 0.5 : 1,
        cursor: isDisabled ? "not-allowed" : "grab",
        fontSize: "2vw",
        padding: "2vh 2vw",
        backgroundColor: isDisabled ? "transparent" : "#ffffffe0",
        color: isDisabled ? "white" : "black",
        border: "0.2vw solid rgb(0, 122, 204)",
        borderRadius: "2vw",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0.5vw 1vw",
        transition: "transform 0.2s",
        transform: isDragging ? "scale(1.05)" : "scale(1)",
      }}
      disabled={isDisabled} // Disable the button when dropped correctly
    >
      {text}
    </button>
  );
};

const DropBox = ({ label, onDrop, droppedItem, acceptId, isCorrect }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.PHRASE,
    drop: (item) => {
      if (item.id === acceptId) {
        playCorrect(); // Play correct audio
        onDrop(item, true); // Mark as correct
      } else {
        playWrong(); // Play wrong audio
        onDrop(item, false); // Mark as incorrect
      }
    },
    canDrop: (item) => item.id === acceptId, // Only allow items with the correct ID
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const borderColor = isCorrect === null ? "#aaa" : isCorrect ? "green" : "red";

  return (
    <div
      ref={drop}
      className="box"
      style={{
        width: "30vw",
        height: "12vh",
        border: `0.25vw dashed ${borderColor}`,
        borderRadius: "1vw",
        background:
          isOver && canDrop ? "#d4edda" : isOver ? "#f8d7da" : "white",
        transition: "background 0.2s ease, border-color 0.2s ease",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        boxShadow: "0 0.5vw 1vw rgba(0, 0, 0, 0.1)",
      }}
    >
      {droppedItem ? (
        <p style={{ fontSize: "2vw", color: "#333" }}>{droppedItem.text}</p>
      ) : (
        <p
          style={{
            fontSize: "2vw",
            color: "rgba(0,0,0,0.6)",
          }}
        >
          {label}
        </p>
      )}
    </div>
  );
};

const SceneTen = ({ goNext, goPrev }) => {
  const { t } = useTranslation();
  const [droppedBoxes, setDroppedBoxes] = useState(() => {
    // Retrieve the saved state from sessionStorage
    const savedState = sessionStorage.getItem("sceneTenDroppedBoxes");
    return savedState
      ? JSON.parse(savedState)
      : {
          box1: { item: null, isCorrect: null },
          box2: { item: null, isCorrect: null },
        };
  });
  const [next, setNext] = useState(false);

  const handleDrop = (boxKey, item, isCorrect) => {
    setDroppedBoxes((prev) => {
      const updatedBoxes = {
        ...prev,
        [boxKey]: { item, isCorrect },
      };

      // Save the updated state to sessionStorage
      sessionStorage.setItem(
        "sceneTenDroppedBoxes",
        JSON.stringify(updatedBoxes)
      );
      return updatedBoxes;
    });
  };

  // Update the `next` state whenever the droppedBoxes state changes
  useEffect(() => {
    const allCorrect =
      droppedBoxes.box1.isCorrect === true &&
      droppedBoxes.box2.isCorrect === true;
    setNext(allCorrect);
  }, [droppedBoxes]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="scene-container">
        <div className="heading">
          <p style={{ fontSize: "2.9vw" }}>{t("sceneSeven.identifyPharase")}</p>
        </div>
        <div
          className="main-container"
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <p
            className="para"
            style={{
              textAlign: "left",
              marginTop: "2vw",
              lineHeight: "2",
            }}
          >
            <span>Q.</span>
            {t("sceneTen.janaWant")}{" "}
            <DraggablePhrase
              id="twoCupCake"
              text={t("sceneTen.twoCupCake")}
              isDisabled={droppedBoxes.box2.item?.id === "twoCupCake"}
            />
            {"."} <span>{t("sceneTen.toHerBestFriend")}</span>{" "}
            <DraggablePhrase
              id="threeBest"
              text={t("sceneTen.threeBest")}
              isDisabled={droppedBoxes.box1.item?.id === "threeBest"}
            />{" "}
            <span className="line-button">{t("sceneTen.howManyCupCakes")}</span>{" "}
            <span>{t("sceneTen.sheMustBuy")}</span>
          </p>

          <div
            className="box-align"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "5vw",
              marginTop: "4vh",
            }}
          >
            <DropBox
              label={t("sceneSeven.noOfGroups")}
              droppedItem={droppedBoxes.box1.item}
              onDrop={(item, isCorrect) => handleDrop("box1", item, isCorrect)}
              acceptId="threeBest"
              isCorrect={droppedBoxes.box1.isCorrect}
            />
            <DropBox
              label={t("sceneSeven.itemInEachGroup")}
              droppedItem={droppedBoxes.box2.item}
              onDrop={(item, isCorrect) => handleDrop("box2", item, isCorrect)}
              acceptId="twoCupCake"
              isCorrect={droppedBoxes.box2.isCorrect}
            />
          </div>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              playClick();
              goPrev();
            }}
          >
            {t("buttons.previous")}
          </button>
          <p>{t("navigation.tapAndDrag")}</p>
          {!next && <button className="disabled">{t("buttons.next")}</button>}
          {next && (
            <div>
              <button
                className="next-btn"
                onClick={() => {
                  playClick();
                  goNext();
                }}
              >
                {t("buttons.next")}
              </button>
              <Tap bottom={0} />
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default SceneTen;
