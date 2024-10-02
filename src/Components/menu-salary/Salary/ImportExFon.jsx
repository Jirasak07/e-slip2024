import { Button, Select, SimpleGrid } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { API } from "../../Config/ConfigApi";
import { useEffect } from "react";

function ImportExFon() {
  const FetchTypeEmploy = async () => {
    try {
      const fetch = await axios.get(API + "/index/showcustomertype");
      const data = fetch.data;

      if (data.length !== 0) {
        const select = data.map((i) => ({
          value: i.customer_type_id,
          label: i.customer_type_name,
        }));
        formSearch.setValues({ DATAEMPLOY: select });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const FetchYear = async () => {
    try {
      const fetch = await axios.get(API + "/index/showyear");
      const data = fetch.data;
      if (data.length !== 0) {
        const select = data.map((i) => ({
          value: i.name_year,
          label: i.name_year_th,
        }));
        formSearch.setValues({ DATAYEAR: select });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const FetchBudget = async () => {
    try {
      const res = await axios.get(API + "/index/showBudget");
      const data = res.data;
      if (data.length !== 0) {
        const select = data.map((i) => ({
          value: i.idbudget,
          label: i.namebudget + " ( " + i.idbudget + " ) ",
        }));

        formSearch.setValues({ DATABUDGET: select });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formSearch = useForm({
    initialValues: {
      type_employ: "",
      idbudget: "",
      month: (new Date().getMonth().toString().length === 1
        ? "0" + new Date().getMonth()
        : new Date().getMonth()
      ).toString(),
      year: new Date().getFullYear().toString(),
      DATABUDGET: [],
      DATAEMPLOY: [],
      DATAYEAR: [],
      DATAMONTH: [
        {
          value: "01",
          label: "มกราคม",
        },
        {
          value: "02",
          label: "กุมภาพันธ์",
        },
        {
          value: "03",
          label: "มีนาคม",
        },
        {
          value: "04",
          label: "เมษายน",
        },
        {
          value: "05",
          label: "พฤษภาคม",
        },
        {
          value: "06",
          label: "มิถุนายน",
        },
        {
          value: "07",
          label: "กรกฎาคม",
        },
        {
          value: "08",
          label: "สิงหาคม",
        },
        {
          value: "09",
          label: "กันยายน",
        },
        {
          value: "10",
          label: "ตุลาคม",
        },
        {
          value: "11",
          label: "พฤศจิกายน",
        },
        {
          value: "12",
          label: "ธันวาคม",
        },
      ],
    },

    validate: {
      type_employ: isNotEmpty("กรุณาเลือกประเภทบุคลากร"),
      idbudget: isNotEmpty("กรุณาเลือกงบประมาณ"),
      month: isNotEmpty("กรุณาเลือกเดือน"),
      year: isNotEmpty("กรุณาเลือกปี"),
    },
  });
  useEffect(() => {
    FetchTypeEmploy();
    FetchYear();
    FetchBudget();
  }, []);
  return (
    <div>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 5 }}>
        <Select
          {...formSearch.getInputProps("idbudget")}
          allowDeselect={false}
          searchable={true}
          data={formSearch.values.DATABUDGET}
          label="ประเภทงบประมาณ"
        />
        <Select
          {...formSearch.getInputProps("type_employ")}
          allowDeselect={false}
          searchable={true}
          data={formSearch.values.DATAEMPLOY}
          label="ประเภทพนักงาน"
        />
        <Select
          data={formSearch.values.DATAYEAR}
          {...formSearch.getInputProps("year")}
          allowDeselect={false}
          label="ปี"
        />
        <Select
          data={formSearch.values.DATAMONTH}
          {...formSearch.getInputProps("month")}
          allowDeselect={false}
          label="เดือน"
        />
        <Button leftSection={<IconSearch />} mt={{ base: 0, sm: 33 }}>
          ค้นหา
        </Button>
      </SimpleGrid>
    </div>
  );
}

export default ImportExFon;
