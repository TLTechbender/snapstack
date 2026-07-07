# SnapStack

A browser-based document scanner, built mainly as a way to actually *learn*
WebRTC and the MediaStream Image Capture API hands-on, rather than just read
about them.

## What this project is really about

This started as an excuse to go deep on two browser APIs I kept hearing about
but had never used for real: **WebRTC** (specifically the camera-access side
of it, via `getUserMedia`) and the **MediaStream Image Capture API**
(`ImageCapture`, `takePhoto()`).

The "document scanner" idea — auto-detecting sharpness and capturing pages
into a PDF — became the vehicle for learning those APIs properly, rather than
the end goal in itself. Along the way it pulled in a few more concepts that
ended up being just as valuable to understand:

- `requestVideoFrameCallback` for syncing work to actual video frames instead
  of blind polling with `setInterval`
- Basic image processing math (grayscale conversion, Laplacian edge detection,
  variance) to turn "is this photo blurry?" into something code can actually
  measure
- The mirroring convention in video-call apps, and *why* it doesn't apply to a
  scanner (mirroring is for looking at yourself, not for reading a document
  someone's holding up to the camera)
- Client-side PDF generation with jsPDF, and the "load into an `<img>` before
  you can use it" pattern that shows up a lot when working with `blob:` URLs

## Honest scope check

This is **desktop only**, and realistically that limits how practical
it is as an actual scanning tool — most people reaching for a document scanner
want it on their phone, in their pocket, not tabbed into a laptop browser.
So this project is less "a tool I'll use" and more "a proof of concept + a
place I properly learned some browser APIs by building something real with
them."

## Where this could go next

The camera-capture pipeline built here (permission handling, live video,
frame-by-frame analysis, capturing stills) is genuinely reusable as a
foundation for other browser-based computer vision projects — the "get pixels
out of a live camera feed" part is the hard, shared groundwork regardless of
what you do with those pixels afterward. Natural next steps from here in future projects:

- **Object detection** using ONNX Runtime — feeding captured frames into a
  model instead of just measuring blur
- **Image-to-text (OCR)** — since the hardest part of a scanner (getting a
  clean, sharp still image) is already solved here

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS
- jsPDF for client-side PDF generation
- No backend — everything runs entirely in the browser

## Status

A working learning prototype, not a polished product. Built primarily to
understand the APIs involved, not to ship.