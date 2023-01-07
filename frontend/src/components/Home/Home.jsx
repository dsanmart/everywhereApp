import { HStack, VStack } from '@chakra-ui/layout';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        //<FriendContext.Provider value={{ friendList, setFriendList }}>
        <VStack py={"1.4rem"}>
            <HStack>
                <ButtonGroup paddingTop="1rem">
                    <Button onClick={() => navigate("/profile")}>Profile</Button>
                    <Button onClick={() => navigate("/friends")}>Close Friends</Button>
                </ButtonGroup>
            </HStack>
        </VStack>
        //</FriendContext.Provider>
    );
}; 

export default Home;