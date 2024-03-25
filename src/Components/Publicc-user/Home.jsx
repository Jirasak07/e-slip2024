import { Button, Flex, Text } from "@mantine/core";
import React, { Component } from "react";
import { API } from "../Config/ConfigApi";
import { IconBrandFacebook, IconFileLike } from "@tabler/icons-react";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Flex align={"center"}>
          <Text fz={30}>สวัสดี Admin</Text> <IconFileLike size={30} color="blue" /><IconBrandFacebook color="blue" />
        </Flex>
      </div>
    );
  }
}
