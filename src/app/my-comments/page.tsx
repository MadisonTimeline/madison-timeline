import React from 'react';
import Layout from '@/components/layout/NewLayout';
import MyCommentsList from '@/components/my-comments/MyCommentsList';

export default function MyCommentsPage() {
    return (
        <Layout>
            <MyCommentsList />
        </Layout>
    )
}