import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React from "react";
import { GetProduct } from "../../../../Utils/Product_utils/Product_utils";
import { db } from "../../../../firebase";
import { ToastContainer, toast } from "react-toastify";