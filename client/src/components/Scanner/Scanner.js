import React, { useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';
import QrScannerWorker from 'qr-scanner/qr-scanner-worker.min.js';
import './Scanner.scss'
QrScanner.WORKER_PATH = '/qr-scanner-worker.min.js';

function Scanner({ onScan }) {
    const videoRef = useRef();
    useEffect(() => {
        const qrScanner = new QrScanner(videoRef.current, result => {
            console.log('decoded qr code:', result);
            onScan(result);
            qrScanner.stop();
        });

        qrScanner.start();

        return () => {
            qrScanner.stop();
        };
    }, [onScan]);

    return (
        <video className='qr-container' ref={videoRef} />
        );
}

export default Scanner;
