import { Button, Container, Paper, Select, SimpleGrid, Stack } from "@mantine/core";

function ImportExpend() {
  return (
    <Container fluid p={0}>
      <Paper p={20} shadow="xl" radius={12} withBorder >
        <SimpleGrid  cols={{base:1,sm:2,md:4}} >
            
            <Select label="ประเภท"/>
            <Select label="ปี" />
            <Select label="เดือน" />
            <Stack pt={0} >
                <Button>
                    sdfgdjkfhglkf
                </Button>
            </Stack>
        </SimpleGrid>
      </Paper>
    </Container>
  );
}

export default ImportExpend;
