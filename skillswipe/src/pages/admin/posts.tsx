import { ReportedPosts } from '@/components/admin/posts'
import SidebarWithHeader from '@/components/admin/sidebar'
import React from 'react'

const Posts = () => {
  return (
    <SidebarWithHeader>
      <ReportedPosts />
    </SidebarWithHeader>
  )
}

export default Posts
