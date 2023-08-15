import React from "react";
import Accreditation from "../pages/Accreditation/Accreditation";
import ValidateCar from "../pages/ValidateCar/ValidateCar";

let routes = [
  {
    path: "/",
    title: "Sign in",
    element: <ValidateCar />,
  },
  {
    path: "/karma-board",
    title: "Accreditation",
    element: <Accreditation />,
  },
];

export default routes;
