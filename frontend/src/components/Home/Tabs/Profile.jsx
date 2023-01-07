import { VStack, HStack } from "@chakra-ui/layout"
import { Button, ButtonGroup, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom"

const Profile = () => {
    const navigate = useNavigate();
    const user = {username: 'test', email: 'test@test.com', firstName: 'test', lastName: 'test'};
    return (
        <VStack py={"1.4rem"}>
            <HStack>
                <ButtonGroup paddingTop="1rem">
                    <Button onClick={() => navigate("/profile")}>Profile</Button>
                    <Button onClick={() => navigate("/friends")}>Close Friends</Button>
                </ButtonGroup>
            </HStack>
            <br />
            <Text fontSize="36px">Profile</Text>
            <Text>Username: {user.username}</Text>
            <Text>Email: {user.email}</Text>
            <Text>First Name: {user.firstName}</Text>
            <Text>Last Name: {user.lastName}</Text>
            <Button onClick={() => navigate("/update-profile")}>Update Profile</Button>
        </VStack>
    );
};

export default Profile;