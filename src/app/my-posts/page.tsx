import React from 'react';
import Layout from '@/components/layout/NewLayout';
import MyPostsList from '@/components/my-posts/MyPostsList';

export default function MyPostsPage() {
    return (
        <Layout>
            <MyPostsList />
        </Layout>
    )
}