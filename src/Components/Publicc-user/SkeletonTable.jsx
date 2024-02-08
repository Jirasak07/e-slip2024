import { Flex, SimpleGrid, Skeleton } from "@mantine/core";

function SkeletonTable() {
  return (
    <div>
      <SimpleGrid>
        <Flex justify={"flex-start"}>
          <Skeleton h={20} w={120} />
        </Flex>
        <Skeleton h={30} />
        <Skeleton h={200} />
      </SimpleGrid>
    </div>
  );
}

export default SkeletonTable;
