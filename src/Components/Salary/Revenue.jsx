import { Badge, Button, Container, Flex, Paper, Select, SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import React from "react";

function Revenue() {
  const formSearchRevenueCustomers = useForm({
    initialValues: {
      customer_type_id: "",
    },
    validate: {
      customer_type_id: (v) => (v !== "" || v !== null ? null : "กรุณาเลือกประเภทพนักงาน"),
    },
  });
  const FetchDataRevenue = (data) => {};

  return (
    <>
      <Container p={0} bg={"white"} fluid>
        <Badge color="var(--primary)" variant="light" size="md" radius={8}>
          จัดการข้อมูลรายรับ
        </Badge>
        <Paper mt={20}>
          <form
            onSubmit={formSearchRevenueCustomers.onSubmit((v) => {
              FetchDataRevenue(v);
            })}
          >
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <Select />
              <Flex  >
                <Button w={{base:"100%",sm:null}} color="var(--primary)" leftSection={<IconSearch />}>
                  ค้นหา
                </Button>
              </Flex>
            </SimpleGrid>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default Revenue;
