/**
 * DynamicImageComponent — fills the grid cell with an image (object-fit: contain).
 * Loaded before elements-registry.js; exposed as window.DynamicImageComponent.
 */
(function () {
  "use strict";
  if (window.DynamicImageComponent) {
    return;
  }

  const DynamicImageComponent = React.memo(function DynamicImageComponent(props) {
    const {
      id,
      name,
      src,
      imageSrc,
      alt = "",
      imageAlt = "",
      processedStyles,
      elementZIndex,
      position,
      componentType,
      ..._rest
    } = props;

    const resolvedSrc = src || imageSrc || "";
    const resolvedAlt = alt || imageAlt || "";

    const containerStyle = {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      ...(processedStyles || {}),
    };
    if (elementZIndex != null && elementZIndex !== "") {
      containerStyle.zIndex = elementZIndex;
    }

    const imgStyle = {
      maxWidth: "100%",
      maxHeight: "100%",
      width: "auto",
      height: "auto",
      objectFit: "contain",
      display: resolvedSrc ? "block" : "none",
    };

    return React.createElement(
      "div",
      {
        id,
        "data-name": name,
        className: "dynamic-image-component",
        style: containerStyle,
      },
      resolvedSrc
        ? React.createElement("img", {
            src: resolvedSrc,
            alt: resolvedAlt,
            draggable: false,
            style: imgStyle,
          })
        : null,
    );
  });

  window.DynamicImageComponent = DynamicImageComponent;
})();
