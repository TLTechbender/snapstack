import { ScannerView } from "./components/ScannerView";
import { ModeToggle } from "./components/ModeToggle";
import { CaptureButton } from "./components/CaptureButton";
import { PageCounter } from "./components/PageCounter";
import { PageStack } from "./components/PageStack";
import { ExportBar } from "./components/ExportBar";
import { Lightbox } from "./components/Lightbox";
import { useScanner } from "./hooks/useScanner";

function App() {
  const {
    mode,
    setMode,
    stream,
    videoRef,
    sharpness,
    pages,
    setPages,
    isFlashing,
    activePageIndex,
    setActivePageIndex,
    permissionError,
    handleCapture,
    handleRetakePage,
    handleDeletePage,
  } = useScanner();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-800 flex flex-col justify-between ">
      <header className="border-b border-zinc-200 bg-white/90 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#000080] flex items-center justify-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5 text-white">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-zinc-900 p-0 m-0 leading-none">
                SnapStack
              </h1>
              <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest mt-0.5">
                Just Bola trying out something new
              </p>
            </div>
          </div>
          <PageCounter count={pages.length} />
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col items-center">
            <ScannerView
              stream={stream}
              mode={mode}
              sharpness={sharpness}
              isFlashing={isFlashing}
              videoRef={videoRef}
              permissionError={permissionError}
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white border border-zinc-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="flex-1 w-full">
                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase block mb-3 text-center sm:text-left">
                  Capture Mode
                </span>
                <ModeToggle mode={mode} onChange={setMode} />
              </div>

              <div className="flex flex-col items-center justify-center w-full sm:w-auto sm:border-l sm:border-zinc-200/80 sm:pl-6 min-h-[96px]">
                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase block mb-2">
                  Action
                </span>
                <div className="flex flex-1 items-center justify-center h-20">
                  {mode == "manual" && (
                    <CaptureButton
                      onClick={handleCapture}
                      disabled={sharpness !== "green"}
                    />
                  )}
                  {mode === "continuous" && (
                    <div className="flex flex-col items-center justify-center text-center  bg-purple-50 border border-purple-100 rounded-xl">
                      <span className="text-xs text-purple-600 font-bold tracking-wide flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#000080] rounded-full animate-pulse" />
                        AUTO ACTIVE
                      </span>
                      <p className="text-[9.5px] text-zinc-450 mt-1  leading-snug">
                        Auto capture starts when viewfinder is{" "}
                        <span className="text-emerald-600 font-bold">
                          green
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <PageStack
              pages={pages}
              onDeletePage={handleDeletePage}
              onRetakePage={handleRetakePage}
              onOpenPage={(index) => setActivePageIndex(index)}
              onDeleteAll={() => setPages([])}
            />

            <ExportBar pages={pages} pageCount={pages.length} />

            <div className="bg-white border border-zinc-200 p-5 rounded-2xl shadow-sm">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                Instructions
              </h3>
              <ul className="text-xs text-zinc-500 space-y-2 list-none p-0 m-0">
                <li className="flex items-start gap-2">
                  <span className="text-[#000080]">✦</span>
                  <span>
                    Use the <strong>Mode Switch</strong> to toggle between
                    manual trigger and auto-capture mode.
                  </span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="text-[#000080]">✦</span>
                  <span>
                    In continuous mode, setting sharpness to{" "}
                    <strong>Green</strong> triggers automatic capture.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#000080]">✦</span>
                  <span>
                    Hover over captured thumbnails to{" "}
                    <strong>Retake/Swap</strong> or <strong>Delete</strong>{" "}
                    pages.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Lightbox
        pages={pages}
        activeIndex={activePageIndex}
        onClose={() => setActivePageIndex(null)}
        onNavigate={(index) => setActivePageIndex(index)}
      />
    </div>
  );
}

export default App;
