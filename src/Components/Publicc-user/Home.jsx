import { Button } from "@mantine/core";
import React, { Component } from "react";
import { API } from "../Config/ConfigApi";

export default class Home extends Component {
  render() {
    return <div>
        Dashboard
<Button onClick={()=>{window.open(API+"/PDF/CoperateKtb.php")}} >5</Button>
    </div>;
  }
}
