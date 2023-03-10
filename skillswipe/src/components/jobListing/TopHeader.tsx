/* eslint-disable @next/next/no-img-element */
import { viewJob } from '@/pages/api/api'
import { Heading } from '@chakra-ui/react'

interface TopHeaderProps {
  companyName?: string
  jobTitle?: string
}
const TopHeader = ({ companyName, jobTitle }: TopHeaderProps) => {
  const data = [
    {
      id: 1,
      companyName: `${companyName}`,
      title: 'companyName',
      jobTitle: `${jobTitle}`,
      title2: 'jobTitle',
    },
  ]

  return (
    <>
      {data.map((job) => (
        <>
          <div
            style={{
              marginBottom: '8px',
            }}
          >
            <img
              //recruiters profile picture
              src={`http://www.${job.companyName?.toLowerCase()}.com/favicon.ico`}
              width="50px"
              alt="logo"
            />
          </div>
          <Heading fontSize="4xl" mb={5} fontWeight={200} letterSpacing={2}>
            {job.companyName}
          </Heading>
          <Heading fontSize="4xl" mb={10} fontWeight={700}>
            {job.jobTitle}
          </Heading>
        </>
      ))}
    </>
  )
}

export default TopHeader
