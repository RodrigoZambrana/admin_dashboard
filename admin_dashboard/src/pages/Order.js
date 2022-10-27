import ReactToPrint from "react-to-print";
import React, { useState, useEffect, useRef } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { IoCloudDownloadOutline, IoPrintOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import Invoice from "../components/invoice/Invoice";
import InvoiceForDownload from "../components/invoice/InvoiceForDownload";
import { Button } from "@windmill/react-ui";

const Order = () => {
  const printRef = useRef();
  const [data, setData] = useState({});

  useEffect(() => {
    if (Cookies.get("budget")) {
      const info = JSON.parse(Cookies.get("budget"));
      setData(info);
    }
  }, []);

  return (
    <>
      <Invoice data={data} printRef={printRef} />
      <div className="bg-white p-8 rounded-b-xl">
        <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between">
          <PDFDownloadLink
            document={<InvoiceForDownload data={data} />}
            fileName="Invoice"
          >
            <Button className="mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center bg-grey-500 hover:bg-grey-600 text-white transition-all font-serif text-sm font-semibold h-10 py-2 px-5 rounded-md">
              Descargar presupuesto{" "}
              <span className="ml-2 text-base">
                <IoCloudDownloadOutline />
              </span>
            </Button>
          </PDFDownloadLink>

          <ReactToPrint
            trigger={() => (
              <Button className="mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white transition-all font-serif text-sm font-semibold h-10 py-2 px-5 rounded-md">
                Imprimir presupuesto{" "}
                <span className="ml-2">
                  <IoPrintOutline />
                </span>
              </Button>
            )}
            content={() => printRef.current}
            documentTitle="Invoice"
          />
        </div>
      </div>
    </>
  );
};

export default Order;
