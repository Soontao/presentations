import detailPage from "./detailPage.js";
import masterPage from "./masterPage.js";

// application main
export const app = new sap.m.SplitApp({
  id: "mainApp",
  initialMaster: "initMaster",
  initialDetail: "initDetail",
  masterPages: [masterPage],
  detailPages: [detailPage],
})


export default app