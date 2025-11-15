import { useRef, useState, useEffect } from "react";

interface Props {
  onRedeem: (scannedCode: string) => void; onClose: () => void; loading: boolean; 
}

export const QRScanner = ({ onRedeem, onClose }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    try {
      setError("");
      setScanning(true);

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        requestAnimationFrame(scanFrame);
      }
    } catch (err) {
      setError("Unable to access camera. Please check permissions.");
      setScanning(false);
    }
  };

  const extractVoucherCodeFromQR = (qrData: string): string | null => {
    // Try to parse the QR code data which might be:
    // 1. Direct voucher code: "d53e5c75-0cb6-47bd-b452-26b9717e08f7"
    // 2. URL format: "sats2go:voucher-code"
    // 3. JSON data (if the QR contains the full voucher object)
    
    console.log("QR Data received:", qrData);
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(qrData)) {
      return qrData;
    }
    
    if (qrData.includes(':')) {
      const parts = qrData.split(':');
      const code = parts[parts.length - 1];
      if (code && code.length > 10) {
        return code;
      }
    }
    
    try {
      const data = JSON.parse(qrData);
      if (data.voucher && data.voucher.code) {
        return data.voucher.code;
      }
      if (data.code) {
        return data.code;
      }
    } catch {
    }
    return qrData.length > 10 ? qrData : null;
  };

  const scanFrame = () => {
    if (!scanning || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    if (scanning) {
      requestAnimationFrame(scanFrame);
    }
  };

  const stopScanner = () => {
    setScanning(false);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleClose = () => {
    stopScanner();
    onClose();
  };
  const simulateQRScan = () => {
    const simulatedVoucherCode = "d53e5c75-0cb6-47bd-b452-26b9717e08f7";
    onRedeem(simulatedVoucherCode);
    stopScanner();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Scan Voucher QR Code</h3>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
            <video
              ref={videoRef}
              className="w-full h-64 object-cover"
              playsInline
              muted
            />
            <canvas ref={canvasRef} className="hidden" />
            
            {/* Scanner Frame Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-2 border-green-500 rounded-lg w-48 h-48">
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-green-500"></div>
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-green-500"></div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-green-500"></div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-green-500"></div>
              </div>
            </div>

            {/* Scanning animation */}
            {scanning && (
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-green-500 animate-pulse">
                <div className="h-full w-20 bg-white mx-auto animate-bounce"></div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {!scanning ? (
              <button
                onClick={startScanner}
                className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors"
              >
                📷 Start Camera
              </button>
            ) : (
              <button
                onClick={stopScanner}
                className="w-full bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 transition-colors"
              >
                ⏹️ Stop Scanner
              </button>
            )}

            {/* Demo button for development */}
            <button
              onClick={simulateQRScan}
              className="w-full border border-orange-500 text-orange-500 py-3 rounded-md hover:bg-orange-50 transition-colors"
            >
              🎮 Test with Sample Voucher
            </button>

            <p className="text-sm text-gray-600 text-center">
              Point your camera at a Sats2Go voucher QR code
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};