import React from "react";
import styled from "styled-components";
import { ArtifactForm } from "./components/ArtifactForm";
import { Stats, Types } from "./data/enums";
import { calculateChance } from "./utils/calculateChance";

const MainContainer = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

function App() {
  return (
    <MainContainer>
      <ArtifactForm />
    </MainContainer>
  );
}

export default App;
