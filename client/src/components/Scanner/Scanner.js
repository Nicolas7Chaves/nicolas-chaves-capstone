import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';

function Scanner() {
    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: { width: 250, height: 250 },
            fps: 5,
        });

        scanner.render(success, error);

        function success(result) {
            scanner.clear();
            setScanResult(result);
        }

        function error(err) {
            console.error('QR Code scan error:', err);
        }
        return () => {
            scanner.clear();
        };
    }, []);

    return (
        <>
            <h1>Scan Here</h1>
            <div id='reader'></div>
            {scanResult && (
                <div>
                    <h2>Scan Result:</h2>
                    <p>{scanResult}</p>
                </div>
            )}
        </>
    );
};

export default Scanner;