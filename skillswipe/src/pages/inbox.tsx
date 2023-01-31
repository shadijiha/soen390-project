import NavBar from "@/components/NavBar";
import { Text } from "@chakra-ui/react";
import Layout from "@/components/Layout";

const inbox = () => {
  return (
    <>
      <Layout>
        <NavBar></NavBar>
        <Text>Messages</Text>
      </Layout>
    </>
  );
};

export default inbox;
