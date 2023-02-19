import { SetStateAction, useEffect, useState} from 'react';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { search } from './api/api';
import axios from 'axios';
import NavBar from '@/components/NavBar';
import { toast } from 'react-toastify';
import { Box, Flex, Heading, List, ListItem, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import NextLink from 'next/link';


export default function Search (){
  const formBorder = useColorModeValue("gray.100", "gray.600");
  const postBackground = useColorModeValue("gray.100", "gray.700");
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const router = useRouter();
    
    const searchQuery = router.query.q?.valueOf() as string;
    
    

    

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        search(token, searchQuery)
        .then((response) => {
            
            if (!response.data || !response.data.users) {
                toast("No results found");
            }else{
              
                if(response.data !== null && response.data.users !== null) {
                    const searchedUsers = response.data.users.filter((user:any) => user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || user.lastName.toLowerCase().includes(searchQuery.toLowerCase()));


                   
                    setSearchResults(searchedUsers);
                    console.log(searchResults);
                  } else {
                    
                    setSearchResults([]);
                    
                }
            

        }
        })
        .catch((error) => {

            console.log(error);
        })
    }, [searchQuery]);

// display search results in a card component with profile pic, name, 




    

  
      
      return (
        <Layout>
        <NavBar></NavBar>
        <Heading padding={3}>Search Results: {searchResults.length}</Heading>
        <Flex flexDir="column" align="center">
       
        <Stack>
        <div>
        <List>
        {searchResults.map((user:any) => (
          <ListItem>
          <Box
              borderWidth="1px"
              borderColor={formBorder}
              backgroundColor={postBackground}
              padding="1rem"
              marginBottom="1rem"
              rounded="20"
              overflow="hidden"
              width="100%"
              maxW={350}
              minW={350}

              key={user.id}



            

           

          >


          <li key={user.id}>
            <NextLink href={`/profile/${user.id}}`} passHref>
              
                <Heading fontSize={30} padding={1} >{user.firstName} {user.lastName}</Heading>
                <div
            
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "150px",
              width: "150px",
              position: "absolute",
              margin: "2%",
              marginBottom: "1%",
        
            }}
          ></div>
                
                <img src={`/userpic/${user.profilePic}`} alt={`${user.firstName} ${user.lastName}`}  />
            </NextLink>
          </li>
          </Box>
          </ListItem>
        ))}
      </List>
        </div>
        </Stack>
        
        </Flex>
        </Layout>
        
      );

    }
    
    


   

            
   
  
    // const handleSearch = async (e:any) => {
    // const token = localStorage.getItem("jwt");
   
    // search(token, searchQuery)
    //     .then((response) => {
    //         console.log(response.data.users);
    //         if (response.data == null) {
    //             toast("No results found");
    //         }else{

    //           const fetch = response.data.users.json(); 
    //           // using key value pairs

    //           response.data.users.map((user:any) => {
    //             setSearchResults({...searchResults, firstName: user.firstName, lastName: user.lastName, profilePic: user.profilePic});
    //           })


           
    //         }
    //     })
    //     .catch((error) => {
            
    //         console.log(error);
    //     })
    // };


  


