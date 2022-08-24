import React from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";
import { L10n } from "@syncfusion/ej2-base";

import { kanbanData, kanbanGrid } from "../data/dummy";

L10n.load({
  es: {
    kanban: {
      items: "Items",
      min: "Min",
      max: "Max",
      cardsSelected: "Tarjetas",
      addTitle: "Agregar Titulo",
      editTitle: "Editar",
      deleteTitle: "Eliminar",
      deleteContent: "Eliminar contenido",
      save: "Guardar",
      delete: "Eliminar",
      cancel: "Cancelar",
      yes: "Si",
      no: "No",
      close: "Cerrar",
      noCard: "No card",
      unassigned: "Asignado",
    },
  },
});

const Kanban = () => (
  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <KanbanComponent
      id="kanban"
      keyField="Status"
      dataSource={kanbanData}
      enablePersistence={true}
      cardSettings={{ contentField: "Resumen", headerField: "Id" }}
      locale="es"
    >
      <ColumnsDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {kanbanGrid.map((item, index) => (
          <ColumnDirective key={index} {...item} />
        ))}
      </ColumnsDirective>
    </KanbanComponent>
  </div>
);

export default Kanban;
