import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { API } from "../../../Config/ConfigApi";

function DeleteKtb({ user_citizent, fetch }) {
  const Delete = () => {
    Swal.fire({
      icon: "info",
      title: "ลบหรือไม่ ?",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ไม่",
    }).then((res) => {
      if (res.isConfirmed === true) {
        console.log(user_citizent);
        const formDatas = new FormData();
        formDatas.append("user_citizent", user_citizent);
        axios.post(API + "/index/DeleteCOperate", formDatas).then((res) => {
          if (res.data === "success") {
            Swal.fire({
              icon: "success",
              title: "ลบข้อมูลสำเร็จ",
              timer: 1200,
              timerProgressBar: true,
              showConfirmButton: false,
            }).then((res) => {
              close();
              fetch();
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <Button onClick={Delete} size="xs" leftSection={<IconTrash />} color="red">
        ลบ
      </Button>
    </div>
  );
}

export default DeleteKtb;
