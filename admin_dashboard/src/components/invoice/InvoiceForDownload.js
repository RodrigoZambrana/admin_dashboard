import {
  Document,
  Page,
  Image,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import dayjs from "dayjs";

import logoLight from "../../assets/img/logo/logo-dark.png";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src:
        "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src:
        "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});
Font.register({
  family: "DejaVu Sans",
  fonts: [
    {
      src:
        "https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans.ttf",
    },
    {
      src:
        "https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    marginRight: 10,
    marginBottom: 20,
    marginLeft: 10,
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 60,
    lineHeight: 1.5,
  },
  table: {
    display: "table",
    width: "auto",
    color: "#4b5563",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "15%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: "#d1d5db",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },

  invoiceFirst: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
    borderBottom: 0.5,
  },
  invoiceSecond: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
  },
  invoiceThird: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 20,
  },
  logo: {
    width: 74,
    height: 16,
    bottom: 5,
  },
  title: {
    color: "#111827",
    fontFamily: "Open Sans",
    fontWeight: "bold",
    fontSize: 13,
  },
  info: {
    fontSize: 10,
    color: "#374151",
  },
  amount: {
    fontSize: 10,
    color: "#ef4444",
  },
  status: {
    color: "#10b981",
  },
  quantity: {
    color: "#1f2937",
  },
  header: {
    color: "#111827",
    fontSize: 11,
    fontFamily: "Open Sans",
    fontWeight: "bold",
  },
});

const InvoiceForDownload = ({ data }) => {
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.invoiceFirst}>
            <View>
              <Text style={{ fontFamily: "Open Sans", fontWeight: "bold" }}>
                PRESUPUESTO
              </Text>
              <Text style={styles.info}>
                Status :{" "}
                {data.status === "Pendiente" && (
                  <span style={{ color: "#eab308" }}>{data.status}</span>
                )}
                {data.status === "Processing" && (
                  <span style={{ color: "#14b8a6" }}>{data.status}</span>
                )}
                {data.status === "Delivered" && (
                  <span style={{ color: "#22c55e" }}>{data.status}</span>
                )}
                {data.status === "Canceled" && (
                  <span style={{ color: "#f43f5e" }}>{data.status}</span>
                )}
              </Text>
            </View>
            <View>
              <Image style={styles.logo} src={logoLight} />
              <Text style={styles.info}>urucortinas -097 365 931</Text>
              <Text style={styles.info}> Montevideo-Uruguay</Text>
            </View>
          </View>

          <View style={styles.invoiceSecond}>
            <View>
              <Text style={styles.title}>Fecha</Text>
              <Text style={styles.info}>
                {data.createdAt !== undefined && (
                  <span>{dayjs(data?.createdAt).format("MMMM D, YYYY")}</span>
                )}
              </Text>
            </View>
            <View>
              <Text style={styles.title}>PARA</Text>
              <Text style={styles.info}>{data.name}</Text>
              <Text style={styles.info}> {data.address}</Text>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  <span style={styles.header}>Producto</span>
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  <span style={styles.header}>Cantidad</span>
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  <span style={styles.header}>Precio</span>
                </Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {" "}
                  <span style={styles.header}>Total</span>
                </Text>
              </View>
            </View>
            {data?.cart?.map((item, i) => (
              <View key={i} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{i + 1} </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.title} </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {" "}
                    <span style={styles.quantity}>{item.quantity}</span>{" "}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {" "}
                    <span style={styles.quantity}>${item.price}</span>{" "}
                  </Text>
                </View>

                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    <span style={styles.amount}>${item.itemTotal}</span>{" "}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.invoiceThird}>
            <View>
              <Text style={styles.title}>Total</Text>
              <Text style={styles.amount}>${Math.round(data.total)}</Text>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default InvoiceForDownload;
