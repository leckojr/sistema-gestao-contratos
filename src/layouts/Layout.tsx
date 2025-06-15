import React from 'react';
import { Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  UserOutlined,
  FileOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const AppLayout: React.FC = () => {
  const location = useLocation();

  // Para manter o menu ativo conforme a rota atual
  const selectedKey = location.pathname === '/' ? 'home' : location.pathname.substring(1);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.3)' }} />
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
          <Menu.Item key="home" icon={<AppstoreOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="fornecedores" icon={<UserOutlined />}>
            <Link to="/fornecedores">Fornecedores</Link>
          </Menu.Item>
          <Menu.Item key="tipos-ativo" icon={<FileOutlined />}>
            <Link to="/tipos-ativo">Tipos de Ativo</Link>
          </Menu.Item>
          <Menu.Item key="ativos" icon={<ShoppingCartOutlined />}>
            <Link to="/ativos">Ativos</Link>
          </Menu.Item>
          <Menu.Item key="contratos-venda" icon={<FileOutlined />}>
            <Link to="/contratos-venda">Contratos de Venda</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: '#fff' }}>
          <h1 style={{ marginLeft: 24 }}>Sistema de Gestão de Contratos</h1>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©2025 Sistema de Gestão de Contratos
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
