import React, { useState } from "react";
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
