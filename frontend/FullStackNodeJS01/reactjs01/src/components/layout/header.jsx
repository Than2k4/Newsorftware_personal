import React, { useContext, useState } from 'react';
import { UsergroupAddOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const [current, setCurrent] = useState('home');

  const handleClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setAuth({
      isAuthenticated: false,
      user: { email: "", name: "" }
    });
    navigate("/");
  };

  const items = [
    {
      label: <Link to="/">Home Page</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    ...(auth.isAuthenticated
      ? [
          {
            label: <Link to="/user">Users</Link>,
            key: 'user',
            icon: <UsergroupAddOutlined />,
          },
          {
            label: <span onClick={handleLogout}>Đăng xuất</span>,
            key: 'logout',
          },
        ]
      : [
          {
            label: <Link to="/login">Đăng nhập</Link>,
            key: 'login',
          },
        ]),
    {
      label: `Welcome ${auth?.user?.email ?? ""}`,
      key: 'submenu',
      icon: <SettingOutlined />,
      children: [
        {
          label: <Link to="/profile">Profile</Link>,
          key: 'profile',
        },
      ],
    },
  ];

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
