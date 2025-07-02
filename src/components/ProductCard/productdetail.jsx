import * as cam from "@mediapipe/camera_utils";
import { Pose } from "@mediapipe/pose";
import Spline from "@splinetool/react-spline";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Webcam from "react-webcam";

import Footer from "../../components/Footer/footer";
import Navbar from "../../components/Navbar/navbar";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const [scale, setScale] = useState(1);
  const [liked, setLiked] = useState(false);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);
  const tshirtImgRef = useRef(null);

  // Fetch product details and check if liked
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/api/product/${id}`)
        .then((res) => {
          setProduct(res.data);
          checkIfLiked(res.data._id);
        })
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id]);

  // Check if product is already in wishlist
  const checkIfLiked = async (productId) => {
    try {
      const userId = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      if (!userId || !token) return;

      const res = await axios.get(`http://localhost:3000/api/wishlist/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const isLiked = res.data.some(
        (item) => (typeof item === "string" ? item === productId : item._id === productId)
      );
      setLiked(isLiked);
    } catch (error) {
      console.error("Error checking wishlist:", error);
    }
  };

  // Add to wishlist handler
  const handleAddToWishlist = async () => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      toast.warn("Please login to add to wishlist.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/wishlist/addToWishlist",
        {
          customerId: userId,
          itemId: product._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Added to wishlist!");
      setLiked(true);
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      toast.error("Failed to add to wishlist.");
    }
  };

  // Remove from wishlist handler
  const handleRemoveFromWishlist = async () => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      toast.warn("Please login to modify your wishlist.");
      return;
    }

    try {
      await axios.delete(
        "http://localhost:3000/api/wishlist/removeFromWishlist",
        { customerId: userId, itemId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Removed from wishlist!");
      setLiked(false);
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error("Failed to remove from wishlist.");
    }
  };

  // AR and pose estimation logic
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

        const toPixelCoords = (lm) => ({
          x: lm.x * canvasElement.width,
          y: lm.y * canvasElement.height,
        });

        const leftShoulderPx = toPixelCoords(leftShoulder);
        const rightShoulderPx = toPixelCoords(rightShoulder);
        const leftHipPx = toPixelCoords(leftHip);

        const centerX = (leftShoulderPx.x + rightShoulderPx.x) / 2;
        const centerY = (leftShoulderPx.y + rightShoulderPx.y) / 2;

        const torsoWidth = Math.abs(rightShoulderPx.x - leftShoulderPx.x) * 2 * scale;
        const torsoHeight = Math.abs(leftHipPx.y - centerY) * 1.6 * scale;

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
  }, [showAR, product, scale]);

  // Buy button handler
  const handleBuy = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warn("Please login to continue buying.");
      return;
    }
    navigate("/order", { state: { product, action: "buy" } });
  };

  // Rent button handler
  const handleRent = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warn("Please login to continue renting.");
      return;
    }
    navigate("/order", { state: { product, action: "rent" } });
  };

  if (!product) return <div className="p-6 text-center">Loading product...</div>;

  return (
    <>
      <Navbar />
      <div className="px-6 py-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow-lg">
          <div className="w-full h-full relative">
            <img
              src={`http://localhost:3000/uploads/${product.image}`}
              alt={product.productName}
              className="w-full h-[400px] object-cover rounded-lg border"
            />
            <button
              onClick={liked ? handleRemoveFromWishlist : handleAddToWishlist}
              className="absolute top-4 right-4 bg-white/90 p-3 rounded-full shadow hover:scale-125 transition-transform"
              title={liked ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <FaHeart size={28} className={liked ? "text-red-600" : "text-gray-400"} />
            </button>
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
          <>
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
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => setScale((prev) => Math.min(prev + 0.1, 2))}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Increase Size
              </button>
              <button
                onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.5))}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Decrease Size
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
