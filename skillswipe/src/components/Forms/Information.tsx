/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Box,
  Heading,
  Textarea,
  Select,
  Spacer,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { DeleteIcon } from "@chakra-ui/icons";
import InformationBox from "../EditProfile/InformationBox";

const Information = ({ update ,handleSubmit}: any) => {
  const currentUser = useSelector((state) => state as any);
  const setState = (updateUserObj: any) => {
    update(updateUserObj);
  };

  return (
    <Box
      minWidth={"60vw"}
      borderWidth="1px"
      borderRadius={25}
      p={8}
      width="auto"
      mt={30}
    >
      <Stack direction={"row"}>
        <image
          style={{
            textAlign: "left",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          <img
            src="https://img.icons8.com/fluency/512/gender-neutral-user.png"
            alt="profile"
            width="30px"
            height="30px"
          />
        </image>

        <Spacer />
        <Button
          style={{
            boxShadow: "0 5px 17px 0px rgba(0, 100, 500, 0.3)",
            border: "3px solid rgba(255, 255, 255, 0.3)",
          }}
        
          colorScheme={"blue"}
          borderRadius="100px"
          onClick={handleSubmit}
        >
          Update
        </Button>
      </Stack>

      <FormControl>
        <FormLabel htmlFor="name">First Name</FormLabel>
        <Input
          minWidth={"100%"}
          type="text"
          id="name"
          placeholder={currentUser.auth.firstName}
          // value={name}
          onChange={(event) => setState({ firstName: event.target.value })}
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="name">Last Name</FormLabel>
        <Input
          minWidth={"100%"}
          type="text"
          placeholder={currentUser.auth.lastName}
          onChange={(event) => setState({ lastName: event.target.value })}
          id="school"
          // value={school}
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          minWidth={"100%"}
          type="email"
          placeholder={currentUser.auth.email}
          id="title"
          // value={title}
          onChange={(event) => setState({ email: event.target.value })}
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="number">Mobile No</FormLabel>
        <Input
          minWidth={"100%"}
          type="tel"
          placeholder={
            currentUser.auth.mobileNo == null
              ? "Please add Mobile No "
              : currentUser.auth.mobileNo
          }
          id="location"
          onChange={(event) => setState({ mobileNo: event.target.value })}
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="gender">Sex</FormLabel>
        <Select
          minWidth={"100%"}
          // placeholder={profile.location}
          id="location"
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={(event) => setState({ gender: event.target.value })}
        >
          {currentUser.auth.gender == "MALE" ? (
            <>
              <option selected value="MALE">
                MALE
              </option>
              <option value="FEMALE">FEMALE</option>
            </>
          ) : (
            <>
              <option value="MALE">MALE</option>
              <option selected value="FEMALE">
                FEMALE
              </option>
            </>
          )}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="text">Bio</FormLabel>
        <Input
          minWidth={"100%"}
          type="text"
          placeholder={
            currentUser.auth.biography == null
              ? "Please add a bio "
              : currentUser.auth.biography
          }
          id="location"
          onChange={(event) => setState({ biography: event.target.value })}
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
        />
      </FormControl>
    </Box>
  );
};
export default Information;
