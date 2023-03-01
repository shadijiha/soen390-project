/* eslint-disable @next/next/no-img-element */
import { Heading } from '@chakra-ui/react'

const TopHeader = () => {
  return (
    <>
      <image
        style={{
          marginBottom: '8px',
        }}
      >
        <img
          //recruiters profile picture
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
          width="50px"
          alt="logo"
        />
      </image>
      {/* recruiters company name here that they made from the job listing creation page*/}
      <Heading fontSize="4xl" mb={5} fontWeight={200} letterSpacing={2}>
        Google
      </Heading>
      <Heading fontSize="4xl" mb={10} fontWeight={700}>
        Software Engineer Intern - Summer 2022
      </Heading>
    </>
  )
}

export default TopHeader
