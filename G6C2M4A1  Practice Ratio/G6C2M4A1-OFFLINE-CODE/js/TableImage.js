const TableImage = () => {
  const table = "assets/table.png";

  return React.createElement(
    "div",
    { className: "table-container" },
    React.createElement("img", {
      src: table,
      alt: "Table",
      className: "table-image",
    }),
    React.createElement("p", { className: "table-text" }, t("questionOne"))
  );
};

window.TableImage = TableImage;
