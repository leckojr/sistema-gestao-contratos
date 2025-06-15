import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  AppstoreOutlined,
  FileOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const LayoutComponent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Define menu items com as rotas
  const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: 'Home' },
    { key: '/fornecedores', icon: <TeamOutlined />, label: 'Fornecedores' },
    { key: '/tipos-ativo', icon: <AppstoreOutlined />, label: 'Tipos de Ativo' },
    { key: '/ativos', icon: <FileOutlined />, label: 'Ativos' },
    { key: '/contratos-venda', icon: <DollarOutlined />, label: 'Contratos de Venda' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div style={{ height: 32, margin: 16, color: 'white', textAlign: 'center' }}>
          {/* Logo ou nome do sistema */}
          SG Contratos
        </div>
        <Menu
          theme="dark"
          selectedKeys={[location.pathname]}
          mode="inline"
          onClick={({ key }) => navigate(key)}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, textAlign: 'center' }}>
          <h2>Sistema de Gestão de Contratos</h2>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div
            style={{
              padding: 24,
              background: '#fff',
              minHeight: 360,
            }}
          >
            {/* Renderiza a rota filha */}
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
