import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from "next/link";

export default function BoardPreview({ name, description }: { name: string, description: string }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>{description}</CardDescription>
            </CardContent>

            <CardFooter>
                <Link href={`/boards/${encodeURIComponent(name)}`}>
                    <Button>View Board</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
