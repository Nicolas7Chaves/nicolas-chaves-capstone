import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';

function Scanner() {
    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: { width: 250, height: 250 },
            fps: 1,
        });

        // Define the success and error functions
        const onScanSuccess = (result) => {
            scanner.clear();
            setScanResult(result);
        };

        const onScanError = (error) => {
            console.error(error);
        };

        // Start the scanner
        scanner.render(onScanSuccess, onScanError);

        // Cleanup function
        return () => {
            scanner.clear(); // This will ensure the scanner is properly stopped and cleaned up
        };
    }, []); // The empty dependency array ensures this effect runs only once when the component mounts


    return (
        <div className='container'>
            <div id='reader'></div>
            {scanResult && (
                <div>
                    <h2>Scan Result:</h2>
                    <p>{scanResult}</p>
                </div>
            )}
        </div>
    );
};

export default Scanner;