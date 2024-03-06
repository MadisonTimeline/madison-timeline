import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { User } from "@/types/User";

export default function Profile({ user }: { user: any }) {

    // TODO: check if user already exists in the database
    //if user exists, populate the form with the user data
    //if user does not exist, create a new user with the data from the auth provider


    const [familyName, setFamilyName] = useState(user.family_name);
    const [givenName, setGivenName] = useState(user.given_name);
    const [picture, setPicture] = useState(user.picture);
    const [email, setEmail] = useState(user.email);



    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        const newUser: User = {
            id: user.id,
            family_name: familyName,
            given_name: givenName,
            picture: picture,
            email: email
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
                <img src={picture} alt="profile picture" className="w-20 h-20 rounded-full" />
                <form>
                    <div>
                        <Label>Family Name</Label>
                        <Input value={familyName} onChange={(e) => setFamilyName(e.target.value)} />
                    </div>
                    <div>
                        <Label>Given Name</Label>
                        <Input value={givenName} onChange={(e) => setGivenName(e.target.value)} />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </form>
            </div>
            <Button className="mt-5" onClick={handleSaveProfile}>Save Profile</Button>
        </div>
    );

}
