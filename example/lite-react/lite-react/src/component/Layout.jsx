import React, { useState, useEffect } from 'react';
import './storyboard.css';
import SubHeadingOne from './SubHeadingOne';
import Box from './Box';
import MultiplesShow from './MultiplesShow';
import Table from './Table';
import MultiplesShow2 from './ShowMultiples2';
import SubHeadingTwo from './SubHeadingTwo';
import SubHeadingThree from './SubHeadingThree';
import SubHeadingFour from './SubHeadingFour';
import content from '../content.json';

const Layout = () => {
    const [viewState, setViewState] = useState('box'); // 'box' | 'multiples' | 'table'
    const [multipleData, setMultipleData] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const showMultiples = (data) => {
        setIsAnimating(true);
        setTimeout(() => {
            setMultipleData(data);
            setViewState('multiples');
            setIsAnimating(false);
        }, 300);
    };

    const showTable = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setViewState('table');
            setIsAnimating(false);
        }, 300);
    };

    const goBackToBox = (data) => {
        setIsAnimating(true);
        setTimeout(() => {
            setMultipleData(data);
            setViewState('box');
            setIsAnimating(false);
        }, 300);
    };

    const showMultiples2 = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setViewState('multiples2');
            setIsAnimating(false);
        }, 300);
    };

    return (
        <div className='container'>
            <div className='header'>
                <h1>{content.heading.title}</h1>
            </div>

            <div style={{ marginTop: '1vh' }} className={`subheading-container ${isAnimating ? 'fade-out' : 'fade-in'}`}>
                {viewState === 'box' && (
                    <SubHeadingOne />
                )}
                {viewState === 'multiples' && (
                    <SubHeadingTwo />
                )}
                {viewState === 'table' && (
                    <SubHeadingThree />
                )}
                {viewState === 'multiples2' && (
                    <SubHeadingFour />
                )}
            </div>

            <div style={{ marginTop: '1vh' }} className={`content-container ${isAnimating ? 'slide-out' : 'slide-in'}`}>
                {viewState === 'box' && (
                    <Box
                        setMultipleShow={() => showMultiples}
                        setMultipleData={(data) => showMultiples(data)}
                        multipleData={multipleData}
                    />
                )}
                {viewState === 'multiples' && (
                    <MultiplesShow
                        multipleData={multipleData}
                        setTableShow={showTable}
                        setMultipleShow={goBackToBox}
                    />
                )}
                {viewState === 'table' && (
                    <Table number={multipleData} setMultipleShow={showMultiples2} goBackToMultiples={showMultiples} />
                )}
                {viewState === 'multiples2' && (
                    <MultiplesShow2
                        multipleData={multipleData}
                        goBactTable={showTable}
                    />
                )}
            </div>
        </div>
    );
};

export default Layout;
