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
        <div key={job.id}>
          <div
            style={{
              marginBottom: '10px',
            }}
          >
            <img
              //recruiters profile picture
              src={`https://www.google.com/s2/favicons?domain=${job.companyName?.toLowerCase()}.com&sz=64`}
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
        </div>
      ))}
    </>
  )
}

export default TopHeader
