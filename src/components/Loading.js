import React from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
const Loading = () => {
    return <ClipLoader size={150} color={"grey"} loading={true} />;
};
export default Loading;
