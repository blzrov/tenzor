export default function CatalogInput(props) {
  return (
    <input
      className="form-control"
      type="text"
      placeholder="Введите название стихотворения"
      onChange={(event) => {
        props.setValue(event.target.value.toLowerCase());
      }}
      style={{
        background: "#E7E7E7",
        padding: "15px",
        paddingLeft: "25px",
      }}
    />
  );
}
