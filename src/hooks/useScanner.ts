import { useState, useEffect, useRef } from "react";
import type { Mode, SharpnessLevel, Page } from "../types/types";

export function useScanner() {
  const [mode, setMode] = useState<Mode>("manual");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [sharpness, setSharpness] = useState<SharpnessLevel>("yellow");
  const [pages, setPages] = useState<Page[]>([]);
  const [isFlashing, setIsFlashing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [permissionError, setPermissionError] = useState<DOMException | null>(
    null,
  );

  const [activePageIndex, setActivePageIndex] = useState<number | null>(null);

  const constraints: MediaStreamConstraints = {
    audio: false,
    video: true,
  };

  function handleSuccess(stream: MediaStream) {
    setStream(stream);
    setPermissionError(new DOMException("", "granted"));
  }

  function handleError(error: DOMException) {
    console.log("getUserMedia error:", error.name, error.message);
    setPermissionError(error);
  }

  const handleMediaRequest = () => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(handleSuccess, handleError);
  };

  useEffect(() => {
    handleMediaRequest();
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleCapture = () => {
    if (!stream) return;

    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 350);

    const track = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(track);

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    imageCapture.takePhoto().then((blob) => {
      const imageUrl = URL.createObjectURL(blob);

      setPages((prev) => {
        const newPage: Page = {
          id: Math.random().toString(36).substring(2, 9),
          imageUrl,
          timestamp,
          name: `Page ${prev.length + 1}`,
        };
        return [...prev, newPage];
      });
    });
  };

  // Auto-capture in continuous mode when green/sharp
  useEffect(() => {
    if (mode === "continuous" && sharpness === "green") {
      const timer = setTimeout(() => {
        handleCapture();
        setSharpness("yellow"); // Reset to stabilizing/yellow after capture
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [mode, sharpness]);

  /**
   * The math part that got interesting
   */
  useEffect(() => {
    if (!stream || !videoRef.current) return;

    const video = videoRef.current;

    // A hidden, small canvas just for analysis — not shown in the UI
    const canvas = document.createElement("canvas");
    canvas.width = 160; // small on purpose — we don't need full resolution
    canvas.height = 120; // to detect blur, and small = fast
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let frameRequestId: number;

    function analyzeFrame() {
      // Step 1: Video -> Canvas (freeze this instant)
      ctx!.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Step 2: Canvas -> raw numbers (r,g,b,a per pixel)
      const { data, width, height } = ctx!.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      );

      // Step 3: Color -> grayscale (one brightness number per pixel)
      const gray = new Float32Array(width * height);
      for (let i = 0; i < gray.length; i++) {
        const r = data[i * 4];
        const g = data[i * 4 + 1];
        const b = data[i * 4 + 2];
        gray[i] = 0.299 * r + 0.587 * g + 0.114 * b;
      }

      // Step 4: Grayscale -> edge map (Laplacian: compare each pixel to its neighbors)
      let sum = 0;
      let sumOfSquares = 0;
      let pixelCount = 0;

      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const i = y * width + x;
          const edgeStrength =
            gray[i - width] +
            gray[i + width] +
            gray[i - 1] +
            gray[i + 1] -
            4 * gray[i];

          sum += edgeStrength;
          sumOfSquares += edgeStrength * edgeStrength;
          pixelCount++;
        }
      }

      // Step 5: Edge map -> one sharpness score (variance of edge strengths)
      const mean = sum / pixelCount;
      const variance = sumOfSquares / pixelCount - mean * mean;

      // Step 6: Score -> red/yellow/green
      let level: SharpnessLevel;
      if (variance < 50) level = "red";
      else if (variance < 150) level = "yellow";
      else level = "green";

      setSharpness(level);

      // Step 7: schedule the next check on the next real video frame
      frameRequestId = video.requestVideoFrameCallback(analyzeFrame);
    }

    frameRequestId = video.requestVideoFrameCallback(analyzeFrame);

    return () => {
      video.cancelVideoFrameCallback(frameRequestId);
    };
  }, [stream]);

  // Retake/Swap page handler
  const handleRetakePage = (id: string) => {
    if (!stream) return;

    const track = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(track);

    imageCapture.takePhoto().then((blob) => {
      const imageUrl = URL.createObjectURL(blob);
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setPages((prev) =>
        prev.map((page) =>
          page.id === id
            ? { ...page, imageUrl, timestamp: `${timestamp} (Retaken)` }
            : page,
        ),
      );
    });
  };

  const handleDeletePage = (id: string) => {
    setPages((prev) => prev.filter((page) => page.id !== id));
  };

  return {
    mode,
    setMode,
    stream,
    videoRef,
    sharpness,
    setSharpness,
    pages,
    setPages,
    isFlashing,
    activePageIndex,
    setActivePageIndex,
    permissionError,

    handleCapture,
    handleRetakePage,
    handleDeletePage,
  };
}
