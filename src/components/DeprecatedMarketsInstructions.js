import { Button, Divider, Spin, Typography } from 'antd';
import React from 'react';
import {
  useGetOpenOrdersForDeprecatedMarkets,
  useUnmigratedOpenOrdersAccounts,
} from '../utils/markets';
import FloatingElement from './layout/FloatingElement';
import CheckOutlined from '@ant-design/icons/lib/icons/CheckOutlined';
import BalancesTable from './UserInfoTable/BalancesTable';
import OpenOrderTable from './UserInfoTable/OpenOrderTable';
import SyncOutlined from '@ant-design/icons/lib/icons/SyncOutlined';

const { Title } = Typography;
