import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { API } from "../../../Config/ConfigApi";

function ModalDeleteSalary({
  customers_citizent,
  history_salary_year,
  history_salary_month,
  customers_type,
  idbudget,
  history_salary_salary,
  Fetchh
}) {
  const Delllll = (params) => {
    Swal.fire({
      icon: "warning",
      title: "ยืนยันที่จะลบหรือไม่ ?",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed === true) {
        axios
          .post(API + "/index/DeleteNGOEN", {
            customers_citizent: customers_citizent,
            history_salary_year: history_salary_year,
            history_salary_month: history_salary_month,
            customers_type: customers_type,
            idbudget: idbudget,
            history_salary_salary: history_salary_salary,
          })
          .then((res) => {
            if (res.data === "success") {
              Swal.fire({
                icon: "success",
                title: "success",
                timer: 1200,
                timerProgressBar: true,
                showConfirmButton: false,
              }).then((re)=>{
                Fetchh()
              })
            }
          });
      }
    });
  };

  return (
    <div>
      <Button
        onClick={() => {
          Delllll();
        }}
        size="xs"
        leftSection={<IconTrash />}
        color="var(--danger)"
      >
        ลบ
      </Button>
    </div>
  );
}

export default ModalDeleteSalary;
