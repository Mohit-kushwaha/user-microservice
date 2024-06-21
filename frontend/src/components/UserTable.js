import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';
import { BASE_URL } from '@/app/config';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${BASE_URL}/api/users/${userId}`);
      message.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error('Failed to delete user');
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setEditUser(null);
  };

  const handleSave = async (values) => {
    try {
      if (editUser) {
        await axios.put(`${BASE_URL}/api/users/${editUser._id}`, values);
        message.success('User updated successfully');
      } else {
        await axios.post(`${BASE_URL}/api/users`, values);
        message.success('User added successfully');
      }
      setVisible(false);
      setEditUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      message.error('Failed to save user');
    }
  };

  const showAddUserModal = () => {
    setEditUser(null);
    setVisible(true);
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Interest',
      dataIndex: 'interest',
      key: 'interest',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button type="primary" onClick={showAddUserModal}>
          Add New User
        </Button>
      </div>
      <h2 style={{ marginBottom: 16 }}>Users:</h2>
      <Table
        dataSource={users}
        columns={columns}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editUser ? 'Edit User' : 'Add New User'}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <UserForm user={editUser} onSave={handleSave} onCancel={handleCancel} />
      </Modal>
    </div>
  );
};

const UserForm = ({ user, onSave, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [user, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      values.interest = values.interest.split(',').map((item) => item.trim());
      values.age = parseInt(values.age);
      onSave(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Form form={form} layout="vertical" initialValues={user}>
      <Form.Item
        name="user"
        label="User"
        rules={[{ required: true, message: 'Please enter user name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Please enter email' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="interest"
        label="Interest"
        rules={[{ required: true, message: 'Please enter interest' }]}
      >
        <Input placeholder="Separate interests with commas" />
      </Form.Item>
      <Form.Item
        name="age"
        label="Age"
        rules={[{ required: true, message: 'Please enter age' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          {user ? 'Save' : 'Add'}
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserTable;
