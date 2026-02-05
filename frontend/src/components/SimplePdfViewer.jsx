// import React, { useRef } from 'react';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import { FaExpand } from 'react-icons/fa6';

// const SimplePdfViewer = ({ url }) => {
//   const viewerContainerRef = useRef(null);

//   const handleFullScreen = () => {
//     const element = viewerContainerRef.current;
//     if (!element) return;

//     if (document.fullscreenElement) {
//       document.exitFullscreen();
//     } else if (element.requestFullscreen) {
//       element.requestFullscreen();
//     }
//   };

//   return (
//     <div className="relative w-full h-full" ref={viewerContainerRef}>
//       {/* Fullscreen Button */}
//       <button
//         onClick={handleFullScreen}
//         className="absolute top-2 right-2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
//         title="Toggle Fullscreen"
//       >
//         <FaExpand className="w-4 h-4" />
//       </button>

//       {/* PDF Viewer */}
//       <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//         <div className="w-full h-full overflow-auto">
//           <Viewer fileUrl={url} plugins={[]} />
//         </div>
//       </Worker>
//     </div>
//   );
// };

// export default SimplePdfViewer;

import React, { useRef } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import { FaExpand, FaMagnifyingGlassPlus, FaMagnifyingGlassMinus } from 'react-icons/fa6';

const SimplePdfViewer = ({ url }) => {
  const viewerContainerRef = useRef(null);
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

  const handleFullScreen = () => {
    const element = viewerContainerRef.current;
    if (!element) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  };

  return (
    <div className="relative w-full h-full" ref={viewerContainerRef}>
      {/* Toolbar */}
      <div className="absolute top-2 right-2 z-10 flex gap-2 bg-black/50 rounded-full p-2">
        {/* Fullscreen Button */}
        <button
          onClick={handleFullScreen}
          className="text-white p-2 rounded-full hover:bg-black/70 transition"
          title="Toggle Fullscreen"
        >
          <FaExpand className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <ZoomOutButton>
          {(props) => (
            <button
              onClick={props.onClick}
              className="text-white p-2 rounded-full hover:bg-black/70 transition"
              title="Zoom Out"
            >
              <FaMagnifyingGlassMinus className="w-4 h-4" />
            </button>
          )}
        </ZoomOutButton>

        {/* Zoom In */}
        <ZoomInButton>
          {(props) => (
            <button
              onClick={props.onClick}
              className="text-white p-2 rounded-full hover:bg-black/70 transition"
              title="Zoom In"
            >
              <FaMagnifyingGlassPlus className="w-4 h-4" />
            </button>
          )}
        </ZoomInButton>

        {/* Zoom Level Dropdown */}
        <ZoomPopover />
      </div>

      {/* PDF Viewer */}
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <div className="w-full h-full overflow-auto">
          <Viewer fileUrl={url} plugins={[zoomPluginInstance]} />
        </div>
      </Worker>
    </div>
  );
};

export default SimplePdfViewer;
