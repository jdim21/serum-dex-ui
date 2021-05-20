import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Col, Popover, Row, Select, Typography } from 'antd';
import styled from 'styled-components';
import ad from '../assets/ad.png';
import Orderbook from '../components/Orderbook';
import UserInfoTable from '../components/UserInfoTable';
// import StandaloneBalancesDisplay from '../components/StandaloneBalancesDisplay';
import {
  getMarketInfos,
  getTradePageUrl,
  MarketProvider,
  useMarket,
  useMarketsList,
  useUnmigratedDeprecatedMarkets,
} from '../utils/markets';
// import TradeForm from '../components/TradeForm';
// import TradesTable from '../components/TradesTable';
import LinkAddress from '../components/LinkAddress';
import {
  DeleteOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import CustomMarketDialog from '../components/CustomMarketDialog';
import { notify } from '../utils/notifications';
import { useHistory, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { TVChartContainer } from '../components/TradingView';
// import {StyleSheet,View} from "react-native" ;

const { Option, OptGroup } = Select;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 16px;
  .borderNone .ant-select-selector {
    border: none !important;
  }
`;

export var urlMarket = "";

export default function TradePage() {
  const { marketAddress } = useParams();
  console.log("marketAddress top level: " + marketAddress);
  urlMarket = marketAddress;
  useEffect(() => {
    if (marketAddress) {
      localStorage.setItem('marketAddress', JSON.stringify(marketAddress));
    }
  }, [marketAddress]);
  const history = useHistory();
  function setMarketAddress(address) {
    history.push(getTradePageUrl(address));
  }

  return (
    <MarketProvider
      marketAddress={marketAddress}
      setMarketAddress={setMarketAddress}
    >
      <TradePageInner />
    </MarketProvider>
  );
}

function TradePageInner() {
  const {
    market,
  } = useMarket();
  const markets = useMarketsList();
  const [handleDeprecated, setHandleDeprecated] = useState(false);
  const [addMarketVisible, setAddMarketVisible] = useState(false);
  const deprecatedMarkets = useUnmigratedDeprecatedMarkets();
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    document.title = market ? `${market} — SolanaTools` : 'SolanaTools';
  }, [market]);

  const changeOrderRef = useRef<
    ({ size, price }: { size?: number; price?: number }) => void
  >();

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const width = dimensions?.width;
  const componentProps = {
    onChangeOrderRef: (ref) => (changeOrderRef.current = ref),
    onPrice: useCallback(
      (price) => changeOrderRef.current && changeOrderRef.current({ price }),
      [],
    ),
    onSize: useCallback(
      (size) => changeOrderRef.current && changeOrderRef.current({ size }),
      [],
    ),
  };
  const component = (() => {
    if (width < 1000) {
      return <RenderSmaller {...componentProps} />;
    } else if (width < 1450) {
      return <RenderSmall {...componentProps} />;
    } else {
      return <RenderNormal {...componentProps} />;
    }
  })();

  return (
    <>
      <Wrapper>
          {deprecatedMarkets && deprecatedMarkets.length > 0 && (
            <React.Fragment>
              <Col>
                <Typography>
                  You have unsettled funds on old markets! Please go through
                  them to claim your funds.
                </Typography>
              </Col>
              <Col>
                <Button onClick={() => setHandleDeprecated(!handleDeprecated)}>
                  {handleDeprecated ? 'View new markets' : 'Handle old markets'}
                </Button>
              </Col>
            </React.Fragment>
          )}
        {component}
      </Wrapper>
    </>
  );
}

const RenderNormal = ({ onChangeOrderRef, onPrice, onSize }) => {
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center', paddingBottom:'2rem'}}>
        <img src={ad} width="60%" height="90px"/>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', paddingBottom:'2rem'}}>
        {/* <img src={ad} width="60%" height="90px"/> */}
        <Row style={{height:'800px', width:'80%', margin: '1rem'}}>
          <TVChartContainer />
        </Row>
      </div>
    {/* <Row
      style={{
        minHeight: '900px',
        flexWrap: 'nowrap',
      }}
    >
      <Col flex="auto" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Row style={{height:'800px', width:'80%', margin: '1rem'}}>
          <TVChartContainer />
        </Row>
      </Col>
    </Row> */}
    </>
  );
};

const RenderSmall = ({ onChangeOrderRef, onPrice, onSize }) => {
  return (
    <>
      <Row
        style={{
          height: '900px',
        }}
      >
        <Col flex="auto" style={{ height: '100%', display: 'flex' }}>
          <TVChartContainer />
        </Col>
      </Row>
    </>
  );
};

const RenderSmaller = ({ onChangeOrderRef, onPrice, onSize }) => {
  return (
    <>
      <Row
        style={{
          height: '900px',
        }}
      >
        <Col flex="auto" style={{ height: '100%', display: 'flex' }}>
          <TVChartContainer />
        </Col>
      </Row>
    </>
  );
};
