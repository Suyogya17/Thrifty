import * as cam from "@mediapipe/camera_utils";
import { Pose } from "@mediapipe/pose";
import Spline from "@splinetool/react-spline"; // ✅ Spline import
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Webcam from "react-webcam";

import Footer from "../../components/Footer/footer";
import Navbar from "../../components/Navbar/navbar";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showAR, setShowAR] = useState(false);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);
  const tshirtImgRef = useRef(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/api/product/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id]);

  useEffect(() => {
    if (!showAR) {
      if (cameraRef.current) {
        cameraRef.current.stop();
        cameraRef.current = null;
      }
      return;
    }

    const videoElement = webcamRef.current?.video;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    if (product && !tshirtImgRef.current) {
      const img = new Image();
      img.src = `http://localhost:3000/uploads/${product.image}`;
      tshirtImgRef.current = img;
    }

    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

      if (results.poseLandmarks) {
        const landmarks = results.poseLandmarks;

        const leftShoulder = landmarks[11];
        const rightShoulder = landmarks[12];
        const leftHip = landmarks[23];
        const rightHip = landmarks[24];

        function toPixelCoords(landmark) {
          return {
            x: landmark.x * canvasElement.width,
            y: landmark.y * canvasElement.height,
          };
        }

        const leftShoulderPx = toPixelCoords(leftShoulder);
        const rightShoulderPx = toPixelCoords(rightShoulder);
        const leftHipPx = toPixelCoords(leftHip);
        const rightHipPx = toPixelCoords(rightHip);

        const centerX = (leftShoulderPx.x + rightShoulderPx.x) / 2;
        const centerY = (leftShoulderPx.y + rightShoulderPx.y) / 2;

        const torsoWidth = Math.abs(rightShoulderPx.x - leftShoulderPx.x) * 2;
        const torsoHeight = Math.abs(leftHipPx.y - centerY) * 1.6;

        const angleRad = Math.atan2(
          rightShoulderPx.y - leftShoulderPx.y,
          rightShoulderPx.x - leftShoulderPx.x
        );

        if (tshirtImgRef.current && tshirtImgRef.current.complete) {
          canvasCtx.translate(centerX, centerY + torsoHeight / 4);
          canvasCtx.rotate(angleRad);
          canvasCtx.scale(1, -1);

          canvasCtx.drawImage(
            tshirtImgRef.current,
            -torsoWidth / 2,
            -torsoHeight / 2,
            torsoWidth,
            torsoHeight
          );

          canvasCtx.scale(1, -1);
          canvasCtx.rotate(-angleRad);
          canvasCtx.translate(-centerX, -(centerY + torsoHeight / 4));
        }
      }

      canvasCtx.restore();
    });

    if (videoElement) {
      cameraRef.current = new cam.Camera(videoElement, {
        onFrame: async () => {
          await pose.send({ image: videoElement });
        },
        width: 640,
        height: 480,
      });
      cameraRef.current.start();
    }

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
        cameraRef.current = null;
      }
    };
  }, [showAR, product]);

  const handleBuy = () => navigate("/order", { state: { product, action: "buy" } });
  const handleRent = () => navigate("/order", { state: { product, action: "rent" } });

  if (!product) return <div className="p-6 text-center">Loading product...</div>;

  return (
    <>
      <Navbar />
      <div className="px-6 py-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow-lg">
          <div className="w-full h-full">
            <img
              src={`http://localhost:3000/uploads/${product.image}`}
              alt={product.productName}
              className="w-full h-[400px] object-cover rounded-lg border"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.productName}</h1>
              <p className="text-gray-600 mt-4">{product.description}</p>
              <div className="mt-6 space-y-2">
                <p className="text-xl font-semibold text-purple-600">Rs {product.price}</p>
                <p className="text-sm text-gray-700">
                  Type: <span className="font-medium">{product.type}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Condition: <span className="font-medium">{product.condition}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Category: <span className="font-medium">{product.category}</span>
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex gap-4">
                <button
                  onClick={handleRent}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition"
                >
                  Rent
                </button>
                <button
                  onClick={handleBuy}
                  className="flex-1 bg-pink-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-pink-600 transition"
                >
                  Buy
                </button>
              </div>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-lg text-lg font-medium hover:opacity-90 transition"
              >
                {showPreview ? "Hide 3D Preview" : "Preview in 3D"}
              </button>
              <button
                onClick={() => setShowAR(!showAR)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
              >
                {showAR ? "Hide AR Try-On" : "Try in AR"}
              </button>
            </div>
          </div>
        </div>

        {showPreview && (
          <div className="mt-10 rounded-xl overflow-hidden border-2 border-gray-200 shadow-inner">
            <Spline scene="https://prod.spline.design/FmtBpfaI82IPOPER/scene.splinecode" />
          </div>
        )}

        {showAR && (
          <div className="relative mt-10 w-[640px] h-[480px] mx-auto">
            <Webcam
              ref={webcamRef}
              mirrored
              screenshotFormat="image/jpeg"
              videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
              style={{ position: "absolute", top: 0, left: 0, width: 640, height: 480 }}
            />
            <canvas
              ref={canvasRef}
              width={640}
              height={480}
              className="border"
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
