import React, { useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';
import './Scanner.scss'

function Scanner({ onScan }) {
    const videoRef = useRef();
    useEffect(() => {
        // Delay initialization due to QR Scanner not displaying sometimes when accessing page
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
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [onScan]);

    return (
        <video className='qr-container' ref={videoRef} />
    );
}

export default Scanner;
