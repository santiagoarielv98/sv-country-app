const getHighlightedText = (text: string, highlight: string) => {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {" "}
      {parts.map((part, i) => (
        <span key={i} className={part.toLowerCase() === highlight.toLowerCase() ? "bg-warning fw-bold" : ""}>
          {part}
        </span>
      ))}{" "}
    </span>
  );
};

export default getHighlightedText;
