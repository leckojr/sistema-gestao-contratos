import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Popconfirm, Space, message } from 'antd';
import MaskedInput from 'antd-mask-input';

interface Fornecedor {
  id: string;
  Codigo: string;
  Descricao: string;
  CNPJ: string;
}

const Fornecedores: React.FC = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingFornecedor, setEditingFornecedor] = useState<Fornecedor | null>(null);

  const fetchFornecedores = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Fornecedor[]>(
        'https://682e16aa746f8ca4a47bd925.mockapi.io/api/v1/fornecedores'
      );
      setFornecedores(response.data);
    } catch {
      message.error('Erro ao carregar fornecedores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFornecedores();
  }, []);

  const handleAddOrEdit = async (values: Omit<Fornecedor, 'id'>) => {
    const cnpjExists = fornecedores.some(
      (f) => f.CNPJ === values.CNPJ && f.id !== editingFornecedor?.id
    );
    if (cnpjExists) {
      message.error('Já existe um fornecedor com este CNPJ.');
      return;
    }

    try {
      setLoading(true);
      if (editingFornecedor) {
        await axios.put(
          `https://682e16aa746f8ca4a47bd925.mockapi.io/api/v1/fornecedores/${editingFornecedor.id}`,
          values
        );
        message.success('Fornecedor atualizado!');
      } else {
        await axios.post(
          'https://682e16aa746f8ca4a47bd925.mockapi.io/api/v1/fornecedores',
          values
        );
        message.success('Fornecedor adicionado!');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingFornecedor(null);
      fetchFornecedores();
    } catch {
      message.error('Erro ao salvar fornecedor');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(
        `https://682e16aa746f8ca4a47bd925.mockapi.io/api/v1/fornecedores/${id}`
      );
      message.success('Fornecedor excluído!');
      fetchFornecedores();
    } catch {
      message.error('Erro ao excluir fornecedor');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingFornecedor(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const openEditModal = (fornecedor: Fornecedor) => {
    setEditingFornecedor(fornecedor);
    form.setFieldsValue(fornecedor);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'Código',
      dataIndex: 'Codigo',
    },
    {
      title: 'Descrição',
      dataIndex: 'Descricao',
    },
    {
      title: 'CNPJ',
      dataIndex: 'CNPJ',
    },
    {
      title: 'Ações',
      render: (_: any, record: Fornecedor) => (
        <Space>
          <Button type="link" onClick={() => openEditModal(record)}>
            Editar
          </Button>
          <Popconfirm
            title="Tem certeza que deseja excluir?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button danger type="link">
              Excluir
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Fornecedores</h1>
      <Button type="primary" onClick={openAddModal} style={{ marginBottom: 16 }}>
        Adicionar Fornecedor
      </Button>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={fornecedores}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingFornecedor ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingFornecedor(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddOrEdit}
          autoComplete="off"  // desativa autocomplete no formulário
        >
          <Form.Item
            name="Codigo"
            label="Código"
            rules={[{ required: true, message: 'Por favor, informe o código' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Descricao"
            label="Descrição"
            rules={[{ required: true, message: 'Por favor, informe a descrição' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="CNPJ"
            label="CNPJ"
            rules={[{ required: true, message: 'Por favor, informe o CNPJ' }]}
          >
            <MaskedInput
              mask="11.111.111/1111-11"
              placeholder="00.000.000/0000-00"
              autoComplete="off" // desativa autocomplete aqui também
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Fornecedores;
