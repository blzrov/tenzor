import { React, useState, useEffect, useContext } from "react";
import { ServerControllerContext } from "./App";
import useDebounce from "./hooks/useDebounce";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";

// function Catalog(){
//   return()
// }
//page, где структура в одной функции, а компоненты в компонентах