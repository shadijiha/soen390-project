import {
  addAwardsRequest,
  deleteAwardsRequest,
  editAwardsRequest,
} from '@/pages/api/profile_api'
import { DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Stack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Awards = (props: any) => {
  const [award, setAward] = useState({
    title: '',
    description: '',
    issue_date: '',
    issuer: '',
    url: '',
    id: 0,
  })

  if (award.title == '') setAward(props.award)
  const handleChange = (event: any) => {
    const { name, value } = event.target
    setAward((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const updateAward = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (
      !award.title ||
      !award.description ||
      !award.issue_date ||
      !award.issuer ||
      !award.url
    ) {
      toast('Please fill all the fields')
      return
    } else {
      editAwardsRequest(token, award).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success('Award updated successfully')
        } else {
          toast.error('Error updating award')
        }
      })
    }
  }

  const addAward = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (
      !award.title ||
      !award.description ||
      !award.issue_date ||
      !award.issuer ||
      !award.url
    ) {
      toast('Please fill all the fields')
      return
    } else {
      addAwardsRequest(token, award).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success('Award added successfully')
        } else {
          toast.error('Error adding award')
        }
      })
    }
  }

  const deleteAward = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (props.isNew) {
      props.deleteAward(props.award.id)
    } else {
      deleteAwardsRequest(token, award.id).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success('Award deleted successfully')
          props.deleteAward(props.Award?.id)
        } else {
          toast.error('Error deleting award')
        }
      })
    }
  }

  return (
    <Box minWidth={'60vw'} borderWidth="1px" borderRadius={25} p={8} width="auto">
      <Stack direction={'row'}>
        <p
          style={{
            textAlign: 'left',
            // fonstSize: "20px",
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          Awards {props.index} {props.isNew}
        </p>
        <Spacer />
        {!props.isNew && (
          <Button
            style={{
              boxShadow: '0 5px 17px 0px rgba(0, 100, 500, 0.3)',
              border: '3px solid rgba(255, 255, 255, 0.3)',
            }}
            type="button"
            colorScheme={'blue'}
            borderRadius="100px"
            onClick={updateAward}
          >
            Update
          </Button>
        )}

        {props.isNew && (
          <Button
            style={{
              boxShadow: '0 5px 17px 0px rgba(0, 100, 500, 0.3)',
              border: '3px solid rgba(255, 255, 255, 0.3)',
            }}
            type="button"
            colorScheme={'blue'}
            borderRadius="100px"
            onClick={addAward}
          >
            Add
          </Button>
        )}
        <Button
          style={{
            boxShadow: '0 5px 17px 0px rgba(0, 100, 500, 0.3)',
            border: '3px solid rgba(255, 255, 255, 0.3)',
          }}
          type="button"
          colorScheme={'red'}
          borderRadius="100px"
          onClick={deleteAward}
        >
          <DeleteIcon />
        </Button>
      </Stack>
      <FormControl id="title">
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          defaultValue={props.award.title}
          name="title"
          id="title"
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="description">
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          defaultValue={props.award.description}
          name="description"
          id="description"
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="issue_date">
        <FormLabel htmlFor="issue_date">Year</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          id="issue_date"
          defaultValue={props.award.issue_date}
          name="issue_date"
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="issuer">
        <FormLabel htmlFor="issuer">Issuer</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          id="issuer"
          defaultValue={props.award.issuer}
          name="issuer"
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="url">
        <FormLabel htmlFor="url">URL</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          id="url"
          defaultValue={props.award.url}
          name="url"
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
    </Box>
  )
}
export default Awards
