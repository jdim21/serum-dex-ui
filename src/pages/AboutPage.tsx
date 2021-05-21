import React from 'react';
import { Row, Col } from 'antd';

export default function AboutPage() {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem', width: '100%' }}>
                <h2 style={{ color: '#bc13fe', textAlign: 'center', width: '50%' }}>
                    SolanaToolsIO started because the Solana meme token ecosystem needs charts. Along the way
                    we have been gathering market data and thinking of new tools and utilities for users of the
                    Solana network. We will implement them as we go, and are open to suggestions! As Solana grows,
                    so will we.
                </h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem', width: '100%' }}>
                <h2 style={{ color: '#bc13fe', textAlign: 'center', paddingTop: '1rem', width: '50%' }}>
                    In the future, we will use the STUD token to grant access to charts and other utilities
                    as we release them, so grab a few if you enjoy the site! Next, we would like to expose
                    our price data via API and automatically add all Serum custom markets. Stay tuned!
                </h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem', width: '100%' }}>
                <h2 style={{ color: '#bc13fe', textAlign: 'center', paddingTop: '1rem', width: '50%' }}>
                    Contact us to have your market listed! Follow us on Socials (find them across the 
                    footer bar of the site) for more info. Reach out with any suggestions or bug reports 
                    to solanatools@protonmail.com.
                </h2>
            </div>
        </>
    );
}