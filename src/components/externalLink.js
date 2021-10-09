import * as React from "react";
import styled from "styled-components";

const ExternalLink = props => {
    const A = styled.a`overflow-wrap: anywhere;`;

    return <A {...props} target="_blank" rel="noopener noreferrer" />;
};

export default ExternalLink;
