import {
  AspectRatio,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'

const SubmitAppForm = () => {

  const { t } = useTranslation('common')
  return (
    <>
      <VStack
        as="form"
        maxW="5xl"
        spacing={8}
        bg="transparent"
        rounded="50px"
        width="100%"
        p={{ base: 5, sm: 10 }}
        alignSelf="center"
        borderWidth={2}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Text
          style={{
            fontSize: '2rem',
            marginBottom: '-0.75em',
            marginTop: '-0.5em',
          }}
        >
          🚀
        </Text>
        <VStack spacing={8} w="100%">
          <Text
            style={{
              fontWeight: 700,
              fontSize: '1.5rem',
              textShadow: '0px 0px 10px #00000010',
              paddingBottom: '0.2em',
            }}
          >
            {t('submitApplication')}
          </Text>
          <Stack w="100%" spacing={3} direction={{ base: 'column', md: 'row' }}>
            {/* frontend!!! name, email, phone is read only,
                 we will pull it from the user's logged in account 
                 and show it as the placeholder */}
            <FormControl id="name">
              <FormLabel>{t('name')}</FormLabel>
              <Input
                readOnly
                type="text"
                placeholder="loggedInName"
                rounded="100px"
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>{t('email')}</FormLabel>
              <Input
                readOnly
                type="email"
                placeholder="loggedInEmail@test.com"
                rounded="100px"
              />
            </FormControl>
            <FormControl id="resume">
              <FormLabel>{t('phone')}</FormLabel>
              <Input
                readOnly
                type="text"
                rounded="100px"
                placeholder="loggedInPhone"
              />
            </FormControl>
          </Stack>

          {/* CV Upload */}
          <AspectRatio height={'200px'} width="100%">
            <Box
              borderStyle="dashed"
              borderWidth="3px"
              rounded="20px"
              shadow="sm"
              role="group"
            >
              <Box position="relative" height="100%" width="100%">
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  height="100%"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                >
                  <Stack
                    height="100%"
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justify="center"
                    spacing="4"
                  >
                    <Stack p="8" textAlign="center" spacing="1">
                      <Heading fontSize="lg" fontWeight="bold">
                        {t('dropCV')} [.pdf]
                      </Heading>
                      <Text fontWeight="light">{t('orApplyHere')}</Text>
                    </Stack>
                  </Stack>
                </Box>
                <Input
                  type="file"
                  height="100%"
                  width="100%"
                  position="absolute"
                  top="0"
                  left="0"
                  opacity="0"
                  aria-hidden="true"
                  accept=".pdf"
                />
              </Box>
            </Box>
          </AspectRatio>

          <FormControl id="cover">
            <FormLabel>{t('coverLetter2')}</FormLabel>
            <Textarea size="lg" placeholder="Paste here" rounded="15px" />
          </FormControl>
        </VStack>
        <VStack w="100%">
          <Button
            size={'lg'}
            bg="green.300"
            color="white"
            _hover={{
              bg: 'green.500',
            }}
            borderRadius="200px"
            w={{ base: '100%', md: '150px' }}
            textShadow="0px 0px 20px #00000076"
            shadow={'0px 4px 30px #0000001F'}
          >
            {t('submit')}
          </Button>
        </VStack>
      </VStack>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common'])),
  },
})
export default SubmitAppForm
