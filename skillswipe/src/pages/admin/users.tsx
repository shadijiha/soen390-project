import SidebarWithHeader from '@/components/admin/sidebar'
import ListOfUsers from '@/components/admin/users'
import React from 'react'

const Users = () => {
  return (
    <SidebarWithHeader>
      <ListOfUsers />
    </SidebarWithHeader>
  )
}

export default Users
