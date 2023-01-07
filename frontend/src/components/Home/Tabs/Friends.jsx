import { VStack, HStack } from "@chakra-ui/layout"
import { Button, ButtonGroup, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom"
import { createContext, useState } from 'react';

export const FriendContext = createContext();

const Friends = () => {
    const navigate = useNavigate();
    const [friendList, setFriendList] = useState([
        {username: 'John', locationSharing: true}, 
        {username: 'Jane', locationSharing: false}
    ]);

    return (
        <VStack py={"1.4rem"}>
            <HStack>
                <ButtonGroup paddingTop="1rem">
                    <Button onClick={() => navigate("/profile")}>Profile</Button>
                    <Button onClick={() => navigate("/friends")}>Close Friends</Button>
                </ButtonGroup>
            </HStack>
            <br />
            <Text fontSize="36px">Close Friends</Text>
            <VStack>
                {friendList.map((friend) => (
                    <Text>{friend.username}</Text>
                ))}
            </VStack>
            <Button onClick={() => navigate("/update-profile")}>Add Friend</Button>
        </VStack>
    );
};

export default Friends;