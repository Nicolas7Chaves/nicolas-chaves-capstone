import React, { useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';
// import QrScannerWorker from 'qr-scanner/qr-scanner-worker.min.js';
import './Scanner.scss'
// QrScanner.WORKER_PATH = '/qr-scanner-worker.min.js';

function Scanner({ onScan }) {
    const videoRef = useRef();
    useEffect(() => {
        // Delay initialization
        const timer = setTimeout(() => {
            const qrScanner = new QrScanner(videoRef.current, result => {
                console.log('decoded qr code:', result);
                onScan(result);
                qrScanner.stop();
            });

            qrScanner.start();

            return () => {
                qrScanner.stop();
            };
        }, 1000); // 1000 milliseconds delay

        return () => {
            clearTimeout(timer);
        };
    }, [onScan]);


    return (
        <video className='qr-container' ref={videoRef} />
    );
}

export default Scanner;
