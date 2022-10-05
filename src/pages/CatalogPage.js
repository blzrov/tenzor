import { React, useState } from "react";
import CatalogInput from "../components/CatalogInput";
import CatalogUl from "../components/CatalogUl";

export default function CatalogPage() {
  const [value, setValue] = useState("");
  
  return (
    <div>
      <h3 className="mb-3">Каталог</h3>
      <CatalogInput setValue={setValue} />
      <h4 className="my-3">
        {value ? "Результаты поиска по" : null} {value}
      </h4>
      <CatalogUl value={value} />
    </div>
  );
}
