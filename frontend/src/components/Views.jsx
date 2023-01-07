import { Text } from '@chakra-ui/layout';
import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './Login/SignUp';
import Home from './Home/Home';
import Profile from './Home/Tabs/Profile';
import Friends from './Home/Tabs/Friends';
import PrivateRoutes from './PrivateRoutes';
import { useContext } from 'react';
import { AccountContext } from './AccountContext';

const Views = () => {
  const { user } = useContext(AccountContext);
  return (
      user.loggedIn === null ? (
        <Text>Loading...</Text>
        ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/*<Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-profile" element={<UpdateProfile />} /> */}
          <Route path="*" element={<Login />} />
          <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
          </Route>
        </Routes>
      )
  )
};

export default Views;
