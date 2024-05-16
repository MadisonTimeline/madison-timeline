import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

import { User } from "@/types/User";

export default function Profile({ user }: { user: any }) {
    const [familyName, setFamilyName] = useState(user.family_name);
    const [givenName, setGivenName] = useState(user.given_name);
    const [picture, setPicture] = useState(user.picture);
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState("loading...");

    useEffect(() => {
        async function fetchUsername() {
            try {
                const response = await fetch(`/api/getUsername/${user.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username);
                } else {
                    console.error("Error fetching username:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching username:", error);
            }
        }
    
        fetchUsername();
    }, [user.id]);

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        const newUser: User = {
            id: user.id,
            username: username,
            family_name: familyName,
            given_name: givenName,
            picture: picture,
            email: email,
        };
        const response = await fetch("/api/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });

        if (response.ok) {
            const createUserResponse = await response.json();
            const userData = createUserResponse.user;

            console.log(createUserResponse.message);
            console.log(createUserResponse.user);

        } else {
            console.error("Error creating user");
        }
    }



    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-bold">Profile</div>
            <div className="flex flex-col justify-center items-center gap-5">
                <Image src={picture}
                    alt="profile picture"
                    width={80}
                    height={80}
                    className="rounded-full"
                />
                <form>
                    <div>
                        <Label>Username</Label>
                        <Input value={username} required onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <Label>Family Name</Label>
                        <Input value={familyName} disabled onChange={(e) => setFamilyName(e.target.value)} />
                    </div>
                    <div>
                        <Label>Given Name</Label>
                        <Input value={givenName} disabled onChange={(e) => setGivenName(e.target.value)} />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input value={email} disabled onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </form>
            </div>
            <Button className="mt-5" onClick={handleSaveProfile}>Save Profile</Button>
        </div>
    );
}
