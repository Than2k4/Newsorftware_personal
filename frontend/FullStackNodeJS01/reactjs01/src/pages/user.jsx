import { notification, Table } from "antd";
import { useEffect, useState } from "react";
import { getUserApi } from "../util/api";  // bỏ khoảng trắng dư trong đường dẫn

const UserPage = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserApi();
      if (!res?.message) {
        setDataSource(res);
      } else {
        notification.error({
          message: "Unauthorized",
          description: res.message,
        });
      }
    };
    fetchUser();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
  ];

  return (
    <div style={{ padding: 30 }}>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        rowKey={"id"} // nếu API trả về `_id` thì để "_id"
      />
    </div>
  );
};

export default UserPage;
