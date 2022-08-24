import React, { useState } from "react";
import { L10n, loadCldr } from "@syncfusion/ej2-base";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";

import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Card, CardBody } from "@windmill/react-ui";
import { scheduleData } from "../data/dummy";
// import { Header } from "../components";
import PageTitle from "../components/Typography/PageTitle";
import * as numberingSystems from "../../src/culture-files/numberingSystems.json";
import * as gregorian from "../../src/culture-files/ca-gregorian.json";
import * as numbers from "../../src/culture-files/numbers.json";
import * as timeZoneNames from "../../src/culture-files/timeZoneNames.json";

loadCldr(
  numberingSystems["default"],
  gregorian["default"],
  numbers["default"],
  timeZoneNames["default"]
);

L10n.load({
  es: {
    schedule: {
      day: "Día",
      week: "Semana",
      workWeek: "Semana de trabajo",
      month: "Mes",
      year: "Año",
      agenda: "Agenda",
      weekAgenda: "Agenda de la semana",
      workWeekAgenda: "Agenda de la semana laboral",
      monthAgenda: "Agenda del mes",
      today: "Hoy",
      noEvents: "No hay eventos",
      emptyContainer: "No hay eventos programados para este día.",
      allDay: "Todo el dia",
      start: "comienzo",
      end: "Final",
      more: "más",
      close: "Cerca",
      cancel: "Cancelar",
      noTitle: "(Sin título)",
      delete: "Eliminar",
      deleteEvent: "Este evento",
      deleteMultipleEvent: "Eliminar múltiples eventos",
      selectedItems: "Artículos seleccionados",
      deleteSeries: "Serie completa",
      edit: "Editar",
      editSeries: "Serie completa",
      editEvent: "Este evento",
      createEvent: "Crear",
      subject: "Tema",
      addTitle: "Añadir título",
      moreDetails: "Más detalles",
      save: "Salvar",
      editContent: "¿Cómo le gustaría cambiar la cita en la serie?",
      deleteContent: "¿Seguro que quieres eliminar este evento?",
      deleteMultipleContent:
        "¿Estás seguro de que deseas eliminar los eventos seleccionados?",
      newEvent: "Nuevo evento",
      title: "Título",
      location: "Ubicación",
      description: "Descripción",
      timezone: "Zona horaria",
      startTimezone: "Zona horaria de inicio",
      endTimezone: "Zona horaria final",
      repeat: "Repetir",
      saveButton: "Salvar",
      cancelButton: "Cancelar",
      deleteButton: "Eliminar",
      recurrence: "Reaparición",
      wrongPattern: "El patrón de recurrencia no es válido.",
      seriesChangeAlert:
        "¿Desea cancelar los cambios realizados en instancias específicas de esta serie y volver a vincularlos con toda la serie?",
      createError:
        "La duración del evento debe ser más corta que la frecuencia con la que ocurre. Acorte la duración o cambie el patrón de recurrencia en el editor de eventos de recurrencia.",
      sameDayAlert:
        "Dos ocurrencias del mismo evento no pueden ocurrir en el mismo día.",
      editRecurrence: "Editar recurrencia",
      repeats: "Repite",
      alert: "Alerta",
      startEndError:
        "La fecha de finalización seleccionada ocurre antes de la fecha de inicio.",
      invalidDateError: "El valor de la fecha ingresada no es válido.",
      blockAlert:
        "Los eventos no se pueden programar dentro del rango de tiempo bloqueado.",
      ok: "Okay",
      yes: "si",
      no: "No",
      occurrence: "Ocurrencia",
      series: "Serie",
      previous: "Anterior",
      next: "próximo",
      timelineDay: "Día de la línea de tiempo",
      timelineWeek: "Semana de la línea de tiempo",
      timelineWorkWeek: "Semana laboral cronológica",
      timelineMonth: "Mes de la línea de tiempo",
      timelineYear: "Cronología Año",
      editFollowingEvent: "Eventos siguientes",
      deleteTitle: "Eliminar evento",
      editTitle: "Editar evento",
      beginFrom: "Comience desde",
      endAt: "Termina en",
      expandAllDaySection: "Expandir-sección-todo-el-día",
      collapseAllDaySection: "Colapsar la sección de todo el día",
    },
    recurrenceeditor: {
      none: "Ninguna",
      daily: "Diario",
      weekly: "Semanal",
      monthly: "Mensual",
      month: "Mes",
      yearly: "Anual",
      never: "Nunca",
      until: "Hasta",
      count: "Contar",
      first: "primero",
      second: "Segundo",
      third: "Tercero",
      fourth: "Cuarto",
      last: "Último",
      repeat: "Repetir",
      repeatEvery: "Repite cada",
      on: "Repetir en",
      end: "Final",
      onDay: "Día",
      days: "Dias)",
      weeks: "Semanas)",
      months: "Meses)",
      years: "Años)",
      every: "cada",
      summaryTimes: "veces)",
      summaryOn: "en",
      summaryUntil: "hasta",
      summaryRepeat: "Repite",
      summaryDay: "dias)",
      summaryWeek: "semanas)",
      summaryMonth: "meses)",
      summaryYear: "años)",
      monthWeek: "Mes Semana",
      monthPosition: "Posición del mes",
      monthExpander: "Expansor de mes",
      yearExpander: "Expansor de año",
      repeatInterval: "Intervalo de repetición",
    },
    calendar: {
      today: "Hoy",
    },
  },
});
// eslint-disable-next-line react/destructuring-assignment
const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;
const Scheduler = () => {
  const [scheduleObj, setScheduleObj] = useState();

  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const onDragStart = (arg) => {
    // eslint-disable-next-line no-param-reassign
    arg.navigation.enable = true;
  };

  return (
    <>
      <PageTitle>Agenda</PageTitle>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <ScheduleComponent
            height="650px"
            ref={(schedule) => setScheduleObj(schedule)}
            selectedDate={new Date(2021, 0, 10)}
            locale="es"
            eventSettings={{ dataSource: scheduleData }}
            dragStart={onDragStart}
          >
            <ViewsDirective>
              {["Day", "Week", "WorkWeek", "Month", "Agenda"].map((item) => (
                <ViewDirective key={item} option={item} />
              ))}
            </ViewsDirective>
            <Inject
              services={[
                Day,
                Week,
                WorkWeek,
                Month,
                Agenda,
                Resize,
                DragAndDrop,
              ]}
            />
          </ScheduleComponent>
          <PropertyPane>
            <table style={{ width: "100%", background: "white" }}>
              <tbody>
                <tr style={{ height: "50px" }}>
                  <td style={{ width: "100%" }}>
                    <DatePickerComponent
                      value={new Date(2021, 0, 10)}
                      showClearButton={false}
                      placeholder="Current Date"
                      floatLabelType="Always"
                      change={change}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </CardBody>
      </Card>
    </>
  );
};

export default Scheduler;
