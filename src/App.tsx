import { Suspense, lazy } from "react";
import styled from "@emotion/styled";
import { Spinner } from "@chakra-ui/react";

const ArtifactForm = lazy(() => import("./components/ArtifactForm"));

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
      <Suspense fallback={<Spinner />}>
        <ArtifactForm />
      </Suspense>
    </MainContainer>
  );
}

export default App;
